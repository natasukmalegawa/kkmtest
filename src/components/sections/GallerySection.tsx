'use client'

import { useState, useRef, useEffect } from 'react'
import { Gallery } from '@/types'
import { GalleryCard } from '@/components/ui/GalleryCard'
import { AppleButton } from '@/components/ui/AppleButton'
import Link from 'next/link'
import { motion } from 'framer-motion'

type GallerySectionProps = {
  smallTitle?: string
  title: string
  subtitle: string
  galleries: Gallery[]
}

export function GallerySection({ smallTitle, title, subtitle, galleries }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // Limit to 5 galleries for homepage
  const limitedGalleries = galleries.slice(0, 5)
  
  // Reset slide references on each render
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, limitedGalleries.length)
  }, [limitedGalleries.length])
  
  // Navigate to next slide
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % limitedGalleries.length)
    goToSlide(activeIndex + 1 >= limitedGalleries.length ? 0 : activeIndex + 1)
  }
  
  // Navigate to previous slide
  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + limitedGalleries.length) % limitedGalleries.length)
    goToSlide(activeIndex - 1 < 0 ? limitedGalleries.length - 1 : activeIndex - 1)
  }
  
  // Navigate to specific slide
  const goToSlide = (index: number) => {
    if (carouselRef.current && slideRefs.current[index]) {
      setActiveIndex(index)
      
      const scrollPosition = slideRefs.current[index]?.offsetLeft || 0
      carouselRef.current.scrollTo({
        left: scrollPosition,
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
    
    if (activeIndex !== closestSlideIndex) {
      setActiveIndex(closestSlideIndex)
    }
  }
  
  // Add scroll event listener with debounce
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    
    let scrollTimeout: NodeJS.Timeout
    
    const handleScrollWithDebounce = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        handleScroll()
      }, 100)
    }
    
    carousel.addEventListener('scroll', handleScrollWithDebounce)
    
    return () => {
      clearTimeout(scrollTimeout)
      carousel.removeEventListener('scroll', handleScrollWithDebounce)
    }
  }, [activeIndex])
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'ArrowLeft') {
        goToPrev()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex])
  
  // Handle touch events for swipe
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    let startX = 0
    let isDragging = false
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      isDragging = true
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      
      const currentX = e.touches[0].clientX
      const diff = startX - currentX
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext()
        } else {
          goToPrev()
        }
        isDragging = false
      }
    }
    
    const handleTouchEnd = () => {
      isDragging = false
    }
    
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchmove', handleTouchMove)
    container.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeIndex])
  
  const hasGalleries = limitedGalleries && limitedGalleries.length > 0
  
  return (
    <section id="gallery-section" className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-apple-darker dark:bg-none">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase sf-pro-text">
              {smallTitle || "Our Memories"}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 dark:text-white sf-pro-display">
            {title || "Photo Gallery"}
          </h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto sf-pro-text">
            {subtitle || "Explore our collection of memorable moments and events"}
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto" ref={containerRef}>
          {/* Gallery Cards Container - Horizontal Stack Slider */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide pb-10 snap-x"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
          >
            {!hasGalleries ? (
              <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl h-[400px] w-[300px]"></div>
            ) : (
              <>
                {limitedGalleries.map((gallery, index) => (
                  <div 
                    key={gallery._id} 
                    className="flex-shrink-0 snap-center mx-3 first:ml-[calc(50%-150px)] last:mr-[calc(50%-150px)]"
                    style={{ 
                      width: '300px',
                      zIndex: index === activeIndex ? 10 : 10 - Math.abs(index - activeIndex),
                      transform: `translateX(${index === activeIndex ? 0 : index < activeIndex ? '-80px' : '80px'})`,
                      transition: 'all 0.5s ease'
                    }}
                    ref={(el) => { slideRefs.current[index] = el }}
                  >
                    <GalleryCard 
                      gallery={gallery} 
                      index={index} 
                      isActive={index === activeIndex} 
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          
          {/* Dot indicators - Updated to match Articles implementation */}
          {hasGalleries && limitedGalleries.length > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {limitedGalleries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
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
          <AppleButton href="/gallery">View All Albums</AppleButton>
        </div>
        
        {/* Add custom styling */}
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
          
          /* Horizontal Stack Slider styles */
          .card-stack {
            perspective: 1000px;
          }
          
          .card-stack-item {
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            transform-style: preserve-3d;
          }
        `}</style>
      </div>
    </section>
  )
}
