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
      name: "location",
      title: "Location",
      type: "string",
      description: "Enter the location for this job",
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "jobTitle",
      subtitle: "location",
      documentId: "_id",
    },
    prepare(selection) {
      const { title, subtitle, documentId } = selection;

      return {
        title: title ? `${title} |  ${subtitle}` : "",
        subtitle: documentId ? `ID: ${documentId}` : "",
      };
    },
  },
});

export default jobPosition;
