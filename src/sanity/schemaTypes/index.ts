import type { SchemaTypeDefinition } from "sanity";
import { landingSchemas } from "#/sanity/schemaTypes/landing";

export type RootSchema = {
  types: SchemaTypeDefinition[];
};

export const schema: RootSchema = {
  types: [...landingSchemas],
};
