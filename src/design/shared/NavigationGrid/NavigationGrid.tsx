import { FC } from "react";
import Link from "next/link";
import type { FooterData } from "#/sanity/lib";
import { Badge } from "#/design/shared";

// Type definitions
export type NavigationLink = NonNullable<
  NonNullable<FooterData>["generalLinks"]
>[number];

export type NavigationSection = {
  label: string;
  links: NavigationLink[];
};

export type NavigationGridProps = {
  sections: NavigationSection[];
  variant: "footer" | "header";
  className?: string;
};

export const NavigationGrid: FC<NavigationGridProps> = ({
  sections,
  variant,
  className,
}) => {
  const isFooter = variant === "footer";

  return (
    <div
      className={`navigation-grid ${isFooter ? "navigation-grid--footer" : "navigation-grid--header"} ${className ?? ""}`}
    >
      <div className="flex items-start w-full gap-16">
        {sections.map((section) => (
          <div
            key={`${section.label}-section`}
            className="flex flex-col items-start"
          >
            <Badge>{section.label}</Badge>
            <div className="flex flex-col pl-4 pt-4 gap-4">
              {section.links.map((link) => (
                <Link key={link._key} href={link.url ?? "#"}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
