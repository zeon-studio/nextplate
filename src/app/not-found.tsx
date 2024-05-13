import { getDefaultLanguage, getTranslations } from "@/lib/languageParser";
import Header from "@/partials/Header";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

const NotFound = async ({ params }: { params: { lang: string } }) => {
  console.log({ params });
  const defaultLang = getDefaultLanguage();
  const { page_not_found, page_not_found_content, back_to_home } =
    await getTranslations(params.lang || defaultLang);
  return (
    <>
      <SeoMeta title={"Page Not Found"} />
      <Header lang="en" menu={{ main: [] }} />
      <section className="section-sm text-center">
        <div className="container">
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-6">
              <span className="text-[8rem] block font-bold text-dark dark:text-darkmode-dark">
                404
              </span>
              <h1 className="h2 mb-4">Page not found</h1>
              <div className="content">
                <p>
                  The page you are looking for might have been removed, had its
                  name changed, or is temporarily unavailable.
                </p>
              </div>
              <Link href="/" className="btn btn-primary mt-8">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
