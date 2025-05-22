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
    <section className="relative min-h-[100vh] overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
        style={backgroundStyle}
      >
        {/* Overlay lebih gelap */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container relative z-10 mx-auto px-0 w-full flex flex-col items-center">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`w-full max-w-4xl px-4 sm:px-6 transition-all duration-500 absolute left-1/2 -translate-x-1/2 ${
              index === safeActiveSlide
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-8 pointer-events-none'
            } ${isFirstRender ? 'transition-none' : ''}`}
            style={{
              // Konten di posisi lebih ke atas, tombol jauh di bawah
              top: '0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '100vh',
              paddingTop: '18vh',
              paddingBottom: '8vh',
            }}
          >
            {/* Heading 1 */}
            <h1 className="
              text-white
              text-2xl
              xs:text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              mb-2
              leading-tight
              tracking-tight
              text-center
              px-2
              sm:px-0
              drop-shadow-lg
            ">
              {slide.title || "We help you grow, create, and stand out."}
            </h1>
            {/* Subtitle */}
            <p className="
              text-white
              text-base
              xs:text-lg
              md:text-xl
              lg:text-2xl
              font-normal
              mb-12
              md:mb-16
              text-center
              px-2
              sm:px-0
              drop-shadow
            ">
              {slide.subtitle || "Your journey starts here."}
            </p>
            {/* Spacer besar untuk jarak ke button */}
            <div className="h-12 md:h-16"></div>
            {/* CTA Button */}
            <div className="flex flex-wrap justify-center gap-2 xs:gap-4 md:gap-6 pb-2">
              <Button
                onClick={scrollToAbout}
                variant="primary"
                size="sm"
                className="text-xs xs:text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-3"
              >
                {slide.ctaText || "Learn more"}
              </Button>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="sm"
                className="text-xs xs:text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-3"
              >
                Contact us
              </Button>
            </div>
            {/* ctaSecondaryText */}
            {slide.ctaSecondaryText && (
              <p className="mt-6 text-purple-300 text-xs md:text-base lg:text-lg text-center">
                {slide.ctaSecondaryText}
              </p>
            )}
          </div>
        ))}

        {/* Carousel indicators */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-6 flex space-x-2 left-1/2 -translate-x-1/2">
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
