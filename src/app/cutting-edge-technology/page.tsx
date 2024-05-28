import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import Sidebar from "@/partials/SideBar";
import SeoMeta from "@/partials/SeoMeta";
import { Card } from "@/types";
import BasicCard from "@/partials/BasicCard";
import Capabilities from "@/partials/Capabilities";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";

// https://medicalrecordsreview.com/services/medical-chronology-services

const { cutting_edge_technology_folder } = config.settings;
// Define your list of photos for this page
const galleryPhotos = [
  { src: "/images/gallery/gallery-2.jpg", width: 2400, height: 3000 },
  { src: "/images/gallery/gallery-3.jpg", width: 2400, height: 1133 },
  { src: "/images/gallery/gallery-4.jpg", width: 2400, height: 1601 },
];

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
  const { capabilities, features } = side_bar.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={data.frontmatter.title} />
      <section className="section">
        <div className="container pb-14">
          <div className="w-full">
            <div className="flex flex-row gx-5">
              <div className="lg:col-8 mx-4">
                <div className="row">
                  <div className="relative">
                    <h2
                      className="text-primary pb-2"
                      dangerouslySetInnerHTML={markdownify(
                        cutting_edge_tech_title,
                      )}
                    />
                    <p
                      className="text-lg"
                      dangerouslySetInnerHTML={markdownify(
                        cutting_edge_tech_content,
                      )}
                    />
                  </div>
                  <div className="col-11 mx-auto py-8">
                    <Image
                      src={galleryPhotos[1]}
                      alt="Ninth Ave Foods Warehouse"
                      className="w-full h-full object-cover"
                      width={3908}
                      height={2600}
                      priority
                    />
                  </div>

                  <div className="relative">
                    <h5
                      className="text-primary pb-2"
                      dangerouslySetInnerHTML={markdownify(shelf_life_title)}
                    />
                    <p
                      className="text-lg"
                      dangerouslySetInnerHTML={markdownify(shelf_life_content)}
                    />
                  </div>

                  <div className="mx-auto pt-8">
                    <BasicCard card={card} />
                  </div>
                </div>
              </div>

              <div className="col-12 px-24">
                <Sidebar
                  side_bar_title={"Capabilities"}
                  categories={capabilities}
                  title={title}
                />
                <Sidebar
                  side_bar_title={"Our Services"}
                  categories={features}
                  title={title}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Plant capabilities */}
        <div className="pt-24 mb-24 pb-10 relative flex flex-col items-center bg-theme-light">
          <Capabilities data={plant_capabilities} />
        </div>

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default CuttingEdgeTechnology;
