"use client";

import type { ReactNode } from "react";
import Image from "next/image";

import { indexToNumberedString, wordWrap } from "#/globalUtils";

import { HighlightedText } from "#/design/ui";
import { urlFor } from "#/sanity/utils";
import { Container, Typography } from "#/design/shared";

import type { NumberedListWithImage as NumberedListWithImageBlock } from "#/sanity/types";

export type NumberedListWithImageProps = {
  block: NumberedListWithImageBlock;
};

export function NumberedListWithImage({
  block,
}: NumberedListWithImageProps): ReactNode {
  const { items, title, style, preview: _preview } = block;

  return (
    <Container>
      <section className="flex flex-col items-start gap-10">
        <Typography
          variant="menu"
          className="uppercase text-green-acid !font-bold !leading-tight"
        >
          {title}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex w-full gap-2 md:gap-4 lg:gap-5 lg:flex-nowrap lg:min-h-[600px]">
          {items?.map((item, idx) => {
            return (
              <div
                key={item._key}
                className={`flex flex-col border-[3px] rounded-3xl overflow-hidden lg:flex-1 ${style === 'active' ? 'border-green-acid bg-green-acid' : 'border-dark-gray bg-dark-gray'}`}
              >
                <Image
                  className="rounded-b-3xl w-full min-h-[281px] lg:min-h-unset h-auto aspect-[16/9] object-cover object-left-top md:object-center"
                  src={urlFor(item.image!).url()}
                  alt={`Photo: ${title}, image ${idx + 1}`}
                  width={465}
                  height={280}
                />
                <div className={`p-4 md:p-6 flex flex-col gap-2 md:gap-4 lg:gap-2 ${style === 'active' ? 'text-black' : 'text-white'}`}>
                  <Typography variant='menu' className={`!font-bold !text-sm md:!text-xl lg:!text-2xl slashed-zero ${style === 'active' ? 'text-non-accent-green' : 'text-light-gray'}`}>
                    {indexToNumberedString(idx)}
                  </Typography>
                  <Typography variant="title2" className="!font-bold !text-xl md:!text-2xl lg:!text-3xl !leading-none">
                    {item.title}
                  </Typography>
                  <HighlightedText
                    value={item.description!}
                    variant="body"
                    className="!font-medium !text-base md:!text-lg lg:!text-xl !leading-tight"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
