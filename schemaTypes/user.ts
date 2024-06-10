// schemas/user.js
export default {
  name: "user",
  type: "document",
  title: "User",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "message",
      type: "text",
      title: "Message",
    },
  ],
};
