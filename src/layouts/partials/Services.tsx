"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Service } from "@/types";
import Link from "next/link";

interface PageData {
  frontmatter: {
    enable?: boolean;
    title: string;
    description: string;
    services: Array<Service>;
  };
}

const ServicesComponent = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        // <section className="section bg-gradient  bg-gradient-to-r from-blue-600"></section>
        <section
          className="section bg-theme-light"
          // style={{ borderRadius: "80% 30% 0% 0% / 5% 5% 0% 0%" }}
          // style={{
          //   clipPath: "polygon(0 2%, 100% 0, 100% 100%, 0% 100%)",

          //   transformOrigin: "top left",
          // }}
        >
          <div className="container">
            <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-6">
              <h2
                dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                className="mb-4"
              />
              <p
                dangerouslySetInnerHTML={markdownify(
                  data.frontmatter.description!,
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-14 sm:px-32 py-4">
              {data.frontmatter.services.map((service: Service, index) => (
                <div className="rounded shadow-lg bg-white" key={index}>
                  <div className="pb-3 px-4 py-4">
                    <div className="relative rounded overflow-hidden">
                      <ImageFallback
                        height={2400}
                        width={1600}
                        src={service.image}
                        alt={service.alt}
                        className="rounded-lg ease-in duration-150 transform hover:scale-110"
                        style={{
                          transition: "transform 0.5s",
                          transformOrigin: "center",
                        }}
                      />
                    </div>
                  </div>

                  <div className="py-5 px-8">
                    <div className="flex flex-col items-left">
                      <div>
                        <h3
                          dangerouslySetInnerHTML={markdownify(service.title)}
                          className="h5 font-primary font-semibold"
                        />
                      </div>
                    </div>
                    <blockquote
                      className="mt-4"
                      dangerouslySetInnerHTML={markdownify(service.content)}
                    />
                    {service.button.enable && (
                      <Link
                        className="btn btn-transparent border-primary text-primary mt-5 mb-5 hover:bg-primary hover:text-white"
                        href={service.button.link}
                      >
                        <div className="flex flex-row items-center">
                          {service.button.label}
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
        </section>
      )}
    </>
  );
};

export default ServicesComponent;
