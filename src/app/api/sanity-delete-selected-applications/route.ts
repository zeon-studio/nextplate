// ./src/app/api/sanity/delete-application.ts

import { NextResponse } from "next/server";
import { deleteSelectedEmployeeApplications } from "@/app/sanity/sanity.query";

export async function POST(request: Request) {
  try {
    const { ids } = await request.json(); // Get the IDs from the request body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "No valid IDs provided for deletion." },
        { status: 400 },
      );
    }

    const result = await deleteSelectedEmployeeApplications(ids);

    return NextResponse.json({
      message: `Successfully deleted ${result.deletedCount} application(s)`,
    });
  } catch (error) {
    console.error("Error bulk deleting applications:", error);
    return NextResponse.json(
      { message: "Error deleting applications." },
      { status: 500 },
    );
  }
}
