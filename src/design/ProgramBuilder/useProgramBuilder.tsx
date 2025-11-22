import type { ProgramBuilder } from "#/sanity/types";
import type { ReactNode } from "react";

import {
  AdvantagesDetailed,
  AdvantagesSimple,
  AudienceBlock,
  DetailedDescription,
  FreeProgram,
  NumberedList,
  NumberedListWithImage,
  PricingPlans,
  SloganBlock,
} from "./blocks";

export type useProgramBuilderArgs = {
  blocks: ProgramBuilder["content"];
};

export type useProgramBuilderReturnType = {
  elements: ReactNode[];
};

export function useProgramBuilder({
  blocks,
}: useProgramBuilderArgs): useProgramBuilderReturnType {
  if (!blocks) return { elements: [] };

  const elements = blocks.map((block) => {
    switch (block._type) {
      case "advantagesDetailed":
        return <AdvantagesDetailed key={block._key} block={block} />;
      case "advantagesSimple":
        return <AdvantagesSimple key={block._key} block={block} />;
      case "detailedDescription":
        return <DetailedDescription key={block._key} block={block} />;
      case "numberedList":
        return <NumberedList key={block._key} block={block} />;
      case "numberedListWithImage":
        return <NumberedListWithImage key={block._key} block={block} />;
      case "sloganBlock":
        return <SloganBlock key={block._key} block={block} />;
      // case "pricingPlans":
      //   console.log(`[DEBUG]: block data: `, JSON.stringify(block, null, 2));
      //   return <PricingPlans key={block._key} block={block} />;
      case "freeProgram":
        return <FreeProgram key={block._key} block={block} />;
      case "audienceBlock":
        return <AudienceBlock key={block._key} block={block} />;
      default:
        return null;
    }
  });

  return { elements };
}
