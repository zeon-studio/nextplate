import Image from "next/image";
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
import ExpandableImage from "@/components/ExpandableImage";
import {
  CALIFORNIA_COORD,
  INDIANA_COORD,
  calculateCenterCoordinates,
} from "@/lib/utils/geoUtils";

const About = () => {
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
  const centerCoord = calculateCenterCoordinates(
    CALIFORNIA_COORD,
    INDIANA_COORD,
  );

  const Map = useMemo(
    () =>
      dynamic(() => import("@/partials/Map"), {
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
      <PageHeader title={title} image={image} />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center mx-1">
            <div className="lg:col-12">
              {/* How We Got Started */}
              {features.map((feature, index: number) => (
                <div
                  className="flex lg:flex-row flex-col items-center"
                  key={index}
                >
                  {feature.image && (
                    <ExpandableImage
                      src={feature.image}
                      alt={feature.title}
                      className="mb:md-0 rounded-sm mx-auto mb-6 animate-fade animate-delay-[300ms] ease-in"
                      width={1920}
                      height={1080}
                    />
                  )}
                  <div className="md:col-8 lg:col-6 items-center mx-auto lg:pl-16">
                    <h2
                      dangerouslySetInnerHTML={markdownify(feature.title)}
                      className="mb-6 text-h3 lg:text-h2 text-dark-grey animate-fade animate-duration-[600ms] ease-in"
                    />
                    <div className="content">
                      <p
                        dangerouslySetInnerHTML={markdownify(feature.content)}
                        className="text-lg text-dark-grey animate-fade animate-delay-[200ms] ease-in"
                      />
                    </div>
                    {feature.button.enable && (
                      <Link
                        className="btn btn-primary rounded-full mt-5 hover:bg-dark-grey hover:border-dark-grey"
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

        <div className="flex flex-col items-center justify-center py-14 mx-[2rem]">
          {/* Our capabilities */}
          <Services data={capabilities} />
          {/* Our locations */}
          <OurLocations data={our_locations} />

          {/* Map */}
          <div className="bg-light-green bg-opacity-5 w-full flex items-center justify-center">
            <div className="flex flex-col text-center py-14">
              <h3
                dangerouslySetInnerHTML={markdownify(contact_title)}
                className="mb-6 text-dark-grey animate-fade animate-duration-[600ms] ease-in"
              />
              <p
                className="md:pb-8 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
                dangerouslySetInnerHTML={markdownify(contact_content)}
              />
              <div className="relative flex items-center justify-center md:flex-row flex-col md:py-0 py-8 w-full z-0">
                <div className="">
                  <PointsOfContact data={data}></PointsOfContact>
                </div>

                <div className="w-full h-full">
                  <div className="w-full lg:w-[700px] h-[400px] max-w-[700px] max-h-[450px]">
                    <Map
                      center={centerCoord}
                      position1={CALIFORNIA_COORD}
                      position2={INDIANA_COORD}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="md:py-14 py-8">
          <CallToAction data={callToAction}></CallToAction>
        </div>
      </section>
    </>
  );
};

export default About;
