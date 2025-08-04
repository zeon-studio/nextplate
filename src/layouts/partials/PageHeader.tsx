"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";
import Image from "next/image";
import { markdownify } from "@/lib/utils/textConverter";

const PageHeader = ({
  title,
  subtitle,
  image,
  variant = "default",
}: {
  title: string;
  subtitle?: string;
  image?: string;
  variant?: "default" | "overlayTextBox" | "minimalOverlay";
}) => {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.6}px)`,
  };

  return (
    <section className="relative">
      <div className="container text-center">
        <div
          className={`relative rounded-2xl px-8 py-14 overflow-hidden ${
            image ? "" : "bg-gradient-to-b from-light-green to-theme-light"
          }`}
        >
          {/* Parallax Image */}
          {image && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: -1 }}
            >
              <Image
                src={image}
                alt="Image header"
                fill
                style={parallaxStyle}
                blurDataURL="/images/image-placeholder.png"
                className="object-cover w-full h-auto"
                priority // Preload the image
                quality={80} // Adjust image quality for performance
                sizes="(min-width: 1400px) 1286px, 93.8vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/45 to-black/10"
                style={{ zIndex: 0 }}
              />
            </div>
          )}

          {/* Title, Subtitle, and Breadcrumbs */}

          {variant === "default" && (
            <div className="relative">
              <h1 className={`${image ? "text-white" : "text-dark-grey"}`}>
                {humanize(title)}
              </h1>
              <p
                className={`sm:text-xl sm:col-7 mx-auto ${
                  image ? "text-white" : "text-dark-grey"
                }`}
              >
                {subtitle ? humanize(subtitle) : ""}
              </p>
              <Breadcrumbs
                className={`mt-6 text-lg ${
                  image ? "text-white" : "text-dark-grey"
                }`}
                spanClassName={`${image ? "text-white" : "text-primary"}`}
              />
            </div>
          )}

          {variant === "overlayTextBox" && (
            <div className="relative">
              <div className="absolute left-[470px] top-28">
                <Image
                  src={"/images/sustainability/planet-earth.png"}
                  alt="Ninth Ave Foods Warehouse"
                  className="w-[150px] h-[150px]"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex flex-col justify-start text-left sm:col-6">
                <h1 className={`${image ? "text-white" : "text-dark-grey"} `}>
                  {humanize(title)}
                </h1>

                <p
                  className={`sm:text-xl bg-primary rounded-xs p-9 m-10 ${
                    image ? "text-white" : "text-dark-grey"
                  }`}
                  dangerouslySetInnerHTML={markdownify(
                    subtitle ? subtitle : "",
                  )}
                />
              </div>

              <Breadcrumbs
                className={`mt-6 text-lg ${
                  image ? "text-white" : "text-dark-grey"
                }`}
                spanClassName={`${image ? "text-white" : "text-primary"}`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
