"use client";

import Image from "next/image";
import { markdownify } from "@/lib/utils/textConverter";
import { useInView } from "react-intersection-observer";
import { Our_locations } from "@/types";
import { FaCheck } from "react-icons/fa6";
import ExpandableImage from "./ExpandableImage";

interface PageData {
  frontmatter: {
    title: string;
    subtitle: string;
    our_locations: Array<Our_locations>;
  };
}

const OurLocations = ({ data }: { data: PageData }) => {
  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <section ref={ref1} className="section-sm">
      {/* Our location */}
      <div className="container">
        <div className="flex flex-col items-center justify-center mx-1">
          <div className="flex flex-col items-center justify-center text-center">
            <h2
              dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
              className="mb-6 text-dark-grey animate-fade animate-duration-[600ms] ease-in"
            />
            <p
              className="text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
              dangerouslySetInnerHTML={markdownify(data.frontmatter.subtitle)}
            />

            <div className="sm:w-1/2 w-3/4 h-[2px] bg-gradient-to-r from-light-green via-green-500 to-dark-green mt-4"></div>
          </div>

          <div className="flex flex-col items-center justify-center">
            {data.frontmatter.our_locations.map(
              (locations: Our_locations, index) => (
                <div
                  key={index}
                  className={`w-full pt-20 ${
                    inView1
                      ? "animate-fade-up animate-duration-[500ms] animate-delay-[400ms]"
                      : ""
                  }`}
                >
                  <div
                    className={`flex flex-col-reverse lg:flex-row ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-8 items-center w-full`}
                  >
                    {/* Image */}
                    <ExpandableImage
                      className="w-full h-auto rounded-md shadow-md object-cover"
                      src={locations.image}
                      width={1280}
                      height={720}
                      alt={locations.alt}
                    />

                    {/* Text */}
                    <div className="w-full">
                      <h3
                        dangerouslySetInnerHTML={markdownify(
                          locations.location_title,
                        )}
                        className="mb-2 text-primary font-primary animate-fade animate-duration-[600ms] ease-in"
                      />
                      <p
                        className="pb-3 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
                        dangerouslySetInnerHTML={markdownify(
                          locations.location_content,
                        )}
                      />
                      <ul className="animate-fade-up animate-delay-[400ms] ease-in text-lg py-2 list-disc pl-5">
                        {locations.bulletpoints?.map((point, i) => (
                          <li
                            key={i}
                            dangerouslySetInnerHTML={markdownify(point)}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocations;
