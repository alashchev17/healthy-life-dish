"use client";

import { FC } from "react";
import { HighlightedText } from "#/design/ui";
import { ProgramSlider } from "../../shared/ProgramSlider";
import type { HighlightText, ProgramBuilder } from "#/sanity/types";
import { Container } from "#/design/shared";

interface HeroSectionProps {
  heroSlogan?: HighlightText | null;
  dietPrograms: ProgramBuilder[];
  trainingPrograms: ProgramBuilder[];
}

export const HeroSection: FC<HeroSectionProps> = ({
  heroSlogan,
  dietPrograms,
  trainingPrograms,
}) => {
  return (
    <Container>
      <section className="h-[1050px] lg:h-[1200px] xl:max-h-full xl:h-full pb-12 xl:pb-20 gap-4 flex flex-col xl:flex-row">
        <div className="shrink-0 px-6 pt-6 pb-6 lg:pt-14 lg:pb-8 lg:px-9 bg-green-acid flex flex-col justify-between rounded-3xl max-w-full xl:max-w-[460px] w-full">
          {heroSlogan && (
            <div className="text-center mb-0 lg:mb-15 mx-auto w-full sm:w-[85%] lg:w-full">
              <HighlightedText
                value={heroSlogan}
                variant="title1"
                className="text-black !text-[1.5rem] xl:!text-[2.5rem] leading-none uppercase max-w-full"
              />
            </div>
          )}

          {dietPrograms.length > 0 && (
            <ProgramSlider programs={dietPrograms} type="diet" />
          )}
        </div>

        <div className="max-w-full xl:max-w-[calc(100%-450px-1rem)] w-full min-h-[565px]">
          {trainingPrograms.length > 0 && (
            <ProgramSlider programs={trainingPrograms} type="training" />
          )}
        </div>
      </section>
    </Container>
  );
};
