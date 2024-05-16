import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import PageHeader from "@/partials/PageHeader";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Feature } from "@/types";
import Link from "next/link";
// import { features } from "process";

const About = () => {
  const data = getListPage("about/_index.md");
  const { frontmatter, content } = data;
  const { title, subtitle, meta_title, description, image } = frontmatter;
  const { features }: { features: Feature[] } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} subtitle={subtitle} />
      {/* How We Got Started */}
      {features.map((feature, index: number) => (
        <section className="section-sm">
          <div className="container">
            <div className="row justify-center">
              <div className="md:col-10 lg:col-12">
                <div className="flex col">
                  {image && (
                    <ImageFallback
                      className="mx-auto mb-6 rounded-sm object-cover"
                      src={feature.image}
                      width={600}
                      height={600}
                      alt={title}
                    />
                  )}
                  <div className="px-10 col-6">
                    <h2
                      dangerouslySetInnerHTML={markdownify(feature.title)}
                      className="h3 mb-6 text-primary"
                    />
                    <div className="content">
                      <p
                        dangerouslySetInnerHTML={markdownify(feature.content)}
                      />
                    </div>
                    {feature.button.enable && (
                      <Link
                        className="btn btn-primary mt-5 hover:bg-dark-grey hover:border-dark-grey"
                        href={feature.button.link}
                      >
                        <div className="flex flex-row items-center">
                          {feature.button.label}
                          <svg
                            className="text-primaryhover:text-white ml-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m9 5 7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Our location */}
    </>
  );
};

export default About;
