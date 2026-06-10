# Adding New Pages

This skill explains how to add new pages utilizing the Next.js App Router paradigm combined with this template's custom Markdown architecture.

## How Routing Works

This project uses the Next.js **App Router** (`src/app/`).
There are two main ways to add a page, depending on whether the content is static/dynamic code or markdown-driven.

### Method 1: Adding a Markdown-Driven Page (Recommended)

If the page is mainly text and images (like an "About" or "Privacy Policy" page):

**Important for AI Agents:** Check which folder represents standard standalone pages (often `src/content/pages/` or similar) before creating the file.

1. **Create the Content File**: Create a new markdown file in `src/content/pages/` (e.g., `src/content/pages/my-new-page.md`).
2. **Add Frontmatter**:
   ```yaml
   ---
   title: "My New Page"
   meta_title: "SEO Title Here"
   description: "Description of the new page"
   draft: false
   ---
   Your markdown content goes here.
   ```
3. **How it renders**: The file `src/app/[regular]/page.tsx` acts as a catch-all route. It automatically detects the slug (e.g., `/my-new-page`), looks for it in `src/content/`, parses it using `next-mdx-remote` or `marked`, and renders it using a default page layout.

### Method 2: Adding a Code-Driven Page (App Router)

If the page requires custom React components, complex layouts, or API data fetching:

1. **Create the Route Directory**: Create a folder in `src/app/` (e.g., `src/app/my-custom-page/`).
2. **Create the `page.tsx` file**:
   ```tsx
   import SeoMeta from "@/partials/SeoMeta";

   export const metadata = {
     title: "My Custom Page",
     description: "Custom description",
   };

   export default function MyCustomPage() {
     return (
       <>
         <SeoMeta title="My Custom Page" />
         <section className="section">
           <div className="container">
             <h1 className="text-h2">My Custom Page</h1>
             <p>Custom React code goes here.</p>
           </div>
         </section>
       </>
     );
   }
   ```
3. **Add to Navigation**: To make the page visible in the header, edit `src/config/menu.json` and add an object to the `main` array:
   ```json
   {
     "name": "My Custom Page",
     "url": "/my-custom-page"
   }
   ```

## Common Mistakes / What NOT to do

- **DO NOT** create a `pages/` directory at the root. This project strictly uses the `app/` router.
- **DO NOT** forget to add `<SeoMeta />` or `export const metadata = {}` when creating a code-driven page. Without it, the page will lack proper SEO tags.
- **DO NOT** manually create routes in `src/app/` for markdown files that are already handled by the `[regular]` catch-all route, as this will cause route conflicts.
