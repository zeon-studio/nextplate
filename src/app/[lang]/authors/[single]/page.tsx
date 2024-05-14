import BlogCard from "@/components/BlogCard";
import Social from "@/components/Social";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import { getActiveLanguages, getLanguageObj } from "@/lib/languageParser";
import { slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Author, Post } from "@/types";
import path from "path";

const AuthorSingle = ({
  params,
}: {
  params: { single: string; lang: string };
}) => {
  const language = getLanguageObj(params.lang);
  const authors: Author[] = getSinglePage(
    path.join(language.contentDir, "authors"),
  );
  const author = authors.filter((page) => page.slug === params.single)[0];
  const { frontmatter, content } = author;
  const { title, social, meta_title, description, image } = frontmatter;
  const { blog_folder } = config.settings;
  const posts: Post[] = getSinglePage(
    path.join(language.contentDir, blog_folder),
  );
  const postFilterByAuthor: Post[] = posts.filter(
    (post) => slugify(post.frontmatter.author) === slugify(title),
  );

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center border-b border-border pb-14 dark:border-darkmode-border">
            <div className="text-center lg:col-4">
              {image && (
                <ImageFallback
                  src={image}
                  className="mx-auto mb-10 rounded"
                  height={200}
                  width={200}
                  alt={title}
                />
              )}
              <h1 className="h3 mb-6">{title}</h1>
              <div className="content">
                <MDXContent content={content} />
              </div>
              <Social source={social} className="social-icons" />
            </div>
          </div>

          <div className="row justify-center pb-16 pt-14">
            {postFilterByAuthor.map((post, index: number) => (
              <div className="mb-12 md:col-6 lg:col-4" key={index}>
                <BlogCard lang={params.lang} data={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthorSingle;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => {
  single?: string;
  lang: string;
}[] = () => {
  const slugs = getActiveLanguages().map((language) => {
    const authors: Author[] = getSinglePage(
      path.join(language.contentDir, "authors"),
    );
    return authors.map(({ slug }) => ({
      single: slug,
      lang: language.languageCode,
    }));
  });

  return slugs.flat();
};
