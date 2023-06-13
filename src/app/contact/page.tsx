import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import { markdownify } from "@/lib/utils/textConverter";

const Contact = async () => {
  const data: RegularPage = getListPage("pages/contact.md");
  const { frontmatter } = data;
  const { title, description } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <PageHeader title={title} />
      <section className="section-sm">
        <div className="container">
          <h4
            className="pb-20 text-center"
            dangerouslySetInnerHTML={markdownify(description || "")}
          ></h4>
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <form action={contact_form_action} method="POST">
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    className="form-input"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="mail" className="form-label">
                    Email id <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mail"
                    className="form-input"
                    placeholder="john.doe@email.com"
                    type="email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="company" className="form-label">
                    Company
                  </label>
                  <input
                    id="company"
                    className="form-input"
                    placeholder="eg: Tesla"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-input"
                    placeholder="Message goes here..."
                    id="message"
                    rows={8}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send
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
