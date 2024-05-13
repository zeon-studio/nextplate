import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
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
type StaticParams = () => { single: string; lang: string }[];

const TagSingle = ({
  params,
}: {
  params: { single: string; lang: string };
}) => {
  const language = getLanguageObj(params.lang);
  const posts: Post[] = getSinglePage(
    path.join(language.contentDir, blog_folder),
  );
  const filterByTags = taxonomyFilter(posts, "tags", params.single);
  const sortedPosts = sortByDate(filterByTags);

  return (
    <>
      <SeoMeta title={humanize(params.single)} />
      <PageHeader title={humanize(params.single)}>
        <Breadcrumbs lang={params.lang} />
      </PageHeader>
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

export default TagSingle;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {
  const slugs = getActiveLanguages().map((language) => {
    const tags = getTaxonomy(
      path.join(language.contentDir, blog_folder),
      "tags",
    );
    return tags.map((tag) => ({
      single: tag,
      lang: language.languageCode,
    }));
  });

  return slugs.flat();
};
