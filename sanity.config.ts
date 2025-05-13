import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { myStructure } from "./deskStructure";
import DeleteEmployeeApplicationsTool from "@/app/sanity/tools/DeleteEmployeeApplicationsTool";

const projectId = process.env.SANITY_PROJECT_ID || "s1zzqnwp";
const dataset = process.env.SANITY_DATASET || "production";

if (!projectId || !dataset) {
  throw new Error("Configuration must contain `projectId` and `dataset`");
}

export default defineConfig({
  name: "default",
  title: "Ninth Ave Foods Website",

  projectId: projectId,
  dataset: dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool(),
  ],
  tools: [DeleteEmployeeApplicationsTool],

  schema: {
    types: schemaTypes,
  },
});
