import config from "@/config/config.json";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import JobPositionCard from "@/components/JobPositionCard";
import { JobPosition } from "@/types";
import { getJobPositions } from "../../../sanity/sanity.query";

const { career } = config.settings;
const ERROR_RESPONSES = {
  getAllJobPositions: "Failed to fetch all job positions",
  addJobPositions: "Failed to create a new message",
};
const getAllJobPositions = async (): Promise<JobPosition[]> => {
  const result = await fetch(
    "https://silver-olives-try.loca.lt/api/job-positions",
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!result.ok) {
    throw new Error(ERROR_RESPONSES.getAllJobPositions);
  }

  const job_positions = (await result.json()) as JobPosition[];
  return job_positions;
};

const Career = async () => {
  const data = getListPage(`${career}/_index.md`);

  const { title, meta_title, description, career_title, career_content, link } =
    data.frontmatter;

  const callToAction = getListPage("sections/call-to-action.md");
  // const job_positions: JobPosition[] = await getJobPosition();

  const job_positions = await getAllJobPositions();

  const updateJobPositions = async (params: Promise<JobPosition[]>) => {
    "use server";
    const result = await fetch("/api/job-positions", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(params),
    });

    if (!result.ok) {
      throw new Error(ERROR_RESPONSES.addJobPositions);
    }

    const response = (await result.json()) as JobPosition[];
    return response;
  };
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
                  <p
                    className="text-lg animate-fade animate-delay-[200ms] ease-in"
                    dangerouslySetInnerHTML={markdownify(career_content)}
                  />
                </div>
              </div>

              <JobPositionCard
                updateJobPositions={updateJobPositions}
                initialData={job_positions}
              ></JobPositionCard>
            </div>
          </div>
        </div>

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default Career;
