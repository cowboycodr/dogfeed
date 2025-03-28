# Dogfeed

Dogfeed is a lightweight, ultra-fast CLI tool built to efficiently prepare codebases for feeding into LLMs (Large Language Models). It seamlessly gathers all relevant files from a given directory, neatly formats them with clear headers, and copies the entire bundle directly to your clipboard—making it ideal for quick AI-assisted code analysis and discussions.

## Key Features

- **Blazing Fast**: Instantly glob and aggregate files without waiting.
- **Git-aware**: Automatically respects `.gitignore` rules, ensuring only meaningful files are included.
- **Clipboard-ready**: Directly outputs formatted content to your clipboard, streamlining your workflow.

## Installation & Usage

Execute quickly using `npx` without installing globally:

```bash
npx dogfeed [path]
```

- Omitting `[path]` defaults to the current directory (`.`).
- Output is formatted neatly per file:

```
---
relative/path/to/file.ts
---
file content here
```

## Development

Clone, install dependencies, and build the project:

```bash
pnpm install
pnpm run build
```

## Contributing

Contributions are welcome! Feel free to submit issues, improvements, or pull requests.

## License

ISC