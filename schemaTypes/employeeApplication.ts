import { defineField, defineType } from "sanity";
import { BiSolidFile } from "react-icons/bi";

// https://www.sanity.io/docs/studio/file-type
const employeeApplication = defineType({
  name: "employeeApplication",
  title: "Employee Application",
  type: "document",
  readOnly: true,
  icon: BiSolidFile,

  fields: [
    // Field with accept option set to PDF
    defineField({
      name: "pdfFile",
      type: "file",
      options: {
        accept: "application/pdf",
      },
    }),

    defineField({
      name: "jobPositionID",
      type: "reference",
      title: "Job Position Applied to",
      to: [{ type: "jobPosition" }],
      weak: true,
      validation: (rule) => rule.required(),
    }),

    // Preserve fields
    defineField({
      name: "jobSnapshot",
      type: "object",
      title: "Job Snapshot",
      description: "Snapshot of job data at the time of application",
      fields: [
        {
          name: "jobTitle",
          type: "string",
          title: "Job Title",
        },
        {
          name: "jobLocation",
          type: "string",
          title: "Job Location",
        },
      ],
    }),

    defineField({
      name: "jobPosition",
      type: "string",
      title: "Job Title",
      hidden: true,
    }),

    defineField({
      name: "dateOfApplication",
      type: "string",
      title: "Date of Application",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "fname",
      type: "string",
      title: "First Name",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "mname",
      type: "string",
      title: "Middle Name",
    }),

    defineField({
      name: "lname",
      type: "string",
      title: "Last Name",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "address1",
      type: "string",
      title: "Address Line 1",
    }),

    defineField({
      name: "address2",
      type: "string",
      title: "Address Line 2",
    }),

    defineField({
      name: "city",
      type: "string",
      title: "City",
    }),

    defineField({
      name: "state",
      type: "string",
      title: "State",
    }),

    defineField({
      name: "zipcode",
      type: "string",
      title: "Zip Code",
    }),

    defineField({
      name: "phone",
      type: "string",
      title: "Phone",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (rule) => rule.required(),
    }),

    // Employment Desired
    defineField({
      name: "positions",
      type: "string",
      title: "Position(s) Applying For",
      group: "employmentDesired",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "employeeType",
      type: "string",
      title: "Are you applying for?",
      group: "employmentDesired",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "availability",
      type: "array",
      of: [{ type: "string" }],
      title: "What days and hours are you available for work?",
      group: "employmentDesired",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "weekendAvailability",
      type: "string",
      title: "Are you available to work on weekends?",
      group: "employmentDesired",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "overtime",
      type: "string",
      title: "Would you be available to work overtime, if necessary? ",
      group: "employmentDesired",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "startDate",
      type: "string",
      title: "If hired, what date can you start work?",
      group: "employmentDesired",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "accommodation",
      type: "string",
      title:
        "Are you able to perform the essential job functions of the job for which you are applying with or without reasonable accommodation?",
      group: "employmentDesired",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "accommodationMessage",
      type: "string",
      title:
        "If no, describe the functions that cannot be performed. Note: We comply with the ADA and consider reasonable accommodation measures that may be necessary for qualified applicants/employees to perform essential job functions.",
      group: "employmentDesired",
    }),

    // Employment Experience (as an array of objects)
    defineField({
      name: "employmentExperiences",
      type: "array",
      title: "Employment Experience",
      group: "employmentExperience",
      of: [
        {
          type: "object",
          name: "employmentExperience",
          fields: [
            defineField({
              name: "nameofEmployer",
              type: "string",
              title: "Name of Employer",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "supervisor",
              type: "string",
              title: "Supervisor",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "employerContact",
              type: "string",
              title: "May we contact?",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "employerAddress",
              type: "string",
              title: "Street Address",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "employerPhone",
              type: "string",
              title: "Phone number",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "dateEmployedFrom",
              type: "string",
              title: "Date Employed - From",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "dateEmployedTo",
              type: "string",
              title: "Date Employed - To",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "jobTitleAndDuties",
              type: "string",
              title: "Job Title and Duties",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "reasonForLeaving",
              type: "string",
              title: "Reason for Leaving",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "termination",
      type: "string",
      title:
        "Have you ever been involuntarily terminated or asked to resign from any job?",
      group: "employmentExperience",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "terminationMessage",
      type: "string",
      title: "If yes, explain:",
      group: "employmentExperience",
    }),

    defineField({
      name: "employmentGaps",
      type: "string",
      title: "Explain any gaps in your employment history:",
      group: "employmentExperience",
    }),

    defineField({
      name: "employmentQualifications",
      type: "string",
      title:
        "List any other experience, job related skills, additional languages, or other qualifications that you believe should be considered in evaluating your qualifications for employment.",
      group: "employmentExperience",
    }),

    // Education
    defineField({
      name: "highschool",
      type: "object",
      title: "High School",
      group: "education",
      fields: [
        defineField({
          name: "highschoolName",
          type: "string",
          title: "School Name",
        }),
        defineField({
          name: "highschoolYear",
          type: "string",
          title: "Year Completed",
        }),
        defineField({
          name: "highschoolDegree",
          type: "string",
          title: "Diploma/Degree?",
        }),
        defineField({
          name: "highschoolAreaOfStudy",
          type: "string",
          title: "Area of Study/Major",
        }),
        defineField({
          name: "highschoolSpecialization",
          type: "string",
          title: "Specialized Training, Skills, or ExtraCurricular Activities",
        }),
      ],
    }),

    defineField({
      name: "college",
      type: "object",
      title: "College/University",
      group: "education",
      fields: [
        defineField({
          name: "collegeName",
          type: "string",
          title: "School Name",
        }),
        defineField({
          name: "collegeYear",
          type: "string",
          title: "Year Completed",
        }),
        defineField({
          name: "collegeDegree",
          type: "string",
          title: "Diploma/Degree?",
        }),
        defineField({
          name: "collegeAreaOfStudy",
          type: "string",
          title: "Area of Study/Major",
        }),
        defineField({
          name: "collegeSpecialization",
          type: "string",
          title: "Specialized Training, Skills, or ExtraCurricular Activities",
        }),
      ],
    }),

    defineField({
      name: "graduateSchool",
      type: "object",
      title: "Graduate/Professional School",
      group: "education",
      fields: [
        defineField({
          name: "graduateSchoolName",
          type: "string",
          title: "School Name",
        }),
        defineField({
          name: "graduateSchoolYear",
          type: "string",
          title: "Year Completed",
        }),
        defineField({
          name: "graduateSchoolDegree",
          type: "string",
          title: "Diploma/Degree?",
        }),
        defineField({
          name: "graduateSchoolAreaOfStudy",
          type: "string",
          title: "Area of Study/Major",
        }),
        defineField({
          name: "graduateSchoolSpecialization",
          type: "string",
          title: "Specialized Training, Skills, or ExtraCurricular Activities",
        }),
      ],
    }),

    defineField({
      name: "tradeSchool",
      type: "object",
      title: "Trade School",
      group: "education",
      fields: [
        defineField({
          name: "tradeSchoolName",
          type: "string",
          title: "School Name",
        }),
        defineField({
          name: "tradeSchoolYear",
          type: "string",
          title: "Year Completed",
        }),
        defineField({
          name: "tradeSchoolDegree",
          type: "string",
          title: "Diploma/Degree?",
        }),
        defineField({
          name: "tradeSchoolAreaOfStudy",
          type: "string",
          title: "Area of Study/Major",
        }),
        defineField({
          name: "tradeSchoolSpecialization",
          type: "string",
          title: "Specialized Training, Skills, or ExtraCurricular Activities",
        }),
      ],
    }),

    defineField({
      name: "other",
      type: "object",
      title: "Other",
      group: "education",
      fields: [
        defineField({
          name: "otherName",
          type: "string",
          title: "School Name",
        }),
        defineField({
          name: "otherYear",
          type: "string",
          title: "Year Completed",
        }),
        defineField({
          name: "otherDegree",
          type: "string",
          title: "Diploma/Degree?",
        }),
        defineField({
          name: "otherAreaOfStudy",
          type: "string",
          title: "Area of Study/Major",
        }),
        defineField({
          name: "otherSpecialization",
          type: "string",
          title: "Specialized Training, Skills, or ExtraCurricular Activities",
        }),
      ],
    }),

    // Business and professional references
    defineField({
      name: "businessReferences",
      type: "array",
      title: "Business and Professional References",
      group: "businessReference",
      of: [
        {
          type: "object",
          name: "businessReference",
          fields: [
            defineField({
              name: "nameAndTitle",
              type: "string",
              title: "Name and Title",
            }),
            defineField({
              name: "relationship",
              type: "string",
              title: "Relationship",
            }),
            defineField({
              name: "phoneOrEmail",
              type: "string",
              title: "Phone Number or Email",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "personalReferences",
      type: "array",
      title: "Personal References",
      group: "personalReference",
      of: [
        {
          type: "object",
          name: "personalReference",
          fields: [
            defineField({
              name: "nameAndTitle",
              type: "string",
              title: "Name and Title",
            }),
            defineField({
              name: "relationship",
              type: "string",
              title: "Relationship",
            }),
            defineField({
              name: "phoneOrEmail",
              type: "string",
              title: "Phone Number or Email",
            }),
          ],
        },
      ],
    }),

    // General Information
    defineField({
      name: "transportation",
      type: "string",
      title:
        "If hired, would you have a reliable means of transportation to and from work?",
      group: "generalInformation",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ageRequirement",
      type: "string",
      title: "Are you at least 18 years old?",
      group: "generalInformation",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentAuthorization",
      type: "string",
      title:
        "If hired, can you present evidence of your identity and legal right to work in this country?",
      group: "generalInformation",
      validation: (rule) => rule.required(),
    }),

    // APPLICANT STATEMENT AND AGREEMENT
    defineField({
      name: "agreement1",
      type: "object",
      title:
        "I hereby authorize Ninth Ave. Foods to thoroughly investigate my references, work record, education and other matters related to my suitability for employment and, further, authorize the prior employers and references I have listed to disclose to Ninth Ave. Foods all letters, reports and other information related to my work records, without giving me prior notice of such disclosure. In addition, I hereby release Ninth Ave. Foods, my former employers and all other persons, corporations, partnerships and associations from any and all claims, demands, or liabilities arising out of or in any way related to such investigation or disclosure.",
      group: "agreement",
      fields: [
        defineField({
          name: "initialHere1",
          type: "string",
          title: "Initial here",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "statementAndAgreement1",
          type: "string",
          title: "Agreed?",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "agreement2",
      type: "object",
      title:
        "If I am employed by Ninth Ave. Foods, I understand that I am required to comply with all rules and regulations of the Ninth Ave. Foods",
      group: "agreement",
      fields: [
        defineField({
          name: "initialHere2",
          type: "string",
          title: "Initial here",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "statementAndAgreement2",
          type: "string",
          title: "Agreed?",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "agreement3",
      type: "object",
      title:
        "If hired, I understand and agree that my employment with Ninth Ave. Foods is at-will, and that neither I, nor the Ninth Ave. Foods is required to continue the employment relationship for any specific term. I further understand that the Ninth Ave. Foods or I may terminate the employment relationship at any time, with or without cause, and with or without notice. I understand that the at-will status of my employment cannot be amended, modified, or altered in any way by any oral modifications.",
      group: "agreement",
      fields: [
        defineField({
          name: "initialHere3",
          type: "string",
          title: "Initial here",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "statementAndAgreement3",
          type: "string",
          title: "Agreed?",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "agreement4",
      type: "object",
      title:
        "I hereby certify that the answers given by me are true and correct to the best of my knowledge. I further certify that I, the undersigned applicant, have personally completed this application. I understand that any omission or misstatement of material fact on this application or on any document used to secure employment shall be grounds for rejection of this application or for immediate discharge if I am employed, regardless of the time elapsed before discovery.",
      group: "agreement",
      fields: [
        defineField({
          name: "initialHere4",
          type: "string",
          title: "Initial here",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "statementAndAgreement4",
          type: "string",
          title: "Agreed?",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "agreement5",
      type: "object",
      title:
        "I understand that if I am selected for hire, it will be necessary for me to provide satisfactory evidence of my identity and legal authority to work in the United States, and that federal immigration laws require me to complete an I-9 Form in this regard.",
      group: "agreement",
      fields: [
        defineField({
          name: "initialHere5",
          type: "string",
          title: "Initial here",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "statementAndAgreement5",
          type: "string",
          title: "Agreed?",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "agreement6",
      type: "object",
      title:
        "I understand that if any term, provision, or portion of this Agreement is declared void or unenforceable, it shall be severed and the remainder of this Agreement shall be enforceable.",
      group: "agreement",
      fields: [
        defineField({
          name: "initialHere6",
          type: "string",
          title: "Initial here",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "statementAndAgreement6",
          type: "string",
          title: "Agreed?",
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // Electronic signature
    defineField({
      name: "electronicSignature",
      type: "string",
      title: "Sign Your Full Name (Electronic Signature):",
      group: "signature",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "todaysDate",
      type: "string",
      title: "Today's Date",
      group: "signature",
      validation: (rule) => rule.required(),
    }),
  ],

  groups: [
    {
      name: "employmentDesired",
      title: "Employment Desired",
    },
    {
      name: "employmentExperience",
      title: "Employment Experience",
    },
    {
      name: "education",
      title: "Education",
    },
    {
      name: "businessReference",
      title: "Business and Professional References",
    },
    {
      name: "personalReference",
      title: "Personal References",
    },
    {
      name: "generalInformation",
      title: "General Information",
    },
    {
      name: "agreement",
      title: "Applicant Statement and Agreement",
    },
    {
      name: "signature",
      title: "Electronic Signature",
    },
  ],

  fieldsets: [
    {
      title: "Employment Experiences",
      name: "employmentExperiences",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },

    {
      title: "Business and Professional References",
      name: "businessReferences",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },

    {
      title: "Personal References",
      name: "personalReferences",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],

  preview: {
    select: {
      fname: "fname",
      lname: "lname",
      jobTitleFromRef: "jobPositionID.jobTitle",
      jobTitleFromSnapshot: "jobSnapshot.jobTitle",
    },

    prepare(selection) {
      const { fname, lname, jobTitleFromRef, jobTitleFromSnapshot } = selection;
      return {
        title: fname ? `${fname} ${lname}` : "",
        subtitle: jobTitleFromRef
          ? `Applied for: ${jobTitleFromRef}`
          : jobTitleFromSnapshot
            ? `Applied for: ${jobTitleFromSnapshot} (Removed)`
            : "No data available",
      };
    },
  },
});

export default employeeApplication;
