"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ProgramBuilder } from "#/sanity/types";
import { Container, useHeaderContext } from "#/design/shared";

import { ProgramCard } from "./ProgramCard";
import { useProgramCarouselAnimation } from "./useProgramCarouselAnimation";

gsap.registerPlugin(useGSAP);

export type ProgramsCarouselProps = {
  programs: ProgramBuilder[];
  ctaLabel: string;
};

export function ProgramsCarousel({
  programs,
  ctaLabel,
}: ProgramsCarouselProps) {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { headerHeight } = useHeaderContext();
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCardToggle = (programId: string, force = false) => {
    if (!force && isAnimating) return;
    setExpandedCardId((prev) => (prev === programId ? null : programId));
  };

  useProgramCarouselAnimation({ gridRef, expandedCardId, programs });

  return (
    <Container>
      <div
        ref={gridRef}
        className="hidden lg:grid gap-[10px] pb-9"
        style={{ height: `calc(100dvh - ${headerHeight}px)` }}
      >
        {programs.map((program, index) => (
          <ProgramCard
            key={program._id}
            program={program}
            ctaLabel={ctaLabel}
            index={index}
            isExpanded={expandedCardId === program._id}
            onToggle={(force?: boolean) => handleCardToggle(program._id, force)}
            onAnimationStateChange={setIsAnimating}
          />
        ))}
      </div>

      <div className="hidden md:flex lg:hidden flex-row flex-wrap gap-[10px] pb-9">
        {programs.map((program) => (
          <ProgramCard
            key={program._id}
            program={program}
            href={`/programs/${program.slug?.current ?? ""}`}
            variant="tablet"
          />
        ))}
      </div>

      <div className="flex md:hidden flex-col gap-[10px] pb-9">
        {programs.map((program) => (
          <ProgramCard
            key={program._id}
            program={program}
            href={`/programs/${program.slug?.current ?? ""}`}
            variant="mobile"
          />
        ))}
      </div>
    </Container>
  );
}
