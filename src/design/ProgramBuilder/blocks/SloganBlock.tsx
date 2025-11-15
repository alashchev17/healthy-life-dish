"use client";

import type { ReactNode } from "react";

import type { SloganBlock as SloganBlockType } from "#/sanity/types";

import { Slogan } from "#/design/shared";

export type SloganBlockProps = {
  block: SloganBlockType;
};

export function SloganBlock({ block }: SloganBlockProps): ReactNode {
  const { slogan } = block;

  if (!slogan) return null;

  return <Slogan slogan={slogan} />;
}
