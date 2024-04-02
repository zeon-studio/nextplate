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
        // <section className="section bg-gradient"></section>
        <section className="section">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-14 sm:px-32 py-14">
              {data.frontmatter.services.map((service: Service, index) => (
                <div
                  className="rounded-lg bg-theme-light px-8 py-5 lg:py-0"
                  key={index}
                >
                  <div className="flex justify-center items-center -translate-y-10">
                    <ImageFallback
                      height={100}
                      width={100}
                      className="rounded-full"
                      src={service.image}
                      alt="Icon"
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <div>
                      <h3
                        dangerouslySetInnerHTML={markdownify(service.title)}
                        className="h5 font-primary font-semibold"
                      />
                    </div>
                  </div>
                  <blockquote
                    className="mt-8"
                    dangerouslySetInnerHTML={markdownify(service.content)}
                  />
                  {service.button.enable && (
                    <Link
                      className="btn btn-primary mt-5 hover:bg-opacity-95 mb-5"
                      href={service.button.link}
                    >
                      {service.button.label}
                    </Link>
                  )}
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
