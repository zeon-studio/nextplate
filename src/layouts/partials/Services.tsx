"use client";

import Image from "next/image";
import { markdownify } from "@/lib/utils/textConverter";
import { Service } from "@/types";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface PageData {
  frontmatter: {
    enable?: boolean;
    title: string;
    description: string;
    services: Array<Service>;
    link: string;
    label: string;
  };
}

const Services = ({ data }: { data: PageData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  const renderServiceCard = (service: Service, index: number) => (
    <div
      className={`relative overflow-hidden rounded-lg w-full group ${
        inView
          ? `animate-fade-up animate-duration-[500ms] animate-delay-[${
              400 + (index + 1) * 50
            }ms]`
          : ""
      }`}
      key={index}
    >
      {/* Background Image */}
      <div className="relative">
        <Link href={service.link}>
          <Image
            height={2160}
            width={1440}
            src={service.image}
            alt={service.alt}
            className="object-center-bottom rounded-lg ease-in duration-150 transform hover:scale-110 w-full h-auto md:min-w-[200px] md:h-[650px] min-h-[470px] max-w-[500px]"
            style={{
              filter: "brightness(0.9)",
              objectFit: "cover",
              transition: "transform 0.5s",
            }}
          />
        </Link>

        {/* Content Container */}
        <div
          className="absolute bottom-0 left-0 w-full bg-gray-600 bg-opacity-50 backdrop-blur-lg p-3 border-t border-transparent group-hover:border-lime-500"
          style={{
            transition: "border 0.3s ease-in-out",
          }}
        >
          {/* Coming Soon Ribbon */}
          {inView && index === 3 && (
            <div className="absolute z-20 xl:top-[-225px] xl:right-[280px] lg:top-[-250px] lg:right-[260px] md:top-[-250px] md:right-[240px] sm:top-[-140px] top-[-110px] right-[260px]">
              <div
                className="w-[350px] sm:w-[300px] xl:w-[350px] bg-gradient-to-b from-red-700 to-red-500 text-white text-lg font-semibold py-1 px-2 text-center md:h-[35px] h-[30px]"
                style={{
                  transform: "rotate(35deg)",
                  transformOrigin: "top right",
                  position: "absolute",
                }}
              >
                Coming Soon
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <div className="bg-white w-1/3 rounded-md text-center mb-2">
              <p
                className="text-sm font-medium uppercase p-1 tracking-wide"
                dangerouslySetInnerHTML={markdownify(service.category)}
              ></p>
            </div>

            <h5
              dangerouslySetInnerHTML={markdownify(service.title)}
              className="text-lg font-bold text-white"
            />
          </div>
          <blockquote
            className="mt-2 text-white"
            dangerouslySetInnerHTML={markdownify(service.content)}
          />
          {service.button.enable && (
            <Link
              className="btn btn-transparent rounded-md border-white text-white my-3 hover:bg-primary hover:border-primary hover:text-white"
              href={service.button.link}
            >
              <div className="flex flex-row items-center">
                {service.button.label}
                <svg
                  className="ml-1"
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
    </div>
  );

  const xlGridCols =
    data.frontmatter.services.length === 4
      ? "xl:grid-cols-4"
      : "xl:grid-cols-3";

  return (
    <>
      {data.frontmatter.enable && (
        <section className="section bg-light-green bg-opacity-5 w-full">
          <div className="xl:px-0 px-4 max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
              <div className="flex flex-col text-center md:text-left">
                <h2
                  dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                  className="text-dark-grey md:text-3xl text-h3 pb-4 font-secondary"
                />
                {data.frontmatter.description && (
                  <p
                    className="text-lg mb-8 font-primary"
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description!,
                    )}
                  />
                )}
              </div>

              <Link
                className="ml-3 mb-8 md:mb-0 uppercase font-light text-right rounded-full btn btn-transparent border-primary text-primary hover:bg-dark-grey hover:border-dark-grey hover:text-white"
                href={data.frontmatter.link}
              >
                <div className="flex flex-row text-center md:text-md text-sm">
                  {data.frontmatter.label}
                </div>
              </Link>
            </div>

            <div
              ref={ref}
              className="flex flex-col md:flex-row items-center justify-center"
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-2 ${xlGridCols} gap-4`}
              >
                {data.frontmatter.services.map(renderServiceCard)}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Services;
