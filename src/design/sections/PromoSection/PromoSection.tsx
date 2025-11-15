"use client";

import { FC } from "react";
import { Promo } from "#/design/shared";
import { LANDING_PAGE_QUERYResult } from "#/sanity/types";

export type PromoSectionData = LANDING_PAGE_QUERYResult["promo"];

type PromoSectionProps = {
  data?: PromoSectionData;
};

export const PromoSection: FC<PromoSectionProps> = ({ data }) => {
  if (!data || !data.isActive || !data.slogan) return null;

  const handleObtainDiet = () => {};
  const handleObtainProgram = () => {};

  return (
    <Promo
      text={data.slogan}
      image={{
        src: "/landing/promo-img.png?url",
        alt: "Imagery: Promo section",
        width: 214,
        height: 171,
      }}
      buttons={[
        {
          text: "Забрати дієту",
          onClick: handleObtainDiet,
          variant: "secondary",
        },
        {
          text: "Забрати програму",
          onClick: handleObtainProgram,
          variant: "secondary",
        },
      ]}
      className="bg-black"
      textClassName="!text-[32px] lg:!text-[48px]"
      showGradientCircles={true}
    />
  );
};
