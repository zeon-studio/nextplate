import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

const contentPath = "src/content";

// Helper function to read file content
const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
};

// Helper function to parse frontmatter
const parseFrontmatter = (frontmatter: any) => {
  const frontmatterString = JSON.stringify(frontmatter);
  return JSON.parse(frontmatterString);
};

// get list page data, ex: _index.md
export const getListPage = (filePath: string) => {
  const pageDataPath = path.join(contentPath, filePath);

  if (!fs.existsSync(pageDataPath)) {
    notFound();
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);
  const parsedFrontmatter = parseFrontmatter(frontmatter);

  const buildDrafts = process.argv.includes("--buildDrafts") || process.env.BUILD_DRAFTS === "true";
  if (!buildDrafts && parsedFrontmatter.draft) {
    notFound();
  }

  return {
    frontmatter: parsedFrontmatter,
    content,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePage = (folder: string) => {
  const folderPath = path.join(contentPath, folder);

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    notFound();
  }

  const filesPath = fs.readdirSync(folderPath);
  const sanitizeFiles = filesPath.filter((file) => file.endsWith(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/),
  );

  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(folderPath, filename);
    const pageData = readFile(filePath);
    const { content, data: frontmatter } = matter(pageData);
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

    return {
      frontmatter: parseFrontmatter(frontmatter),
      slug: url,
      content,
    };
  });

  const buildDrafts = process.argv.includes("--buildDrafts") || process.env.BUILD_DRAFTS === "true";
  const buildFuture = process.argv.includes("--buildFuture") || process.env.BUILD_FUTURE === "true";
  const now = new Date();

  const publishedPages = singlePages.filter(
    (page) => (buildDrafts || !page.frontmatter.draft) && page,
  );
  const filterByDate = publishedPages.filter(
    (page) => buildFuture || new Date(page.frontmatter.date || new Date()) <= now,
  );

  return filterByDate;
};
