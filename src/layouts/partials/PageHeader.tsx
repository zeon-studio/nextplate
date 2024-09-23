"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";
import Image from "next/image";

const PageHeader = ({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
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
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%", // Full width
    height: "350px",
    transform: `translateY(${scrollY * 0.6}px)`, // Adjust the scroll speed (0.6 for a parallax effect)
  };
  return (
    <section className="relative">
      <div className="container text-center">
        <div
          className={`relative rounded-2xl px-8 py-14 overflow-hidden ${
            image ? "" : "bg-gradient-to-b from-light-green to-theme-light"
          }}
        }`}
        >
          {/* Parallax Image */}
          {image && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: -1 }}
            >
              <img
                src={image}
                alt="Image header"
                style={parallaxStyle} // Apply the parallax effect
                className="object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/45 to-black/10"
                style={{ zIndex: 0 }}
              />
            </div>
          )}

          {/* Title, Subtitle, and Breadcrumbs */}
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
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
