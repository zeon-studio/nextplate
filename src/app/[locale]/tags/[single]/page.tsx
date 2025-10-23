import BlogCard from "@/components/BlogCard";
import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { PageParams, Post } from "@/types";
import { setStaticParamsLocale } from "next-international/server";

const { blog_folder } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = async (): Promise<{ single: string }[]> => {
  const tags = await getTaxonomy(blog_folder, "tags", true);

  const paths = tags.map((tag) => ({
    single: tag,
  }));

  return paths;
};

const TagSingle = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params;
  setStaticParamsLocale(params.locale as string);
  const posts: Post[] = await getSinglePage(blog_folder);
  const filterByTags = taxonomyFilter(posts, "tags", params.single);
  const sortedPosts = sortByDate(filterByTags);

  return (
    <>
      <SeoMeta title={humanize(params.single as string)} />
      <PageHeader title={humanize(params.single as string)} />
      <div className="section-sm pb-0">
        <div className="container">
          <div className="row">
            {sortedPosts.map((post: Post, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TagSingle;
