'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { urlForImage } from '@/lib/sanity-image'

type HeroProps = {
  title: string
  subtitle: string
  ctaText: string
  backgroundImage?: any
  slides?: any[]
}

export function Hero({ title, subtitle, ctaText, backgroundImage, slides = [] }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const heroSlides = slides && slides.length > 0
    ? slides
    : [{
      title: title,
      subtitle: subtitle,
      ctaText: ctaText,
      backgroundImage: backgroundImage
    }]

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (heroSlides.length > 1) {
      intervalRef.current = setInterval(() => {
        setActiveSlide(prev => (prev + 1) % heroSlides.length)
      }, 6000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [heroSlides.length])

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const goToSlide = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setActiveSlide(index)
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
  }

  const safeActiveSlide = Math.min(activeSlide, heroSlides.length - 1)
  const currentSlide = heroSlides[safeActiveSlide]

  const backgroundImageUrl = currentSlide && currentSlide.backgroundImage
    ? urlForImage(currentSlide.backgroundImage).url()
    : 'linear-gradient(180deg, #a6c1ee 0%, #fbc2eb 100%)'

  const backgroundStyle = currentSlide && currentSlide.backgroundImage
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : { background: backgroundImageUrl }

  return (
    <section className="relative min-h-[85vh] sm:min-h-[85vh] overflow-hidden">
      {/* Background with transition effect restored */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-[85vh] sm:h-[85vh]">
        {/* Heading 1 & 2 with transition effects */}
        <div className="w-full max-w-2xl flex flex-col items-center px-4 sm:px-0 mb-8">
          <h1 className="
            text-white
            drop-shadow-lg
            text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl
            font-bold
            mb-2
            leading-tight
            tracking-tight
            text-center
            px-2 sm:px-0
            transition-opacity duration-1000
          ">
            {currentSlide.title || "We help you grow, create, and stand out."}
          </h1>
          <p className="
            text-white
            drop-shadow
            text-base xs:text-lg md:text-lg lg:text-xl
            font-normal
            text-center
            mt-2
            px-2 sm:px-0
            transition-opacity duration-1000
          ">
            {currentSlide.subtitle || "Your journey starts here."}
          </p>
        </div>

        {/* CTA button with transition effect */}
        <div className="transition-opacity duration-1000">
          <Button
            onClick={scrollToAbout}
            variant="primary"
            size="lg"
            className="text-sm xs:text-base sm:text-lg px-6 py-2.5 sm:px-8 sm:py-3 rounded-full"
          >
            {currentSlide.ctaText || "Grow with us"}
          </Button>
        </div>

        {/* Dot navigator at bottom */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === safeActiveSlide
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
