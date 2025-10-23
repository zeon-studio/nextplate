"use client";

import config from "@/config/config.json";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = ({ src }: { src?: string }) => {
  // destructuring items from config object
  const {
    logo,
    logo_darkmode,
    logo_width,
    logo_height,
    logo_text,
    title,
  }: {
    logo: string;
    logo_darkmode: string;
    logo_width: string | number;
    logo_height: string | number;
    logo_text: string;
    title: string;
  } = config.site;

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolvedLogo =
    mounted && (theme === "dark" || resolvedTheme === "dark")
      ? logo_darkmode
      : logo;
  const logoPath = src ? src : resolvedLogo;

  // Convert width and height to numbers
  const width = typeof logo_width === 'string' ? parseInt((logo_width as string).replace("px", "")) : logo_width;
  const height = typeof logo_height === 'string' ? parseInt((logo_height as string).replace("px", "")) : logo_height;

  return (
    <Link href="/" className="navbar-brand inline-block">
      {logoPath ? (
        <Image
          width={width * 2}
          height={height * 2}
          src={logoPath}
          alt={title}
          priority
          style={{
            height: `${height}px`,
            width: `${width}px`,
          }}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
