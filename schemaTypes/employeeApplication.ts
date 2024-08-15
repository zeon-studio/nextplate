import { defineField, defineType } from "sanity";
import { BiSolidFile } from "react-icons/bi";

const employeeApplication = defineType({
  name: "employeeApplication",
  title: "Employee Application",
  type: "document",
  readOnly: true,
  icon: BiSolidFile,

  fields: [
    defineField({
      name: "jobPositionID",
      type: "reference",
      title: "Job Position Applied to",
      to: [{ type: "jobPosition" }],
      weak: true,
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "employeeType",
      type: "string",
      title: "Are you applying for?",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "availability",
      type: "array",
      of: [{ type: "string" }],
      title: "What days and hours are you available for work?",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "weekendAvailability",
      type: "string",
      title: "Are you available to work on weekends?",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "overtime",
      type: "string",
      title: "Would you be available to work overtime, if necessary? ",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "startDate",
      type: "string",
      title: "If hired, what date can you start work?",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "accommodation",
      type: "string",
      title:
        "Are you able to perform the essential job functions of the job for which you are applying with or without reasonable accommodation?",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "accommodationMessage",
      type: "string",
      title:
        "If no, describe the functions that cannot be performed. Note: We comply with the ADA and consider reasonable accommodation measures that may be necessary for qualified applicants/employees to perform essential job functions.",
    }),

    // Employment Experience (as an array of objects)
    defineField({
      name: "employmentExperiences",
      type: "array",
      title: "Employment Experience",
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
          ],
        },
      ],
    }),
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
  ],

  preview: {
    select: {
      fname: "fname",
      lname: "lname",
      subtitle: "jobPositionID.jobTitle", // Show the job title of the referenced job position
    },
    prepare(selection) {
      const { fname, lname, subtitle } = selection;
      return {
        title: fname ? `${fname} ${lname}` : "",
        subtitle: subtitle
          ? `Applied for: ${subtitle}`
          : "No job position available",
      };
    },
  },
});

export default employeeApplication;
