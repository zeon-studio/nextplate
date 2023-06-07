import ImageFallback from "@/components/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { Feature } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";
import PageHeader from "@/partials/PageHeader";

const About = () => {
  const aboutPage = getListPage("pages/about.md");
  const { frontmatter } = aboutPage;
  const {
    features,
  }: {
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <PageHeader title="About" />
      {features
        .filter((feature) => !feature.title.includes("in a Name"))
        .map((feature, index: number) => (
          <section key={index} className={`section-sm`}>
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
    </>
  );
};

export default About;
