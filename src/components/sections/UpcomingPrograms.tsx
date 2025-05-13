'use client'

import { useState, useRef, useEffect } from 'react'
import { UpcomingProgram } from '@/types'
import { UpcomingProgramCard } from '@/components/ui/UpcomingProgramCard'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
import { AppleButton } from '@/components/ui/AppleButton'

type UpcomingProgramsProps = {
  smallTitle?: string
  title: string
  subtitle: string
  programs: UpcomingProgram[]
}

export function UpcomingPrograms({ smallTitle, title, subtitle, programs }: UpcomingProgramsProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  slideRefs.current = []; // Reset on each render to avoid stale refs
  
  // Navigate to slide
  const goToSlide = (index: number) => {
    if (carouselRef.current && slideRefs.current[index]) {
      setActiveSlide(index)
      
      const slideWidth = slideRefs.current[0]?.clientWidth || 0
      const slideGap = 24 // gap-6 = 1.5rem = 24px
      const scrollPosition = index * (slideWidth + slideGap)
      
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }
  
  // Handle scroll events to update active slide
  const handleScroll = () => {
    if (!carouselRef.current || slideRefs.current.length === 0) return
    
    const scrollPosition = carouselRef.current.scrollLeft
    const slideWidth = slideRefs.current[0]?.clientWidth || 0
    const slideGap = 24 // gap-6 = 1.5rem = 24px
    
    // Calculate which slide is most visible
    const slideIndex = Math.round(scrollPosition / (slideWidth + slideGap))
    
    if (slideIndex >= 0 && slideIndex < programs.length && activeSlide !== slideIndex) {
      setActiveSlide(slideIndex)
    }
  }
  
  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll)
      return () => {
        carousel.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  
  // Responsive card width
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        return window.innerWidth - 64 // Mobile
      } else if (window.innerWidth < 1024) {
        return 280 // Tablet - ukuran compact
      } else {
        return 320 // Desktop - ukuran compact
      }
    }
    return 320 // Default fallback
  }
  
  const [cardWidth, setCardWidth] = useState(320)
  
  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth())
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Fix initial scroll position on mount
  useEffect(() => {
    if (carouselRef.current && programs.length > 0) {
      // Set initial scroll position to show first slide properly
      carouselRef.current.scrollLeft = 0
      setActiveSlide(0)
    }
  }, [programs.length])
  
  const hasPrograms = programs && programs.length > 0
  
  return (
    <section id="upcoming-programs-section" className="py-20 md:py-24 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase sf-pro-text">
              {smallTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 dark:text-white sf-pro-display">
            {title}
          </h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto sf-pro-text">
            {subtitle}
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-10 snap-x px-4 md:px-6"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
            onScroll={handleScroll}
          >
            {!hasPrograms ? (
              <>  
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 animate-pulse snap-center"
                    style={{ width: `${cardWidth}px` }}
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-[480px]"></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {programs.map((program, index) => (
                  <div 
                    key={program._id} 
                    className="flex-shrink-0 snap-center"
                    style={{ width: `${cardWidth}px` }}
                    ref={(el) => { slideRefs.current[index] = el }}
                  >
                    <UpcomingProgramCard program={program} />
                  </div>
                ))}
              </>
            )}
          </div>
          
          {/* Dot indicators */}
          {hasPrograms && programs.length > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {programs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide 
                      ? 'bg-apple-blue w-6' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <AppleButton href="/programs">View All Programs</AppleButton>
        </div>
        
        {/* Add custom styling to hide scrollbar */}
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .sf-pro-display {
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
            letter-spacing: -0.015em;
          }
          
          .sf-pro-text {
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
            letter-spacing: -0.01em;
          }
        `}</style>
      </div>
    </section>
  )
}
