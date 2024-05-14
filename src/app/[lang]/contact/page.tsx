import Breadcrumbs from "@/components/Breadcrumbs";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import {
  getActiveLanguages,
  getLanguageObj,
  getTranslations,
} from "@/lib/languageParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import path from "path";

const Contact = async ({ params }: { params: { lang: string } }) => {
  const language = getLanguageObj(params.lang);
  const data: RegularPage = getListPage(
    path.join(language.contentDir, "contact/_index.md"),
  );
  const content = await getTranslations(params.lang);
  const { frontmatter } = data;
  const { title, description, meta_title, image } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title}>
        <Breadcrumbs lang={params.lang} />
      </PageHeader>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <form action={contact_form_action} method="POST">
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    {content.full_name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder={content.full_name_placeholder}
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    {content.mail} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder={content.mail.placeholder}
                    type="email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    {content.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    placeholder={content.message_placeholder}
                    rows={8}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  {content.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}
