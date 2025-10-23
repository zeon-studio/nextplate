import AuthorCard from "@/components/AuthorCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getStaticParams } from "@/locales/server";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Author, PageParams } from "@/types";
import { setStaticParamsLocale } from "next-international/server";

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params;
  setStaticParamsLocale(params.locale as string);
  const authorIndex: Author = await getListPage("authors/_index.md");
  const authors: Author[] = await getSinglePage("authors");
  const { title, meta_title, description, image } = authorIndex.frontmatter;
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center">
            {authors.map((author: Author, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <AuthorCard data={author} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

export function generateStaticParams() {
  return getStaticParams();
}
