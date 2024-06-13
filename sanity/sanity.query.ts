import { groq } from "next-sanity";
import client from "./sanity.client";
import type { EmployeeApplication } from "@/types";

// https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-with-sanity-and-nextjs/
export async function getJobPosition() {
  return client.fetch(
    groq`*[_type == "jobPosition"]{
            _id, 
            jobTitle,
            location
        }`,
  );
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
  return await client.create(application);
}
