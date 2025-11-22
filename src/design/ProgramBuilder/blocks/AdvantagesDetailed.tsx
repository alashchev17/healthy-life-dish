"use client";

import type { ReactNode } from "react";

import type { AdvantagesDetailed as AdvantagesDetailedBlock } from "#/sanity/types";

import { Container, Typography } from "#/design/shared";
import { AdvantageGrid, AdvantageImageCard, AdvantageTextCard } from "../shared";

export type AdvantagesDetailedProps = {
  block: AdvantagesDetailedBlock;
};

export function AdvantagesDetailed({
  block,
}: AdvantagesDetailedProps): ReactNode {
  const { title, advantages } = block;

  return (
    <Container>
      <section className="flex flex-col items-start gap-6 md:gap-8 lg:gap-10">
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
                description={advantage.description}
                variant="detailed"
              />
            );
          })}
        </AdvantageGrid>
      </section>
    </Container>
  );
}
