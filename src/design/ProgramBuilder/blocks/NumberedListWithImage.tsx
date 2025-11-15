"use client";

import type { ReactNode } from "react";

import type { NumberedListWithImage as NumberedListWithImageBlock } from "#/sanity/types";

import { Container, Typography } from "#/design/shared";
import Image from "next/image";
import { urlFor } from "#/sanity/utils/sanityImageUrl";
import { HighlightedText } from "#/design/ui";

export type NumberedListWithImageProps = {
  block: NumberedListWithImageBlock;
};

export function NumberedListWithImage({
  block,
}: NumberedListWithImageProps): ReactNode {
  const { items, title, style: _style, preview: _preview } = block;

  return (
    <Container>
      <section className="flex flex-col items-start gap-10">
        <Typography
          variant="menu"
          className="uppercase text-green-acid !font-bold !leading-tight"
        >
          {title}
        </Typography>
        <div className="flex w-full flex-nowrap gap-5 min-h-[600px]">
          {items?.map((item, idx) => {
            return (
              <div
                key={item._key}
                className="flex flex-1 flex-col border-[3px] border-dark-gray rounded-3xl overflow-hidden bg-dark-gray"
              >
                <Image
                  className="rounded-b-3xl w-full h-auto aspect-[16/9] object-cover"
                  src={urlFor(item.image!).url()}
                  alt={`Photo: ${title}, image ${idx + 1}`}
                  width={465}
                  height={280}
                />
                <div className="p-10 flex flex-col gap-6">
                  <Typography variant="title2" className="!font-bold !text-3xl">
                    {item.title}
                  </Typography>
                  <HighlightedText
                    value={item.description!}
                    variant="body"
                    className="!font-medium !text-xl !leading-tight"
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
