import { groq } from "next-sanity";
import { client } from "./sanity.client";
import type { EmployeeApplication } from "@/types";
import jobPosition from "schemaTypes/jobPosition";
import { error } from "console";
import { NextResponse } from "next/server";

// https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-with-sanity-and-nextjs/

// export const dynamic = "force-dynamic";

export async function getJobPositionById(jobPositionID: string) {
  const query = `*[_type == "jobPosition" && _id == $id][0]`; // GROQ query
  const params = { id: jobPositionID };

  try {
    const jobPosition = await client.fetch(query, params);
    return jobPosition;
  } catch (error) {
    throw new Error(`Job position with ID ${jobPositionID} not found.`);
  }
}

export async function getJobPositions() {
  return await client.fetch(
    groq`*[_type == "jobPosition"] {
        _id,
        _createdAt,
        jobTitle,
        location,
      }`,
    {},
    {
      cache: "no-store",
    },
  );
}

export async function getCareerPageContent() {
  return await client.fetch(
    groq`*[_type == "careerPageContent"][0]{
        headerTitle,
        headerSubtitle,
        metaTitle,
        metaDataDescription,
        title,
        contactEmail
      }`,
    {},
    {
      cache: "no-store",
    },
  );
}

export async function getEmployeePageContent() {
  return await client.fetch(
    groq`*[_type == "employeePageContent"][0]{
        title,
        "imageUrl": backgroundImage.asset->url,
        backgroundImage,
        metaTitle,
        formDescription,
      }`,
    {},
    {
      cache: "no-store",
    },
  );
}

export async function createEmployeeApplication(
  application: EmployeeApplication,
) {
  const jobPositionID = application.jobPositionID;

  try {
    // Check if the job position exists
    const jobPosition = await getJobPositionById(jobPositionID);
    console.log("Fetched job position:", jobPosition); // Check if it exists
    if (!jobPosition) {
      throw new Error("Job position is no longer available.");
    }

    // Ensure jobPositionID is set correctly with reference
    const applicationWithReference = {
      ...application,
      jobPositionID: {
        _type: "reference",
        _ref: jobPositionID, // Use the valid job position ID
        _weak: true,
      },
    };

    // Submit the job application to Sanity
    const result = await client.create(applicationWithReference);
    return result;
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    throw new Error(err.message);
  }
}
