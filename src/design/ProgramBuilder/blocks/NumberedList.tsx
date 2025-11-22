"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { HighlightText as HighlightTextType, NumberedList as NumberedListBlock } from "#/sanity/types";

import { wordWrap } from "#/globalUtils";

import { Container, Typography } from "#/design/shared";
import { HighlightedText } from "#/design/ui";
import { useLanguage } from "#/design/shared/language";
import { useMobile } from "#/design/shared/useMobile";
import { indexToNumberedString } from "#/globalUtils/indexToNumberedString";

export type NumberedListProps = {
  block: NumberedListBlock;
};

function AccordionItem({
  number,
  title,
  description,
  itemKey,
  compact = false,
}: {
  number: string;
  title: string;
  description: HighlightTextType;
  itemKey: string;
  compact?: boolean;
}) {
  const { currentLanguage } = useLanguage();
  const { isLessThan992 } = useMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderTitle = useMemo(() => {
    const wrappedTitle = wordWrap({ text: title, limit: 12, language: currentLanguage.code });
    if (isLessThan992) return title;
    if (!compact) return title;
    return wrappedTitle;
  }, [title, currentLanguage, compact, isLessThan992]);

  return (
    <button
      key={itemKey}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group w-full flex items-start justify-between border-b-[3px] border-dark-gray
        cursor-pointer text-left transition-all duration-300
        pl-2 pt-6 pb-2
        ${!compact ? "lg:gap-6 lg:pb-6 lg:px-2 lg:pt-2" : ""}
        ${isHovered && !isExpanded ? "bg-dark-gray" : "bg-transparent"}
        ${isExpanded ? 'pb-6' : ''}
      `}
    >
      <Typography
        variant="title2"
        className={`
          !font-bold uppercase transition-colors duration-300 md:slashed-zero
          !text-[32px] !leading-none
          md:!text-[86.427px] md:!tracking-[-6.9141px] md:!leading-tight
          ${compact ? "lg:!text-[48px] lg:!tracking-[-3.84px]" : ""}
          ${isHovered && !isExpanded ? "text-green-acid opacity-100" : "text-dark-gray opacity-40"}
        `}
      >
        {number}
      </Typography>
      <div className={`flex-1 flex flex-col gap-[21px] pr-9 max-w-[240px] md:max-w-[450px] md:gap-5 md:pt-2 ${compact ? "lg:max-w-[299px] lg:pr-2 lg:gap-[21px] lg:pt-0" : ""}`}>
        <Typography
          variant="title2"
          className="!font-bold !text-[20px] !leading-[1.15] text-green-acid uppercase md:!font-semibold md:!text-[32px] md:!leading-tight"
        >
          {renderTitle}
        </Typography>
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <HighlightedText
            value={description}
            variant="body"
            className="!text-sm !leading-tight !font-medium lg:!text-lg"
          />
        </div>
      </div>
    </button>
  );
}

export function NumberedList({ block }: NumberedListProps): ReactNode {
  const { title, items } = block;

  // Distribute items into columns (for desktop only when >4 items, mobile/tablet stack them)
  const distributeItems = useCallback(() => {
    if (!items || items.length <= 4) {
      return [items || []];
    }

    const itemsPerColumn = Math.ceil(items.length / 2);
    const firstColumn = items.slice(0, itemsPerColumn);
    const secondColumn = items.slice(itemsPerColumn);

    return [firstColumn, secondColumn];
  }, [items]);

  const columns = distributeItems();
  const isExtended = items && items.length > 4;

  return (
    <Container>
      <section className="flex flex-col lg:flex-row lg:items-start w-full lg:justify-between gap-6 md:gap-10">
        <Typography
          variant="menu"
          className="uppercase text-green-acid !font-medium !text-[20px] md:!font-bold md:!text-[24px] !leading-tight flex-shrink-0 md:my-6"
        >
          {title}
        </Typography>
        <div className={`w-full max-w-[950px] flex flex-col flex-nowrap ${isExtended ? "lg:flex-row lg:gap-x-[21px]" : ""}`}>
          {columns.map((columnItems, columnIdx) => (
            <div key={columnIdx} className="flex flex-col flex-1">
              {columnItems.map((item, idx) => {
                // Calculate global index for proper numbering
                const globalIdx = columnIdx === 0
                  ? idx
                  : Math.ceil((items?.length || 0) / 2) + idx;
                const number = indexToNumberedString(globalIdx);

                if (!item.description) return null;

                return (
                  <AccordionItem
                    key={item._key}
                    itemKey={item._key}
                    number={number}
                    title={item.title ?? ""}
                    description={item.description}
                    compact={isExtended}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
