import MDXContent from "@/helpers/MDXContent";
import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Card } from "@/types";
import BasicCard from "@/partials/BasicCard";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";
import CardCarousel from "@/partials/CardCarousel";
import Services from "@/partials/Services";
import ExpandableImage from "@/components/ExpandableImage";

const { cartons_folder } = config.settings;

const Cartons = () => {
  const data = getListPage(`${cartons_folder}/_index.md`);
  const collaspe_data = getListPage(`${cartons_folder}/collapse.md`);

  const {
    title,
    meta_title,
    description,
    image,
    image2,
    alt,
    alt2,
    sustainability_title,
    sustainability_content,
    sustainability_subcontent_title,
    sustainability_subcontent,
    sustainability_title_2,
    sustainability_content_2,
    sustainability_title_3,
    sustainability_content_3,
    sustainability_bulletpoints,
    page_header_image,
    sustainability_title_4,
    cards,
  } = data.frontmatter;

  const content = collaspe_data.content;

  const { card }: { card: Card } = data.frontmatter;
  const callToAction = getListPage("sections/call-to-action.md");
  const capabilities = getListPage("sections/sustainability-capabilities.md");

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
      />
      <PageHeader title={title} image={page_header_image} />
      <section className="section-sm">
        <div className="container pb-14">
          <div className="w-full">
            <div className="md:gx-5 grid md:grid-cols-5 md:gap-2 grid-cols-3">
              <div className="lg:col-12 lg:mx-4 mx-1 col-span-3">
                <div className="row">
                  <div className="relative">
                    <h3
                      className="lg:col-6 col-11 text-primary pb-2 text-h3 lg:text-h1 animate-fade animate-duration-[600ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        sustainability_title,
                      )}
                    />
                    <p
                      className="lg:col-10 text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        sustainability_content,
                      )}
                    />
                    <h3
                      className="text-primary pt-4 pb-2 text-h3 animate-fade animate-duration-[600ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        sustainability_subcontent_title,
                      )}
                    />
                    <p
                      className="lg:col-10 text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        sustainability_subcontent,
                      )}
                    />
                  </div>

                  <div className="w-full block md:hidden pt-4">
                    <Image
                      src={image}
                      alt={alt}
                      className="w-full h-full object-cover rounded-lg"
                      width={2121}
                      height={1413}
                    />
                  </div>

                  <div className="mx-auto pt-8 col-span-2">
                    <BasicCard card={card} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 w-full lg:pl-10 col-span-3 hidden md:block">
                <Image
                  src={image}
                  alt={alt}
                  className="w-full h-full object-cover rounded-lg"
                  width={2121}
                  height={1413}
                />
              </div>
            </div>

            <div className="flex items-center justify-center md:py-20 py-16">
              <div className="w-full h-[1px] bg-gradient-to-r from-light-green via-green-500 to-dark-green"></div>
            </div>

            <div className="relative container">
              <div className="flex-row grid lg:grid-cols-2 grid-cols-1 md:pb-32 pb-24">
                <div className="col-span-1">
                  <h2
                    className="pt-8 text-primary font-primary animate-fade animate-duration-[800ms]"
                    dangerouslySetInnerHTML={markdownify(
                      sustainability_title_3,
                    )}
                  />
                  <p
                    className="text-dark-grey text-lg animate-fade animate-duration-[850ms]"
                    dangerouslySetInnerHTML={markdownify(
                      sustainability_content_3,
                    )}
                  />
                  <div className="items-center w-full md:w-auto pt-6">
                    <ul>
                      {sustainability_bulletpoints &&
                        sustainability_bulletpoints.map((bullet: string) => (
                          <li className="relative mb-5 pl-8" key={bullet}>
                            <svg
                              className="w-7 h-7 absolute left-0 text-[#65a30d]"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 12H5m14 0-4 4m4-4-4-4"
                              />
                            </svg>
                            <span
                              className="text-lg font-light text-dark-grey"
                              dangerouslySetInnerHTML={markdownify(bullet)}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="col-span-1 w-full lg:pt-0 pt-8 flex">
                  <ExpandableImage
                    src={image2}
                    alt={alt2}
                    className="w-full h-full object-contain rounded-lg"
                    width={1920}
                    height={1080}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center md:pb-8 pb-6">
                <div className="w-2/3 h-[1px] bg-gradient-to-r from-light-green via-green-500 to-dark-green"></div>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <h2
                  className="text-primary text-h3 lg:text-h2 pb-2 animate-fade animate-duration-[600ms]"
                  dangerouslySetInnerHTML={markdownify(sustainability_title_2)}
                />
                <p
                  className="text-lg animate-fade animate-delay-[200ms] ease-in md:col-7"
                  dangerouslySetInnerHTML={markdownify(
                    sustainability_content_2,
                  )}
                />
              </div>
              <CardCarousel cards={cards}></CardCarousel>
            </div>
          </div>
        </div>

        <Services data={capabilities}></Services>

        <div className="container mx-auto my-20">
          <h3 className="text-dark-grey text-h4 lg:text-h3">
            {sustainability_title_4}
          </h3>
          <MDXContent content={content}></MDXContent>
        </div>

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default Cartons;
