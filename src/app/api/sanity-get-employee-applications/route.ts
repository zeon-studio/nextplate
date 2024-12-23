import { NextResponse } from "next/server";
import { getEmployeeApplications } from "@/app/sanity/sanity.query";

export const dynamic = "force-dynamic"; // Ensure the route is treated as dynamic

export async function GET() {
  try {
    const applications = await getEmployeeApplications();

    if (!applications || applications.length === 0) {
      return NextResponse.json(
        { message: "No employee applications found" },
        { status: 200 },
      );
    }

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error("Error fetching employee applications:", error);
    return NextResponse.json(
      { message: "Error fetching employee applications" },
      { status: 500 },
    );
  }
}
