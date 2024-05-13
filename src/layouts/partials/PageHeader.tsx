import { humanize } from "@/lib/utils/textConverter";
import React from "react";

const PageHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <section>
      <div className="container text-center">
        <div className="rounded-2xl bg-gradient-to-b from-body to-theme-light px-8 py-14 dark:from-darkmode-body dark:to-darkmode-theme-light">
          <h1>{humanize(title)}</h1>
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
