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
  const { title, description, meta_title, image } = frontmatter;
  const { contact_form_action } = config.params;
  // Explicitly typed as a tuple.
  const position1: [number, number] = [34.02963095004345, -117.97370799183287];
  const position2: [number, number] = [39.924201236649864, -85.96258788368951];
  const centerPosition: [number, number] = [
    37.97691609334666, -98.96814793776119,
  ];
  // To make contact info. card
  // https://flowbite.com/docs/components/card/

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
      <PageHeader title={title} />
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <div className="flex items-center col-6 pb-6">
                <div className="flex-grow border opacity-40 border-t border-light-green"></div>
                <span className="mx-4 text-dark-green text-xl tracking-widest">
                  Let&apos;s Connect
                </span>
                <div className="flex-grow border opacity-40 border-t border-light-green"></div>
              </div>
              <form action={contact_form_action} method="POST">
                <div className="flex flex-wrap -mx-6">
                  <div className="w-full md:w-1/2 px-1 mb-6">
                    <label
                      htmlFor="fname"
                      className="form-label text-dark-grey"
                    >
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fname"
                      name="fname"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12"
                      placeholder="First name"
                      type="text"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 mb-6">
                    <label
                      htmlFor="lname"
                      className="form-label text-dark-grey"
                    >
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lname"
                      name="lname"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12"
                      placeholder="Last name"
                      type="text"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 mb-6">
                    <label
                      htmlFor="email"
                      className="form-label text-dark-grey"
                    >
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12"
                      placeholder="john.doe@email.com"
                      type="email"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-1 mb-6">
                    <label
                      htmlFor="interest"
                      className="form-label text-dark-grey"
                    >
                      Area of Interest <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="interest"
                      name="interest"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12"
                      placeholder="I am interested in..."
                    />
                  </div>
                  <div className="w-full px-1 mb-6">
                    <label
                      htmlFor="message"
                      className="form-label text-dark-grey"
                    >
                      Anything else? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full"
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
            <div className="h-[50vh]  my-10">
              <Map
                center={centerPosition}
                position1={position1}
                position2={position2}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
