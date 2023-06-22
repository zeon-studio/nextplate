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
                height: "50",
                width: "123",
              }}
            />
          </div>
          <div className="mb-8 text-center lg:col-4 lg:mb-0 lg:mt-0 lg:text-center">
            <p style={{ borderBottom: "1px solid #bcbcbc" }}>
              contact: <strong>info@thehroad.com</strong>
            </p>
            <p>© 2023 H Road. All rights reserved.</p>
            {/* <Social source={social} className="social-icons" /> */}
          </div>
          <div className="mb-8 text-right lg:col-4 lg:mb-0">
            <ul>
              {pathname !== "/privacy-policy" ? (
                <li className="m-3 inline-block" key="About">
                  <ScrollLink href="/home#about">About</ScrollLink>
                </li>
              ) : (
                <li className="m-3 inline-block" key="About">
                  <Link href="/">Home</Link>
                </li>
              )}
              <li className="m-3 inline-block" key="Privacy Policy">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
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
