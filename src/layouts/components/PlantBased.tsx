"use client";
import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Plant_based } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Plant_based;
}

const PlantBased = ({ data }: { data: PageData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <>
      {data.frontmatter.enable && (
        <section className="remb-28 mb-28 bg-pastel-green">
          <div className="lg:grid grid-cols-[2.5fr,2fr] h-[520px]">
            <div className="relative lg:h-full h-1/2">
              <Image
                src={data.frontmatter.image}
                alt="Plant-Based Milks"
                className="w-full h-full object-cover"
                fill={true}
              ></Image>
            </div>
            <div className="flex flex-row">
              <div className="inset-0 lg:px-16 px-2 py-2 row items-center justify-between ">
                <div className="md:col-10 md:order-1 md:text-left text-center md:m-auto mt-5 mb-5">
                  <div
                    ref={ref}
                    className={`${
                      inView
                        ? "animate-fade-up animate-duration-[600ms] ease-in"
                        : ""
                    }`}
                  >
                    <h2
                      dangerouslySetInnerHTML={markdownify(
                        data.frontmatter.title,
                      )}
                      className="text-dark-grey text-h4 lg:text-h2 mb-6"
                    />
                  </div>

                  <div
                    className={`${
                      inView
                        ? "animate-fade-up animate-duration-[650ms] ease-in"
                        : ""
                    }`}
                  >
                    <p
                      dangerouslySetInnerHTML={markdownify(
                        data.frontmatter.description,
                      )}
                      className="text-dark-grey mb-6 md:text-lg"
                    />
                  </div>

                  {data.frontmatter.button.enable && (
                    <div
                      className={`${
                        inView
                          ? "animate-fade-up animate-duration-[700ms] ease-in"
                          : ""
                      }`}
                    >
                      <Link
                        className="btn rounded-full bg-white hover:bg-dark-grey hover:border-dark-grey hover:text-white"
                        href={data.frontmatter.button.link}
                      >
                        <div className="flex flex-row items-center">
                          {data.frontmatter.button.label}
                          <svg
                            className="hover:text-white ml-1"
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PlantBased;
