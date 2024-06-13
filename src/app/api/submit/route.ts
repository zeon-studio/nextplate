import { NextResponse } from "next/server";
import { createEmployeeApplication } from "../../../../sanity/sanity.query";

export async function POST(request: Request) {
  // Process post request
  const formData = await request.formData();
  console.log("FORM DATA: ", formData);

  try {
    const result = await createEmployeeApplication({
      _type: "employeeApplication",
      fname: formData.get("fname") as string,
      dateOfApplication: formData.get("dateOfApplication") as string,
      mname: formData.get("mname") as string,
      lname: formData.get("lname") as string,
      address1: formData.get("address1") as string,
      address2: formData.get("address2") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipcode: formData.get("zipcode") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    });
    console.log("Sucessfully added data to Sanity");
    return NextResponse.json({
      message: "Employee Application updated sucessfully!",
    });
  } catch (err) {
    console.log("Failed: ", err);
    return NextResponse.json(
      { message: "Failed to upload employee Application" },
      { status: 500 },
    );
  }
}
