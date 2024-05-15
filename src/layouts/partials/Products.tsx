"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Product } from "@/types";
import { useInView } from "react-intersection-observer";

interface PageData {
  frontmatter: {
    enable?: boolean;
    title: string;
    description: string;
    products: Array<Product>;
  };
}

const PartnersComponent = ({ data }: { data: PageData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <>
      {data.frontmatter.enable && (
        <section className="section-xs">
          <div className="container py-6">
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

            <div className="flex flex-wrap justify-center" ref={ref}>
              {data.frontmatter.products.map((product: Product, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center text-center sm:w-[114px] px-4 py-2 m-4 ${inView ? "animate-jump-in animate-ease-in animate-delay-[400ms]" : ""}`}
                >
                  <div className="flex flex-col">
                    <ImageFallback
                      height={product.height}
                      width={product.width}
                      src={product.image}
                      alt={product.alt}
                      className="sm:w-[70px] w-[60px]"
                    />
                    <p
                      className="sm:text-sm text-md pt-1 font-semibold text-dark-grey"
                      dangerouslySetInnerHTML={markdownify(product.title!)}
                    />
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

export default PartnersComponent;
