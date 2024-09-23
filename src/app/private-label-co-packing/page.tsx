import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import Sidebar from "@/partials/SideBar";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";

const { private_label_co_packing_folder } = config.settings;

const PrivateLabelCoPacking = () => {
  const data = getListPage(`${private_label_co_packing_folder}/_index.md`);

  const {
    title,
    meta_title,
    description,
    image1,
    alt1,
    image2,
    alt2,
    image3,
    alt3,
    private_label_co_packing_title,
    private_label_co_packing_content,
    private_label_co_packing_sub_title,
    private_label_co_packing_sub_content,
    page_header_image,
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
      <PageHeader title={title} image={page_header_image} />
      <section className="section-sm">
        <div className="container pb-14">
          <div className="w-full">
            <div className="gx-5 grid lg:grid-cols-5 gap-10">
              <div className="lg:col-12 mx-1 col-span-3">
                <div className="row">
                  <div className="relative">
                    <h2
                      className="col-11 text-primary pb-2 text-h3 lg:text-h1 animate-fade animate-duration-[600ms] ease-in"
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
                          alt={alt1}
                          className="w-full h-full object-cover rounded-xs"
                          width={2400}
                          height={1500}
                        />
                      </div>
                      {/* Right column with two stacked images */}
                      <div className="flex flex-col gap-2 w-1/2">
                        <div className="flex-1">
                          <Image
                            src={image2}
                            alt={alt2}
                            className="w-full h-full object-cover rounded-xs"
                            width={2400}
                            height={1500}
                          />
                        </div>
                        <div className="flex-1">
                          <Image
                            src={image3}
                            alt={alt3}
                            className="w-full h-full object-cover rounded-xs"
                            width={2400}
                            height={1500}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <h3
                      className="text-primary font-primary pb-2 animate-fade animate-duration-[600ms]"
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

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default PrivateLabelCoPacking;
