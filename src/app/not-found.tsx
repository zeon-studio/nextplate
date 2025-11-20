import { getI18n } from "@/locales/server";
import SeoMeta from "@/partials/SeoMeta";
import "@/styles/main.css";
import Link from "next/link";

const NotFound = async () => {
  const t = await getI18n();
  return (
    <>
      <SeoMeta title={t("page_not_found")} />
      <section className="section-sm text-center">
        <div className="container">
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-6">
              <span className="text-[8rem] block font-bold text-text-dark dark:text-darkmode-text-dark">
                404
              </span>
              <h1 className="h2 mb-4">{t("page_not_found")}</h1>
              <div className="content">
                <p>{t("page_not_found_content")}</p>
              </div>
              <Link href="/" className="btn btn-primary mt-8">
                {t("back_to_home")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
