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

  return {
    frontmatter: parseFrontmatter(frontmatter),
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

  const publishedPages = singlePages.filter(
    (page) => !page.frontmatter.draft && page,
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date(),
  );

  return filterByDate;
};
