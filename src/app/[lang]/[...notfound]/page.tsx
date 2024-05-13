import { getDictionary } from "@/lib/utils/languageParser";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

export default async function NotFound({
  params,
}: {
  params: { lang: string };
}) {
  const { pageNotFound, pageNotFoundContent, backToHome } = await getDictionary(
    params.lang,
  );
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
              <h1 className="h2 mb-4">{pageNotFound}</h1>
              <div className="content">
                <p>{pageNotFoundContent}</p>
              </div>
              <Link href="/" className="btn btn-primary mt-8">
                {backToHome}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
