import { programBuilderSchema } from "./programBuilder.schema";
import { programBlockSchemas } from "./blocks";

export const programSchemas = [
  programBuilderSchema,
  ...programBlockSchemas,
];
