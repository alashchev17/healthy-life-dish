"use client";

import { RefObject } from "react";
import { ProgramBuilder } from "#/sanity/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  COLUMNS_PER_ROW,
  DEFAULT_GRID_COLUMNS,
  GRID_ANIMATION_DURATION,
  GRID_ANIMATION_EASE,
} from "./constants";

export type UseProgramCarouselAnimationProps = {
  gridRef: RefObject<HTMLDivElement | null>;
  expandedCardId: string | null;
  programs: ProgramBuilder[];
};

export function useProgramCarouselAnimation({
  gridRef,
  expandedCardId,
  programs,
}: UseProgramCarouselAnimationProps) {
  const getGridTemplateColumns = () => {
    if (expandedCardId === null) return DEFAULT_GRID_COLUMNS;

    const expandedIndex = programs.findIndex((p) => p._id === expandedCardId);
    if (expandedIndex === -1) return DEFAULT_GRID_COLUMNS;

    const columnPosition = expandedIndex % COLUMNS_PER_ROW;
    const isLastColumn = columnPosition === COLUMNS_PER_ROW - 1;

    if (isLastColumn) return "1fr 1fr 1fr 2fr";
    if (columnPosition === 0) return "2fr 1fr 1fr 1fr";
    if (columnPosition === 1) return "1fr 2fr 1fr 1fr";
    return "1fr 1fr 2fr 1fr";
  };

  useGSAP(
    () => {
      if (!gridRef.current) return;
      gsap.set(gridRef.current, { gridTemplateColumns: DEFAULT_GRID_COLUMNS });
    },
    { scope: gridRef },
  );

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const targetColumns = getGridTemplateColumns();
      gsap.killTweensOf(gridRef.current);

      gsap.to(gridRef.current, {
        gridTemplateColumns: targetColumns,
        duration: GRID_ANIMATION_DURATION,
        ease: GRID_ANIMATION_EASE,
      });
    },
    { dependencies: [expandedCardId], scope: gridRef },
  );
}
