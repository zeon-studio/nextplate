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
        margin: "4px",
        border: "5px",
      }}
    >
      <div className="relative rounded h-full w-full overflow-hidden">
        <Image
          fill
          src={photo}
          placeholder={"blurDataURL" in photo ? "blur" : undefined}
          {...{ alt, title, sizes, onClick }}
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
