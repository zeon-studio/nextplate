import ImageFallback from "@/components/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature, Testimonial } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";
import MyCarousel from "./custom-carousel";
import { RegularPage } from "@/types";
import config from "@/config/config.json";

const Home = () => {
  const homepage = getListPage("_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
    testimonials,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
    testimonials: Testimonial[];
  } = frontmatter;
  // ABOUT PAGE

  const aboutPage = getListPage("pages/about.md");
  const { frontmatter: aboutFrontMatter } = aboutPage;
  const {
    features: aboutFeatures,
  }: {
    features: Feature[];
  } = aboutFrontMatter;

  // CONTACT PAGE

  const data: RegularPage = getListPage("pages/contact.md");
  const { frontmatter: contactMatter } = data;
  const { title: contactTitle, description: contactDescription } =
    contactMatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <section className={`section hero-section relative flex`}>
        <MyCarousel />
      </section>
      <section id="mission">
        <div className="bg-white px-4 py-16 xl:p-20">
          <div className="row items-center justify-between">
            <div className="text-center md:col-12 md:order-1">
              <h2 className="mb-4 text-blue-600">Mission 🚀</h2>
              <h3 className="mb-2">
                We make your journey to scale, globalize and drive sustainable
                growth Easy, Effective and Delightful.
              </h3>
            </div>
          </div>
        </div>
      </section>
      {features.map((feature, index: number) => (
        <section
          id={feature.id || "section" + index}
          key={index}
          className={`section-sm bg-theme-light ${
            index === 0 && "bg-gradient"
          }`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4 text-blue-600"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}
      <div className="container">
        <div className="row items-center justify-between">
          <div className={`mb:md-0 mb-6 md:col-12`}>
            <Testimonials
              data={{
                frontmatter: {
                  testimonials: testimonials,
                  title: "Our Value Proposition",
                  description: "some desc",
                },
              }}
            />
          </div>
        </div>
      </div>
      <section id="about" className="bg-theme-light">
        {aboutFeatures
          .filter((feature) => !feature.title.includes("in a Name"))
          .map((feature, index: number) => (
            <section
              key={index}
              className={`section-sm ${feature.backgroundclass}`}
            >
              <div className="container">
                <div className="row items-center justify-between">
                  <div
                    className={`mb:md-0 mb-6 lg:col-${
                      12 - feature.contentwidth
                    } ${index % 2 !== 0 && "md:order-2"} `}
                  >
                    <ImageFallback
                      width={500}
                      height={400}
                      src={feature.image}
                      alt={feature.title}
                      style={{ borderRadius: "10px", width: "75%" }}
                    />
                  </div>
                  <div
                    className={`lg:col-${feature.contentwidth} ${
                      index % 2 !== 0 && "md:order-1"
                    }`}
                  >
                    <h2
                      className="mb-4 text-blue-600"
                      dangerouslySetInnerHTML={markdownify(feature.title)}
                    />
                    <p
                      className="mb-8 text-lg"
                      dangerouslySetInnerHTML={markdownify(feature.content)}
                    />
                    <ul>
                      {feature.bulletpoints?.map((bullet: string) => (
                        <li className="relative mb-4 pl-6" key={bullet}>
                          <FaCheck className={"absolute left-0 top-1.5"} />
                          <span dangerouslySetInnerHTML={markdownify(bullet)} />
                        </li>
                      ))}
                    </ul>
                    {feature.button?.enable && (
                      <a
                        className="btn btn-primary mt-5"
                        href={feature.button.link}
                      >
                        {feature.button.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
      </section>
      <section id="contact" className="section-sm">
        <div className="container">
          <h2 className="mb-4 text-center text-blue-600">Contact</h2>
          <h4
            className="pb-20 text-center"
            style={{ fontWeight: 100 }}
            dangerouslySetInnerHTML={markdownify(contactDescription || "")}
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

export default Home;
