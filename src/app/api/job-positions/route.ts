import { NextResponse } from "next/server";
import { getJobPositions } from "../../../../sanity/sanity.query";
import type { JobPosition } from "@/types";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/router";
import { route } from "sanity/router";
// https://medium.com/@joaopaulocmarra/i-built-a-nextjs-realtime-chat-with-rsc-and-server-actions-67b38534a34f

export async function POST(request: Request) {
  try {
    // Fetch the updated job positions from Sanity query
    const updatedJobPositions: JobPosition[] = await getJobPositions();

    // Optionally, revalidate the path if needed

    revalidatePath("/career", "page");

    return NextResponse.json(updatedJobPositions);
  } catch (err) {
    console.error("Failed to fetch job positions from Sanity:", err);
    return NextResponse.json(
      { message: "Failed to fetch job positions from Sanity" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    // Fetch the job positions from Sanity query
    const jobPositions: JobPosition[] = await getJobPositions();
    console.log("Job Positions:", jobPositions);
    return NextResponse.json(jobPositions);
  } catch (err) {
    console.error("Failed to fetch job positions from Sanity:", err);
    return NextResponse.json(
      { message: "Failed to fetch job positions from Sanity" },
      { status: 500 },
    );
  }
}
