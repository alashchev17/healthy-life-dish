import type { SchemaTypeDefinition } from "sanity";

import { landingSchemas } from "#/sanity/schemaTypes/landing";
import { programSchemas } from "#/sanity/schemaTypes/program";
import { footerSchemas } from "#/sanity/schemaTypes/footer";

import {
  highlightTextSchema,
  socialLinkSchema,
} from "#/sanity/schemaTypes/shared";

export type RootSchema = {
  types: SchemaTypeDefinition[];
};

export const schema: RootSchema = {
  types: [
    ...landingSchemas,
    ...programSchemas,
    ...footerSchemas,
    highlightTextSchema,
    socialLinkSchema,
  ],
};

export const CUSTOM_STRUCTURED_SCHEMAS = [
  "hero",
  "about",
  "promo",
  "reviews",
  "reviewCard",
  "programBuilder",
  "footer",
  // "settings",
];
