"use client";

import type { ReactNode } from "react";

import type { AudienceBlock as AudienceBlockType } from "#/sanity/types";

import { Typography } from "#/design/shared";
import Image from "next/image";
import { urlFor } from "#/sanity/utils/sanityImageUrl";

export type AudienceBlockProps = {
  block: AudienceBlockType;
};

export function AudienceBlock({ block }: AudienceBlockProps): ReactNode {
  const { title, audiences } = block;

  return (
    <section className="flex flex-col items-start gap-10">
      <Typography
        variant="menu"
        className="uppercase text-green-acid !font-bold !leading-tight"
      >
        {title}
      </Typography>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {audiences?.map((audience) => {
          return (
            <div
              key={audience._key}
              className="relative rounded-3xl overflow-hidden border-[3px] border-green-acid bg-dark-gray"
            >
              <Image
                className="w-full h-auto aspect-[4/3] object-cover"
                src={urlFor(audience.image!).url()}
                alt={audience.description || "Target audience"}
                width={465}
                height={350}
              />
              <div className="p-6 bg-green-acid">
                <Typography
                  variant="body"
                  className="!font-medium !text-base !text-black !leading-relaxed"
                >
                  {audience.description}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
