"server only";

import config from "@/config/config.json";
import { getCurrentLocale } from "@/locales/server";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";
const contentPath = "src/content";

const localeConfig = config.internationalization;
// Helper function to read file content
const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
};

// Helper function to parse frontmatter
const parseFrontmatter = (frontmatter: any) => {
  const frontmatterString = JSON.stringify(frontmatter);
  return JSON.parse(frontmatterString);
};

export const getListPage = async (filePath: string, locale?: string) => {
  const currentLocale = await getCurrentLocale();
  const finalLocale = locale || currentLocale;
  let pageDataPath = path.join(contentPath, finalLocale, filePath);

  // Fallback to default locale if file doesn't exist in current locale
  if (!fs.existsSync(pageDataPath)) {
    if (localeConfig.enablePageLocaleFallback) {
      pageDataPath = path.join(
        contentPath,
        localeConfig.defaultLocale,
        filePath,
      );
    }
  }

  if (!fs.existsSync(pageDataPath)) {
    notFound();
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);
  const parsedFrontmatter = parseFrontmatter(frontmatter);

  if (parsedFrontmatter.draft) {
    notFound();
  }

  return {
    frontmatter: parsedFrontmatter,
    content,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePage = async (
  folder: string,
  disableCurrentLocale = false,
) => {
  const currentLocale = disableCurrentLocale
    ? localeConfig.defaultLocale
    : await getCurrentLocale();
  const folderPath = path.join(contentPath, currentLocale, folder);

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    notFound();
  }

  const filesPath = fs.readdirSync(folderPath);
  const sanitizeFiles = filesPath.filter((file) => file.endsWith(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/),
  );

  // TODO: Handle fallback to default locale if no files found in current locale
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
