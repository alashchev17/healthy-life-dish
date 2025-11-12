import {
  AboutSection,
  HeroSection,
  PromoSection,
  ReviewsSection,
} from "#/design/sections";
import { fetchLandingPageData, fetchProgramsByType } from "#/sanity/lib/api";
import { PageContainer } from "#/design/shared/PageContainer";

export default async function Home() {
  // Fetch landing page data
  const landingPageData = await fetchLandingPageData();
  const { hero, about, promo, reviews } = landingPageData;

  // Fetch programs by type
  const dietPrograms = await fetchProgramsByType("diet");
  const trainingPrograms = await fetchProgramsByType("training");

  return (
    <main className="landing-page">
      <PageContainer>
        <HeroSection
          heroSlogan={hero?.slogan}
          dietPrograms={dietPrograms}
          trainingPrograms={trainingPrograms}
        />
        <AboutSection data={about} />
        <ReviewsSection data={reviews} />
        <PromoSection data={promo} />
      </PageContainer>
    </main>
  );
}
