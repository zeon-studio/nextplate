//components/JobPositionCard.tsx
// "use client";

import { slugify } from "@/lib/utils/textConverter";
import Link from "next/link";
import type { JobPosition } from "@/types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { getJobPositions } from "../../app/sanity/sanity.query";

interface JobPositionProps {
  jobPositions: JobPosition[];
}

async function getUpdatedJobPositions() {
  const jobPositions: JobPosition[] = await getJobPositions();
  return jobPositions;
}

const JobPositionCard = () => {
  // // Refresh the current route
  // const router = useRouter();
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const intervalId = setInterval(() => {
  //       console.log("Refreshing job positions...");
  //       router.refresh();
  //     }, 10000); // Refresh every 10 seconds

  //     // Cleanup the interval on component unmount
  //     return () => clearInterval(intervalId);
  //   }
  // }, [router]);
  const jobPositions = use(getUpdatedJobPositions());

  return (
    <>
      <div>
        {jobPositions &&
          jobPositions.map((data: JobPosition) => (
            <div
              key={data._id}
              className="flex flex-row items-center justify-between bg-light-grey shadow-md rounded-lg mb-4 px-10 py-3"
            >
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <svg
                    className="md:w-6 md:h-6 w-5 h-5 text-dark-grey mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="text-dark-grey font-semibold md:text-h4 text-lg">
                    {data.jobTitle}
                  </h4>
                </div>

                <div className="flex flex-row items-center">
                  <svg
                    className="md:w-5 md:h-5 w-4 h-4 mr-1 text-medium-green"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <h5 className="text-grey md:text-lg text-sm">
                    {data.location}
                  </h5>
                </div>
              </div>
              <Link
                key={data._id}
                className="bg-primary hover:bg-dark-grey rounded-md p-2 text-white font-bold"
                href={{
                  pathname: `/career/employee-application/${slugify(data.jobTitle)}`,
                  query: data,
                }}
              >
                <p className="md:text-lg text-sm">Apply to this position</p>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default JobPositionCard;
