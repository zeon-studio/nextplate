import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getI18n } from "@/locales/server";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { PageParams, RegularPage } from "@/types";
import { setStaticParamsLocale } from "next-international/server";

const Contact = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params;
  setStaticParamsLocale(params.locale as string);
  const data: RegularPage = await getListPage("contact/_index.md");
  const { frontmatter } = data;
  const { title, description, meta_title, image } = frontmatter;
  const { contact_form_action } = config.params;
  const t = await getI18n();
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <form action={contact_form_action} method="POST">
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    {t("full_name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    {t("mail")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="john.doe@email.com"
                    type="email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    {t("message")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    placeholder={t("message_placeholder")}
                    rows={8}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  {t("submit")}
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
