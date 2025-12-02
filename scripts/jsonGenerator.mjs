import fs from "fs";
import matter from "gray-matter";
import path from "path";
const configPath = path.join(process.cwd(), "src", "config", "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const CONTENT_DEPTH = 2;
const JSON_FOLDER = "./.json";
const SEARCHABLE_FOLDERS = config.settings.searchable_folders;

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
        frontmatter: {
          title: data.title || "",
          description: data.description || "",
          categories: data.categories || [],
          tags: data.tags || [],
        },
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

  // create json files
  const jsonFiles = {};
  SEARCHABLE_FOLDERS.forEach((key) => {
    jsonFiles[key] = [];
  });

  SEARCHABLE_FOLDERS.forEach((folder) => {
    const folderPosts = getData(`src/content/${folder}`, 2);
    jsonFiles[folder].push(...folderPosts);
  });

  // save each json file
  Object.keys(jsonFiles).forEach((key) => {
    fs.writeFileSync(
      `${JSON_FOLDER}/${key}.json`,
      JSON.stringify(jsonFiles[key]),
    );
  });

  // merger json files for search
  const search = [];
  Object.keys(jsonFiles).forEach((key) => {
    search.push(...jsonFiles[key]);
  });

  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));
} catch (err) {
  console.error(err);
}
