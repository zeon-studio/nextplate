//"use server";

import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import JobPositionCard from "@/components/JobPositionCard";
import { sanityFetch } from "../../../sanity/sanity.client";
import { getJobPositions, jobPositionsQuery } from "../../../sanity/sanity.query";
import { JobPosition } from "@/types";

const { career } = config.settings;
const Career = async () => {
  const data = getListPage(`${career}/_index.md`);
  const { title, meta_title, description, career_title, career_content, link } =
    data.frontmatter;
  const callToAction = getListPage("sections/call-to-action.md");

  // const jobPositions: JobPosition[] = await sanityFetch({
  //   query: jobPositionsQuery,
  //   tags: ["jobPosition"],
  // });
  
  const jobPositions: JobPosition[] = await getJobPositions();

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
      />
      <PageHeader
        title={data.frontmatter.title}
        subtitle={data.frontmatter.subtitle}
      />

      <section className="section">
        <div className="container pb-14">
          <div className="w-full">
            <div className="lg:col-11">
              <div className="row">
                <div className="relative">
                  <h2
                    className="text-dark-grey pb-6 text-h3 lg:text-h2 animate-fade animate-duration-[600ms] ease-in"
                    dangerouslySetInnerHTML={markdownify(career_title)}
                  />
                </div>
              </div>
              <JobPositionCard jobPositions={jobPositions}></JobPositionCard>
              <p
                className="text-lg animate-fade animate-delay-[200ms] ease-in"
                dangerouslySetInnerHTML={markdownify(career_content)}
              />
            </div>
          </div>
        </div>
        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default Career;
