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
          className="section bg-gradient"
          style={{ borderRadius: "80% 30% 0% 0% / 5% 5% 0% 0%" }}
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
                <div className="shadow-lg bg-white rounded-lg" key={index}>
                  <div className="flex justify-center items-center pb-3 px-4 py-4">
                    <ImageFallback
                      height={2400}
                      width={1600}
                      src={service.image}
                      alt={service.alt}
                      className="rounded-lg"
                    />
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
                        className="btn btn-transparent border-custom-green text-custom-green mt-5 hover:bg-custom-green hover:text-white mb-5"
                        href={service.button.link}
                      >
                        {service.button.label}
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
