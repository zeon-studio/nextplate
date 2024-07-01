import { NextResponse } from "next/server";
import { getJobPositions } from "../../../../sanity/sanity.query";
import type { JobPosition } from "@/types";

// https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs
export async function POST(request: Request) {
  try {
    // const requestBody = await request.json(); // Assuming the body is JSON
    // // Log the request body
    // console.log("Received POST request with data:", requestBody);

    // After updating job positions, fetch updated positions
    const updatedJobPositions: JobPosition[] = await getJobPositions();

    return NextResponse.json(
      { message: "Successfully updated job positions!" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Failed to update job positions:", err);
    return NextResponse.json(
      { message: "Failed to update job positions" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const jobPositions: JobPosition[] = await getJobPositions();
    return NextResponse.json(jobPositions);
  } catch (err) {
    console.error("Failed to fetch job positions from Sanity:", err);
    return NextResponse.json(
      { message: "Failed to fetch job positions from Sanity" },
      { status: 500 },
    );
  }
}
