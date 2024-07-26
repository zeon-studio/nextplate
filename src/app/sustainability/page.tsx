import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import Sidebar from "@/partials/SideBar";
import SeoMeta from "@/partials/SeoMeta";
import { Card } from "@/types";
import BasicCard from "@/partials/BasicCard";
import Capabilities from "@/components/Capabilities";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";

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
    page_header_image,
  } = data.frontmatter;

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
                  {/* 
                  <div className="relative">
                    <h5
                      className="text-primary pb-2 animate-fade animate-duration-[600ms]"
                      dangerouslySetInnerHTML={markdownify(
                        cutting_edge_tech_sub_title,
                      )}
                    />
                    <p
                      className="text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        cutting_edge_tech_sub_content,
                      )}
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
          </div>
        </div>

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default Sustainability;
