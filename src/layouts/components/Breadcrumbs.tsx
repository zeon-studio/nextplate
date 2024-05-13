"use client";

import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = ({
  className = "mt-6",
  lang,
}: {
  className?: string;
  lang: string;
}) => {
  const pathname = usePathname();
  const paths = pathname
    .replace(`/${lang}`, "")
    .split("/")
    .filter((x) => x);

  let parts = [
    {
      label: "Home",
      href: "/",
      "aria-label": pathname === "/" ? "page" : undefined,
    },
  ];

  paths.forEach((label: string, i: number) => {
    const href = `/${paths.slice(0, i + 1).join("/")}`;
    label !== "page" &&
      parts.push({
        label: humanize(label.replace(/[-_]/g, " ")) || "",
        href,
        "aria-label": pathname === href ? "page" : undefined,
      });
  });

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="inline-flex" role="list">
        {parts.map(({ label, ...attrs }, index) => (
          <li className="mx-1 capitalize" role="listitem" key={index}>
            {index > 0 && <span className="inline-block mr-1">/</span>}
            {index !== parts.length - 1 ? (
              <Link
                className="text-primary dark:text-darkmode-primary"
                {...attrs}
              >
                {label}
              </Link>
            ) : (
              <span className="text-light dark:text-darkmode-light">
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
