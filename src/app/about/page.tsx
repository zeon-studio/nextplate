import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import PageHeader from "@/partials/PageHeader";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Feature } from "@/types";
import Link from "next/link";
import PointsOfContact from "@/partials/PointsOfContact";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Services from "@/partials/Services";
import CallToAction from "@/partials/CallToAction";
import OurLocations from "@/components/OurLocations";

const About = async () => {
  const data = getListPage("about/_index.md");
  const capabilities = getListPage("about/capabilities.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const our_locations = getListPage("about/our_locations.md");
  const { frontmatter } = data;
  const {
    title,
    subtitle,
    meta_title,
    description,
    image,
    contact_title,
    contact_content,
  } = frontmatter;
  const { features }: { features: Feature[] } = frontmatter;

  // Explicitly typed as a tuple.
  const californiaCoord: [number, number] = [
    34.02963095004345, -117.97370799183287,
  ];
  const indianaCoord: [number, number] = [
    39.924201236649864, -85.96258788368951,
  ];
  const centerCoord: [number, number] = [37.97691609334666, -98.96814793776119];
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>Loading map...</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} subtitle={subtitle} />
      <section className="section-sm mb-8">
        <div className="container pb-24">
          <div className="row justify-center ">
            <div className="md:col-10 lg:col-12">
              {/* How We Got Started */}
              {features.map((feature, index: number) => (
                <div
                  className="flex lg:flex-row flex-col items-center"
                  key={index}
                >
                  {feature.image && (
                    <ImageFallback
                      className="mb:md-0 md:col-8 lg:col-6 col-10 mx-auto mb-6 rounded-sm object-cover  animate-fade animate-delay-[300ms] ease-in"
                      src={feature.image}
                      width={600}
                      height={600}
                      alt={title}
                    />
                  )}
                  <div className="md:col-8 lg:col-6 col-10 items-center mx-auto lg:pl-16">
                    <h2
                      dangerouslySetInnerHTML={markdownify(feature.title)}
                      className="h3 mb-6 text-primary animate-fade animate-duration-[600ms] ease-in"
                    />
                    <div className="content">
                      <p
                        dangerouslySetInnerHTML={markdownify(feature.content)}
                        className="text-lg text-dark-grey animate-fade animate-delay-[200ms] ease-in"
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
              ))}
            </div>
          </div>
        </div>

        {/* Our capabilities */}
        <Services data={capabilities} />

        <div className="flex flex-col items-center justify-center py-24">
          {/* Our locations */}
          <OurLocations data={our_locations} />
          {/* Map */}
          <div className="flex flex-col items-center justify-center py-14 bg-theme-light w-full">
            <h2
              dangerouslySetInnerHTML={markdownify(contact_title)}
              className="mb-6 text-primary animate-fade animate-duration-[600ms] ease-in"
            />
            <p
              className="md:pb-8 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
              dangerouslySetInnerHTML={markdownify(contact_content)}
            />
            <div className="flex lg:flex-row flex-col items-center">
              <div className="relative justify-center w-full lg:left-[4rem]">
                <PointsOfContact data={data}></PointsOfContact>
              </div>

              <div className="lg:w-full md:w-5/6 w-full">
                <div className="relative lg:h-[45vh] h-[35vh] xl:w-[700px] right-[4rem]">
                  <Map
                    center={centerCoord}
                    position1={californiaCoord}
                    position2={indianaCoord}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default About;
