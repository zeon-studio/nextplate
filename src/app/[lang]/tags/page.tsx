import config from "@/config/config.json";
import languageList from "@/config/language.json";
import { getLanguages } from "@/i18n/dictionary";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import path from "path";

const languages = languageList.languages;

const tags = ({ params }: { params: { lang: string } }) => {
  const { blog_folder } = config.settings;
  const language = getLanguages(params.lang);
  const tags = getTaxonomy(path.join(language.contentDir, blog_folder), "tags");
  const alltags = getAllTaxonomy(
    path.join(language.contentDir, blog_folder),
    "tags",
  );

  return (
    <>
      <SeoMeta title={"Tags"} />
      <PageHeader title={"Tags"} />
      <section className="section">
        <div className="container text-center">
          <ul>
            {tags.map((tag: string) => {
              const count: number = alltags.filter(
                (c: string) => c === tag,
              ).length;
              return (
                <li className="m-3 inline-block" key={tag}>
                  <Link
                    href={`/${params.lang}/tags/${tag}`}
                    className="block rounded bg-theme-light px-4 py-2 text-xl text-dark dark:bg-darkmode-theme-light dark:text-darkmode-dark"
                  >
                    {humanize(tag)}
                    <span className="ml-2 rounded bg-body px-2 dark:bg-darkmode-body">
                      {count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default tags;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return languages.map((language) => ({
    lang: language.languageCode,
  }));
}
