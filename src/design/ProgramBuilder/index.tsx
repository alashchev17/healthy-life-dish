"use client";

import type { ProgramBuilder } from "#/sanity/types";
import { useProgramBuilder } from "./useProgramBuilder";

export type ProgramBuilderProps = {
  blocks: ProgramBuilder["content"];
};

export function ProgramBuilder({ blocks }: ProgramBuilderProps) {
  const { elements } = useProgramBuilder({ blocks });

  if (!blocks) return null;

  return <div className="flex flex-col gap-[100px]">
    {elements}
  </div>;
}
