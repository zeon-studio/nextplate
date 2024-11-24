"use client";

import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import social from "@/config/social.json";
import { slugSelector } from "@/lib/utils/slugSelector";
import { markdownify } from "@/lib/utils/textConverter";
import { INavigationLink } from "@/types";
import Link from "next/link";

const Footer = ({
  lang,
  menu,
}: {
  lang: string;
  menu: { footer: INavigationLink[] };
}) => {
  const { copyright } = config.params;

  return (
    <footer className="bg-white dark:bg-darkmode-theme-light">
      <div className="border-t border-border py-7 dark:border-darkmode-border"></div>
      <div className="container">
        <div className="row items-center py-10 justify-between">
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:text-left">
            <Logo lang={lang} />
          </div>

          {/* Team Names Section */}
          <div className="text-center lg:col-3 lg:text-left">
            <h3 className="font-bold text-lg mb-4">Our Team</h3>
            <ul className="space-y-2">
              <li>Byron Dray</li>
              <li>Kyle Eeles</li>
              <li>Denis Liu</li>
            </ul>
          </div>

          {/* Additional Content (Optional) */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
