"use client";

import type { ReactNode } from "react";

import type { AdvantagesSimple as AdvantagesSimpleBlock } from "#/sanity/types";

import { Typography } from "#/design/shared";
import { AdvantageGrid, AdvantageImageCard, AdvantageTextCard } from "../shared";

export type AdvantagesSimpleProps = {
  block: AdvantagesSimpleBlock;
};

export function AdvantagesSimple({
  block,
}: AdvantagesSimpleProps): ReactNode {
  const { title, advantages } = block;

  return (
    <section className="flex flex-col items-start gap-10">
      <Typography
        variant="menu"
        className="uppercase text-green-acid !font-bold !leading-tight"
      >
        {title}
      </Typography>
      <AdvantageGrid itemCount={advantages?.length ?? 0}>
        {advantages?.map((advantage, index) => {
          if (advantage.imageOnly && advantage.image) {
            return (
              <AdvantageImageCard
                key={advantage._key}
                image={advantage.image}
              />
            );
          }

          return (
            <AdvantageTextCard
              key={advantage._key}
              iconIndex={index}
              title={advantage.title ?? ""}
              variant="simple"
            />
          );
        })}
      </AdvantageGrid>
    </section>
  );
}
