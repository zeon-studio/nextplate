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
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [index, setIndex] = useState(-1);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });
  return (
    <>
      <section>
        <div className="lg:px-10 py-28 bg-white flex justify-center items-center text-center">
          <div className="md:col-8 col-10">
            <div className="mx-auto mb-12 text-center md:col-10">
              <h3 className="mb-4 text-h3 lg:text-h2 text-dark-grey">
                Elevating Your Brand with{" "}
                <span className="text-primary">Ninth Avenue Foods</span>
              </h3>

              <p className="mb-8 text-lg">
                From Tradition to Technology: A Heritage of <b>Excellence</b> in
                Dairy Manufacturing
              </p>
            </div>

            <div
              ref={ref}
              className={`${inView ? "mx-auto col-10 animate-fade" : ""}`}
            >
              <PhotoAlbum
                photos={photos}
                layout="rows"
                onClick={({ index }) => setIndex(index)}
                renderPhoto={NextJsImage}
                defaultContainerWidth={1200}
                sizes={{ size: "calc(100vw - 240px)" }}
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
