'use client'

import { useState, useRef, useEffect } from 'react'
import { ContactCard as ContactCardType } from '@/types'
import { ContactCard } from '@/components/ui/ContactCard'

type ContactProps = {
  smallTitle?: string
  title: string
  subtitle: string
  cards: ContactCardType[]
}

export function Contact({ smallTitle, title, subtitle, cards }: ContactProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // Navigate to slide
  const goToSlide = (index: number) => {
    if (carouselRef.current && slideRefs.current[index]) {
      setActiveSlide(index)
      
      const scrollPosition = slideRefs.current[index]?.offsetLeft || 0
      carouselRef.current.scrollTo({
        left: scrollPosition - 16,
        behavior: 'smooth'
      })
    }
  }
  
  // Handle scroll events to update active slide
  const handleScroll = () => {
    if (!carouselRef.current) return
    
    const scrollPosition = carouselRef.current.scrollLeft
    const viewportWidth = carouselRef.current.clientWidth
    const centerPosition = scrollPosition + (viewportWidth / 2)
    
    // Find which slide is closest to the center
    let closestSlideIndex = 0
    let closestDistance = Number.MAX_VALUE
    
    slideRefs.current.forEach((slideRef, index) => {
      if (!slideRef) return
      
      const slideCenter = slideRef.offsetLeft + (slideRef.clientWidth / 2)
      const distance = Math.abs(centerPosition - slideCenter)
      
      if (distance < closestDistance) {
        closestDistance = distance
        closestSlideIndex = index
      }
    })
    
    if (activeSlide !== closestSlideIndex) {
      setActiveSlide(closestSlideIndex)
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
  
  // Ensure card width is appropriate (not too big on mobile)
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      // Make card smaller on mobile
      if (window.innerWidth < 640) {
        return window.innerWidth - 48 // Reduced padding for mobile
      }
      // Standard size for larger screens
      return 320
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
  
  return (
    <section 
      id="contact-section" 
      className="py-20 md:py-24 relative bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-black"
    >
      {/* Blur effect elements for glassmorphism effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-300/30 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-300/20 filter blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-36 h-36 rounded-full bg-pink-300/20 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase sf-pro-text">
              {smallTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 dark:text-white sf-pro-display">
            {title}
          </h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto sf-pro-text px-4">
            {subtitle}
          </p>
        </div>
        
        <div className="relative max-w-lg mx-auto">
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-8 pb-10 snap-x scroll-pl-4"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
          >
            {cards.length === 0 ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 animate-pulse snap-center"
                    style={{ width: `${cardWidth}px` }}
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl h-[300px]"></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {cards.map((card, index) => (
                  <div 
                    key={card._id} 
                    className="flex-shrink-0 snap-center"
                    style={{ width: `${cardWidth}px` }}
                    ref={(el) => { slideRefs.current[index] = el }}
                  >
                    <ContactCard card={card} />
                  </div>
                ))}
              </>
            )}
          </div>
          
          {/* Dot indicators */}
          {cards.length > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {cards.map((_, index) => (
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
