import { NextResponse } from "next/server";
import { getJobPositionById } from "@/app/sanity/sanity.query";

export const dynamic = "force-dynamic"; // Ensure the route is treated as dynamic

export async function GET(request: Request) {
  try {
    // Extract the `id` from the query string
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Job position ID is required" },
        { status: 400 },
      );
    }

    // Fetch job positions using the extracted ID
    const jobPositions = await getJobPositionById(id);

    if (!jobPositions || jobPositions.length === 0) {
      return NextResponse.json(
        { message: "Job position does not exist" },
        { status: 404 },
      );
    }

    return NextResponse.json(jobPositions, { status: 200 });
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return NextResponse.json(
      { message: "Error fetching job positions" },
      { status: 500 },
    );
  }
}
