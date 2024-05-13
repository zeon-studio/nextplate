import BlogCard from "@/components/BlogCard";
import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { getActiveLanguages, getLanguageObj } from "@/lib/languageParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import path from "path";

const { blog_folder } = config.settings;

const CategorySingle = ({
  params,
}: {
  params: { single: string; lang: string };
}) => {
  const language = getLanguageObj("en");
  const posts: Post[] = getSinglePage(
    path.join(language.contentDir, blog_folder),
  );
  const filterByCategories = taxonomyFilter(posts, "categories", params.single);
  const sortedPosts = sortByDate(filterByCategories);

  return (
    <>
      <SeoMeta title={humanize(params.single)} />
      <PageHeader title={humanize(params.single)} />
      <div className="section-sm pb-0">
        <div className="container">
          <div className="row">
            {sortedPosts.map((post: Post, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <BlogCard lang={params.lang} data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySingle;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const slugs = getActiveLanguages().map((language) => {
    const categories = getTaxonomy(
      path.join(language.contentDir, blog_folder),
      "categories",
    );

    return categories.map((category) => {
      return {
        single: category,
        lang: language.languageCode,
      };
    });
  });

  return slugs.flat();
};
