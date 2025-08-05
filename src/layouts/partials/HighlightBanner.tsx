"use client";
import Image from "next/image";
import { Highlight } from "@/types";
import { markdownify } from "@/lib/utils/textConverter";
import { useInView } from "react-intersection-observer";

const HighlightBanner = ({ data }: { data: Highlight }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <div
      className="flex flex-row items-center py-8 bg-primary w-full"
      ref={ref}
    >
      {data.logo && (
        <div className="hidden lg:block mr-4 relative lg:left-10 xl:left-40">
          <Image
            height={200}
            width={200}
            src={data.logo}
            alt="Logo"
            className="h-36 w-36"
          />
        </div>
      )}

      <div className="flex flex-col items-center">
        <h2
          dangerouslySetInnerHTML={markdownify(data.title)}
          className={`mb-6 text-white xl:col-8 col-10 ${
            inView ? "animate-fade animate-duration-[600ms] ease-in" : ""
          }`}
        />
        <p
          className={`text-white text-lg xl:col-8 col-10 ${
            inView ? "animate-fade animate-delay-[200ms] ease-in" : ""
          }`}
          dangerouslySetInnerHTML={markdownify(data.subtitle)}
        />

        <div
          className={`flex flex-col pt-4 items-start xl:col-8 col-10 ${
            inView ? "animate-fade animate-delay-[400ms] ease-in" : ""
          }`}
        >
          <p
            className="text-white text-lg"
            dangerouslySetInnerHTML={markdownify(data.detail)}
          />
          <Image
            height={50}
            width={50}
            src="/images/down-arrow.png"
            alt="down-arrow"
            className="flex relative h-8 w-8 right-3 mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default HighlightBanner;
