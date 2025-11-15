"use client";

import { type ReactNode, useState } from "react";

import type { HighlightText as HighlightTextType, NumberedList as NumberedListBlock } from "#/sanity/types";

import { Container, Typography } from "#/design/shared";
import { HighlightedText } from "#/design/ui";

export type NumberedListProps = {
  block: NumberedListBlock;
};

function AccordionItem({
  number,
  title,
  description,
  itemKey,
}: {
  number: string;
  title: string;
  description: HighlightTextType;
  itemKey: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      key={itemKey}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group w-full flex items-start justify-between gap-6 border-b-[3px] border-dark-gray pb-2 px-2 pt-2
        cursor-pointer text-left transition-all duration-300
        ${isHovered && !isExpanded ? "bg-dark-gray" : "bg-transparent"}
      `}
    >
      <Typography
        variant="title2"
        className={`
          !font-bold !text-[86.427px] !leading-tight !tracking-[-6.9141px] uppercase transition-colors duration-300 slashed-zero
          ${isHovered && !isExpanded ? "text-green-acid opacity-100" : "text-dark-gray opacity-40"}
        `}
      >
        {number}
      </Typography>
      <div className="flex-1 flex flex-col gap-5 pt-2 max-w-[450px]">
        <Typography
          variant="title2"
          className="!font-semibold !text-[32px] !leading-tight text-green-acid uppercase"
        >
          {title}
        </Typography>
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out mb-4
            ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <HighlightedText
            value={description}
            variant="body"
            className="!font-medium !text-lg !leading-tight"
          />
        </div>
      </div>
    </button>
  );
}

export function NumberedList({ block }: NumberedListProps): ReactNode {
  const { title, items } = block;

  const isExtended = items && items.length > 4;

  return (
    <Container>
      <section className="flex items-start w-full justify-between gap-10">
        <Typography
          variant="menu"
          className="uppercase text-green-acid !font-bold !leading-tight flex-shrink-0 my-6"
        >
          {title}
        </Typography>
        <div
          className={`w-full max-w-[950px] grid ${isExtended ? "grid-cols-2 gap-x-8" : "grid-cols-1"}`}
        >
          {items?.map((item, idx) => {
            const number = String(idx + 1).padStart(2, "0");

            if (!item.description) return null;

            return (
              <AccordionItem
                key={item._key}
                itemKey={item._key}
                number={number}
                title={item.title ?? ""}
                description={item.description}
              />
            );
          })}
        </div>
      </section>
    </Container>
  );
}
