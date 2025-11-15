import { redirect } from "next/navigation";

import { ProgramBuilder } from "#/design/ProgramBuilder";

import { fetchProgramBySlug } from "#/sanity/lib";
import { PageContainer } from "#/design/shared";

import { DietHero } from "./DietHero";

export default async function DietPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const [program] = await Promise.all([
    fetchProgramBySlug(slug),
    // fetchSettings(language),
  ]);

  if (!program) return redirect("/diets");

  const contentBlocks = program.content;

  return (
    <PageContainer className="bg-black">
      <DietHero
        title={program.title}
        description={program.description ?? ""}
        imagery={program.imagery}
      />
      <ProgramBuilder blocks={contentBlocks} />
    </PageContainer>
  );
}
