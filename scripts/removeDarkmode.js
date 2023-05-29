const fs = require("fs");
const path = require("path");

const rootDirs = ["src/app", "src/hooks", "src/layouts", "src/styles"];
const configFiles = ["tailwind.config.js", "src/config/theme.json"];

rootDirs.forEach((rootDir) => removeDarkModeFromPages(rootDir));
configFiles.forEach((configFile) => removeDarkmode(configFile));

function removeDarkModeFromFiles(filePath, regexPattern) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const regex = new RegExp(regexPattern, "g");
  const updatedContent = fileContent.replace(regex, "");
  fs.writeFileSync(filePath, updatedContent, "utf8");
}

function removeDarkModeFromPages(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      removeDarkModeFromPages(filePath);
    } else if (stats.isFile()) {
      removeDarkModeFromFiles(filePath, '(?:(?!["])S)*dark:(?:(?![,;"])S)*');
    }
  });
}

function removeDarkmode(configFile) {
  if (configFile === "tailwind.config.js") {
    removeDarkModeFromFiles(configFile, "darkmode:\\s*{[^}]*},");
  } else {
    const contentfile = JSON.parse(fs.readFileSync(configFile, "utf8"));
    delete contentfile.colors.darkmode;
    fs.writeFileSync(configFile, JSON.stringify(contentfile));
  }
}
