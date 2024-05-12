import BlogCard from "@/components/BlogCard";
import config from "@/config/config.json";
import languageList from "@/config/language.json";
import { getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import path from "path";

const { blog_folder } = config.settings;
const languages = languageList.languages;
type StaticParams = () => { single: string; lang: string }[];

const TagSingle = ({
  params,
}: {
  params: { single: string; lang: string };
}) => {
  const lang = params.lang;
  const language = languages.find(
    (language) => language.languageCode === lang,
  )!;
  const posts: Post[] = getSinglePage(
    path.join(language.contentDir, blog_folder),
  );
  const filterByTags = taxonomyFilter(posts, "tags", params.single);
  const sortedPosts = sortByDate(filterByTags);

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

export default TagSingle;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {
  const slugs = languages.map((language) => {
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
