import { BiBriefcase } from "react-icons/bi";
import { defineField, defineType } from "sanity";
// https://www.sanity.io/docs/conditional-fields

const jobPosition = defineType({
  name: "jobPosition",
  title: "Job Position",
  type: "document",
  icon: BiBriefcase,

  fields: [
    defineField({
      name: "documentId",
      title: "Document ID",
      type: "string",
      hidden: true, // Optionally hide this field in the Sanity Studio UI
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      description: "Enter the job title. E.g: Quality Technician",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jobDescription",
      title: "Job Description",
      type: "string",
      description: "Enter a short job description",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Enter the location for this job",
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      jobTitle: "jobTitle",
      location: "location",
      documentId: "_id",
    },
    prepare(selection) {
      const { jobTitle, location, documentId } = selection;

      return {
        title: jobTitle ? `${jobTitle} |  ${location}` : "",
        subtitle: documentId ? `ID: ${documentId}` : "",
      };
    },
  },
});

export default jobPosition;
