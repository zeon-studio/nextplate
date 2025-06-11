import { NextResponse } from "next/server";
import { createEmployeeApplication } from "../../sanity/sanity.query";

const generateKey = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
    // Parse employment experiences if provided
    const employmentExperiencesString = formData.get("employmentExperiences");
    let employmentExperiences = [];
    if (employmentExperiencesString) {
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

    // Parse business references
    const businessReferences = [
      {
        _key: generateKey(),
        nameAndTitle: formData.get("businessReferenceNameAndTitle1") as string,
        relationship: formData.get("businessReferenceRelationship1") as string,
        phoneOrEmail: formData.get("businessReferencePhoneOrEmail1") as string,
      },
      {
        _key: generateKey(),
        nameAndTitle: formData.get("businessReferenceNameAndTitle2") as string,
        relationship: formData.get("businessReferenceRelationship2") as string,
        phoneOrEmail: formData.get("businessReferencePhoneOrEmail2") as string,
      },
      {
        _key: generateKey(),
        nameAndTitle: formData.get("businessReferenceNameAndTitle3") as string,
        relationship: formData.get("businessReferenceRelationship3") as string,
        phoneOrEmail: formData.get("businessReferencePhoneOrEmail3") as string,
      },
    ];

    // Parse personal references
    const personalReferences = [
      {
        _key: generateKey(),
        nameAndTitle: formData.get("personalReferenceNameAndTitle1") as string,
        relationship: formData.get("personalReferenceRelationship1") as string,
        phoneOrEmail: formData.get("personalReferencePhoneOrEmail1") as string,
      },
      {
        _key: generateKey(),
        nameAndTitle: formData.get("personalReferenceNameAndTitle2") as string,
        relationship: formData.get("personalReferenceRelationship2") as string,
        phoneOrEmail: formData.get("personalReferencePhoneOrEmail2") as string,
      },
      {
        _key: generateKey(),
        nameAndTitle: formData.get("personalReferenceNameAndTitle3") as string,
        relationship: formData.get("personalReferenceRelationship3") as string,
        phoneOrEmail: formData.get("personalReferencePhoneOrEmail3") as string,
      },
    ];

    // // Log the form data for debugging
    // console.log("Form Data:", Object.fromEntries(formData.entries()));

    // Send data to Sanity
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
      jobSnapshot: {
        jobTitle: formData.get("jobTitle") as string,
        jobLocation: formData.get("jobLocation") as string,
      },
      employmentExperiences, // Parsed employment experiences
      termination: formData.get("termination") as string,
      terminationMessage: formData.get("terminationMessage") as string,
      employmentGaps: formData.get("employmentGaps") as string,
      employmentQualifications: formData.get(
        "employmentQualifications",
      ) as string,

      highschool: {
        highschoolName: formData.get("highschoolName") as string,
        highschoolYear: formData.get("highschoolYear") as string,
        highschoolDegree: formData.get("highschoolDegree") as string,
        highschoolAreaOfStudy: formData.get("highschoolAreaOfStudy") as string,
        highschoolSpecialization: formData.get(
          "highschoolSpecialization",
        ) as string,
      },
      college: {
        collegeName: formData.get("collegeName") as string,
        collegeYear: formData.get("collegeYear") as string,
        collegeDegree: formData.get("collegeDegree") as string,
        collegeAreaOfStudy: formData.get("collegeAreaOfStudy") as string,
        collegeSpecialization: formData.get("collegeSpecialization") as string,
      },
      graduateSchool: {
        graduateSchoolName: formData.get("graduateSchoolName") as string,
        graduateSchoolYear: formData.get("graduateSchoolYear") as string,
        graduateSchoolDegree: formData.get("graduateSchoolDegree") as string,
        graduateSchoolAreaOfStudy: formData.get(
          "graduateSchoolAreaOfStudy",
        ) as string,
        graduateSchoolSpecialization: formData.get(
          "graduateSchoolSpecialization",
        ) as string,
      },
      tradeSchool: {
        tradeSchoolName: formData.get("tradeSchoolName") as string,
        tradeSchoolYear: formData.get("tradeSchoolYear") as string,
        tradeSchoolDegree: formData.get("tradeSchoolDegree") as string,
        tradeSchoolAreaOfStudy: formData.get(
          "tradeSchoolAreaOfStudy",
        ) as string,
        tradeSchoolSpecialization: formData.get(
          "tradeSchoolSpecialization",
        ) as string,
      },
      other: {
        otherName: formData.get("otherName") as string,
        otherYear: formData.get("otherYear") as string,
        otherDegree: formData.get("otherDegree") as string,
        otherAreaOfStudy: formData.get("otherAreaOfStudy") as string,
        otherSpecialization: formData.get("otherSpecialization") as string,
      },
      businessReferences, // Parsed business references
      personalReferences, // Parsed personal references

      transportation: formData.get("transportation") as string,
      ageRequirement: formData.get("ageRequirement") as string,
      employmentAuthorization: formData.get(
        "employmentAuthorization",
      ) as string,

      agreement1: {
        initialHere1: formData.get("initialHere1") as string,
        statementAndAgreement1: formData.get(
          "statementAndAgreement1",
        ) as string,
      },
      agreement2: {
        initialHere2: formData.get("initialHere2") as string,
        statementAndAgreement2: formData.get(
          "statementAndAgreement2",
        ) as string,
      },
      agreement3: {
        initialHere3: formData.get("initialHere3") as string,
        statementAndAgreement3: formData.get(
          "statementAndAgreement3",
        ) as string,
      },
      agreement4: {
        initialHere4: formData.get("initialHere4") as string,
        statementAndAgreement4: formData.get(
          "statementAndAgreement4",
        ) as string,
      },
      agreement5: {
        initialHere5: formData.get("initialHere5") as string,
        statementAndAgreement5: formData.get(
          "statementAndAgreement5",
        ) as string,
      },
      agreement6: {
        initialHere6: formData.get("initialHere6") as string,
        statementAndAgreement6: formData.get(
          "statementAndAgreement6",
        ) as string,
      },

      electronicSignature: formData.get("electronicSignature") as string,
      todaysDate: formData.get("todaysDate") as string,
    });

    console.log("Successfully added data to Sanity");
    return NextResponse.json({
      message: "Employee Application updated successfully!",
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
