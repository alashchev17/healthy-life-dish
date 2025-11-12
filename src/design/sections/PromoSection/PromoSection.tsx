"use client";

import { FC } from "react";
import Image from "next/image";
import { Container } from "#/design/shared";
import { Button, HighlightedText } from "#/design/ui";
import { GradientCircle } from "#/design/icons";
import { LANDING_PAGE_QUERYResult } from "#/sanity/types";

export type PromoSectionData = LANDING_PAGE_QUERYResult["promo"];

type PromoSectionProps = {
  data?: PromoSectionData;
};

export const PromoSection: FC<PromoSectionProps> = ({ data }) => {
  if (!data || !data.isActive) return null;

  const handleObtainDiet = () => {};
  const handleObtainProgram = () => {};

  return (
    <section className="relative bg-black py-32 lg:py-20 overflow-hidden">
      <GradientCircle className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-green-acid h-[350px] aspect-square lg:h-auto" />
      <GradientCircle className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-green-acid h-[350px] aspect-square lg:h-auto" />
      <Container>
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-14 max-w-[700px] mx-auto">
          <div className="flex justify-center">
            <Image
              src="/landing/promo-img.png?url"
              alt="Imagery: Promo section"
              width={214}
              height={171}
            />
          </div>
          {data.slogan && (
            <HighlightedText
              value={data.slogan}
              variant="title1"
              className="font-normal text-white text-center !text-[32px] lg:!text-[48px] !leading-none"
            />
          )}
          <div className="flex items-center gap-2 lg:gap-4 w-full sm:w-auto justify-center">
            <Button
              variant="secondary"
              onClick={handleObtainDiet}
              className="whitespace-nowrap"
            >
              Забрати дієту
            </Button>
            <Button
              variant="secondary"
              onClick={handleObtainProgram}
              className="whitespace-nowrap"
            >
              Забрати програму
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
