import { HeroSection, AboutSection } from '#/design/sections'
import { Header } from '#/design/shared'
import { fetchLandingPageData, fetchProgramsByType } from '#/sanity/lib/api'

export default async function Home() {
  // Fetch landing page data
  const landingPageData = await fetchLandingPageData()
  const { hero, about } = landingPageData

  // Fetch programs by type
  const dietPrograms = await fetchProgramsByType('diet')
  const trainingPrograms = await fetchProgramsByType('training')

  return (
    <>
      <Header />
      <main className="landing-page">
        <HeroSection heroSlogan={hero?.slogan} dietPrograms={dietPrograms} trainingPrograms={trainingPrograms} />
        <AboutSection data={about} />
      </main>
    </>
  )
}
