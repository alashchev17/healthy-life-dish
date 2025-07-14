import { HeroSection } from '#/design/shared'
import { fetchLandingPageData, fetchProgramsByType } from '#/sanity/lib/api'

export default async function Home() {
  // Fetch landing page data
  const landingPageData = await fetchLandingPageData()
  const { hero } = landingPageData

  // Fetch programs by type
  const dietPrograms = await fetchProgramsByType('diet')
  const trainingPrograms = await fetchProgramsByType('training')

  return <HeroSection heroSlogan={hero?.slogan} dietPrograms={dietPrograms} trainingPrograms={trainingPrograms} />
}
