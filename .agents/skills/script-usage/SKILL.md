---
name: script-usage
description: How to run the custom pnpm scripts (dev, build, generators) included in this Next.js template. Use when a user needs to start the server, build the site, or regenerate specific assets like search indices, LLM docs, or themes.
---

# Script Usage

This skill explains the custom Node.js scripts and `pnpm` commands available in this Next.js template ecosystem.

## Available pnpm Commands (`package.json`)

### `pnpm dev`
Starts the local development server.
- **What it does**: Concurrently runs `next dev` alongside watch scripts. It executes `themeGenerator.mjs --watch` to hot-reload CSS changes when `theme.json` is modified, and runs `jsonGenerator.mjs` to ensure the search index is up-to-date.

### `pnpm build`
Compiles the application for production.
- **What it does**: Sequentially runs `themeGenerator.mjs` and `jsonGenerator.mjs` to ensure all generated assets are ready *before* triggering the `next build` command.

### `pnpm postbuild`
Runs automatically after `npm run build`.
- **What it does**: Executes `next-sitemap` to generate the XML sitemap, followed by `node scripts/llmsGenerator.mjs` to generate AI-friendly documentation files (`llms.txt`, `llms-full.txt`).

### `pnpm remove-darkmode`
A utility script to strip dark mode capabilities from the template.
- **What it does**: Runs `scripts/removeDarkmode.mjs` and formats the code.

## The `scripts/` Directory

The custom logic is housed in the `scripts/` folder.

- **`themeGenerator.mjs`**: Reads `src/config/theme.json` and outputs CSS variables into `src/styles/generated-theme.css`. Must never be bypassed.
- **`jsonGenerator.mjs`**: Scans the markdown content (defined in `config.json` -> `settings.searchable_folders`) and compiles it into a `search.json` file used by the `<SearchModal />` component.
- **`llmsGenerator.mjs`**: Reads the output HTML (or markdown) and generates standard `llms.txt` files for AI ingestion, adhering to the configuration in `config.json` -> `llms`.

## Common Mistakes / What NOT to do

- **DO NOT** run standard Next.js commands like `npx next dev` directly. Doing so bypasses the theme and JSON generation scripts, resulting in broken CSS variables and non-functional search. Always use `pnpm dev`.
- **DO NOT** manually edit the output files of these scripts (e.g., `search.json`, `generated-theme.css`, `llms.txt`). They will be overwritten on the next run. Edit the source content or configuration files instead.
