"use client";

import Image from "next/image";
import { markdownify } from "@/lib/utils/textConverter";
import { useInView } from "react-intersection-observer";
import { Our_locations } from "@/types";
import { HiArrowLongRight } from "react-icons/hi2";
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
    <section ref={ref1}>
      {/* Our location */}

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
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse mt-14"
                } md:gap-8 gap-12 items-center`}
              >
                {/* Image */}
                <div className="lg:h-[570px] md:h-[400px] h-[250px] sm:h-[350px] xl:w-5/6 w-full relative bottom-20">
                  <h3
                    dangerouslySetInnerHTML={markdownify(
                      locations.location_title,
                    )}
                    className="mb-8 text-dark-grey font-primary animate-fade animate-duration-[600ms] ease-in"
                  />
                  <ExpandableImage
                    className="rounded-sm shadow-md"
                    src={locations.image}
                    fill
                    alt={locations.alt}
                  />
                </div>

                {/* Text */}
                <div
                  className={`flex flex-col xl:w-4/5 w-full  ${
                    index % 2 === 0 ? "" : ""
                  } `}
                >
                  <p
                    className="pb-6 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
                    dangerouslySetInnerHTML={markdownify(
                      locations.location_content,
                    )}
                  />
                  <ul className="animate-fade-up animate-delay-[400ms] ease-in text-lg lg:col-9">
                    {locations.bulletpoints?.map((point, i) => (
                      <li className="relative mb-4 pl-6" key={i}>
                        <HiArrowLongRight
                          color="#65a30d"
                          className={"absolute left-0 top-1.5"}
                        />
                        <span dangerouslySetInnerHTML={markdownify(point)} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default OurLocations;
