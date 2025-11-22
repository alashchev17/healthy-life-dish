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
      <section className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-10">
        <Typography
          variant="title2"
          className="uppercase shrink-0 text-green-acid !text-base lg:!text-[1.5rem] !font-bold !leading-tight"
        >
          {title}
        </Typography>
        <div className="max-w-[948px]">
          <HighlightedText
            value={description!}
            variant="title2"
            className="!font-normal !text-[1.5rem] lg:!text-[2.25rem] !leading-none"
          />
        </div>
      </section>
    </Container>
  );
}
