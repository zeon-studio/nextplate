import { NextResponse } from "next/server";
import { createEmployeeApplication } from "../../sanity/sanity.query";

export async function POST(request: Request) {
  // Process post request
  const formData = await request.formData();
  console.log("FORM DATA: ", formData);

  try {
    const employmentExperiencesData = formData.get("employmentExperiences");
    console.log("Data:  ", employmentExperiencesData);
    // console.log("Employer Name: ", employmentExperiencesData["nameofEmployer"]);

    // Create employment experience objects
    const employmentExperiences = [
      {
        nameofEmployer: formData.get("nameofEmployer") as string,
        supervisor: formData.get("supervisor") as string,
        employerContact: formData.get("employerContact") as string,
        employerAddress: formData.get("employerAddress") as string,
        employerPhone: formData.get("employerPhone") as string,
        dateEmployedFrom: formData.get("dateEmployedFrom") as string,
        dateEmployedTo: formData.get("dateEmployedTo") as string,
      },
    ];
    // console.log("EMPLOYMENT EXPERIENCES: ", employmentExperiences);
    // console.log(
    //   "EMPLOYMENT EXPERIENCES LENGTH: ",
    //   employmentExperiences.length,
    // );

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
      positions: formData.get("positions") as string,
      employeeType: formData.get("employeeType") as string,
      availability: formData.getAll("availability") as Array<string>,
      weekendAvailability: formData.get("weekendAvailability") as string,
      overtime: formData.get("overtime") as string,
      startDate: formData.get("startDate") as string,
      accommodation: formData.get("accommodation") as string,
      accommodationMessage: formData.get("accommodationMessage") as string,
      jobPositionID: formData.get("jobPositionID") as string,
      jobPosition: formData.get("jobPosition") as string,

      // Pass the array of employment experiences
      employmentExperiences,
    });
    console.log("Successfully added data to Sanity");
    return NextResponse.json({
      message: "Employee Application updated successfully!",
    });
  } catch (err) {
    console.log("Failed: ", err);
    return NextResponse.json(
      { message: "Failed to upload employee Application" },
      { status: 500 },
    );
  }
}
