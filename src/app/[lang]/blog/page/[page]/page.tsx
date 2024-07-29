import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getActiveLanguages, getLanguageObj } from "@/lib/languageParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import PostSidebar from "@/partials/PostSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import path from "path";

const { blog_folder, pagination } = config.settings;

// for all regular pages
const Posts = ({ params }: { params: { page: number; lang: string } }) => {
  const language = getLanguageObj(params.lang);
  const postIndex: Post = getListPage(
    path.join(language.contentDir, `${blog_folder}/_index.md`),
  );
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(
    path.join(language.contentDir, blog_folder),
  );
  const allCategories = getAllTaxonomy(
    path.join(language.contentDir, blog_folder),
    "categories",
  );
  const categories = getTaxonomy(
    path.join(language.contentDir, blog_folder),
    "categories",
  );
  const tags = getTaxonomy(path.join(language.contentDir, blog_folder), "tags");
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={postIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            <div className="lg:col-8">
              <div className="row">
                {currentPosts.map((post: any, index: number) => (
                  <div key={index} className="mb-14 md:col-6">
                    <BlogCard data={post} lang={params.lang} />
                  </div>
                ))}
              </div>
              <Pagination
                lang={params.lang}
                section={blog_folder}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>

            <PostSidebar
              categories={categories}
              tags={tags}
              allCategories={allCategories}
              lang={params.lang}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const slugs = getActiveLanguages().map((lang) => {
    const allPost: Post[] = getSinglePage(
      path.join(lang.contentDir, blog_folder),
    );
    const totalPages = Math.ceil(allPost.length / pagination);
    const paths = [...Array(totalPages)].map((_, i) => ({
      page: (i + 1).toString(),
      lang: lang.languageCode,
    }));
    return paths;
  });

  return slugs.flat();
};
