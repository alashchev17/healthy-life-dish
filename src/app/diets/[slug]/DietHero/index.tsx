"use client";

import { ProgramBuilder } from "#/sanity/types";
import { Container, Typography, useHeaderContext } from "#/design/shared";
import { urlFor } from "#/sanity/utils";
import Image from "next/image";
import { wordWrap } from "#/globalUtils";
import { useMobile } from "#/design/shared/useMobile";

export type DietHeroProps = {
  title: ProgramBuilder["title"];
  imagery: ProgramBuilder["imagery"];
  description: NonNullable<ProgramBuilder["description"]>;
};

export function DietHero({ title, description, imagery }: DietHeroProps) {
  const { headerHeight } = useHeaderContext();
  const { isMobile } = useMobile();

  return (
    <Container>
      <section
        className="flex flex-col md:flex-row items-stretch gap-5 pb-10"
        style={{ height: isMobile ? 'auto' : `calc(100dvh - ${headerHeight}px)` }}
      >
        <div className="flex flex-col items-start gap-4 md:gap-8 pt-4 pb-6 px-6 md:p-9 bg-green-acid rounded-3xl text-dark-gray w-full max-w-full md:max-w-[43%] lg:max-w-1/3">
          <div className="flex flex-col items-start gap-2">
            <Typography
              variant="bottoms"
              className="uppercase text-non-accent-green !trim-both"
            >
              Дієта
            </Typography>
            <Typography
              variant="title1"
              className="lg:!text-[3rem] uppercase !leading-none !trim-both"
            >
              {wordWrap({ text: title, limit: 12, language: "ukr" })}
            </Typography>
          </div>
          <Typography variant="body">{description}</Typography>
        </div>
        <div className="border-4 h-full w-full flex items-center py-12 px-16 md:py-21 md:px-12 justify-center rounded-3xl border-dark-gray max-w-full md:max-w-[57%] lg:max-w-2/3">
          {imagery?.splash && (
            <Image
              src={urlFor(imagery?.splash).url() ?? ""}
              alt={`Photo: ${title}`}
              width={470}
              height={470}
            />
          )}
        </div>
      </section>
    </Container>
  );
}
