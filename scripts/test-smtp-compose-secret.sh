#!/usr/bin/env bash
set -euo pipefail

repository_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
image=${FILIUS_CONTACT_SMOKE_IMAGE:-filius-contact:smtp-secret-smoke}
project_name="filius-smtp-secret-$RANDOM-$$"
work_directory=$(mktemp -d)
secret_value="filius-smtp-secret-smoke-$RANDOM-$$"
container_id=""

cleanup() {
  if [[ -n "$container_id" ]]; then
    docker rm -f "$container_id" >/dev/null 2>&1 || true
  fi
  docker compose \
    --project-name "$project_name" \
    -f "$repository_root/compose.yaml" \
    -f "$repository_root/compose.smtp-secret.yaml" \
    down --remove-orphans >/dev/null 2>&1 || true
  rm -rf "$work_directory"
}
trap cleanup EXIT

printf '%s\n' "$secret_value" > "$work_directory/contact-smtp-password"
chmod 600 "$work_directory/contact-smtp-password"

export FILIUS_CONTACT_IMAGE=${image%:*}
export FILIUS_IMAGE_TAG=${image##*:}
export CONTACT_SMTP_PASSWORD="unit-test-direct-placeholder.invalid"
export CONTACT_SMTP_PASSWORD_FILE=""
export CONTACT_SMTP_PASSWORD_SECRET_FILE="$work_directory/contact-smtp-password"

DOCKER_BUILDKIT=1 docker build --tag "$image" "$repository_root/contact"
# Match the documented Linux ownership contract without requiring host sudo.
docker run --rm \
  --user root \
  --volume "$work_directory:/smtp-secret" \
  "$image" \
  chown 1000:1000 /smtp-secret/contact-smtp-password

docker compose \
  --project-name "$project_name" \
  -f "$repository_root/compose.yaml" \
  -f "$repository_root/compose.smtp-secret.yaml" \
  config --quiet

container_id=$(docker compose \
  --project-name "$project_name" \
  -f "$repository_root/compose.yaml" \
  -f "$repository_root/compose.smtp-secret.yaml" \
  run --no-deps -d filius-contact)

deadline=$((SECONDS + 30))
while ((SECONDS < deadline)); do
  status=$(docker inspect --format '{{.State.Status}}' "$container_id")
  if [[ "$status" == "running" ]]; then
    logs=$(docker logs "$container_id" 2>&1)
    if grep -q '"event":"contact_service_ready"' <<<"$logs"; then
      break
    fi
  elif [[ "$status" == "exited" || "$status" == "dead" ]]; then
    docker logs "$container_id" >&2 || true
    echo "Contact service exited before reading the SMTP secret." >&2
    exit 1
  fi
  sleep 1
done

logs=$(docker logs "$container_id" 2>&1)
if ! grep -q '"event":"contact_service_ready"' <<<"$logs"; then
  printf '%s\n' "$logs" >&2
  echo "Contact service did not become ready after reading the SMTP secret." >&2
  exit 1
fi

if grep -Fq "$secret_value" <<<"$logs"; then
  echo "SMTP secret value leaked into container logs." >&2
  exit 1
fi

configured_user=$(docker inspect --format '{{.Config.User}}' "$container_id")
if [[ "$configured_user" != "1000:1000" ]]; then
  echo "Unexpected contact-container user: $configured_user" >&2
  exit 1
fi

configured_environment=$(docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' "$container_id")
if ! grep -qx 'CONTACT_SMTP_PASSWORD=' <<<"$configured_environment"; then
  echo "The mounted-secret override did not clear the direct SMTP password." >&2
  exit 1
fi
if ! grep -qx 'CONTACT_SMTP_PASSWORD_FILE=/run/secrets/contact_smtp_password' <<<"$configured_environment"; then
  echo "The contact service does not use the mounted SMTP secret path." >&2
  exit 1
fi
if grep -Fq "$CONTACT_SMTP_PASSWORD" <<<"$configured_environment"; then
  echo "The stale direct SMTP password remained in the container environment." >&2
  exit 1
fi

mounted_secret=$(docker inspect --format '{{range .Mounts}}{{if eq .Destination "/run/secrets/contact_smtp_password"}}{{.Destination}}{{end}}{{end}}' "$container_id")
if [[ "$mounted_secret" != "/run/secrets/contact_smtp_password" ]]; then
  echo "SMTP secret was not mounted at the configured runtime path." >&2
  exit 1
fi

echo "Compose SMTP secret smoke test passed for unprivileged UID/GID 1000:1000."
