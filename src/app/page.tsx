import { ReactElement } from "react";
import ImageFallback from "@/components/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature, Testimonial } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";
import MyCarousel from "./custom-carousel";
import { RegularPage } from "@/types";
import config from "@/config/config.json";
import Contact from "./contact/page";

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
  type ValueProposition = {
    "delivery-services": ReactElement;
    "market-offering": ReactElement;
    [key: string]: ReactElement | undefined;
  };

  const valueProposition: ValueProposition = {
    "delivery-services": (
      <div className="row" style={{ marginTop: 100 }}>
        <div>
          <h3 className="text-black-600 mb-4">Why Choose Us?</h3>
          <h4 className="mb-2 text-blue-600">Authenticity</h4>
          <ul>
            <li className="text-lg">
              Our products are a true reflection of Surat&apos;s rich textile
              heritage.
            </li>
          </ul>
          <br />
          <h4 className="mb-2 text-blue-600">Versatility</h4>
          <ul>
            <li className="text-lg">
              With a wide range of designs, our unstitched materials cater to
              diverse tastes and occasions.
            </li>
          </ul>{" "}
          <br />
          <h4 className="mb-2 text-blue-600">Affordability</h4>
          <ul>
            <li className="text-lg">
              We believe in offering premium quality at prices that are
              accessible to all.
            </li>
          </ul>
        </div>
      </div>
    ),
    "market-offering": (
      <div className="row" style={{ marginTop: 100 }}>
        <div>
          <h3 className="mb-4 text-blue-600">Vision</h3>
          <h4 className="mb-2 text-blue-600">
            An Easy and Trustworthy Button:
          </h4>
          <ul>
            <li className="text-lg">
              To be the leading choice for traditional unstitched dress
              materials, recognized for our commitment to quality, authenticity,
              and innovation. We envision a world where every individual feels
              connected to their roots while embracing the future, one outfit at
              a time.
            </li>
          </ul>
        </div>
      </div>
    ),
  };

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
              <h2 className="text-black-600 mb-4">Mission 🚀</h2>
              <h4 className="mb-2">
                At Novelty Creations, we celebrate the rich tapestry of
                traditional fashion by offering premium unstitched dress
                materials that empower our customers to express their
                individuality. Rooted in the heart of Surat, our commitment is
                to preserve the essence of our heritage while infusing it with
                contemporary style. &quot;
                <span className="text-blue-600">Traditional. Creations.</span>
                &quot;
              </h4>
            </div>
            <br />
            <br />
            <br />
            <div className="mt-10 text-center md:col-12 md:order-1">
              <h2 className="text-black-600 mb-4">Vision 🎯</h2>
              <h4 className="mb-2">
                To be the leading choice for traditional unstitched dress
                materials, recognized for our commitment to quality,
                authenticity, and innovation. We envision a world where every
                individual feels connected to their roots while embracing the
                future, one outfit at a time. &quot;
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section
        id="our-story"
        className={`section-sm bg-gradient bg-theme-light`}
      >
        <div className="container">
          <div className="row items-center justify-between">
            <div className={`md:col-7 lg:col-6 `}>
              <h2 className="text-black-600 mb-4">Our Story</h2>
              <h4 className="mb-8">
                Surat, a city known for its vibrant textile industry, is where
                our journey began. Novelty Creations was born out of a passion
                for traditional fashion and a desire to bring it to the modern
                world.
                <br />
                <br />
                Our unstitched dress materials are more than just fabrics; they
                are a canvas for our customers to weave their stories, to create
                outfits that resonate with their identity. Join us in this
                journey of tradition, elegance, and innovation.
              </h4>
            </div>
            <div className={`mb:md-0 mb-6 md:col-5`}>
              <ImageFallback
                src="/images/mission.svg"
                height={480}
                width={520}
                alt="mission"
              />
            </div>
          </div>
        </div>
      </section>
      {features?.map((feature, index: number) => (
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
            {valueProposition[feature.id as keyof typeof valueProposition]}
          </div>
        </section>
      ))}
      {/* <div className="container">
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
      </div> */}
      <section id="about" className="bg-theme-light">
        {aboutFeatures
          ?.filter((feature) => !feature.title.includes("in a Name"))
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
      <Contact />
    </>
  );
};

export default Home;
