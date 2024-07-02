"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { useInView } from "react-intersection-observer";
import { Our_locations } from "@/types";

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
    <div className="px-10" ref={ref1}>
      <section>
        {/* Our location */}
        <div className="flex flex-col items-center justify-center">
          <div className="md:col-8 lg:col-6 col-10">
            <h2
              dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
              className="mb-6 text-center text-primary animate-fade animate-duration-[600ms] ease-in"
            />
            <p
              className="md:pb-8 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
              dangerouslySetInnerHTML={markdownify(data.frontmatter.subtitle)}
            />
          </div>

          {/* Render each location */}
          {data.frontmatter.our_locations.map(
            (locations: Our_locations, index) => (
              <div key={index}>
                {/* Location 1 */}
                {index === 0 && (
                  <div
                    className={`flex flex-col items-center justify-center md:pt-0 pt-8 ${
                      inView1
                        ? "animate-fade-up animate-duration-[500ms] animate-delay-[400ms]"
                        : ""
                    }`}
                  >
                    <div className="md:col-8 xl:col-6 col-10">
                      <div className="flex md:flex-row flex-col items-center justify-center">
                        <ImageFallback
                          className="mb:md-0 md:col-8 lg:col-6 mx-auto mb-6 rounded-sm object-cover animate-fade animate-delay-[300ms] ease-in"
                          src={locations.image}
                          width={600}
                          height={600}
                          alt={locations.alt}
                        />

                        <div className="flex-col md:pl-10">
                          <h4
                            dangerouslySetInnerHTML={markdownify(
                              locations.location_title,
                            )}
                            className="mb-6 text-primary animate-fade animate-duration-[600ms] ease-in"
                          />
                          <p
                            className="md:pb-8 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
                            dangerouslySetInnerHTML={markdownify(
                              locations.location_content,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location 2 */}
                {index === 1 && (
                  <div
                    className={`flex flex-col items-center justify-center pb-24 md:pt-0 pt-8 ${
                      inView1
                        ? "animate-fade-up animate-duration-[500ms] animate-delay-[400ms]"
                        : ""
                    }`}
                  >
                    <div className="md:col-8 xl:col-6 col-10">
                      <div className="flex md:flex-row flex-col items-center justify-center">
                        <div className="flex-col md:pr-10">
                          <h4
                            dangerouslySetInnerHTML={markdownify(
                              locations.location_title,
                            )}
                            className="mb-6 text-primary animate-fade animate-duration-[600ms] ease-in"
                          />
                          <p
                            className="md:pb-8 text-dark-grey text-lg animate-fade animate-delay-[200ms] ease-in"
                            dangerouslySetInnerHTML={markdownify(
                              locations.location_content,
                            )}
                          />
                        </div>
                        <ImageFallback
                          className="mb:md-0 md:col-8 lg:col-6 mx-auto mb-6 md:mt-0 mt-6 rounded-sm object-cover animate-fade animate-delay-[300ms] ease-in"
                          src={locations.image}
                          width={600}
                          height={600}
                          alt={locations.alt}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
};

export default OurLocations;
