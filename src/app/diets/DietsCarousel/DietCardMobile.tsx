import Image from "next/image";
import Link from "next/link";
import { Typography } from "#/design/shared/Typography";
import { Button } from "#/design/ui";
import { ArrowRight } from "#/design/icons";
import { urlFor } from "#/sanity/utils";
import { useLanguage } from "#/design/shared/language";
import { wordWrap } from "#/globalUtils";
import type { ProgramBuilder } from "#/sanity/types";

interface DietCardMobileProps {
  program: ProgramBuilder;
  ctaLabel: string;
}

export function DietCardMobile({ program, ctaLabel }: DietCardMobileProps) {
  const { currentLanguage } = useLanguage();

  return (
    <div className="w-full bg-dark-gray rounded-3xl overflow-hidden flex flex-col">
      {/* Circular Image */}
      <div className="relative w-full max-w-[450px] aspect-square p-8 flex items-center justify-center self-center">
        {program.imagery?.splash && (
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={urlFor(program.imagery.splash).width(430).height(430).url()}
              alt={program.title || ""}
              fill
              className="object-cover"
              sizes="90vw"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 px-6 pb-6">
        {/* Title */}
        <Typography
          variant="menu"
          className="uppercase text-green-acid !text-[1.25rem] !font-bold !leading-tight"
        >
          {program.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body"
          className="text-white !font-medium !leading-tight"
        >
          {program.shortDescription}
        </Typography>

        {/* CTA Button */}
        <Link
          href={`/diets/${program.slug?.current ?? ""}`}
          className="block w-full"
        >
          <Button
            variant="primary"
            fullWidth
            className="font-bold uppercase"
            icon={<ArrowRight />}
          >
            {ctaLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
