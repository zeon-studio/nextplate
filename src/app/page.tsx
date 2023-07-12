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
          <h3 className="mb-4 text-blue-600">Our Value Proposition</h3>
          <h4 className="mb-2 text-blue-600">
            An Easy and Trustworthy Button:
          </h4>
          <ul>
            <li className="text-lg">
              A Turnkey Operation with low overheads that gives you a jumpstart
              and speed to globalization. We do the heavy lifting in the
              background and have built a best-in-class approach to the
              necessary infrastructure.
            </li>
          </ul>
          <br />
          <h4 className="mb-2 text-blue-600">Distinctive Value Creation:</h4>
          <ul>
            <li className="text-lg">
              <strong>Accelerate EBITDA:</strong> Opportunity to quickly scale
              your operation with lower cost
            </li>
            <li className="text-lg">
              <strong>Accelerate Time to Market:</strong> Opportunity to shrink
              the delivery time for your solutions
            </li>
            <li className="text-lg">
              <strong>Increase customer stickiness:</strong> A clear opportunity
              to diversify your solution offerings at a lower price point for
              your existing customers
            </li>
            <li className="text-lg">
              <strong>Expand target customers:</strong> Ability to increase your
              target market segments both from a size and geographical market
              perspective
            </li>
            <li className="text-lg">
              <strong>Mitigate Risk:</strong> Build skills and competitive
              differentiation through economic cycles
            </li>
          </ul>{" "}
          <br />
          <h4 className="mb-2 text-blue-600">
            {" "}
            Increasing Value Creation over Time:
          </h4>
          <ul>
            <li className="text-lg">
              This team-based approach is different from a traditional
              consulting-based approach. The value creation increases for you
              because of increased cultural fit, increased knowledge of your
              operations and increased ownership by the team over time.
            </li>
          </ul>
        </div>
      </div>
    ),
    "market-offering": (
      <div className="row" style={{ marginTop: 100 }}>
        <div>
          <h3 className="mb-4 text-blue-600">Our Value Proposition</h3>
          <h4 className="mb-2 text-blue-600">
            An Easy and Trustworthy Button:
          </h4>
          <ul>
            <li className="text-lg">
              A Turnkey Operation with low overheads that gives you a jumpstart
              and speed to globalization. We do the heavy lifting in the
              background and have built a best-in-class approach to the
              necessary infrastructure.
            </li>
          </ul>
          <br />
          <h4 className="mb-2 text-blue-600">Distinctive Value Creation:</h4>
          <ul>
            <li className="text-lg">
              <strong>Accelerate Revenue:</strong> Opportunity through scaling
              your GTM with a data and process centric approach
            </li>
            <li className="text-lg">
              <strong>Increase Customer Success:</strong> A best-in-class and
              proven approach to optimally leverage all the pillars for maximum
              effectiveness
            </li>
            <li className="text-lg">
              <strong>Improve Brand:</strong> A structured approach for mining
              and customer advocacy
            </li>
            <li className="text-lg">
              <strong>Mitigate Risk:</strong> Scale your GTM through a hybrid
              approach with lower costs while maintaining effectiveness through
              economic cycles
            </li>
          </ul>{" "}
          <br />
          <h4 className="mb-2 text-blue-600">
            {" "}
            Increasing Value Creation over Time:
          </h4>
          <ul>
            <li className="text-lg">
              The value creation increases for you because of increased cultural
              fit, increased knowledge of your operations and increased
              ownership by the team over time.
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
              <h2 className="mb-4 text-blue-600">Mission 🚀</h2>
              <h4 className="mb-2">
                H Road partners with fast growing companies to help them scale
                and drive sustainable growth in global markets. Our portfolio of
                people, technology, and services along with our partnership
                approach are designed to deliver an easy, cost effective and
                delightful experience. Our commitment to our customers is:
                &quot;<span className="text-blue-600">Growth. Delivered.</span>
                &quot;
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className={`section-sm bg-gradient bg-theme-light`}>
        <div className="container">
          <div className="row items-center justify-between">
            <div className={`md:col-7 lg:col-6 `}>
              <h3 className="mb-4 text-blue-600">What’s in a Name</h3>
              <p className="mb-8 text-lg">
                The name “H Road” represents our purpose and goal we have set
                forth for our . The “H” represents Hyper. The “Road” represents
                to Scale, Growth & Globalization. We strive to bring keenness of
                execution in empowering our customer’s journey.
                <br />
                <br />
                The name “H Road” also represents our purpose and goal we have
                set forth for our . The “H” represents High Standards. We are
                building a place where curiosity, creativity, collaboration, and
                clarity, which are the bedrock of innovation, flourish for us
                and our customers. The “Road” represents to have fun in
                learning, trusting and growing together with our customers. We
                are creating an experience we can be proud of.
              </p>
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
      <Contact />
    </>
  );
};

export default Home;
