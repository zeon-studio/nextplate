import { humanize } from "@/lib/utils/textConverter";
import ImageFallback from "@/helpers/ImageFallback";
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
  return (
    <div className="lg:col-4">
      <div className="mb-8">
        <h5 className="mb-6 text-dark-grey">{side_bar_title}</h5>
        <div className="rounded bg-theme-light p-8">
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
                      className="flex justify-between text-dark-grey"
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
    </div>
  );
};

export default Sidebar;
