"use client";

import { markdownify } from "@/lib/utils/textConverter";
import { useInView } from "react-intersection-observer";
import { Card } from "@/types";
import Link from "next/link";

const BasicCard = ({ card }: { card: Card }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <section className="remb-28 bg-primary rounded-xl">
      <div className="container relative" ref={ref}>
        <div className="h-[300px]">
          <div
            className={`absolute inset-0 px-4 row items-center ${
              inView ? "animate-delay-[500ms]" : ""
            }`}
          >
            <div className="text-center">
              <div
                className={`${
                  inView
                    ? "animate-fade animate-duration-[400ms] animate-delay-[600ms]"
                    : ""
                }`}
              >
                <h2
                  dangerouslySetInnerHTML={markdownify(card.title)}
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
                  dangerouslySetInnerHTML={markdownify(card.content)}
                  className={"mb-6 md:text-lg text-white"}
                />
              </div>

              {card.button.enable && (
                <div
                  className={`${
                    inView
                      ? "animate-fade animate-duration-[400ms] animate-delay-[900ms]"
                      : ""
                  }`}
                >
                  <Link
                    className="btn bg-white mt-5 hover:opacity-90"
                    href={card.button.link}
                  >
                    <div className="flex flex-row items-center text-primary text-lg">
                      {card.button.label}
                      <svg
                        className="text-primary ml-1"
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
  );
};

export default BasicCard;
