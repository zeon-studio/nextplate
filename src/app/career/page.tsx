import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";

import { getJobPosition, getProfile } from "../../../sanity/sanity.query";
import type { ProfileType } from "@/types";
import type { JobPosition } from "@/types";
// import HeroSvg from "./icons/HeroSvg";
// https://www.sanity.io/learn/course/day-one-with-sanity-studio/bringing-content-to-a-next-js-front-end

const { career } = config.settings;
const profile: ProfileType[] = await getProfile();
const job_positions: JobPosition[] = await getJobPosition();
// console.log("POSITIONS: ", profile);

async function Career() {
  const data = getListPage(`${career}/_index.md`);

  const { title, meta_title, description, career_title, career_content } =
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
            </div>
          </div>
        </div>
        <div>
          {job_positions &&
            job_positions.map((data) => (
              <div key={data._id} className="text-black">
                <h2>{data.jobTitle}</h2>
                <h5>
                  <h2>{data.location}</h2>
                </h5>
              </div>
            ))}
        </div>
        {/* 
        <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
          {profile &&
            profile.map((data) => (
              <div key={data._id} className="lg:max-w-2xl max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                  {data.headline}
                </h1>
                <p className="text-base text-zinc-400 leading-relaxed">
                  {data.shortBio}
                </p>
                <ul className="flex items-center gap-x-6 my-10">
                  {Object.entries(data.socialLinks)
                    .sort()
                    .map(([key, value], id) => (
                      <li key={id}>
                        <a
                          href={value}
                          rel="noreferer noopener"
                          className="flex items-center gap-x-3 mb-5 hover:text-purple-400 duration-300"
                        >
                          {key[0].toUpperCase() + key.toLowerCase().slice(1)}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          <HeroSvg />
        </section> */}

        <CallToAction data={callToAction}></CallToAction>
      </section>
    </>
  );
}

export default Career;
