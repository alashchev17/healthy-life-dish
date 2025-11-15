// Re-export client functions
export { client, sanityFetch } from "./client";

// Re-export queries and fetch functions
export {
  fetchLandingPageData,
  fetchProgramBySlug,
  fetchAllPrograms,
  fetchProgramsByType,
  type LandingPageData,
} from "./queries";

// Re-export types
export * from "../types";
