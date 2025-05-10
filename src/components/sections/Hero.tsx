'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { urlForImage } from '@/lib/sanity-image'

type HeroSlide = {
  title: string
  subtitle: string
  ctaText: string
  backgroundImage?: {
    asset: {
      _ref: string
    }
  }
}

type HeroProps = {
  title: string
  subtitle: string
  ctaText: string
  backgroundImage?: {
    asset: {
      _ref: string
    }
  }
  // Tambahkan properti untuk carousel slides
  slides?: HeroSlide[]
}

export function Hero({ title, subtitle, ctaText, backgroundImage, slides }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Data untuk carousel
  const heroSlides = slides && slides.length > 0 
    ? slides 
    : [{ title, subtitle, ctaText, backgroundImage }]
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  useEffect(() => {
    // Auto rotate slides every 6 seconds
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [heroSlides.length])
  
  // Skip animation for first render
  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
    setIsFirstRender(false)
  }, [])
  
  const goToSlide = (index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setActiveSlide(index)
    // Restart interval
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
  }
  
  const currentSlide = heroSlides[activeSlide]
  const backgroundImageUrl = currentSlide.backgroundImage 
    ? urlForImage(currentSlide.backgroundImage).url() 
    : 'linear-gradient(180deg, #a6c1ee 0%, #fbc2eb 100%)'
  
  const backgroundStyle = currentSlide.backgroundImage 
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : { background: backgroundImageUrl }
  
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background with fade animation */}
      <div 
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 h-[85vh] flex flex-col justify-center items-center text-center text-white">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`w-full max-w-3xl px-4 sm:px-6 transition-all duration-500 absolute ${
              index === activeSlide 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8 pointer-events-none'
            } ${isFirstRender ? 'transition-none' : ''}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {slide.subtitle}
            </p>
            <Button onClick={scrollToAbout} variant="primary">
              {slide.ctaText}
            </Button>
          </div>
        ))}
        
        {/* Carousel indicators */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-10 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide 
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
