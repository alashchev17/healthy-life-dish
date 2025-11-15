import type { FC } from "react";
import Image from "next/image";
import { urlFor } from "#/sanity/utils/sanityImageUrl";

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
  return (
    <div className="relative rounded-3xl overflow-hidden bg-dark-gray">
      <Image
        className="w-full h-full object-cover grayscale"
        src={urlFor(image).url()}
        alt="Advantage illustration"
        width={463}
        height={419}
      />
    </div>
  );
};
