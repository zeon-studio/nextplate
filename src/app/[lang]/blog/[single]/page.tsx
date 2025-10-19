import BlogCard from "@/components/BlogCard";
import Disqus from "@/components/Disqus";
import Share from "@/components/Share";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import {
  getActiveLanguages,
  getLanguageObj,
  getTranslations,
} from "@/lib/languageParser";
import dateFormat from "@/lib/utils/dateFormat";
import similarItems from "@/lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Link from "next/link";
import path from "path";
import { FaRegClock, FaRegFolder, FaRegUserCircle } from "react-icons/fa";

const { blog_folder } = config.settings;

const PostSingle = async (props: {
  params: Promise<{ single: string; lang: string }>;
}) => {
  const params = await props.params;
  const language = getLanguageObj(params.lang);
  const {
    related_post,
    share: shareTitle,
    tags: tagTitle,
  } = await getTranslations(params.lang);
  const posts: Post[] = getSinglePage(
    path.join(language.contentDir, blog_folder),
  );
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const {
    title,
    meta_title,
    description,
    image,
    author,
    categories,
    date,
    tags,
  } = frontmatter;
  const similarPosts = similarItems(post, posts, post.slug!)?.slice(0, 3);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-10">
              {image && (
                <div className="mb-10">
                  <ImageFallback
                    src={image}
                    height={500}
                    width={1200}
                    alt={title}
                    className="w-full rounded"
                  />
                </div>
              )}
              <h1
                dangerouslySetInnerHTML={markdownify(title)}
                className="h2 mb-4"
              />
              <ul className="mb-8">
                <li className="mr-4 inline-block">
                  <Link href={`/authors/${slugify(author)}`}>
                    <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
                    {humanize(author)}
                  </Link>
                </li>
                <li className="mr-4 inline-block">
                  <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
                  {categories?.map((category: string, index: number) => (
                    <Link
                      key={category}
                      href={`/categories/${slugify(category)}`}
                    >
                      {humanize(category)}
                      {index !== categories.length - 1 && ", "}
                    </Link>
                  ))}
                </li>
                {date && (
                  <li className="mr-4 inline-block">
                    <FaRegClock className="-mt-1 mr-2 inline-block" />
                    {dateFormat(date)}
                  </li>
                )}
              </ul>
              <div className="content mb-10">
                <MDXContent content={content} />
              </div>
              <div className="row items-start justify-between">
                <div className="mb-10 flex items-center lg:col-5 lg:mb-0">
                  <h5 className="mr-3">{tagTitle} :</h5>
                  <ul>
                    {tags?.map((tag: string) => (
                      <li key={tag} className="inline-block">
                        <Link
                          className="m-1 block rounded bg-light px-3 py-1 hover:bg-primary hover:text-white dark:bg-darkmode-light dark:hover:bg-darkmode-primary dark:hover:text-text-dark"
                          href={`/tags/${slugify(tag)}`}
                        >
                          {humanize(tag)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center lg:col-4">
                  <h5 className="mr-3">{shareTitle} :</h5>
                  <Share
                    className="social-icons"
                    title={title}
                    description={description}
                    slug={post.slug!}
                  />
                </div>
              </div>
              <Disqus className="mt-20" />
            </article>
          </div>

          {/* <!-- Related posts --> */}
          <div className="section pb-0">
            <h2 className="h3 mb-12 text-center">{related_post}</h2>
            <div className="row justify-center">
              {similarPosts.map((post) => (
                <div key={post.slug} className="lg:col-4 md:col-6 mb-14">
                  <BlogCard lang={params.lang} data={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => {
  single: string;
  lang: string;
}[] = () => {
  const slugs = getActiveLanguages().map((language) => {
    const posts: Post[] = getSinglePage(
      path.join(language.contentDir, blog_folder),
    );
    return posts.map(({ slug }) => ({
      single: slug!,
      lang: language.languageCode,
    }));
  });

  return slugs.flat();
};
