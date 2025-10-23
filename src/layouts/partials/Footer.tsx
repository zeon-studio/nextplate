import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import social from "@/config/social.json";
import { markdownify } from "@/lib/utils/textConverter";
import { SiteMenu } from "@/types";
import Link from "next/link";

const Footer = ({ currentLocaleMenu }: { currentLocaleMenu: SiteMenu }) => {
  const { copyright } = config.params;

  return (
    <footer className="bg-light dark:bg-darkmode-light">
      <div className="container">
        <div className="row items-center py-10">
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:text-left">
            <Logo />
          </div>
          <div className="mb-8 text-center lg:col-6 lg:mb-0">
            <ul>
              {currentLocaleMenu.footer.map((menu) => (
                <li className="m-3 inline-block" key={menu.name}>
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:mt-0 lg:text-right">
            <Social source={social.main} className="social-icons" />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-7 dark:border-darkmode-border">
        <div className="container text-center text-text-light dark:text-darkmode-text-light">
          <p dangerouslySetInnerHTML={markdownify(copyright)} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
