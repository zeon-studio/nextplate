// "use server";

import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import JobPositionCard from "@/components/JobPositionCard";
import { getJobPositions } from "../sanity/sanity.query";
import { JobPosition } from "@/types";
import { sanityFetch } from "../sanity/sanity.client";

const { career } = config.settings;
// export const dynamic = "force-dynamic";

const Career = async () => {
  // const data = getListPage(`${career}/_index.md`);

  // const jobPositions: JobPosition[] = await getJobPositions();
  // const jobPositions: JobPosition[] = [];
  // console.log("Fetched job positions: ", jobPositions);

  // const { title, meta_title, description, career_title, career_content, link } =
  //   data.frontmatter;
  // const callToAction = getListPage("sections/call-to-action.md");

  // const jobPositions: JobPosition[] = await sanityFetch({
  //   query: `*[_type == "jobPosition"]`,
  //   tags: ["jobPosition"],
  // });
  // const jobPositions = await sanityFetch<JobPosition[]>({
  //   query: `*[_type == "jobPosition"]`,
  //   revalidate: 20, // update every 20 seconds
  // });

  return (
    <>
      {/* <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
      />
      <PageHeader
        title={data.frontmatter.title}
        subtitle={data.frontmatter.subtitle}
      /> */}

      <section className="section">
        <div className="container pb-14">
          <div className="w-full">
            <div className="lg:col-11">
              <div className="row">
                <div className="relative">
                  {/* <h2
                    className="text-dark-grey pb-6 text-h3 lg:text-h2 animate-fade animate-duration-[600ms] ease-in"
                    dangerouslySetInnerHTML={markdownify(career_title)}
                  /> */}
                </div>
              </div>
              <JobPositionCard></JobPositionCard>
              {/* <p
                className="text-lg animate-fade animate-delay-[200ms] ease-in"
                dangerouslySetInnerHTML={markdownify(career_content)}
              /> */}
            </div>
          </div>
        </div>
        {/* <CallToAction data={callToAction}></CallToAction> */}
      </section>
    </>
  );
};

export default Career;
