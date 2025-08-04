"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ExpandableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

const ExpandableImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  fill = false,
  priority = false,
}: ExpandableImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`${fill ? "relative w-full h-full" : ""} cursor-pointer`}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          className={`${fill ? "object-cover" : ""} ${className}`}
          {...(fill ? { fill: true, sizes: "100vw" } : { width, height })}
          priority={priority}
        />
      </div>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={[{ src }]}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      )}
    </>
  );
};

export default ExpandableImage;
