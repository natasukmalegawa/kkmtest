'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { urlForImage } from '@/lib/sanity-image'

type HeroProps = {
  title: string
  subtitle: string
  ctaText: string
  backgroundImage?: any
  slides?: any[] // Gunakan any[] untuk slides agar sesuai dengan data dari Sanity
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
  
  // Debug: Cek slides dari Sanity
  console.log('Debugging slides dari Sanity:', slides)
  
  // Gunakan slides dari Sanity jika tersedia, jika tidak buat slide default
  const heroSlides = slides && slides.length > 0 
    ? slides 
    : [{
        title: title,
        subtitle: subtitle,
        ctaText: ctaText,
        backgroundImage: backgroundImage
      }]
  
  // Setup slideshow interval
  useEffect(() => {
    // Hapus interval sebelumnya jika ada
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // Hanya atur interval jika ada lebih dari 1 slide
    if (heroSlides.length > 1) {
      console.log('Setting up slideshow with', heroSlides.length, 'slides')
      intervalRef.current = setInterval(() => {
        setActiveSlide(prev => (prev + 1) % heroSlides.length)
      }, 6000)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [heroSlides.length])
  
  // Remove transition on first render
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
  
  // Pastikan activeSlide tidak melebihi jumlah slides
  const safeActiveSlide = Math.min(activeSlide, heroSlides.length - 1)
  const currentSlide = heroSlides[safeActiveSlide]
  
  // Tangani kemungkinan currentSlide undefined
  const backgroundImageUrl = currentSlide && currentSlide.backgroundImage 
    ? urlForImage(currentSlide.backgroundImage).url() 
    : 'linear-gradient(180deg, #a6c1ee 0%, #fbc2eb 100%)'
  
  const backgroundStyle = currentSlide && currentSlide.backgroundImage 
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : { background: backgroundImageUrl }
  
  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* Background with fade animation */}
      <div 
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
        style={backgroundStyle}
      >
        {/* Light semi-transparent overlay - Ditingkatkan menjadi lebih gelap */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 h-[100vh] flex flex-col justify-center items-center text-center text-white">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`w-full max-w-4xl px-4 sm:px-6 transition-all duration-500 absolute ${
              index === safeActiveSlide 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8 pointer-events-none'
            } ${isFirstRender ? 'transition-none' : ''}`}
          >
            {/* Hero content */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight tracking-tight">
              {slide.title || "We help you grow, create, and stand out."}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal mb-8 md:mb-10 text-white/90">
              {slide.subtitle || "Your journey starts here."}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Button onClick={scrollToAbout} variant="primary" size="lg">
                {slide.ctaText || "Learn more"}
              </Button>
              <Button onClick={scrollToAbout} variant="outline" size="lg">
                Contact us
              </Button>
            </div>
            {slide.ctaSecondaryText && (
              <p className="mt-6 text-purple-300 text-sm md:text-base lg:text-lg">
                {slide.ctaSecondaryText}
              </p>
            )}
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
