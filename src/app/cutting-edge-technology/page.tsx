import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import Sidebar from "@/partials/SideBar";
import SeoMeta from "@/partials/SeoMeta";
import { Card } from "@/types";
import BasicCard from "@/partials/BasicCard";
import Capabilities from "@/components/Capabilities";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";

// https://medicalrecordsreview.com/services/medical-chronology-services

const { cutting_edge_technology_folder } = config.settings;

const CuttingEdgeTechnology = () => {
  const data = getListPage(`${cutting_edge_technology_folder}/_index.md`);

  const {
    title,
    meta_title,
    description,
    image,
    cutting_edge_tech_title,
    cutting_edge_tech_content,
    shelf_life_title,
    shelf_life_content,
  } = data.frontmatter;

  const { card }: { card: Card } = data.frontmatter;
  const plant_capabilities = getListPage(
    "cutting-edge-technology/plant-capabilities.md",
  );
  const esl_capabilities = getListPage(
    "cutting-edge-technology/esl-capabilities.md",
  );
  const callToAction = getListPage("sections/call-to-action.md");

  const side_bar = getListPage("sections/side-bar.md");
  const { capabilities, our_services } = side_bar.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
      />
      <PageHeader title={data.frontmatter.title} />
      <section className="section">
        <div className="container pb-14">
          <div className="w-full">
            <div className="gx-5 grid lg:grid-cols-5 gap-10">
              <div className="lg:col-11 lg:mx-4 mx-1 col-span-3">
                <div className="row">
                  <div className="relative">
                    <h2
                      className="text-primary pb-2 text-h3 lg:text-h2 animate-fade animate-duration-[600ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        cutting_edge_tech_title,
                      )}
                    />
                    <p
                      className="text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        cutting_edge_tech_content,
                      )}
                    />
                  </div>
                  <div className="xl:col-11 mx-auto py-8 animate-fade animate-delay-[300ms] ease-in">
                    <Image
                      src={image}
                      alt="Ninth Ave Foods Warehouse"
                      className="w-full h-full object-cover"
                      width={2500}
                      height={2500}
                      priority
                    />
                  </div>

                  <div className="relative">
                    <h5
                      className="text-primary pb-2 animate-fade animate-duration-[600ms]"
                      dangerouslySetInnerHTML={markdownify(shelf_life_title)}
                    />
                    <p
                      className="text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(shelf_life_content)}
                    />
                  </div>

                  <div className="mx-auto pt-8">
                    <BasicCard card={card} />
                  </div>
                </div>
              </div>

              <div className="col-span-2 w-[400px] hidden lg:block">
                <Sidebar
                  side_bar_title={"Capabilities"}
                  categories={capabilities}
                  title={title}
                />
                <Sidebar
                  side_bar_title={"Our Services"}
                  categories={our_services}
                  title={title}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Plant capabilities */}
        <div className="pt-10 mb-24 pb-4 relative flex flex-col items-center bg-theme-light">
          <Capabilities data={plant_capabilities} />
        </div>

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default CuttingEdgeTechnology;
