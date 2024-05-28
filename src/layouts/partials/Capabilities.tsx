"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { useInView } from "react-intersection-observer";
import { Capability } from "@/types";

interface PageData {
  frontmatter: {
    capabilities: Array<Capability>;
  };
}

const Capabilities = ({ data }: { data: PageData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <>
      {data.frontmatter.capabilities.map((capability: Capability, index) => (
        <section className="" key={index}>
          <div className="container">
            <div className={`relative row pb-14`}>
              <div
                className={`relative flex flex-row items-center bg-white top-2 px-20 py-14 rounded-xs shadow-lg ${
                  index === 1 ? "left-24" : "right-24"
                }`}
              >
                <div
                  className={`${
                    index === 0 ? "hidden" : "flex items-center w-[400px]"
                  }`}
                >
                  <ImageFallback
                    className="rounded-full w-80 h-80 object-cover shadow-lg"
                    src={capability.image}
                    alt={capability.alt}
                    width={500}
                    height={500}
                  />
                </div>
                <div className="items-center px-10">
                  <div className="flex flex-col md:items-center items-start md:col-12 pb-2">
                    <h5
                      className="text-dark-green font-light tracking-widest pb-2"
                      dangerouslySetInnerHTML={markdownify(capability.title)}
                    />
                  </div>

                  <ul className="animate-fade-up animate-delay-[400ms] ease-in">
                    {capability.bulletpoints &&
                      capability.bulletpoints.map((bullet: string) => (
                        <li className="relative mb-5 pl-8 text-lg" key={bullet}>
                          <svg
                            className="w-7 h-7 absolute left-0 text-[#65a30d]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 12H5m14 0-4 4m4-4-4-4"
                            />
                          </svg>

                          <span
                            className="text-lg"
                            dangerouslySetInnerHTML={markdownify(bullet)}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
                <div
                  className={`${
                    index === 1 ? "hidden" : "flex items-center w-[400px]"
                  }`}
                >
                  <ImageFallback
                    className="rounded-full w-80 h-80 object-cover shadow-lg"
                    src={capability.image}
                    alt={capability.alt}
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Capabilities;
