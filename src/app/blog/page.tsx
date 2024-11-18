import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import PostSidebar from "@/partials/PostSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
const { blog_folder, pagination } = config.settings;

// for all regular pages
const Posts = () => {
  const postIndex: Post = getListPage(`${blog_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(blog_folder);
  const allCategories = getAllTaxonomy(blog_folder, "categories");
  const categories = getTaxonomy(blog_folder, "categories");
  const tags = getTaxonomy(blog_folder, "tags");
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

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
                    <BlogCard data={post} />
                  </div>
                ))}
              </div>
              <Pagination
                section={blog_folder}
                currentPage={1}
                totalPages={totalPages}
              />
            </div>

            <PostSidebar
              categories={categories}
              tags={tags}
              allCategories={allCategories}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;
