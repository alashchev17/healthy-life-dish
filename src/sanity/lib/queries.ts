import groq from "groq";
import { sanityFetch } from "./client";
import type {
  FOOTER_QUERYResult,
  LANDING_PAGE_QUERYResult,
  ProgramBuilder,
  SETTINGS_QUERYResult,
} from "../types";

// Query to fetch all landing page data
const LANDING_PAGE_QUERY = groq`{
  "hero": *[_type == "hero" && language == $language][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    language,
    slogan
  },
  "about": *[_type == "about" && language == $language][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    language,
    description,
    callToAction,
    cards[] {
      _key,
      _type,
      title,
      description,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip,
            palette
          }
        },
        hotspot,
        crop
      }
    },
    slogan
  },
  "promo": *[_type == "promo" && language == $language][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    language,
    slogan,
    isActive
  },
  "slogan": *[_type == "slogan" && language == $language][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    language,
    slogan
  },
  "reviews": *[_type == "reviews" && language == $language][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    language,
    description,
    reviews[]-> {
      _id,
      _type,
      language,
      person {
        name,
        surname,
        occupation,
        avatar {
          asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip,
              palette
            }
          },
          hotspot,
          crop
        }
      },
      rating,
      text
    }
  }
}`;

// Query to fetch a program by slug
const PROGRAM_BY_SLUG_QUERY = groq`*[_type == "programBuilder" && slug.current == $slug && language == $language][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  language,
  title,
  description,
  shortDescription,
  type,
  slug,
  imagery,
  content[] {
    _key,
    _type,
    preview,
    title,
    
    // AudienceBlock fields
    _type == "audienceBlock" => {
      audiences[] {
        _key,
        description,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip,
              palette
            }
          },
          hotspot,
          crop
        }
      }
    },
    
    // FreeProgram fields
    _type == "freeProgram" => {
      description,
      button {
        text,
        link
      }
    },
    
    // PricingPlans fields
    _type == "pricingPlans" => {
      durations[] {
        _key,
        title,
        months,
        isDefault
      },
      supportedCurrencies,
      defaultCurrency,
      planTypes[] {
        _key,
        id,
        stripeProductId,
        title,
        isPopular,
        pricing {
          EUR {
            price,
            stripePriceId
          },
          USD {
            price,
            stripePriceId
          },
          GBP {
            price,
            stripePriceId
          },
          UAH {
            price,
            stripePriceId
          }
        },
        features[] {
          _key,
          text,
          included
        }
      },
      groupPlans[] {
        _key,
        people,
        pricing {
          EUR {
            basePrice,
            discountedPrice
          },
          USD {
            basePrice,
            discountedPrice
          },
          GBP {
            basePrice,
            discountedPrice
          },
          UAH {
            basePrice,
            discountedPrice
          }
        }
      }
    },
    
    // SloganBlock fields
    _type == "sloganBlock" => {
      slogan
    },
    
    // NumberedListWithImage fields
    _type == "numberedListWithImage" => {
      style,
      items[] {
        _key,
        title,
        description,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip,
              palette
            }
          },
          hotspot,
          crop
        }
      }
    },
    
    // NumberedList fields
    _type == "numberedList" => {
      items[] {
        _key,
        title,
        description
      }
    },
    
    // DetailedDescription fields
    _type == "detailedDescription" => {
      description
    },
    
    // AdvantagesSimple fields
    _type == "advantagesSimple" => {
      advantages[] {
        _key,
        imageOnly,
        title,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip,
              palette
            }
          },
          hotspot,
          crop
        }
      }
    },
    
    // AdvantagesDetailed fields
    _type == "advantagesDetailed" => {
      advantages[] {
        _key,
        imageOnly,
        title,
        description,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip,
              palette
            }
          },
          hotspot,
          crop
        }
      }
    }
  }
}`;

// Query to fetch all programs (for listing pages)
const ALL_PROGRAMS_QUERY = groq`*[_type == "programBuilder" && language == $language] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  language,
  title,
  description,
  shortDescription,
  imagery,
  slogan,
  type,
  slug,
}`;

const FOOTER_QUERY = groq`*[_type == "footer" && language == $language] | order(_createdAt desc)[0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  language,
  emailSubscription,
  copyrightText,
  generalLinks,
  socialLinks
}`;

const SETTINGS_QUERY = groq`*[_type == "settings" && language == $language][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  language,
  globalCtas,
  seo,
  contact,
  analytics
}`;

// Type definitions for the fetched data
export type LandingPageData = LANDING_PAGE_QUERYResult;
export type FooterData = FOOTER_QUERYResult;
export type SettingsData = SETTINGS_QUERYResult;

// Fetch functions
export async function fetchLandingPageData(
  language: string = "ua",
): Promise<LandingPageData> {
  return await sanityFetch<LandingPageData>({
    query: LANDING_PAGE_QUERY,
    params: { language },
    tags: ["landing", `landing-${language}`],
  });
}

export async function fetchFooterData(
  language: string = "ua",
): Promise<FooterData> {
  return await sanityFetch<FooterData>({
    query: FOOTER_QUERY,
    params: { language },
    tags: ["footer", `footer-${language}`],
  });
}

export async function fetchProgramBySlug(
  slug: string,
  language: string = "ua",
): Promise<ProgramBuilder> {
  return await sanityFetch<ProgramBuilder>({
    query: PROGRAM_BY_SLUG_QUERY,
    params: { slug, language },
    tags: ["program", `program-${slug}`, `program-${language}`],
  });
}

export async function fetchAllPrograms(
  language: string = "ua",
): Promise<ProgramBuilder[]> {
  const data = await sanityFetch<ProgramBuilder[]>({
    query: ALL_PROGRAMS_QUERY,
    params: { language },
    tags: ["programs", `programs-${language}`],
  });

  return data || [];
}

// Helper function to fetch programs by type
export async function fetchProgramsByType(
  type: "diet" | "training",
  language: string = "ua",
): Promise<ProgramBuilder[]> {
  const query = groq`*[_type == "programBuilder" && type == $type && language == $language] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    language,
    title,
    description,
    shortDescription,
    slogan,
    type,
    slug,
    imagery,
  }`;

  const data = await sanityFetch<ProgramBuilder[]>({
    query,
    params: { type, language },
    tags: ["programs", `programs-${type}`, `programs-${language}`],
  });

  return data || [];
}

export async function fetchSettings(
  language: string = "ua",
): Promise<SettingsData> {
  return await sanityFetch<SettingsData>({
    query: SETTINGS_QUERY,
    params: { language },
    tags: ["settings", `settings-${language}`],
  });
}
