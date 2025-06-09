import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import PointsOfContact from "@/partials/PointsOfContact";
import ContactUsForm from "@/components/ContactUsForm";
import {
  CALIFORNIA_COORD,
  INDIANA_COORD,
  calculateCenterCoordinates,
} from "@/lib/utils/geoUtils";

const Contact = () => {
  const data = getListPage("contact/_index.md");
  const point_of_contact = getListPage("sections/points-of-contact.md");

  const { frontmatter } = data;
  const {
    title,
    description,
    meta_title,
    image,
    page_header_image,
    career_title,
    career_content,
  } = frontmatter;
  const { contact_form_action } = config.params;
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
      <PageHeader title={title} image={page_header_image} />
      <section className="section-sm">
        <div className="container">
          <div className="flex flex-col justify-center items-center text-center pb-8">
            <div className="flex flex-row  items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="md:size-12 size-10 text-lime-600 m-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
              <h3 className="pb-1 text-dark-grey">{career_title}</h3>
            </div>

            <p
              className="text-lg max-w-[650px]"
              dangerouslySetInnerHTML={markdownify(career_content)}
            />
          </div>

          <div className="flex md:flex-row md:col-auto col-12 flex-col-reverse bg-stone-50 shadow-md mx-auto">
            {/* Points of contact */}
            <PointsOfContact data={point_of_contact}></PointsOfContact>

            {/* Form */}
            <ContactUsForm></ContactUsForm>
          </div>

          <div className="flex flex-col text-center mx-auto w-full pt-24">
            <h5 className="text-dark-grey pb-5">
              We are based in City of Industry, CA and Columbus, IN
            </h5>

            <div className="flex justify-center w-full -z-10">
              <div className="w-full h-[450px] max-w-[1200px] max-h-[450px]">
                <Map
                  center={centerCoord}
                  position1={CALIFORNIA_COORD}
                  position2={INDIANA_COORD}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
