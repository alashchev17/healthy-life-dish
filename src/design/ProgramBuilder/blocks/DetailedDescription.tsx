"use client";

import type { ReactNode } from "react";

import type { DetailedDescription as DetailedDescriptionBlock } from "#/sanity/types";

import { Container, Typography } from "#/design/shared";
import { HighlightedText } from "#/design/ui";

export type DetailedDescriptionProps = {
  block: DetailedDescriptionBlock;
};

export function DetailedDescription({
  block,
}: DetailedDescriptionProps): ReactNode {
  const { title, description } = block;

  return (
    <Container>
      <section className="flex flex-col items-start gap-6 md:gap-10">
        <Typography
          variant="menu"
          className="uppercase text-green-acid !font-bold !leading-tight"
        >
          {title}
        </Typography>
        <div className="w-full">
          <HighlightedText
            value={description!}
            variant="title2"
            className="!font-normal !text-2xl !leading-relaxed"
          />
        </div>
      </section>
    </Container>
  );
}
