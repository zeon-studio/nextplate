<h1 align=center>Nextjs + Tailwind CSS + TypeScript Starter and Boilerplate</h1>

<p align=center>Nextplate is a free starter template built with Nextjs, TailwindCSS & TypeScript, providing everything you need to jumpstart your Next project and save valuable time.</p>

<p align=center>Made with ♥ by <a href="https://zeon.studio/">Zeon Studio</a></p>
<p align=center>If you find this project useful, please give it a ⭐ to show your support. </p>

<h2 align="center"> <a target="_blank" href="https://nextplate.netlify.app/" rel="nofollow">👀 Demo</a> | <a target="_blank" href="https://nextplate-multilang.netlify.app/" rel="nofollow">👀 Demo Multilang</a> | <a  target="_blank" href="https://pagespeed.web.dev/analysis/https-nextplate-netlify-app/zttnq0z42d?form_factor=desktop">Page Speed (100%)🚀</a>
</h2>

<p align=center>

  <a href="https://github.com/vercel/next.js/releases/tag/16.0.1" alt="Contributors">
    <img src="https://img.shields.io/static/v1?label=NEXTJS&message=16.0.1&color=000&logo=nextjs" alt="Next.js 16.0.1"/>
  </a>

  <a href="https://github.com/zeon-studio/nextplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/zeon-studio/nextplate" alt="license"></a>

  <img src="https://img.shields.io/github/languages/code-size/zeon-studio/nextplate" alt="code size">

  <a href="https://github.com/zeon-studio/nextplate/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/zeon-studio/nextplate" alt="contributors"></a>
</p>

## 📌 Key Features

- 👥 Multi-Authors
- 🎯 Similar Posts Suggestion
- 🔍 Search Functionality
- 🌑 Dark Mode
- 🏷️ Tags & Categories
- 🔗 Netlify setting pre-configured
- 📞 Support contact form
- 📱 Fully responsive
- 📝 Write and update content in Markdown / MDX
- 🤖 LLM-ready docs generation (`llms.txt`, `llms-full.txt`, and per-page `.md`)
- 💬 Disqus Comment
- 🔳 Syntax Highlighting

### 📄 15+ Pre-designed Pages

- 🏠 Homepage
- 👤 About
- 📞 Contact
- 👥 Authors
- 👤 Author Single
- 📝 Blog
- 📝 Blog Single
- 🚫 Custom 404
- 💡 Elements
- 📄 Privacy Policy
- 🏷️ Tags
- 🏷️ Tag Single
- 🗂️ Categories
- 🗂️ Category Single
- 🔍 Search

## 🚀 Getting Started

### 📦 Dependencies

- next 16.0+
- node v22.10+
- npm v10.2+
- tailwind v4.1+

### 👉 Install Dependencies

```bash
npm install
```

### 👉 Development Command

```bash
npm run dev
```

### 👉 Build Command

```bash
npm run build
```

### 👉 Generate LLM Files

After build, this project can generate LLM-friendly files from your built HTML:

- `llms.txt` (index of pages)
- `llms-full.txt` (full combined content)
- optional per-page Markdown files

Use one of these ways:

```bash
# included in build
npm run build

# or run manually after build
npm run generate-llms
```

Configuration is in `src/config/config.json` under `llms`:

- `generate_llms_txt`: create `llms.txt`
- `generate_llms_full_txt`: create `llms-full.txt`
- `generate_individual_md`: create individual `.md` files
- `include`: include only selected routes/globs (empty = all)
- `exclude`: exclude routes/globs

**Include / Exclude patterns:**

`include` overrides `exclude` — use `exclude` to remove broad sections, then `include` to add back specific pages.

| Pattern    | Matches                                          |
| ---------- | ------------------------------------------------ |
| `/blog`    | exact `/blog`                                    |
| `/blog/`   | `/blog` and everything under it                  |
| `/blog/*`  | one segment under `/blog/` (e.g. `/blog/post-1`) |
| `/blog/**` | any depth under `/blog/`                         |

Exclude all blog pages, then add back only single posts:

```json
"llms": {
  "exclude": ["/blog/"],
  "include": ["/blog/*"]
}
```

Exclude everything, then whitelist only authors and blog singles:

```json
"llms": {
  "exclude": ["/"],
  "include": ["/authors", "/authors/*", "/blog/*"]
}
```

### 👉 Build and Run With Docker

```bash
docker build -t nextplate .
docker run -p 3000:3000 nextplate
```

<!-- reporting issue -->

## 🐞 Reporting Issues

We use GitHub Issues as the official bug tracker for this Template. Please Search [existing issues](https://github.com/zeon-studio/nextplate/issues). It’s possible someone has already reported the same problem.
If your problem or idea has not been addressed yet, feel free to [open a new issue](https://github.com/zeon-studio/nextplate/issues).

<!-- licence -->

## 📝 License

Copyright (c) 2023 - Present, Designed & Developed by [Zeon Studio](https://zeon.studio/)

**Code License:** Released under the [MIT](https://github.comzeon-studio/nextplate/blob/main/LICENSE) license.

**Image license:** The images are only for demonstration purposes. They have their license, we don't have permission to share those images.

## 💻 Need Custom Development Services?

If you need a custom theme, theme customization, or complete website development services from scratch you can [Hire Us](https://zeon.studio/).
