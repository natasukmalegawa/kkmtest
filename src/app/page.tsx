import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Programs } from '@/components/sections/Programs'
import { Team } from '@/components/sections/Team'
import { ArticlesPreview } from '@/components/sections/ArticlesPreview'
import {
  getSiteSettings,
  getHero,
  getAboutCards,
  getPrograms,
  getTeamMembers,
  getArticles
} from '@/lib/sanity-queries'

export default async function Home() {
  const siteSettings = await getSiteSettings()
  const hero = await getHero()
  const aboutCards = await getAboutCards()
  const programs = await getPrograms()
  const teamMembers = await getTeamMembers()
  const articles = await getArticles()

  return (
    <>
      <Hero
        title={hero?.title || "Seamless Experience, Limitless Possibilities."}
        subtitle={hero?.subtitle || "Designed to help you achieve more through clean design and innovative technology."}
        ctaText={hero?.ctaText || "Learn More"}
        backgroundImage={hero?.backgroundImage}
        slides={hero?.slides}
      />

      <About
        smallTitle={siteSettings?.aboutSmallTitle || "About Us"}
        title={siteSettings?.aboutTitle || "We're here to help you take control"}
        subtitle={siteSettings?.aboutSubtitle || "and turn your dreams into reality"}
        cards={aboutCards || []}
      />

      <Programs
        smallTitle={siteSettings?.programsSmallTitle || "Our Features"}
        title={siteSettings?.programsTitle || "Made for You:"}
        subtitle={siteSettings?.programsSubtitle || "Easy, Fast, and Smart Solutions"}
        programs={programs || []}
      />

      <Team
        smallTitle={siteSettings?.teamSmallTitle || "Our People"}
        title={siteSettings?.teamTitle || "Our Team"}
        subtitle={siteSettings?.teamSubtitle || "Meet the people behind our success"}
        members={teamMembers || []}
      />

      <ArticlesPreview articles={articles || []} />
    </>
  )
}
