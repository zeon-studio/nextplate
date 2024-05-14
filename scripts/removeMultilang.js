const readline = require("node:readline/promises");
const fs = require("fs");
const path = require("path");
const languages = require("../src/config/language.json");

const englishLang = languages.filter((item) => item.languageCode === "en");
const filterLangs = languages.filter((item) => item.languageCode !== "en");
const contentDir = "src/content";

fs.writeFileSync(
  "src/config/language.json",
  JSON.stringify(englishLang, null, 2),
);

filterLangs.forEach((lang) => {
  fs.rmdir(
    path.join(contentDir, lang.contentDir),
    { recursive: true },
    (err) => {
      if (err) {
        console.error("Error deleting folder:", err);
        return;
      }
      console.log("Folder deleted successfully");
    },
  );
});
