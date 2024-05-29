import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <section>
      <div className="container text-center">
        <div className="rounded-2xl bg-gradient-to-b from-light-green to-theme-light px-8 py-14">
          <h1 className="text-dark-grey">{humanize(title)}</h1>
          <p className="text-dark-grey sm:text-xl sm:col-7 mx-auto">
            {subtitle ? humanize(subtitle) : ""}
          </p>
          <Breadcrumbs className="mt-6 text-lg" />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
