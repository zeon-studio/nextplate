"use client";

import config from "@/config/config.json";
import { DiscussionEmbed } from "disqus-react";
import { useTheme } from "next-themes";

const Disqus = ({ className }: { className?: string }) => {
  const { disqus } = config;
  const { theme } = useTheme();

  return (
    <div className={className} key={theme}>
      {disqus.enable && (
        <DiscussionEmbed
          shortname={disqus.shortname}
          config={disqus.settings}
        />
      )}
    </div>
  );
};

export default Disqus;
