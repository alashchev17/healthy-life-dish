import { HeroSection, AboutSection } from '#/design/sections'
import { Header } from '#/design/shared'
import { ReviewsSection } from '#/design/sections/ReviewsSection'
import { fetchLandingPageData, fetchProgramsByType } from '#/sanity/lib/api'
import { HeaderContextProvider } from '#/design/shared/Header/HeaderContext'

export default async function Home() {
  // Fetch landing page data
  const landingPageData = await fetchLandingPageData()
  const { hero, about, reviews } = landingPageData

  // Fetch programs by type
  const dietPrograms = await fetchProgramsByType('diet')
  const trainingPrograms = await fetchProgramsByType('training')

  return (
    <HeaderContextProvider>
      <Header />
      <main className="landing-page">
        <HeroSection heroSlogan={hero?.slogan} dietPrograms={dietPrograms} trainingPrograms={trainingPrograms} />
        <AboutSection data={about} />
        <ReviewsSection data={reviews} />
      </main>
    </HeaderContextProvider>
  )
}
