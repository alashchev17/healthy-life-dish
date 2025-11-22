"use client";

import { useMobile } from "#/design/shared/useMobile";
import type { ProgramBuilder } from "#/sanity/types";
import { DietsCarousel } from "./DietsCarousel";
import { DietCardMobile } from "./DietsCarousel/DietCardMobile";

interface DietsResponsiveWrapperProps {
  programs: ProgramBuilder[];
  ctaLabel: string;
}

// Mobile card list wrapper
function DietCardsList({ programs, ctaLabel }: DietsResponsiveWrapperProps) {
  if (!programs || programs.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-black px-4 py-8">
      <div className="flex flex-col gap-4">
        {programs.map((program) => (
          <DietCardMobile
            key={program._id}
            program={program}
            ctaLabel={ctaLabel}
          />
        ))}
      </div>
    </div>
  );
}

export function DietsResponsiveWrapper({
  programs,
  ctaLabel,
}: DietsResponsiveWrapperProps) {
  const { isLessThanX } = useMobile();

  // Render card list for mobile, carousel for tablet/desktop
  if (isLessThanX(700)) {
    return <DietCardsList programs={programs} ctaLabel={ctaLabel} />;
  }

  return <DietsCarousel programs={programs} ctaLabel={ctaLabel} />;
}
