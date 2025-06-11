import "server-only";
import { groq } from "next-sanity";
import { client } from "./sanity.client";
import type { EmployeeApplication } from "@/types";

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
        jobDescription,
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

export async function deleteEmployeeApplication(id: string) {
  try {
    await client.delete(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document.");
  }
}

// Fetch all employee applications for preview
export async function getEmployeeApplications(): Promise<
  EmployeeApplication[]
> {
  try {
    const applications = await client.fetch(
      groq`*[_type == "employeeApplication"]{
        _id,
        fname,
        mname,
        lname,
        jobSnapshot,
        jobPositionID,
        dateOfApplication
      }`,
      {},
      {
        cache: "no-store",
      },
    );
    return applications;
  } catch (error) {
    console.error("Error fetching employee applications:", error);
    throw new Error("Failed to fetch employee applications.");
  }
}

export async function deleteSelectedEmployeeApplications(ids: string[]) {
  try {
    const transaction = client.transaction();
    ids.forEach((id) => {
      transaction.delete(id);
    });
    const result = await transaction.commit();

    return { deletedCount: result.documentIds.length }; // Return the number of deleted documents
  } catch (error) {
    console.error("Error deleting selected applications:", error);
    throw error;
  }
}

export async function getJobSanpshot(jobPositionID: string) {
  const jobData = await getJobPositionById(jobPositionID);
  const jobSnapshot = {
    jobTitle: jobData?.jobTitle || "Unknown title",
    jobLocation: jobData?.location || "Unknown location",
  };

  return jobSnapshot;
}
