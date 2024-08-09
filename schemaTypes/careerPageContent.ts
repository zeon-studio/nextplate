import { BiBriefcase } from "react-icons/bi";
import { defineField, defineType } from "sanity";
// https://www.sanity.io/docs/conditional-fields

const careerPage = defineType({
  name: "careerPageContent",
  title: "Career Page Content",
  type: "document",

  fields: [
    defineField({
      name: "headerTitle",
      title: "Header Title",
      type: "string",
      initialValue: "Join the Team",
      description:
        "Enter a header title for the career page. E.g: Join the Team",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "headerSubtitle",
      title: "headerSubtitle",
      type: "string",
      initialValue:
        "Build a fulfilling career with our passionate and innovative workforce",
      description: "Enter a header subtitle for the career page",
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
      name: "metaDataDescription",
      title: "Meta Data Description",
      type: "string",
      description:
        "Enter a meta data description to give users a preview of what to expect on the page used for SEO (Optional)",
    }),

    defineField({
      name: "title",
      title: "Career Page Title",
      type: "string",
      initialValue: "Open Positions",
      description: "Enter a title for the career page",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      initialValue: "ninthHR@ninthavenuefoods.com",
      description: "Enter a email to contact for employment related inquiries",
      validation: (rule) => rule.required(),
    }),
  ],
});

export default careerPage;
