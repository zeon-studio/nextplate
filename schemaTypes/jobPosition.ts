import { BiBriefcase } from "react-icons/bi";
import { defineField, defineType } from "sanity";

const jobPosition = defineType({
  name: "jobPosition",
  title: "Job Position",
  type: "document",
  icon: BiBriefcase,

  fields: [
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      description: "Enter the job title. E.g: Quality Technician ",
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
});

export default jobPosition;
