import groq from 'groq'
import { sanityFetch } from './client'
import type { LANDING_PAGE_QUERYResult, PROGRAM_BY_SLUG_QUERYResult, ProgramBuilder } from '../types'

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
}`

// Query to fetch a program by slug
const PROGRAM_BY_SLUG_QUERY = groq`*[_type == "programBuilder" && slug.current == $slug && language == $language][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  language,
  title,
  type,
  slug,
  seo {
    metaTitle,
    metaDescription,
    ogImage {
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
      currency,
      planTypes[] {
        _key,
        id,
        title,
        isPopular,
        basePrice,
        features[] {
          _key,
          text,
          included
        }
      },
      groupPlans[] {
        _key,
        people,
        basePrice,
        isDiscounted,
        discountedPrice
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
}`

// Query to fetch all programs (for listing pages)
const ALL_PROGRAMS_QUERY = groq`*[_type == "programBuilder" && language == $language] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  language,
  title,
  type,
  slug,
  seo {
    metaTitle,
    metaDescription,
    ogImage {
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
}`

// Type definitions for the fetched data
export type LandingPageData = LANDING_PAGE_QUERYResult

export type ProgramData = PROGRAM_BY_SLUG_QUERYResult

// Fetch functions
export async function fetchLandingPageData(language: string = 'ua'): Promise<LandingPageData> {
  const data = await sanityFetch<LandingPageData>({
    query: LANDING_PAGE_QUERY,
    params: { language },
    tags: ['landing', `landing-${language}`],
  })

  return data
}

export async function fetchProgramBySlug(slug: string, language: string = 'ua'): Promise<ProgramData> {
  const data = await sanityFetch<ProgramData>({
    query: PROGRAM_BY_SLUG_QUERY,
    params: { slug, language },
    tags: ['program', `program-${slug}`, `program-${language}`],
  })

  return data
}

export async function fetchAllPrograms(language: string = 'ua'): Promise<ProgramBuilder[]> {
  const data = await sanityFetch<ProgramBuilder[]>({
    query: ALL_PROGRAMS_QUERY,
    params: { language },
    tags: ['programs', `programs-${language}`],
  })

  return data || []
}

// Helper function to fetch programs by type
export async function fetchProgramsByType(type: 'diet' | 'training', language: string = 'ua'): Promise<ProgramBuilder[]> {
  const query = groq`*[_type == "programBuilder" && type == $type && language == $language] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    language,
    title,
    type,
    slug,
    imagery,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
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
  }`

  const data = await sanityFetch<ProgramBuilder[]>({
    query,
    params: { type, language },
    tags: ['programs', `programs-${type}`, `programs-${language}`],
  })

  return data || []
}
