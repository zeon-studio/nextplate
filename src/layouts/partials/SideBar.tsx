"use client";

import { humanize } from "@/lib/utils/textConverter";
import ImageFallback from "@/helpers/ImageFallback";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const Sidebar = ({
  side_bar_title,
  categories,
  title,
}: {
  side_bar_title: string;
  categories: { [key: string]: string };
  title: string;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <div ref={ref} className="mb-8">
      <h5 className="mb-6 text-dark-grey animate-fade">{side_bar_title}</h5>
      <div className="rounded bg-light-green bg-opacity-5 p-8 animate-fade animate-duration-300 animate-ease-linear">
        <ul className="space-y-4">
          {Object.entries(categories).map(([key, value]) => (
            <div
              key={key}
              className={`${
                key === title
                  ? "bg-light-green"
                  : side_bar_title === "Our Services"
                    ? "bg-white"
                    : "bg-white hover:bg-light-green"
              } px-4 py-2 rounded-lg font-semibold`}
            >
              <li key={value}>
                {side_bar_title === "Our Services" ? (
                  <div className="flex flex-row items-center">
                    <ImageFallback
                      height="512"
                      width="512"
                      src={value}
                      alt={`${String(value)} icon`}
                      className="w-[40px] mr-4"
                    />
                    <p className="flex justify-between text-dark-grey text-lg">
                      {humanize(key)}
                    </p>
                  </div>
                ) : (
                  <Link
                    className={`flex justify-between text-dark-grey`}
                    href={`/${value}`}
                  >
                    <p className="text-lg">{humanize(key)}</p>
                  </Link>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
