import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const Contact = async () => {
  const data: RegularPage = getListPage("contact/_index.md");
  const { frontmatter } = data;
  const { title, subtitle, description, meta_title, image } = frontmatter;
  const { contact_form_action } = config.params;
  // Explicitly typed as a tuple.
  const californiaCoord: [number, number] = [
    34.02963095004345, -117.97370799183287,
  ];
  const indianaCoord: [number, number] = [
    39.924201236649864, -85.96258788368951,
  ];
  const centerCoord: [number, number] = [37.97691609334666, -98.96814793776119];

  // To make contact info. card
  // https://flowbite.com/docs/components/card/
  // https://flowbite.com/blocks/marketing/contact/

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
      <section className="section-sm">
        <div className="container">
          <div className="flex md:flex-row flex-col-reverse">
            {/* Points of contact */}
            <div className="animate-fade-up animate-delay-[300ms] flex flex-col md:col-4 justify-center items-center md:py-0 py-20">
              <div className="animate-fade-up animate-duration-[400ms] mb-5 flex flex-col items-center text-center">
                <div className="flex items-center justify-center bg-light-grey w-16 h-16 rounded-lg shadow-sm">
                  <svg
                    className="w-10 h-10 text-medium-green"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="col-9 pt-2">
                  <h5 className="text-dark-grey">Email us:</h5>
                  <p className="text-dark-grey text-md pt-1">
                    Email us for general queries, including capabilities and
                    partnership opportunities.
                  </p>
                  <a href="mailto:info@example.com" className="email-link">
                    <span className="pt-2 font-semibold text-primary">
                      info@ninthavenuefoods.com
                    </span>
                  </a>
                </div>
              </div>

              <div className="animate-fade-up animate-duration-[400ms] mb-5 flex flex-col items-center text-center">
                <div className="flex items-center justify-center bg-light-grey w-16 h-16 rounded-lg shadow-sm">
                  <svg
                    className="w-10 h-10 text-medium-green"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="col-9 pt-2">
                  <h5 className="text-dark-grey">Our locations:</h5>
                  <p className="text-dark-grey font-semibold pt-1">
                    California
                  </p>
                  <p className="text-dark-grey text-md">
                    425 S 9th Ave, City of Industry, CA 91746
                  </p>

                  <p className="text-dark-grey font-semibold pt-2">Indiana</p>
                  <p className="text-dark-grey text-md">
                    6350 S 175 W, Columbus, IN 47201
                  </p>
                </div>
              </div>

              <div className="animate-fade-up animate-duration-[400ms] flex flex-col items-center text-center">
                <div className="flex items-center justify-center bg-light-grey w-16 h-16 rounded-lg shadow-sm">
                  <svg
                    className="w-10 h-10 text-medium-green"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="col-9 pt-2">
                  <h5 className="text-dark-grey">Call us:</h5>
                  <p className="text-dark-grey text-md pt-1">
                    Call us to speak to a member of our team. We are always
                    happy to help.
                  </p>
                  <div className="flex flex-col pt-2 font-semibold">
                    <a href="tel:+16266268544">
                      <span className="text-dark-grey">California:</span>{" "}
                      <span className="text-primary">+1 (626) 626-8544</span>
                    </a>
                    <a href="tel:+18122874101">
                      <span className="text-dark-grey">Indiana:</span>{" "}
                      <span className="text-primary">+1 (812) 287-4101</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="animate-fade animate-duration-[700ms] ease-in mx-auto md:col-6">
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

          <div className="h-[50vh] md:mt-24 mb-24">
            <h5 className="text-dark-green text-center pb-5">
              We are based in City of Industry, CA and Columbus, IN
            </h5>
            <Map
              center={centerCoord}
              position1={californiaCoord}
              position2={indianaCoord}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
