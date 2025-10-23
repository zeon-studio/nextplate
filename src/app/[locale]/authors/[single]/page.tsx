import BlogCard from "@/components/BlogCard";
import Social from "@/components/Social";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Author, PageParams, Post } from "@/types";
import { setStaticParamsLocale } from "next-international/server";
import { notFound } from "next/navigation";

// remove dynamicParams
export const dynamicParams = false;

export default async function AuthorSingle(props: {
  params: Promise<PageParams>;
}) {
  const params = await props.params;
  setStaticParamsLocale(params.locale as string);

  const authors: Author[] = await getSinglePage("authors");
  const author = authors.filter((page) => page.slug === params.single)[0];
  // If author for current locale not found, return 404
  if (!author) return notFound();

  const { frontmatter, content } = author;
  const { title, social, meta_title, description, image } = frontmatter;
  const { blog_folder } = config.settings;
  const posts: Post[] = await getSinglePage(blog_folder);
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
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// generate static params
export const generateStaticParams: () => Promise<
  { single: string }[]
> = async () => {
  const authors: Author[] = await getSinglePage("authors", true);
  const paths = authors.map((author) => ({
    single: author.slug!,
  }));

  return paths;
};
