import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";

export default function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div
      style={{
        ...wrapperStyle,
        position: "relative",
        margin: "3px",
        border: "5px",
      }}
    >
      <div className="relative rounded h-full w-full overflow-hidden">
        <Image
          fill
          src={photo.src} // Ensure you are passing the correct src
          alt={alt}
          title={title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes as necessary
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
