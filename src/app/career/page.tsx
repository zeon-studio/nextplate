// "use server";

import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import JobPositionCard from "@/components/JobPositionCard";
import { JobPosition } from "@/types";
import { sanityFetch } from "../sanity/sanity.client";
import { getCareerPageContent } from "../sanity/sanity.query";
import { getJobPositions } from "../sanity/sanity.query";

const Career = async () => {
  const data = await getCareerPageContent();
  console.log("DATA: ", data);

  const jobPositions: JobPosition[] = await getJobPositions();
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
      <SeoMeta
        title={data.metaTitle}
        meta_title={data.metaTitle}
        description={data.metaDataDescription}
      />
      <PageHeader title={data.headerTitle} subtitle={data.headerSubtitle} />

      <section className="section">
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
                  className="font-bold text-primary"
                >
                  {data.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* <CallToAction data={callToAction}></CallToAction> */}
      </section>
    </>
  );
};

export default Career;
