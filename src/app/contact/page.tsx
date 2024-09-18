import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import PointsOfContact from "@/partials/PointsOfContact";

// https://nodemailer.com/
// https://www.emailjs.com/
// https://resend.com/
const Contact = async () => {
  const data = getListPage("contact/_index.md");
  const point_of_contact = getListPage("sections/points-of-contact.md");

  const { frontmatter } = data;
  const { title, description, meta_title, image, page_header_image } =
    frontmatter;
  const { contact_form_action } = config.params;
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
            <div className="animate-fade ease-in mx-auto md:col-6 mb-20 md:mb-0">
              <div className="flex items-center md:col-6 col-7 pb-6 py-5">
                <div className="flex-grow border opacity-40 border-t border-light-green invisible lg:visible"></div>
                <h5 className="lg:mx-4 text-dark-green text-xl font-light tracking-widest">
                  Let&apos;s Connect
                </h5>
                <div className="flex-grow border opacity-40 border-t border-light-green invisible lg:visible"></div>
              </div>
              <form action={contact_form_action} method="POST">
                <div className="flex flex-wrap md:-mx-6 mx-8">
                  <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
                    <label
                      htmlFor="fname"
                      className="form-label text-dark-grey"
                    >
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fname"
                      name="fname"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                      placeholder="First name"
                      type="text"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
                    <label
                      htmlFor="lname"
                      className="form-label text-dark-grey"
                    >
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lname"
                      name="lname"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                      placeholder="Last name"
                      type="text"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
                    <label
                      htmlFor="email"
                      className="form-label text-dark-grey"
                    >
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                      placeholder="john.doe@email.com"
                      type="email"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
                    <label
                      htmlFor="interest"
                      className="form-label text-dark-grey"
                    >
                      Area of Interest <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="interest"
                      name="interest"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                      placeholder="I am interested in..."
                    />
                  </div>
                  <div className="w-full px-1 md:mb-6 mb-3">
                    <label
                      htmlFor="message"
                      className="form-label text-dark-grey"
                    >
                      Anything else? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full border-mischka"
                      placeholder="Leave a message..."
                      rows={7}
                    ></textarea>
                  </div>
                  <div className="px-1">
                    <button
                      type="submit"
                      className="btn btn-primary hover:bg-dark-grey hover:border-dark-grey shadow-sm w-full"
                    >
                      Send message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col text-center mx-auto w-full pt-24">
            <h5 className="text-dark-grey pb-5">
              We are based in City of Industry, CA and Columbus, IN
            </h5>

            <div className="flex justify-center w-full">
              <div className="w-full h-[450px] max-w-[1200px] max-h-[450px]">
                <Map
                  center={centerCoord}
                  position1={californiaCoord}
                  position2={indianaCoord}
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
