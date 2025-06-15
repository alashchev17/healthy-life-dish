// ./sanity.config.ts
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";

import { projectId, apiVersion, dataset } from "#/sanity/env";
import { CUSTOM_STRUCTURED_SCHEMAS, schema } from "#/sanity/schemaTypes";
import { structure } from "#/sanity/structure";

export default defineConfig({
  basePath: "/dashboard", // `basePath` must match the route of your Studio
  title: "HLD | Website",
  projectId,
  dataset,
  apiVersion,
  schema,
  plugins: [
    structureTool({ structure }),
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion, defaultDataset: dataset })]
      : []),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "ua", title: "Ukrainian" },
        { id: "es", title: "Spanish" },
      ],
      schemaTypes: CUSTOM_STRUCTURED_SCHEMAS,
      languageField: "language",
      weakReferences: true,
      apiVersion,
    }),
  ],
});
