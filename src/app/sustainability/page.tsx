import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";

const { sustainability_folder } = config.settings;

const Sustainability = () => {
  const data = getListPage(`${sustainability_folder}/_index.md`);

  const { title, subtitle, meta_title, description, page_header_image } =
    data.frontmatter;

  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
      />
      <PageHeader
        title={title}
        subtitle={subtitle}
        image={page_header_image}
        variant="overlayTextBox"
      />
      <section className="section-sm">
        <div className="container pb-14"></div>

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default Sustainability;
