import config from "@/config/config.json";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import Link from "next/link";
import { getJobPosition } from "../../../sanity/sanity.query";
import type { JobPosition } from "@/types";

// import HeroSvg from "./icons/HeroSvg";
// https://www.sanity.io/learn/course/day-one-with-sanity-studio/bringing-content-to-a-next-js-front-end

const { career } = config.settings;
const job_positions: JobPosition[] = await getJobPosition();
console.log("JOB POS: ", job_positions);

const Career = async () => {
  const data = getListPage(`${career}/_index.md`);

  const { title, meta_title, description, career_title, career_content, link } =
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
                    className="text-primary pb-2 text-h3 lg:text-h2 animate-fade animate-duration-[600ms] ease-in"
                    dangerouslySetInnerHTML={markdownify(career_title)}
                  />
                  <p
                    className="text-lg animate-fade animate-delay-[200ms] ease-in"
                    dangerouslySetInnerHTML={markdownify(career_content)}
                  />
                </div>
              </div>

              <div className="">
                {job_positions &&
                  job_positions.map((data) => (
                    <div
                      key={data._id}
                      className="flex flex-row bg-light-grey shadow-md rounded-lg my-2 px-10 py-1"
                    >
                      <div className="flex-col">
                        <h2 className="text-dark-grey">{data.jobTitle}</h2>
                        <h5 className="text-dark-grey">{data.location}</h5>
                      </div>

                      {/* <button className="self-end ml-auto">
                        Apply to this position
                        <Link key={data._id} href={link} rel="noopener"></Link>
                      </button> */}

                      <Link
                        key={data._id}
                        className="self-end ml-auto"
                        href={{
                          pathname: `/career/employee-application/${slugify(data.jobTitle)}`,
                          query: data,
                        }}
                      >
                        Apply to this position
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div></div>

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
};

export default Career;
