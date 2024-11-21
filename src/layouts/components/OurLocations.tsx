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
      <div className="flex flex-col items-center justify-center md:col-8 mx-auto">
        <div className="text-left">
          <h2
            dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
            className="mb-6 text-center text-primary animate-fade animate-duration-[600ms] ease-in"
          />
          <p
            className="md:pb-8 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
            dangerouslySetInnerHTML={markdownify(data.frontmatter.subtitle)}
          />
        </div>

        <div className="flex flex-col items-center justify-center md:pt-10 pt-8">
          {data.frontmatter.our_locations.map(
            (locations: Our_locations, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center md:pt-10 pt-8 ${
                  inView1
                    ? "animate-fade-up animate-duration-[500ms] animate-delay-[400ms]"
                    : ""
                }`}
              >
                <div
                  className={`flex ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col items-center justify-between`}
                >
                  {/* Expandable Image */}
                  <ExpandableImage
                    className={`w-full h-auto mb:md-0 md:col-9 md:mt-0 mt-6 rounded-sm object-cover animate-fade animate-delay-[300ms] ease-in ${
                      index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                    src={locations.image}
                    width={1280}
                    height={720}
                    alt={locations.alt}
                  />

                  {/* Text Content */}
                  <div
                    className={`flex-col md:mt-0 mt-6 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}
                  >
                    <h4
                      dangerouslySetInnerHTML={markdownify(
                        locations.location_title,
                      )}
                      className="mb-6 text-primary font-primary animate-fade animate-duration-[600ms] ease-in"
                    />
                    <p
                      className="md:pb-8 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
                      dangerouslySetInnerHTML={markdownify(
                        locations.location_content,
                      )}
                    />
                    <ul className="animate-fade-up animate-delay-[400ms] ease-in">
                      {locations.bulletpoints &&
                        locations.bulletpoints.map((bullet: string) => (
                          <li className="relative mb-4 pl-6" key={bullet}>
                            <FaCheck
                              color="#65a30d"
                              className={"absolute left-0 top-1.5"}
                            />
                            <span
                              dangerouslySetInnerHTML={markdownify(bullet)}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default OurLocations;
