import * as path from "node:path";
import process from "node:process";
import { readFile } from "fs/promises";

import fg from "fast-glob";
import clipboard from "clipboardy";

type Tree = { [key: string]: Tree };

// Utility Functions
async function getGitIgnorePatterns(targetDir: string): Promise<string[]> {
  const gitignorePath = path.join(targetDir, ".gitignore");
  try {
    const content = await readFile(gitignorePath, "utf-8");
    return content
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"))
      .map((line) => (line.endsWith(path.sep) ? `${line}**` : line.trim()));
  } catch {
    return [];
  }
}

async function getEntries(
  targetDir: string,
  ignore: string[],
): Promise<string[]> {
  return await fg("**/*", { ignore, cwd: targetDir });
}

// Tree Functions
function buildTree(paths: string[]): Tree {
  const tree: Tree = {};
  for (const filePath of paths) {
    const parts = filePath.split(path.sep);
    let current: Tree = tree;
    for (const part of parts) {
      current[part] = current[part] || {};
      current = current[part];
    }
  }
  return tree;
}

function printTree(tree: Tree, indent = ""): string {
  let output = "";
  const keys = Object.keys(tree).sort();
  for (const key of keys) {
    output += `${indent}${key}\n`;
    output += printTree(tree[key], indent + "  ");
  }
  return output;
}

// File Reading Function
async function readFileContents(
  targetDir: string,
  entries: string[],
): Promise<string[]> {
  const contents: string[] = [];
  for (const entry of entries) {
    const filePath = path.join(targetDir, entry);
    const text = await readFile(filePath, "utf-8");
    contents.push(`---\n${entry}\n---\n${text}`);
  }
  return contents;
}

// Aggregation and Clipboard Functions
async function aggregateContent(targetDir: string): Promise<string> {
  const ignorePatterns = await getGitIgnorePatterns(targetDir);
  const entries = await getEntries(targetDir, ignorePatterns);
  const folderStructure = printTree(buildTree(entries));
  const fileContents = await readFileContents(targetDir, entries);
  return [`--- Folder Structure ---\n${folderStructure}`, ...fileContents].join(
    "\n",
  );
}

function copyToClipboard(content: string): void {
  clipboard.writeSync(content);
}

// Execution
const targetDir = process.argv[2] || process.cwd();
const aggregatedContent = await aggregateContent(targetDir);
copyToClipboard(aggregatedContent);
