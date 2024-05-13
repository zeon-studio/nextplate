import {
  getActiveLanguages,
  getDefaultLanguage,
  getTranslations,
} from "@/lib/languageParser";
import { slugSelector } from "@/lib/utils/slugSelector";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

export default async function NotFound({
  params,
}: {
  params: { lang: string };
}) {
  console.log({ params });
  const defaultLang = getDefaultLanguage();
  const { page_not_found, page_not_found_content, back_to_home } =
    await getTranslations(params.lang || defaultLang);

  return (
    <>
      <SeoMeta title={"Page Not Found"} />
      <section className="section-sm text-center">
        <div className="container">
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-6">
              <span className="text-[8rem] block font-bold text-dark dark:text-darkmode-dark">
                404
              </span>
              <h1 className="h2 mb-4">{page_not_found}</h1>
              <div className="content">
                <p>{page_not_found_content}</p>
              </div>
              <Link
                href={slugSelector(params.lang, "/")}
                className="btn btn-primary mt-8"
              >
                {back_to_home}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}
