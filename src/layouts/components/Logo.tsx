"use client";

import config from "@/config/config.json";
import useMounted from "@/hooks/useMounted";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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
  const mounted = useMounted();

  // Helper to parse sizes like "24px" or number values.
  const parseSize = (value: string | number | undefined, fallback = 0) => {
    if (typeof value === "number")
      return Number.isFinite(value) ? value : fallback;
    if (!value) return fallback;
    const s = String(value).trim();
    const numeric = s.endsWith("px") ? s.slice(0, -2) : s;
    const n = Number.parseInt(numeric, 10);
    return Number.isFinite(n) ? n : fallback;
  };

  const { imgWidth, imgHeight, resolvedLogo } = useMemo(() => {
    const w = parseSize(logo_width, 0);
    const h = parseSize(logo_height, 0);
    const resolved =
      mounted && (theme === "dark" || resolvedTheme === "dark")
        ? logo_darkmode
        : logo;
    return { imgWidth: w, imgHeight: h, resolvedLogo: resolved };
  }, [
    logo_width,
    logo_height,
    logo,
    logo_darkmode,
    mounted,
    theme,
    resolvedTheme,
  ]);

  const logoPath = src ?? resolvedLogo;

  return (
    <Link href="/" className="navbar-brand inline-block">
      {logoPath ? (
        <Image
          width={imgWidth * 2}
          height={imgHeight * 2}
          src={logoPath}
          alt={title || "Site logo"}
          priority
          style={{
            height: `${imgHeight}px`,
            width: `${imgWidth}px`,
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
