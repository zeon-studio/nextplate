// schemaTypes/employmentExperience.ts
import { defineField, defineType } from "sanity";

const employmentExperience = defineType({
  name: "employmentExperience",
  title: "Employment Experience",
  type: "object",
  fields: [
    defineField({
      name: "nameofEmployer",
      type: "string",
      title: "Name of Employer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "supervisor",
      type: "string",
      title: "Supervisor",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "employerContact",
      type: "string",
      title: "May we contact?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "employerAddress",
      type: "string",
      title: "Street Address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "employerPhone",
      type: "string",
      title: "Phone number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateEmployedFrom",
      type: "date",
      title: "Date Employed - From",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateEmployedTo",
      type: "date",
      title: "Date Employed - To",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default employmentExperience;
