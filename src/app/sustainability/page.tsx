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
import CardCarousel from "@/components/CardCarousel";
import Services from "@/partials/Services";

const { sustainability_folder } = config.settings;

const HDPEandPETSustainability = () => {
  const data = getListPage(`${sustainability_folder}/_index.md`);
  const collaspe_data = getListPage(`${sustainability_folder}/collapse.md`);
  const {
    title,
    meta_title,
    description,
    image,
    sustainability_title,
    sustainability_content,
    sustainability_title_2,
    sustainability_content_2,
    page_header_image,
    cards,
  } = data.frontmatter;

  const content = collaspe_data.content;

  const { card }: { card: Card } = data.frontmatter;
  const callToAction = getListPage("sections/call-to-action.md");
  const capabilities = getListPage("sustainability/capabilities.md");

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
                      className="lg:col-9 text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        sustainability_content,
                      )}
                    />
                  </div>
                  {/* <div className="mx-auto py-8 animate-fade animate-delay-[300ms] ease-in">
                    <Image
                      src={image}
                      alt="Ninth Ave Foods Warehouse"
                      className="w-full h-full object-cover"
                      width={3678}
                      height={1353}
                      priority
                    />
                  </div> */}

                  <div className="w-full block md:hidden pt-4">
                    <Image
                      src={image}
                      alt="Plastic Bottles"
                      className="w-full h-full object-cover rounded-lg"
                      width={2400}
                      height={1600}
                      priority
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
                  alt="Plastic Bottles"
                  className="w-full h-full object-cover rounded-lg"
                  width={2400}
                  height={1600}
                  priority
                />
              </div>
            </div>

            <div className="flex items-center justify-center py-20">
              <div className="w-full h-[1px] bg-gradient-to-r from-light-green via-green-500 to-dark-green"></div>
            </div>

            <div className="relative container">
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
              {/* <div className="pt-10">
                <MDXContent content={content} />
              </div> */}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <Services data={capabilities}></Services>
        </div>

        <div className="col-10 mx-auto mb-20">
          <h3 className="text-dark-grey text-h4 lg:text-h3">
            Heres why you should switch to PET bottles
          </h3>
          <MDXContent content={content}></MDXContent>
        </div>

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default HDPEandPETSustainability;
