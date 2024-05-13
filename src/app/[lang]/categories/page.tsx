import Breadcrumbs from "@/components/Breadcrumbs";
import config from "@/config/config.json";
import {
  getActiveLanguages,
  getLanguageObj,
  getTranslations,
} from "@/lib/languageParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { slugSelector } from "@/lib/utils/slugSelector";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import path from "path";

const Categories = async ({ params }: { params: { lang: string } }) => {
  const { blog_folder } = config.settings;
  const language = getLanguageObj(params.lang);
  const categories = getTaxonomy(
    path.join(language.contentDir, blog_folder),
    "categories",
  );
  const allCategories = getAllTaxonomy(
    path.join(language.contentDir, blog_folder),
    "categories",
  );

  const { categories: categoryTitle } = await getTranslations(params.lang);

  return (
    <>
      <SeoMeta title={categoryTitle} />
      <PageHeader title={categoryTitle}>
        <Breadcrumbs lang={params.lang} />
      </PageHeader>
      <section className="section">
        <div className="container text-center">
          <ul>
            {categories.map((category: string) => {
              const count = allCategories.filter(
                (c: string) => c === category,
              ).length;
              return (
                <li className="m-3 inline-block" key={category}>
                  <Link
                    href={slugSelector(params.lang, `/categories/${category}`)}
                    className="block rounded bg-theme-light px-4 py-2 text-xl text-dark dark:bg-darkmode-theme-light dark:text-darkmode-dark"
                  >
                    {humanize(category)}{" "}
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

export default Categories;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}
