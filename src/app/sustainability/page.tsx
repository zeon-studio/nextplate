import MDXContent from "@/helpers/MDXContent";
import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Card } from "@/types";
import BasicCard from "@/partials/BasicCard";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";
import { getSinglePage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import CardCarousel from "@/components/CardCarousel";

const { sustainability_folder } = config.settings;

const Sustainability = () => {
  const data = getListPage(`${sustainability_folder}/_index.md`);

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

  // const content = data.content;

  const { card }: { card: Card } = data.frontmatter;
  const callToAction = getListPage("sections/call-to-action.md");

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
            <div className="gx-5 grid lg:grid-cols-5 gap-2">
              <div className="lg:col-12 lg:mx-4 mx-1 col-span-3">
                <div className="row">
                  <div className="relative">
                    <h2
                      className="col-6 text-primary pb-2 text-h3 lg:text-h1 animate-fade animate-duration-[600ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        sustainability_title,
                      )}
                    />
                    <p
                      className="col-9 text-lg animate-fade animate-delay-[200ms] ease-in"
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

                  <div className="mx-auto pt-8">
                    <BasicCard card={card} />
                  </div>
                </div>
              </div>

              <div className="col-span-2 w-full pl-10">
                <Image
                  src={image}
                  alt="Plastic Bottles"
                  className="w-full h-full object-cover rounded-lg"
                  width={2400}
                  height={1600}
                  priority
                />
                {/* <Sidebar
                  side_bar_title={"Capabilities"}
                  categories={capabilities}
                  title={title}
                />
                <Sidebar
                  side_bar_title={"Our Services"}
                  categories={our_services}
                  title={title}
                /> */}
              </div>
            </div>

            <div className="relative container pt-14">
              <div className="">
                <h3
                  className="text-primary pb-2 animate-fade animate-duration-[600ms]"
                  dangerouslySetInnerHTML={markdownify(sustainability_title_2)}
                />
                <p
                  className="text-lg animate-fade animate-delay-[200ms] ease-in"
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

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default Sustainability;
