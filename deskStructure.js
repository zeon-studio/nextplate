// ./deskStructure.js

export const myStructure = (S) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Page Content")
        .child(
          S.list()
            // Sets a title for our new list
            .title("Page Content Documents")
            // Add items to the array
            // Each will pull one of our new singletons
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
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["careerPageContent", "employeePageContent"].includes(
            listItem.getId(),
          ),
      ),
    ]);
