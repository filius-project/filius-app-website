import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);

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
  const text = readFileSync(join(root, file), "utf8");
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
