"use client";

import React from "react";
import PhotoAlbum from "react-photo-album";
import NextJsImage from "@/components/NextJsImage";
import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";

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

const imageStyles = {
  // Define your custom image styles here
  maxWidth: "100%", // Example: Set maximum width to 100%
  height: "auto", // Example: Automatically adjust height
  borderRadius: "8px", // Example: Add border radius
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Example: Add box shadow
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <section>
        <div className="lg:px-10 px-4 py-24 bg-theme-light flex justify-center">
          <div className="col-8">
            <PhotoAlbum
              photos={photos}
              layout="rows"
              onClick={({ index }) => setIndex(index)}
              renderPhoto={NextJsImage}
              defaultContainerWidth={1200}
              sizes={{ size: "calc(100vw - 240px)" }}
            />
          </div>

          <Lightbox
            styles={{
              container: {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              },

              // thumbnailsContainer: {
              //   backgroundColor: "rgba(0, 0, 0, 0.9)",
              // },
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
