// ./sanity.config.ts
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";

import { projectId, apiVersion, dataset } from "#/sanity/env";
import { schema } from "#/sanity/schemaTypes";

export default defineConfig({
  basePath: "/dashboard", // `basePath` must match the route of your Studio
  title: "HLD | Website",
  projectId,
  dataset,
  apiVersion,
  schema,
  plugins: [
    structureTool(),
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion, defaultDataset: dataset })]
      : []),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "ua", title: "Ukrainian" },
        { id: "es", title: "Spanish" },
      ],
      schemaTypes: ["hero"],
      languageField: "language",
      weakReferences: true,
      apiVersion,
    }),
  ],
});
