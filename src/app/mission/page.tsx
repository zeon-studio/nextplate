import ImageFallback from "@/components/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { Feature } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";
import PageHeader from "@/partials/PageHeader";

const Mission = () => {
  const MissionPage = getListPage("pages/mission.md");
  const { frontmatter } = MissionPage;
  const {
    features,
  }: {
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <PageHeader title="Mission" />
      <section>
        <div className="bg-yellow-50 px-4 py-16 xl:p-20">
          <div className="row items-center justify-between">
            <div className="text-center md:col-12 md:order-1">
              <h2 className="mb-4 font-light text-blue-600">Mission 🚀</h2>
              <h2 className="mb-2">
                We make your journey to scale, globalize and drive sustainable
                growth Easy, Effective and Delightful.
              </h2>
            </div>
          </div>
        </div>
      </section>
      {features
        .filter((feature) => feature.title.includes("in a Name"))
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

export default Mission;
