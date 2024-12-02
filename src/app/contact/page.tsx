import config from "@/config/config.json";
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
  const { title, description, meta_title, image, page_header_image } =
    frontmatter;
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
          <div className="flex md:flex-row flex-col-reverse justify-center items-center">
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
