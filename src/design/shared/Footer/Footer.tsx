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
        height: isMobile ? "auto" : `calc(100vh - ${headerHeight}px)`,
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
          <div className="flex flex-col lg:flex-row items-stretch gap-4 md:gap-5 h-full">
            {emailSubscription && (
              <div className="flex flex-col justify-between bg-dark-gray p-4 rounded-3xl w-full lg:max-w-1/3">
                <div className="flex flex-col gap-9">
                  <div className="flex flex-col gap-2 items-start px-0 md:px-2 lg:px-0">
                    <Typography
                      variant="title2"
                      className="!text-2xl lg:!text-[2rem] lg:uppercase"
                    >
                      {emailSubscription.title}
                    </Typography>
                    <Typography variant="body">
                      {emailSubscription.description}
                    </Typography>
                  </div>
                  <div className="flex flex-col md:flex-row lg:flex-col gap-4 md:gap-4 mb-[18px] lg:mb-0">
                    <InputField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={emailSubscription.emailPlaceholder}
                      className="w-full min-w-1/2"
                    />
                    <Button
                      onClick={handleEmailSubscription}
                      icon={<ArrowRight />}
                      className="w-full lg:w-auto"
                    >
                      {emailSubscription.callToAction?.label}
                    </Button>
                  </div>
                </div>
                <Typography
                  variant="small"
                  className="block mt-auto text-light-gray lg:text-white"
                >
                  {emailSubscription.disclaimerText}
                </Typography>
              </div>
            )}
            <div className="flex flex-col items-start justify-between border-[3px] rounded-3xl border-dark-gray w-full p-6 md:p-6 lg:p-4">
              <NavigationGrid sections={navigationSections} variant="footer" />
              {socialLinks && <FooterLinks links={socialLinks} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 w-full">
          <Typography variant="small" className="text-light-gray">
            &copy; {currentYear} {data.copyrightText}
          </Typography>
        </div>
      </Container>
    </footer>
  );
};
