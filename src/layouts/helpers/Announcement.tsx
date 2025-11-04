"use client";

import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { useI18n } from "@/locales/client";
import React, { useEffect, useState } from "react";

const { enable, expire_days } = config.announcement;

interface AnnouncementProps {
  locale?: string;
}

const Cookies = {
  set: (name: string, value: string, options: any = {}) => {
    if (typeof document === "undefined") return;

    const defaults = { path: "/" };
    const opts = { ...defaults, ...options };

    if (typeof opts.expires === "number") {
      opts.expires = new Date(Date.now() + opts.expires * 864e5);
    }
    if (opts.expires instanceof Date) {
      opts.expires = opts.expires.toUTCString();
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (let key in opts) {
      if (!opts[key]) continue;
      cookieString += `; ${key}`;
      if (opts[key] !== true) {
        cookieString += `=${opts[key]}`;
      }
    }

    document.cookie = cookieString;
  },

  get: (name: string): string | null => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (decodeURIComponent(key) === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  },

  remove: (name: string, options: any = {}) => {
    Cookies.set(name, "", { ...options, expires: -1 });
  },
};

const Announcement: React.FC<AnnouncementProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useI18n();

  useEffect(() => {
    const announcementContent = t("announcement");

    const hasCookie = Cookies.get("announcement-close");
    // console.log("Announcement Debug:", {
    //   enable,
    //   announcementContent,
    //   hasCookie,
    //   locale,
    // });

    if (enable && announcementContent && !hasCookie) {
      setIsVisible(true);
    }
  }, [t]);

  const handleClose = () => {
    Cookies.set("announcement-close", "true", {
      expires: expire_days,
    });
    setIsVisible(false);
  };

  const announcementContent = t("announcement");

  if (!enable || !isVisible || !announcementContent) {
    return null;
  }

  return (
    <div className="relative z-999 bg-body dark:bg-darkmode-body shadow-[1px_0_10px_7px_rgba(154,154,154,0.11)] px-4 py-4 pr-12 md:text-lg transition-all duration-300">
      <p
        dangerouslySetInnerHTML={markdownify(announcementContent)}
      />
      <button
        onClick={handleClose}
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer flex items-center justify-center w-7 h-7 border border-border dark:border-darkmode-border rounded-full text-xl transition-colors duration-200"
        aria-label="Close announcement"
      >
        &times;
      </button>
    </div>
  );
};

export default Announcement;
