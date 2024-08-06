"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <>
      {data.frontmatter.enable && (
        <section className="remb-28">
          <div className="container relative" ref={ref}>
            {/* <div className="relative px-4 py-16 xl:p-20 bg-cover bg-top bg-contact-us bg-brightness-75 h-[450px]"> */}

            <div className="md:h-[450px] h-[300px]">
              <Image
                src="/images/contact-us-image.jpg"
                alt="Image"
                className="rounded-xl w-full h-full object-top object-cover brightness-60"
                width={2400}
                height={1600}
              ></Image>

              <div
                className={`absolute inset-0 md:px-16 px-10 row items-center justify-between ${
                  inView ? "animate-delay-[700ms]" : ""
                }`}
              >
                <div className="md:col-7 md:order-1">
                  <div
                    className={`${
                      inView
                        ? "animate-fade animate-duration-[400ms] animate-delay-[700ms]"
                        : ""
                    }`}
                  >
                    <h2
                      dangerouslySetInnerHTML={markdownify(
                        data.frontmatter.title,
                      )}
                      className="text-h4 lg:text-h2 mb-2 text-white"
                    />
                  </div>

                  <div
                    className={`${
                      inView
                        ? "animate-fade animate-duration-[400ms] animate-delay-[800ms]"
                        : ""
                    }`}
                  >
                    <p
                      dangerouslySetInnerHTML={markdownify(
                        data.frontmatter.description,
                      )}
                      className={"mb-6 md:text-lg text-white"}
                    />
                  </div>

                  {data.frontmatter.button.enable && (
                    <div
                      className={`${
                        inView
                          ? "animate-fade animate-duration-[400ms] animate-delay-[900ms]"
                          : ""
                      }`}
                    >
                      <Link
                        className="btn btn-primary rounded-full mt-5 hover:bg-dark-grey hover:border-dark-grey"
                        href={data.frontmatter.button.link}
                      >
                        <div className="flex flex-row items-center">
                          {data.frontmatter.button.label}
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

export default CallToAction;
