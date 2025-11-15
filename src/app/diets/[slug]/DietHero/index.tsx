"use client";

import { ProgramBuilder } from "#/sanity/types";
import { Container, Typography, useHeaderContext } from "#/design/shared";
import { urlFor } from "#/sanity/utils/sanityImageUrl";
import Image from "next/image";
import { wordWrap } from "#/app/globalUtils";

export type DietHeroProps = {
  title: ProgramBuilder["title"];
  imagery: ProgramBuilder["imagery"];
  description: NonNullable<ProgramBuilder["description"]>;
};

export function DietHero({ title, description, imagery }: DietHeroProps) {
  const { headerHeight } = useHeaderContext();
  return (
    <Container>
      <section
        className="flex items-stretch gap-5 pb-10"
        style={{ height: `calc(100dvh - ${headerHeight}px)` }}
      >
        <div className="flex flex-col items-start gap-8 p-9 bg-green-acid rounded-3xl text-dark-gray w-full max-w-1/3">
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
        <div className="border-4 h-full w-full flex items-center py-21 justify-center rounded-3xl border-dark-gray max-w-2/3">
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
