// "use server";

import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import JobPositionCard from "@/components/JobPositionCard";
import { JobPosition } from "@/types";
import { getCareerPageContent } from "../sanity/sanity.query";
import { getJobPositions } from "../sanity/sanity.query";

const Career = async () => {
  const data = await getCareerPageContent();

  const jobPositions: JobPosition[] = await getJobPositions();
  const callToAction = {
    frontmatter: {
      enable: true,
      title: "Connect to learn more about partnership opportunities",
      image: "/images/call-to-action.png",
      description:
        "To inquire about our current packaging capabilities for fluid packaging, yogurt packaging, sour cream packaging, and ice-cream and dairy-alternative packaging, connect with us.",
      button: {
        enable: true,
        label: "Contact Us",
        link: "/contact",
      },
    },
  };

  return (
    <>
      <SeoMeta
        title={data.metaTitle}
        meta_title={data.metaTitle}
        description={data.metaDataDescription}
      />
      <PageHeader title={data.headerTitle} subtitle={data.headerSubtitle} />

      <section className="section-sm">
        <div className="container pb-14">
          <div className="w-full">
            <div className="lg:col-11">
              <div className="row">
                <div className="relative">
                  <h2 className="text-dark-grey pb-6 text-h3 lg:text-h2 animate-fade animate-duration-[600ms] ease-in">
                    {data.title}
                  </h2>
                </div>
              </div>
              <JobPositionCard jobPositions={jobPositions}></JobPositionCard>

              <p className="text-lg animate-fade animate-delay-[200ms] ease-in">
                *For all employment-related inquiries, please contact{" "}
                <a
                  href={`mailto:${data.contactEmail}`}
                  title="Contact email for employment-realted inquiries"
                  className="font-bold text-primary"
                >
                  {data.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default Career;
