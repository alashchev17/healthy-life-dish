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
  const isSimple = variant === "simple";

  const icon = (
    <div className="relative w-19 h-19 mb-6 md:mb-0 md:w-14 md:h-14 lg:w-[73px] lg:h-[73px] shrink-0">
      <Image
        src={`/detailed-advantages/${(iconIndex % 4) + 1}-hld.png`}
        alt=""
        width={73}
        height={73}
        className="w-full h-full object-contain"
      />
    </div>
  );

  return (
    <div
      className={`flex flex-col p-6 md:p-8 lg:p-10 rounded-3xl bg-dark-gray ${
        isSimple ? "items-center justify-center gap-4 md:gap-5 lg:gap-6" : "justify-between"
      }`}
    >
      {icon}
      <div className={`flex flex-col gap-4 md:gap-5 lg:gap-6 ${isSimple ? "" : "text-white"}`}>
        <Typography
          variant="title2"
          className={`!font-semibold !text-xl md:!text-2xl lg:!text-[32px] !leading-none ${
            isSimple ? "text-center" : ""
          }`}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body"
            className="!font-medium !text-sm md:!text-base lg:!text-lg !leading-tight"
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
};
