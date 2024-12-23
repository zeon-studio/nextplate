// ./deskStructure.js

export const myStructure = (S) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Page Content")
        .child(
          S.list()
            .title("Page Content Documents")
            .items([
              S.listItem()
                .title("Career Page Content")
                .child(
                  S.document()
                    .schemaType("careerPageContent")
                    .documentId("careerPageContent"),
                ),
              S.listItem()
                .title("Employee Page Content")
                .child(
                  S.document()
                    .schemaType("employeePageContent")
                    .documentId("employeePageContent"),
                ),
            ]),
        ),
      // Exclude careerPageContent and employeePageContent from the main list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["careerPageContent", "employeePageContent"].includes(
            listItem.getId(),
          ),
      ),
    ]);
