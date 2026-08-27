import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const trackedFiles = existsSync(join(root, ".git"))
  ? execFileSync("git", ["ls-files", "-z"], {
      cwd: root,
      encoding: "utf8",
    })
      .split("\0")
      .filter(Boolean)
  : [
      ".env.example",
      "compose.yaml",
      "compose.smtp-secret.yaml",
      "Dockerfile",
      "docs/deployment.md",
      "docs/dns-and-mail.md",
      "docs/privacy-and-analytics.md",
    ];

const publicConfigurationFiles = trackedFiles.filter((file) =>
  /^(?:\.env\.example|compose(?:\.[^/]+)?\.ya?ml|Dockerfile|docs\/[^/]+\.md)$/.test(
    file,
  ),
);

const violations = [];
const nonEmptyAssignment =
  /^[ \t]*CONTACT_SMTP_PASSWORD[ \t]*=[ \t]*([^#\r\n]*)/gim;
const privateKey = /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/;

for (const file of publicConfigurationFiles) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  for (const match of text.matchAll(nonEmptyAssignment)) {
    if (match[1].trim()) {
      violations.push(
        `${file}: CONTACT_SMTP_PASSWORD must be empty in public configuration`,
      );
    }
  }
  if (privateKey.test(text)) {
    violations.push(`${file}: private-key material is not allowed`);
  }
}

if (
  trackedFiles.some((file) => /^(?:\.env$|.*\.(?:p12|p8|key|pem))$/i.test(file))
) {
  violations.push("tracked secret-bearing environment/key file found");
}

if (violations.length) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log(
  `Public secret boundary passed for ${publicConfigurationFiles.length} configuration files.`,
);
