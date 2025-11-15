import type { FC } from "react";
import Image from "next/image";
import { Typography } from "#/design/shared";

export type AdvantageTextCardProps = {
  iconIndex: number;
  title: string;
  description?: string;
  variant?: "detailed" | "simple";
};

export const AdvantageTextCard: FC<AdvantageTextCardProps> = ({
  iconIndex,
  title,
  description,
  variant = "detailed",
}) => {
  if (variant === "simple") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-10 rounded-3xl bg-dark-gray">
        <div className="relative w-[73px] h-[73px] shrink-0">
          <Image
            src={`/detailed-advantages/${(iconIndex % 4) + 1}-hld.png`}
            alt=""
            width={73}
            height={73}
            className="w-full h-full object-contain"
          />
        </div>
        <Typography
          variant="title2"
          className="!font-semibold !text-[32px] !leading-none text-center"
        >
          {title}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between p-10 rounded-3xl bg-dark-gray">
      <div className="relative w-[73px] h-[73px] shrink-0">
        <Image
          src={`/detailed-advantages/${(iconIndex % 4) + 1}-hld.png`}
          alt=""
          width={73}
          height={73}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-6 text-white">
        <Typography
          variant="title2"
          className="!font-semibold !text-[32px] !leading-none"
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body"
            className="!font-medium !text-lg !leading-tight"
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
};
