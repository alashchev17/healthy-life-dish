"use client";

import { FC, useEffect, useRef } from "react";
import Link from "next/link";
import { Typography } from "#/design/shared/Typography";
import { LogoFull } from "#/design/icons/LogoFull";
import { Container } from "#/design/shared";
import { useHeaderContext } from "#/design/shared/Header/HeaderContext";
import { LanguageSwitcher } from "#/design/shared/LanguageSwitcher/LanguageSwitcher";

export const Header: FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { setHeaderHeight } = useHeaderContext();

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef, setHeaderHeight]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm"
    >
      <Container className="py-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <LogoFull className="text-green-acid" />
          </Link>
          <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-10">
            <Link
              href="/services"
              className="text-green-acid transition-colors"
            >
              <Typography variant="menu" className="uppercase">
                Послуги
              </Typography>
            </Link>
            <Link href="/diets" className="text-green-acid transition-colors">
              <Typography variant="menu" className="uppercase">
                Дієти
              </Typography>
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </Container>
    </header>
  );
};
