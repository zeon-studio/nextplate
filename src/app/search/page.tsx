import config from "@/config/config.json";
import Search from "@/layouts/Search";
import { getSinglePage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";

const { blog_folder } = config.settings;

// Retrieve all articles
const posts = getSinglePage(blog_folder);

// List of items to search in
const searchList = posts.map((item) => ({
  slug: item.slug,
  frontmatter: item.frontmatter,
  content: item.content,
}));

const SearchPage = () => {
  return (
    <>
      <SeoMeta title={"Search"} />
      <Search searchList={searchList} />
    </>
  );
};

export default SearchPage;
