import { type FC, ReactNode } from "react";
import Link from "next/link";

import type { FooterData } from "#/sanity/lib";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "#/design/icons/social";

export type FooterSocialLink = NonNullable<
  NonNullable<FooterData>["socialLinks"]
>[number];

export type FooterLinksProps = {
  links: FooterSocialLink[];
};

const SOCIAL_ICONS: Record<NonNullable<FooterSocialLink["icon"]>, ReactNode> = {
  linkedin: <LinkedInIcon />,
  x: <XIcon />,
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
} as const;

export const FooterLinks: FC<FooterLinksProps> = ({ links }) => {
  return (
    <div className="flex gap-4 md:gap-8 items-center justify-between md:justify-start mt-6 md:mt-10 lg:mt-0 lg:mb-4 w-full md:w-auto">
      {links.map((l) => {
        if (!l.url || !l.icon) return;
        return (
          <Link
            key={l._key}
            href={l.url}
            className="text-light-gray hover:text-green-acid transition-colors"
          >
            {SOCIAL_ICONS[l.icon]}
          </Link>
        );
      })}
    </div>
  );
};
