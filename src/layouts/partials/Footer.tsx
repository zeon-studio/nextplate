"use client";

import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import menu from "@/config/menu.json";

// import social from "@/config/social.json";
// import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;

  return (
    <footer className="bg-theme-light ">
      <div className="container">
        <div className="row items-center py-2">
          <div className="mb-8 text-left lg:col-5 lg:mb-0 lg:text-left">
            <Logo
              rest={{
                height: "50",
                width: "123",
                className: "grayscale filter",
              }}
            />
          </div>
          <div className="mb-8 text-center lg:col-2 lg:mb-0 lg:mt-0 lg:text-center">
            <p>All Rights Reserved 2022</p>
            {/* <Social source={social} className="social-icons" /> */}
          </div>
          <div className="mb-8 text-right lg:col-5 lg:mb-0">
            <ul>
              {menu.footer.map((menu) => (
                <li className="m-3 inline-block" key={menu.name}>
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
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
