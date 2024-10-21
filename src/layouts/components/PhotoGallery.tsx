"use client";

import React from "react";
import PhotoAlbum from "react-photo-album";
import NextJsImage from "@/components/NextJsImage";
import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import { useInView } from "react-intersection-observer";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

//Adjust
const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [index, setIndex] = useState(-1);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });
  return (
    <>
      <section>
        <div className="lg:px-10 pb-28 bg-white flex justify-center items-center text-center">
          <div className="md:col-9 col-12">
            <div
              ref={ref}
              className={`mx-auto md:col-11 col-10 ${inView ? "animate-fade" : ""}`}
            >
              <PhotoAlbum
                photos={photos}
                layout="rows"
                onClick={({ index }) => setIndex(index)}
                render={{ image: NextJsImage }}
                defaultContainerWidth={1200}
                breakpoints={[290, 950, 1200, 1500, 2000]}
              />
            </div>
          </div>

          <Lightbox
            styles={{
              container: {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              },
            }}
            slides={photos}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            // enable optional lightbox plugins
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </div>
      </section>
    </>
  );
};

export default PhotoGallery;
