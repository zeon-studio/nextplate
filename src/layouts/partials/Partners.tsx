"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Partner } from "@/types";

interface PageData {
  frontmatter: {
    enable?: boolean;
    title: string;
    description: string;
    partners: Array<Partner>;
  };
}

const PartnersComponent = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="section-xs">
          <div className="container pt-3 pb-3">
            <div className="mx-auto text-center md:col-10">
              <h5
                dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                className="mb-4 text-dark-grey"
              />
              <p
                dangerouslySetInnerHTML={markdownify(
                  data.frontmatter.description!,
                )}
              />
            </div>
            <div className="flex flex-wrap justify-center">
              {data.frontmatter.partners.map((service: Partner, index) => (
                <div
                  key={index}
                  //   className="flex justify-center items-center w-1/2 md:w-1/3 lg:w-1/5 p-4"
                  className="flex justify-center items-center sm:w-[120px] w-[100px] p-4"
                >
                  <ImageFallback
                    height={service.height}
                    width={service.width}
                    src={service.image}
                    alt={service.alt}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PartnersComponent;
