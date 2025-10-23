import config from "@/config/config.json";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { humanize } from "@/lib/utils/textConverter";
import { getI18n } from "@/locales/server";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { PageParams } from "@/types";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";

const Categories = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params;
  setStaticParamsLocale(params.locale as string);
  const { blog_folder } = config.settings;
  const categories = await getTaxonomy(blog_folder, "categories");
  const allCategories = await getAllTaxonomy(blog_folder, "categories");
  const t = await getI18n();

  return (
    <>
      <SeoMeta title={t("categories")} />
      <PageHeader title={t("categories")} />
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
                    href={`/categories/${category}`}
                    className="block rounded bg-light px-4 py-2 text-xl text-text-dark dark:bg-darkmode-light dark:text-darkmode-text-dark"
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
