import { BiBriefcase } from "react-icons/bi";
import { defineField, defineType } from "sanity";
// https://www.sanity.io/docs/conditional-fields

const employeePage = defineType({
  name: "employeePageContent",
  title: "Employee Page Content",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Employment Application",
      description:
        "Enter a title for the employee page. E.g: Employment Application",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Upload a background image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          initialValue: "Ninth Ave Foods Warehouse",
          description: "Alternative text for the background image",
        },
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "Enter a meta title for the career page used for SEO (Optional)",
    }),

    defineField({
      name: "formDescription",
      title: "Form Description",
      type: "string",
      description: "Enter a description to the employment application",
      validation: (rule) => rule.required(),
    }),
  ],
});

export default employeePage;
