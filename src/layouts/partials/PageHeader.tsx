import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) => {
  return (
    <section className="relative">
      <div className="container text-center">
        <div
          className={`rounded-2xl px-8 py-14 ${
            image
              ? "bg-cover bg-bottom bg-no-repeat"
              : "bg-gradient-to-b from-light-green to-theme-light"
          }`}
          style={
            image
              ? {
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${image})`,
                  backgroundAttachment: "fixed", // Makes the image fixed for parallax effect
                }
              : {}
          }
        >
          <h1 className={`${image ? "text-white" : "text-dark-grey"}`}>
            {humanize(title)}
          </h1>
          <p
            className={`sm:text-xl sm:col-7 mx-auto ${
              image ? "text-white" : "text-dark-grey"
            }`}
          >
            {subtitle ? humanize(subtitle) : ""}
          </p>
          <Breadcrumbs
            className={`mt-6 text-lg ${
              image ? "text-white" : "text-dark-grey"
            }`}
            spanClassName={`${image ? "text-white" : "text-primary"}`}
          />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
