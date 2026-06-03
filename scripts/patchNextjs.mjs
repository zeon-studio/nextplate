import fs from "fs";
import path from "path";

const nextBinPath = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

if (!fs.existsSync(nextBinPath)) {
  console.error("Next.js bin file not found at:", nextBinPath);
  process.exit(0); // exit gracefully so it doesn't block install
}

let content = fs.readFileSync(nextBinPath, "utf8");

const patchMark = "// Build flags patch";
if (content.includes(patchMark)) {
  console.log("Next.js bin already patched.");
  process.exit(0);
}

const target = '"use strict";';
const targetIndex = content.indexOf(target);

if (targetIndex === -1) {
  console.error("Could not find target in next bin.");
  process.exit(0);
}

const patchCode = `
${patchMark}
const buildDrafts = process.argv.includes("--buildDrafts");
const buildFuture = process.argv.includes("--buildFuture");
if (buildDrafts) {
  process.env.BUILD_DRAFTS = "true";
  process.argv = process.argv.filter(x => x !== "--buildDrafts");
}
if (buildFuture) {
  process.env.BUILD_FUTURE = "true";
  process.argv = process.argv.filter(x => x !== "--buildFuture");
}
`;

content =
  content.slice(0, targetIndex + target.length) +
  patchCode +
  content.slice(targetIndex + target.length);

fs.writeFileSync(nextBinPath, content, "utf8");
console.log(
  "Successfully patched Next.js CLI to support --buildDrafts and --buildFuture",
);
