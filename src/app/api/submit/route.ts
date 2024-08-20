import { NextResponse } from "next/server";
import { createEmployeeApplication } from "../../sanity/sanity.query";

const generateKey = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
    // Check if employmentExperiences is available
    const employmentExperiencesString = formData.get("employmentExperiences");

    let employmentExperiences = [];
    if (employmentExperiencesString) {
      // Parse the JSON string if it exists
      employmentExperiences = JSON.parse(
        employmentExperiencesString as string,
      ).map((experience: any) => ({
        _key: generateKey(),
        nameofEmployer: experience.nameofEmployer,
        supervisor: experience.supervisor,
        employerContact: experience.employerContact,
        employerAddress: experience.employerAddress,
        employerPhone: experience.employerPhone,
        dateEmployedFrom: experience.dateEmployedFrom,
        dateEmployedTo: experience.dateEmployedTo,
        jobTitleAndDuties: experience.jobTitleAndDuties,
        reasonForLeaving: experience.reasonForLeaving,
      }));
    }

    // Log the form data for debugging
    console.log("Form Data:", Object.fromEntries(formData.entries()));

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
      employmentExperiences, // Pass the parsed employment experiences array or empty array
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
