import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { PageParams, RegularPage } from "@/types";
import { setStaticParamsLocale } from "next-international/server";
import { notFound } from "next/navigation";

// remove dynamicParams
export const dynamicParams = false;

// for all regular pages
const RegularPages = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params;
  setStaticParamsLocale(params.locale as string);

  const regularData = await getSinglePage("pages");
  const data = regularData.filter(
    (page: RegularPage) => page.slug === params.regular,
  )[0];
  // If data for current locale not found, return 404
  if (!data) return notFound();

  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>
    </>
  );
};

// generate static params
export const generateStaticParams = async () => {
  const getRegularPages = await getSinglePage("pages", true);

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));

  return regularPages;
};

export default RegularPages;
