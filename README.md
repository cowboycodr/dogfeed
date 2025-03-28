# Dogfeed

A CLI tool for prepping codebases to feed into LLMs. It globs files in a directory (respecting `.gitignore`), bundles them with headers, and copies the result to your clipboard.

## Usage

```bash
npx dogfeed [path]
```

- Defaults to `.`
- Outputs to your clipboard
- Each file is formatted like:

```
---
relative/path/to/file.ts
---
file content here
```

## Development

```bash
pnpm install
pnpm run build
```

## License

ISC
