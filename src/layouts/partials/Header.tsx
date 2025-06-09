"use client";

import Logo from "@/components/Logo";
// import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  const pathname = usePathname();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  const closeMenu = () => {
    const navToggle: HTMLInputElement | null = document.getElementById(
      "nav-toggle",
    ) as HTMLInputElement;
    if (navToggle) {
      navToggle.checked = false;
    }
  };

  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <header
      className={`header z-30 backdrop-blur-md bg-white/90 shadow-md ${
        settings.sticky_header && "sticky top-0"
      }`}
    >
      <nav className="navbar container font-secondary">
        <div className="order-0">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-dark-grey lg:order-1"
        >
          <svg className="h-6 fill-current block" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg className="h-6 fill-current hidden" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>

        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 hover:text-primary hover:bg-primary/5 cursor-pointer inline-flex items-center ${
                      menu.children?.some(({ url }) =>
                        [url, `${url}/`].includes(pathname),
                      )
                        ? "text-primary font-semibold bg-primary/10"
                        : ""
                    }`}
                  >
                    {menu.name}
                    <svg
                      className="ml-1 h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul
                    id="nav-toggle-dropdown"
                    // className="z-20 nav-dropdown-list hidden group-hover:block lg:absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 ease-out bg-white shadow-lg rounded-md mt-2"
                    className="z-20 nav-dropdown-list hidden group-hover:block lg:absolute"
                  >
                    {menu.children?.map((child, j) => (
                      <li className="nav-dropdown-item" key={`children-${j}`}>
                        <Link
                          href={child.url}
                          className={`block px-4 py-2 text-sm transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${
                            [child.url, `${child.url}/`].includes(pathname)
                              ? "text-primary font-semibold"
                              : ""
                          }`}
                          onClick={closeMenu}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    href={menu.url}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 hover:text-primary hover:bg-primary/5 ${
                      [menu.url, `${menu.url}/`].includes(pathname)
                        ? "text-primary font-semibold bg-primary/10"
                        : ""
                    }`}
                    onClick={closeMenu}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
          {navigation_button.enable && (
            <li className=" mt-4 inline-block lg:hidden">
              <Link
                className="btn bg-primary/90 border border-primary text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-primary hover:brightness-110"
                href={navigation_button.link}
                onClick={closeMenu}
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>

        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
          {settings.search && (
            <button
              className="border-border text-dark hover:text-primary mr-5 inline-block border-r pr-5 text-xl transition-colors duration-200"
              aria-label="search"
              data-search-trigger
            >
              <IoSearch />
            </button>
          )}
          {navigation_button.enable && (
            <Link
              className="btn hidden lg:inline-block border border-primary text-primary hover:bg-primary hover:text-white hover:border-primary px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200"
              href={navigation_button.link}
              onClick={closeMenu}
            >
              {navigation_button.label}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
