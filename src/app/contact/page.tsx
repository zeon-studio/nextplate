import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

const Contact = async () => {
  const data: RegularPage = getListPage("contact/_index.md");
  const { frontmatter } = data;
  const { title, description, meta_title, image } = frontmatter;
  const { contact_form_action } = config.params;

  // To make contact info. card
  // https://flowbite.com/docs/components/card/

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
              <div className="flex items-center col-9 pb-6">
                <div className="flex-grow border-t border-light-green"></div>
                <span className="mx-4 text-dark-green text-xl tracking-widest">
                  Let's Connect
                </span>
                <div className="flex-grow border-t border-light-green"></div>
              </div>
              <form action={contact_form_action} method="POST">
                <div className="flex flex-wrap -mx-6">
                  <div className="w-full md:w-1/2 px-1 mb-6">
                    <label htmlFor="fname" className="form-label">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fname"
                      name="fname"
                      className="form-input bg-light-grey placeholder-dark-grey w-full"
                      placeholder="First Name"
                      type="text"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 mb-6">
                    <label htmlFor="lname" className="form-label">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lname"
                      name="lname"
                      className="form-input bg-light-grey placeholder-dark-grey w-full"
                      placeholder="Last Name"
                      type="text"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 mb-6">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="form-input bg-light-grey placeholder-dark-grey w-full"
                      placeholder="john.doe@email.com"
                      type="email"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 mb-6">
                    <label htmlFor="interest" className="form-label">
                      Area of Interest <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="interest"
                      name="interest"
                      className="form-input bg-light-grey placeholder-dark-grey w-full"
                      placeholder="I am interested in..."
                    />
                  </div>
                  <div className="w-full px-1 mb-6">
                    <label htmlFor="message" className="form-label">
                      Anything else? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input bg-light-grey placeholder-dark-grey w-full"
                      placeholder="Message goes here..."
                      rows={8}
                    ></textarea>
                  </div>
                  <div className="px-1">
                    <button type="submit" className="btn btn-primary w-full">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
