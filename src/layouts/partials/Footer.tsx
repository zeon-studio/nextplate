"use client";

import Logo from "@/components/Logo";
import ScrollLink from "@/components/ScrollLink";
import Social from "@/components/Social";
import config from "@/config/config.json";
import menu from "@/config/menu.json";

// import social from "@/config/social.json";
// import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { copyright } = config.params;
  const pathname = usePathname();

  return (
    <footer className="bg-theme-light ">
      <div className="container">
        <div className="row items-center py-2">
          <div className="mb-8 text-left lg:col-4 lg:mb-0 lg:text-left">
            <Logo
              rest={{
                height: "42",
                width: "123",
              }}
            />
          </div>
          <div className="mb-8 text-center lg:col-4 lg:mb-0 lg:mt-0 lg:text-center">
            <p style={{ borderBottom: "1px solid #bcbcbc" }}>
              contact: <strong>paliwal309@gmail.com</strong>
            </p>
            <p>© 2023 Novelty Creations. All rights reserved.</p>
            {/* <Social source={social} className="social-icons" /> */}
          </div>
          <div className="mb-8 text-right lg:col-4 lg:mb-0">
            <ul>
              {pathname !== "/privacy-policy" ? (
                <li className="m-3 inline-block" key="About">
                  <ScrollLink href="/home#our-story">Our Story</ScrollLink>
                </li>
              ) : (
                <li className="m-3 inline-block" key="About">
                  <Link href="/">Home</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="border-t border-border py-7 ">
        <div className="container text-center text-light ">
          <p dangerouslySetInnerHTML={markdownify(copyright)} />
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
