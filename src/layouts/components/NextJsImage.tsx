"use client";

import Image from "next/image";
import type { RenderImageContext, RenderImageProps } from "react-photo-album";

export default function NextJsImage(
  { alt = "", title, className, sizes, onClick }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        position: "relative",
        marginLeft: "5px",
        marginRight: "5px",
        border: "5px",
      }}
    >
      <div className="relative rounded overflow-hidden">
        <Image
          width={width}
          height={height}
          src={photo}
          alt={alt}
          title={title}
          sizes={sizes}
          onClick={onClick}
          placeholder={"blurDataURL" in photo ? "blur" : undefined}
          className={`${className} hover:brightness-75 ease-in duration-150 transform hover:scale-110`}
          style={{
            transition: "transform 0.5s",
            transformOrigin: "center",
          }}
        />
      </div>
    </div>
  );
}
