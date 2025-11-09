"use client";

import gsap from "gsap";
import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LenisRef, ReactLenis } from "lenis/react";
import { HeaderContextProvider } from "#/design/shared/Header/HeaderContext";
import { LanguageProvider } from "#/design/shared/language";

export const Providers = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      {!pathname.includes("/dashboard") && (
        <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      )}
      <LanguageProvider>
        <HeaderContextProvider>{children}</HeaderContextProvider>
      </LanguageProvider>
    </>
  );
};
