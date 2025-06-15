import type { SchemaTypeDefinition } from "sanity";
import { landingSchemas } from "#/sanity/schemaTypes/landing";
import { highlightTextSchema } from "#/sanity/schemaTypes/shared";

export type RootSchema = {
  types: SchemaTypeDefinition[];
};

export const schema: RootSchema = {
  types: [...landingSchemas, highlightTextSchema],
};

export const CUSTOM_STRUCTURED_SCHEMAS = [
  "hero",
  "about",
  "promo",
  "reviews",
  "reviewCard",
  // "settings",
];
