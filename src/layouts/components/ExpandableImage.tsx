"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ExpandableImage = ({ src, alt, className, width, height }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail Image */}
      <div className={`cursor-pointer`} onClick={() => setIsOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className} relative w-full h-full`}
        />
      </div>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={[{ src }]} // You can add more images to the slides array if needed
          render={{
            buttonPrev: () => null, // Disable previous button
            buttonNext: () => null, // Disable next button
          }}
        />
      )}
    </>
  );
};

export default ExpandableImage;
