import { groq } from "next-sanity";
import client from "./sanity.client";
import type { EmployeeApplication } from "@/types";

// https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-with-sanity-and-nextjs/
export async function getJobPosition() {
  const query = `*[_type == "jobPosition"] {
    _id,
    jobTitle,
    location
  }`;

  try {
    const jobPositions = await client.fetch(query, undefined, {
      cache: "no-store",
    });
    return jobPositions;
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return [];
  }
}

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
      _id,
      fullName,
      headline,
      profileImage {alt, "image": asset->url},
      shortBio,
      location,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks,
      skills
    }`,
  );
}

export async function createEmployeeApplication(
  application: EmployeeApplication,
) {
  // Ensure jobPositionID is set correctly
  const applicationWithReference = {
    ...application,
    jobPositionID: {
      _type: "reference",
      _ref: application.jobPositionID,
      _weak: true,
    },
  };

  return await client.create(applicationWithReference);
}
