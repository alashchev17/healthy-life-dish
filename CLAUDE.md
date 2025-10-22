# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Healthy Life Dish is a Next.js 15 application integrated with Sanity CMS for content management. The project features a multi-language website (English, Ukrainian, Spanish) with a focus on health programs (diet and training plans).

## Development Commands

### Package Manager
- This project uses **pnpm** (version 10.13.1+) as the package manager
- Always use `pnpm` instead of npm or yarn

### Core Commands
- `pnpm dev` - Start development server (runs `typegen` automatically via predev hook)
- `pnpm build` - Build production application
- `pnpm start` - Start production server on port 6235
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking without emitting files
- `pnpm typegen` - Generate Sanity schema types (extract schema + generate TypeScript types)

### Development Workflow
When making changes to Sanity schemas, run `pnpm typegen` to regenerate TypeScript types before building or type-checking.

## Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Sanity Studio route (/dashboard)
│   ├── layout.tsx          # Root layout with fonts and providers
│   ├── page.tsx            # Home page
│   └── providers.tsx       # Client-side providers
├── design/                 # Design system and components
│   ├── icons/              # Custom icon components
│   ├── sections/           # Major page sections (Hero, About, Reviews)
│   ├── shared/             # Shared components (Header, Footer, Modal, etc.)
│   ├── tokens/             # Design tokens (colors, typography, spacing)
│   └── ui/                 # UI primitives (Button, InputField, etc.)
└── sanity/                 # Sanity CMS configuration
    ├── actions/            # Custom Sanity actions (auto-slugify)
    ├── components/         # Sanity Studio custom components
    ├── lib/                # Sanity client, queries, and API functions
    ├── schemaTypes/        # Schema definitions
    │   ├── landing/        # Landing page schemas
    │   ├── program/        # Program builder schemas
    │   ├── footer/         # Footer schemas
    │   └── shared/         # Shared schema types
    ├── structure.tsx       # Custom Sanity Studio structure
    └── types/              # Generated TypeScript types
```

### Import Alias
All imports use the `#/*` alias which maps to `./src/*`. Example:
```typescript
import { Button } from '#/design/ui/Button/Button'
import { sanityFetch } from '#/sanity/lib/client'
```

### Sanity CMS Integration

#### Configuration
- Sanity Studio is mounted at `/dashboard` (see `sanity.config.ts`)
- Environment variables required:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION` (optional, defaults to '2024-07-11')

#### Multi-language Support
- Languages: English (en), Ukrainian (ua), Spanish (es)
- Uses `@sanity/document-internationalization` plugin
- Content is filtered by language in queries (default: 'ua')
- Schemas supporting internationalization are defined in `CUSTOM_STRUCTURED_SCHEMAS`

#### Content Structure
- **Landing Page**: Composed of hero, about, promo, and reviews sections
- **Programs**: Built using modular blocks (audienceBlock, freeProgram, pricingPlans, sloganBlock, etc.)
- **Footer**: Managed as a separate singleton document
- Documents are singletons for landing sections but multiple instances allowed for programs and reviews

#### Auto-slugification
The `AutoSlugifyAction` in `src/sanity/actions/autoSlugify.ts` automatically generates URL-friendly slugs from document titles on publish. It uses the `speakingurl` library for transliteration and formatting.

#### Data Fetching
All Sanity data fetching uses the `sanityFetch` wrapper from `src/sanity/lib/client.ts` which:
- Implements tag-based revalidation with `next` cache configuration
- Defaults to 60-second revalidation unless tags are provided
- Uses `force-cache` strategy (required for Next.js 15)
- Available fetch functions:
  - `fetchLandingPageData(language)` - All landing page sections
  - `fetchFooterData(language)` - Footer content
  - `fetchProgramBySlug(slug, language)` - Single program with all blocks
  - `fetchAllPrograms(language)` - List of all programs
  - `fetchProgramsByType(type, language)` - Programs filtered by 'diet' or 'training'

### Design System

#### Typography
- Primary font: **Jura** (headings, titles, menus, buttons)
- Secondary font: **Manrope** (body text, small text, links)
- Font variables: `--font-jura-sans`, `--font-manrope-sans`
- Typography tokens in `src/design/tokens/index.ts` define desktop and mobile scales

#### Color Palette
Core colors defined in `src/design/tokens/index.ts`:
- `black` (#1A1A1A) - Primary dark
- `white` (#F8F8F8) - Primary light
- `greenAcid` (#C3F02F) - Brand accent
- `darkGray` (#272727) - Secondary dark
- `lightGray` (#545454) - Secondary light
- `nonAccentGreen` (#78941B) - Muted accent

#### Components
- **Typography**: Use `<Typography>` component from `src/design/shared/Typography` with variant prop
- **Button**: Primary UI button in `src/design/ui/Button`
- **Modal**: Base modal functionality in `src/design/shared/Modal`
- **Container**: Layout wrapper for consistent padding/max-width
- **Header**: Global navigation with language switcher
- **Footer**: Dynamic footer with email subscription and program links

### Image Handling
- Images served from Sanity CDN (`cdn.sanity.io`)
- Next.js Image component configured in `next.config.ts` with remote pattern
- Images include LQIP (Low Quality Image Placeholder) and palette metadata

## TypeScript Configuration
- Strict mode enabled
- Path alias `#/*` maps to `./src/*`
- Target: ES2017
- Module resolution: bundler (Next.js optimized)

## Testing & Quality
Currently no test framework is configured. When adding tests:
- Add test scripts to `package.json`
- Consider testing generated Sanity types after schema changes
- Test internationalization flows across all supported languages

## Common Patterns

### Adding a New Sanity Schema
1. Create schema file in appropriate `src/sanity/schemaTypes/` subdirectory
2. Export from parent `index.ts`
3. Add to schema types array in `src/sanity/schemaTypes/index.ts`
4. If singleton/structured, add to `CUSTOM_STRUCTURED_SCHEMAS`
5. Update `src/sanity/structure.tsx` if custom Studio layout needed
6. Run `pnpm typegen` to generate TypeScript types
7. Add query in `src/sanity/lib/queries.ts` if needed

### Creating a New Component
1. Place in appropriate `src/design/` subdirectory (ui, sections, or shared)
2. Use design tokens from `src/design/tokens/`
3. Follow naming: `ComponentName.tsx` with default export
4. Use TypeScript for props interfaces
5. Leverage the import alias: `import { Token } from '#/design/tokens'`

### Adding a New Language
1. Update `documentInternationalization` config in `sanity.config.ts`
2. Add language to Sanity Studio
3. Update queries to handle new language code
4. Consider adding locale-specific Sanity plugin if available
