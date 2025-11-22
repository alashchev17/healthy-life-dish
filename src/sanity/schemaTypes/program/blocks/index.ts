import { advantagesDetailedSchema } from './advantagesDetailed.schema'
import { advantagesSimpleSchema } from './advantagesSimple.schema'
import { detailedDescriptionSchema } from './detailedDescription.schema'
import { numberedListSchema } from './numberedList.schema'
import { numberedListWithImageSchema } from './numberedListWithImage.schema'
import { sloganBlockSchema } from './sloganBlock.schema'
// import { pricingPlansSchema } from './pricingPlans.schema'
import { freeProgramSchema } from './freeProgram.schema'
import { audienceBlockSchema } from './audienceBlock.schema'

export const programBlockSchemas = [
  advantagesDetailedSchema,
  advantagesSimpleSchema,
  detailedDescriptionSchema,
  numberedListSchema,
  numberedListWithImageSchema,
  sloganBlockSchema,
  // pricingPlansSchema,
  freeProgramSchema,
  audienceBlockSchema,
]
