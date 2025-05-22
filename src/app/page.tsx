import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Programs } from '@/components/sections/Programs'
import { Team } from '@/components/sections/Team'
import { Articles } from '@/components/sections/Articles'
import { UpcomingPrograms } from '@/components/sections/UpcomingPrograms'
import { GallerySection } from '@/components/sections/GallerySection'
import { Contact } from '@/components/sections/Contact'
import { Location } from '@/components/sections/Location'
import { getSiteSettings, getHero, getAboutCards, getPrograms, getTeamMembers, getArticles, getUpcomingPrograms, getGalleries, getContactCards, getLocationCard } from '@/lib/sanity-queries'

export default async function Home() {
  // Fetch data from Sanity
  const siteSettings = await getSiteSettings()
  const hero = await getHero()
  const aboutCards = await getAboutCards()
  const programs = await getPrograms()
  const upcomingPrograms = await getUpcomingPrograms()
  const teamMembers = await getTeamMembers()
  const articles = await getArticles(6) // Limit to 4 articles
  const galleries = await getGalleries()
  const contactCards = await getContactCards()
  const locationCard = await getLocationCard()
  
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
      
      <Articles 
        smallTitle={siteSettings?.articlesSmallTitle || "Latest Updates"}
        title={siteSettings?.articlesTitle || "From Our Blog"}
        subtitle={siteSettings?.articlesSubtitle || "Stay updated with our latest insights, news, and stories"}
        articles={articles || []}
      />

      <UpcomingPrograms
        smallTitle={siteSettings?.upcomingProgramsSmallTitle || "Upcoming Programs"}
        title={siteSettings?.upcomingProgramsTitle || "Join Our Exclusive Programs"} 
        subtitle={siteSettings?.upcomingProgramsSubtitle || "Expand your knowledge and skills with our carefully designed programs"} 
        programs={upcomingPrograms || []}
      />

      <GallerySection
        smallTitle="DOKUMENTATION"
        title="Precious Moments"
        subtitle="View documentation of our ongoing activities and events."
        galleries={galleries}
      />
      <Contact
        smallTitle={siteSettings?.contactSmallTitle || "Get in Touch"}
        title={siteSettings?.contactTitle || "Connect With Us"}
        subtitle={siteSettings?.contactSubtitle || "Reach out through our social media channels or send us a message"}
        cards={contactCards || []}
      />
       <Location
       smallTitle={siteSettings?.locationSmallTitle || "OUR LOCATION"}
       title={siteSettings?.locationTitle || "Find Us"}
       subtitle={siteSettings?.locationSubtitle || "Visit our location or get directions to find us easily."}
       card={locationCard}
      />
    </>
  )
}
