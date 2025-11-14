"use client";

import { ProgramBuilder } from "#/sanity/types";
import { FC } from "react";
import { Container, Typography, useHeaderContext } from "#/design/shared";
import Image from "next/image";
import { urlFor } from "#/sanity/utils/sanityImageUrl";
import { ArrowRight, GradientCircle } from "#/design/icons";
import { Button } from "#/design/ui";
import Link from "next/link";

export type ProgramsCarouselProps = {
  programs: ProgramBuilder[];
  ctaLabel: string;
};

export function ProgramsCarousel({
  programs,
  ctaLabel,
}: ProgramsCarouselProps) {
  const { headerHeight } = useHeaderContext();
  return (
    <Container>
      <div
        className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-[10px] pb-9"
        style={{ height: `calc(100dvh - ${headerHeight}px)` }}
      >
        {programs.map((program) => (
          <ProgramCard
            key={program._id}
            program={program}
            ctaLabel={ctaLabel}
          />
        ))}
      </div>
    </Container>
  );
}

type ProgramCardProps = {
  program: ProgramBuilder;
  ctaLabel: string;
};

const ProgramCard: FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="relative flex flex-col justify-between z-10 pt-7 pl-9 pb-9 bg-dark-gray rounded-3xl border-[3px] box-border border-transparent transition-colors duration-200 overflow-hidden group hover:border-green-acid">
      {/* ProgramCard Title */}
      <div className="flex flex-col gap-6">
        <Typography
          variant="bottoms"
          className="uppercase text-light-gray !font-bold !text-[1.25rem] !trim-both"
        >
          Програма
        </Typography>
        <Typography
          variant="title2"
          className="uppercase text-white !leading-none !trim-both"
        >
          {program.title}
        </Typography>
      </div>
      <Link
        href={`/programs/${program.slug?.current ?? ""}`}
        className="inline-block relative z-1"
      >
        <Button
          variant="icon"
          className="w-16 h-16"
          icon={<ArrowRight />}
        ></Button>
      </Link>
      {program.imagery?.thumb && (
        <Image
          className="absolute z-1 bottom-0 right-0 translate-x-[30%] grayscale group-hover:grayscale-0 transition-[filter] pointer-events-none select-none duration-200"
          src={urlFor(program.imagery?.thumb).url()}
          width={500}
          height={625}
          alt={`Thumb: ${program.title}`}
        />
      )}
      <GradientCircle className="w-[1260px] h-[1335px] blur-xl absolute top-0 -left-[175px] text-green-acid z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
