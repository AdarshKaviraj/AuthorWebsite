

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity-studio/schemaTypes";

export default defineConfig({
  name: 'default',
  title: 'Author Website',
  projectId: 'nm989itl',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
