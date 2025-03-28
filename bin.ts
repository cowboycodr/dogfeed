#!/usr/bin/env node
import * as path from "node:path";
import { readFile } from "fs/promises";
import process from "node:process";
import fg from "fast-glob";
import clipboard from "clipboardy";

const targetDir = process.argv[2] || process.cwd();
const gitignorePath = path.join(targetDir, ".gitignore");
let gitignoreContent = "";
try {
  gitignoreContent = await readFile(gitignorePath, "utf-8");
} catch {}

const gitignore = gitignoreContent
  .split("\n")
  .filter(Boolean)
  .filter((l) => !l.startsWith("#"))
  .map((l) => (l.endsWith(path.sep) ? `${l}**` : l).trim());

const entries = await fg("**/*", { ignore: gitignore, cwd: targetDir });
const content: string[] = [];
for (const entry of entries) {
  const filepath = path.join(targetDir, entry);
  const text = await readFile(filepath, "utf-8");
  content.push("---");
  content.push(entry);
  content.push("---");
  content.push(text);
}

clipboard.writeSync(content.join("\n"));
