import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import Sidebar from "@/partials/SideBar";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";

const { private_label_co_packing } = config.settings;

const PrivateLabelCoPacking = () => {
  const data = getListPage(`${private_label_co_packing}/_index.md`);

  const {
    title,
    meta_title,
    description,
    image1,
    image2,
    image3,
    private_label_co_packing_title,
    private_label_co_packing_content,
    private_label_co_packing_sub_title,
    private_label_co_packing_sub_content,
  } = data.frontmatter;

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
              <div className="lg:col-12 lg:mx-4 mx-1 col-span-3">
                <div className="row">
                  <div className="relative">
                    <h2
                      className="text-primary pb-2 text-h3 lg:text-h2 animate-fade animate-duration-[600ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        private_label_co_packing_title,
                      )}
                    />
                    <p
                      className="text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        private_label_co_packing_content,
                      )}
                    />
                  </div>

                  <div className="mx-auto py-8 animate-fade animate-delay-[300ms] ease-in">
                    <div className="relative flex gap-2">
                      {/* Left image */}
                      <div className="w-1/2">
                        <Image
                          src={image1}
                          alt="Ninth Ave Foods Warehouse"
                          className="w-full h-full object-cover"
                          width={2500}
                          height={2500}
                          priority
                        />
                      </div>
                      {/* Right column with two stacked images */}
                      <div className="flex flex-col gap-2 w-1/2">
                        <div className="flex-1">
                          <Image
                            src={image2}
                            alt="Ninth Ave Foods Warehouse"
                            className="w-full h-full object-cover"
                            width={2500}
                            height={2500}
                            priority
                          />
                        </div>
                        <div className="flex-1">
                          <Image
                            src={image3}
                            alt="Ninth Ave Foods Warehouse"
                            className="w-full h-full object-cover"
                            width={2500}
                            height={2500}
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <h5
                      className="text-primary pb-2 animate-fade animate-duration-[600ms]"
                      dangerouslySetInnerHTML={markdownify(
                        private_label_co_packing_sub_title,
                      )}
                    />
                    <p
                      className="text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        private_label_co_packing_sub_content,
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2 w-[400px] hidden lg:block pl-10">
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

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default PrivateLabelCoPacking;
