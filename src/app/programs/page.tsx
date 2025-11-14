import { PageContainer } from "#/design/shared/PageContainer";
import { fetchProgramsByType, fetchSettings } from "#/sanity/lib/queries";
import { ProgramsCarousel } from "./ProgramsCarousel";

export default async function ProgramsPage() {
  // TODO: Get language from context/params
  const language = "ua";

  const [programs, settings] = await Promise.all([
    fetchProgramsByType("training", language),
    fetchSettings(language),
  ]);

  const ctaLabel = settings?.globalCtas?.learnMore || "Дізнатися більше";

  return (
    <PageContainer className="bg-black">
      <ProgramsCarousel programs={programs} ctaLabel={ctaLabel} />
    </PageContainer>
  );
}
