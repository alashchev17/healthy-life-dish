"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";

import type { FooterData, ProgramBuilder } from "#/sanity/lib";

import { Button, InputField } from "#/design/ui";
import {
  Container,
  NavigationGrid,
  prepareNavigationData,
  Typography,
} from "#/design/shared";

import { ArrowRight, LogoFull, LogoFullExtended } from "#/design/icons";

import { useFooterData } from "./useFooterData";
import { FooterLinks } from "./FooterLinks";

export type FooterProps = {
  className?: string;
  data: FooterData;
  programsData: ProgramBuilder[];
};

export const Footer: FC<FooterProps> = ({ className, data, programsData }) => {
  const pathname = usePathname();
  const {
    isMobile,
    headerHeight,
    email,
    currentYear,
    setEmail,
    handleEmailSubscription,
  } = useFooterData();

  // Not rendering header if it's a sanity dashboard page
  if (pathname.includes("dashboard")) return null;
  if (!data) return null;

  const { emailSubscription, generalLinks, socialLinks } = data;

  // Prepare navigation sections
  const navigationSections = prepareNavigationData({
    programsData,
    generalLinks,
  });

  return (
    <footer
      className={`footer ${className ?? ""}`}
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <Container className="flex flex-col gap-6 h-full pb-6">
        <div className="flex flex-col w-full h-full gap-6">
          <div className="w-full h-auto text-green-acid">
            {isMobile ? (
              <LogoFull className="w-full h-auto" />
            ) : (
              <LogoFullExtended className="w-full h-auto" />
            )}
          </div>
          <div className="flex items-stretch gap-5 h-full">
            {emailSubscription && (
              <div className="flex flex-col justify-between bg-dark-gray p-4 rounded-3xl max-w-1/3">
                <div className="flex flex-col gap-9">
                  <div className="flex flex-col gap-2 items-start">
                    <Typography variant="title2" className="uppercase">
                      {emailSubscription.title}
                    </Typography>
                    <Typography variant="body">
                      {emailSubscription.description}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-4">
                    <InputField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={emailSubscription.emailPlaceholder}
                    />
                    <Button
                      onClick={handleEmailSubscription}
                      icon={<ArrowRight />}
                    >
                      {emailSubscription.callToAction?.label}
                    </Button>
                  </div>
                </div>
                <Typography variant="small" className="block mt-auto">
                  {emailSubscription.disclaimerText}
                </Typography>
              </div>
            )}
            <div className="flex flex-col items-start justify-between border-[3px] rounded-3xl border-dark-gray w-full p-4">
              <NavigationGrid sections={navigationSections} variant="footer" />
              {socialLinks && <FooterLinks links={socialLinks} />}
            </div>
          </div>
        </div>
        <Typography variant="small" className="text-light-gray">
          &copy; {currentYear} {data.copyrightText}
        </Typography>
      </Container>
    </footer>
  );
};
