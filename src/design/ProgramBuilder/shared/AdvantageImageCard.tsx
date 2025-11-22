'use client';

import type { FC } from "react";
import Image from "next/image";
import { urlFor } from "#/sanity/utils";
import { useMobile } from "#/design/shared/useMobile";

export type AdvantageImageCardProps = {
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: unknown;
    crop?: unknown;
    _type: "image";
  };
};

export const AdvantageImageCard: FC<AdvantageImageCardProps> = ({ image }) => {
  const { isMobile } = useMobile();
  return (
    <div className="relative rounded-3xl overflow-hidden bg-dark-gray">
      <Image
        className={`inline-block w-full h-full object-cover object-[70%_30%] grayscale ${isMobile ? "!h-[270px]" : ''}`}
        src={urlFor(image).url()}
        alt="Advantage illustration"
        width={463}
        height={419}
        sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
      />
    </div>
  );
};
