import AuthorCard from "@/components/AuthorCard";
import languageList from "@/config/language.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Author } from "@/types";
import path from "path";

const languages = languageList.languages;

const Authors = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang;
  const language = languages.find(
    (language) => language.languageCode === lang,
  )!;
  const authorIndex: Author = getListPage(
    path.join(language.contentDir, "authors/_index.md"),
  );
  const authors: Author[] = getSinglePage(
    path.join(language.contentDir, "authors"),
  );
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
                <AuthorCard data={author} lang={lang} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Authors;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return languages.map((language) => ({
    lang: language.languageCode,
  }));
}
