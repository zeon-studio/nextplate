---
name: content-management
description: How to add, edit, and update page content (e.g., blog posts, pages, or custom collections) in this Next.js template architecture. Instructs agents to dynamically check `src/content/` for available collections. Includes frontmatter fields, required vs optional fields, file naming conventions, and image handling. Use when managing content or editing markdown/MDX files.
---

# Content Management

This skill explains how to manage content collections within this Next.js template architecture.

## Content Architecture

Content is primarily driven by Markdown (`.md`) and MDX (`.mdx`) files located in the `src/content/` directory.

**Important for AI Agents:** The exact collections (folders) may vary depending on how this template was customized. **You should always list the contents of the `src/content/` directory to discover what collections (e.g., `blog`, `pages`, `authors`, `products`) are available in the current project.**

Common examples often found here include:
- **Blog Posts**: `src/content/blog/`
- **Authors**: `src/content/authors/`
- **Pages**: `src/content/pages/`
- **Taxonomies**: E.g., `src/content/categories/`, `src/content/tags/`

## Frontmatter Schema

Every markdown file must start with YAML frontmatter.

### Required Fields for Blog Posts (`src/content/blog/`)
- `title`: String. The main title of the post.
- `date`: ISO Date string (e.g., `2022-04-04T05:00:00Z`).
- `description`: String. Short summary used for lists and SEO.
- `image`: String. Path to the cover image (starts with `/images/`).

### Optional Fields
- `meta_title`: String. Used for SEO if different from `title`.
- `categories`: Array of strings (e.g., `["Application", "Data"]`).
- `tags`: Array of strings (e.g., `["nextjs", "tailwind"]`).
- `author`: String. Matches the name of an author in `src/content/authors/`.
- `draft`: Boolean (`true`/`false`). If `true`, the post is excluded from production builds.

## File Naming Conventions

- Use kebab-case for filenames: `my-new-post.md`
- The filename (without extension) becomes the URL slug (e.g., `/blog/my-new-post`).
- For index pages of a folder, use `_index.md`.

## Image Handling

- Images should be placed in `public/images/`.
- Reference them in frontmatter or content using the absolute path relative to `public`: `/images/my-image.jpg`.
- Example: `![Alt text](/images/my-image.jpg)`

## Common Mistakes / What NOT to do

- **DO NOT** use relative paths for images like `../../public/images/my-image.jpg`. Always use absolute paths starting with `/` (e.g., `/images/...`).
- **DO NOT** put content files outside of `src/content/`. The content parsers are hardcoded to look in this directory.
- **DO NOT** misspell frontmatter keys (e.g., using `category` instead of `categories`). The site will fail to render the taxonomy if keys do not match exactly.
