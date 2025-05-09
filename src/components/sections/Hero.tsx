'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { urlForImage } from '@/lib/sanity-image'

type HeroProps = {
  title: string
  subtitle: string
  ctaText: string
  backgroundImage?: {
    asset: {
      _ref: string
    }
  }
}

export function Hero({ title, subtitle, ctaText, backgroundImage }: HeroProps) {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  const backgroundImageUrl = backgroundImage 
    ? urlForImage(backgroundImage).url() 
    : 'linear-gradient(180deg, #a6c1ee 0%, #fbc2eb 100%)'
  
  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : { background: backgroundImageUrl }
  
  return (
    <section 
      className="relative min-h-[85vh] flex items-center text-white overflow-hidden"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            {subtitle}
          </p>
          <Button onClick={scrollToAbout} variant="primary">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}
