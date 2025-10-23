import fs from "fs";
import matter from "gray-matter";
import path from "path";
const configPath = path.join(process.cwd(), "src", "config", "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const CONTENT_DEPTH = 2;
const JSON_FOLDER = "./.json";
const localeConfig = config.internationalization;

// get data from markdown
const getData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith("_"));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    } else if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
      const file = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join("/")
          .replace(/\.[^/.]+$/, "");
      const group = pathParts[groupDepth];

      return {
        group: group,
        slug: slug,
        frontmatter: data,
        content: content,
      };
    } else {
      return [];
    }
  });

  const publishedPages = getPaths.filter(
    (page) => !page.frontmatter?.draft && page,
  );
  return publishedPages;
};

try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // create json files for each locale
  const allPosts = [];

  localeConfig.locales.forEach((locale) => {
    const posts = getData(`src/content/${locale}/blog`, 2);
    allPosts.push(...posts);

    // optionally save per-locale files
    fs.writeFileSync(
      `${JSON_FOLDER}/posts-${locale}.json`,
      JSON.stringify(posts),
    );
  });

  // save combined posts from all locales
  fs.writeFileSync(`${JSON_FOLDER}/posts.json`, JSON.stringify(allPosts));

  // merger json files for search
  const search = [...allPosts];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));
} catch (err) {
  console.error(err);
}
