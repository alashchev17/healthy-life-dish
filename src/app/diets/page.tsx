import { PageContainer } from "#/design/shared/PageContainer";
import { fetchProgramsByType, fetchSettings } from "#/sanity/lib/queries";
import { DietsResponsiveWrapper } from "./DietsResponsiveWrapper";

export default async function DietsPage() {
  // TODO: Get language from context/params
  const language = "ua";

  const [programs, settings] = await Promise.all([
    fetchProgramsByType("diet", language),
    fetchSettings(language),
  ]);

  const ctaLabel = settings?.globalCtas?.learnMore || "Дізнатися більше";

  return (
    <PageContainer className="bg-black">
      <DietsResponsiveWrapper programs={programs} ctaLabel={ctaLabel} />
    </PageContainer>
  );
}
