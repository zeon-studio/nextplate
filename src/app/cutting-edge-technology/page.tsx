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
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import PostSidebar from "@/partials/PostSidebar";

const { cutting_edge_technology_folder } = config.settings;

const CuttingEdgeTechnology = () => {
  const data = getListPage(`${cutting_edge_technology_folder}/_index.md`);
  const allCategories = getAllTaxonomy(
    cutting_edge_technology_folder,
    "categories",
  );
  const categories = getTaxonomy(cutting_edge_technology_folder, "categories");
  const tags = getTaxonomy(cutting_edge_technology_folder, "tags");
  console.log("CAT:  ", categories);

  const {
    title,
    meta_title,
    description,
    image,
    cutting_edge_tech_title,
    cutting_edge_tech_content,
    cutting_edge_tech_sub_title,
    cutting_edge_tech_sub_content,
    page_header_image,
  } = data.frontmatter;

  const { card }: { card: Card } = data.frontmatter;
  const plant_capabilities = getListPage(
    "cutting-edge-technology/plant-capabilities.md",
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
      <PageHeader title={title} image={page_header_image} />
      <section className="section-sm">
        <div className="container pb-14">
          <div className="w-full">
            <div className="gx-5 grid lg:grid-cols-5 gap-10">
              <div className="lg:col-12 mx-1 col-span-3">
                <div className="row">
                  <div className="relative">
                    <h3
                      className="col-11 text-primary pb-2 lg:text-h1 animate-fade animate-duration-[600ms] ease-in"
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
                  <div className="mx-auto py-8 animate-fade animate-delay-[300ms] ease-in">
                    <Image
                      src={image}
                      alt="Ninth Ave Foods Warehouse"
                      className="w-full h-full object-cover rounded-xs"
                      width={2400}
                      height={1500}
                    />
                  </div>

                  <div className="relative">
                    <h3
                      className="text-primary font-primary pb-2 animate-fade animate-duration-[600ms]"
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
                  </div>

                  <div className="mx-auto pt-8">
                    <BasicCard card={card} />
                  </div>
                </div>
              </div>

              <div className="col-span-2 hidden lg:block xl:pl-24 pl-10">
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
        <div className="pt-10 mb-24 pb-4 flex items-center justify-center bg-light-green bg-opacity-5">
          <Capabilities data={plant_capabilities} />
        </div>

        <CallToAction data={callToAction}></CallToAction>

        <PostSidebar
          categories={categories}
          tags={tags}
          allCategories={allCategories}
        />
      </section>
    </>
  );
};

export default CuttingEdgeTechnology;
