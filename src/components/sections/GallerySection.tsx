'use client'

import { useState, useRef, useEffect } from 'react'
import { Gallery } from '@/types'
import { GalleryCard } from '@/components/ui/GalleryCard'
import { AppleButton } from '@/components/ui/AppleButton'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type GallerySectionProps = {
  smallTitle?: string
  title: string
  subtitle: string
  galleries: Gallery[]
}

export function GallerySection({ smallTitle, title, subtitle, galleries }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Limit to 5 galleries for homepage
  const limitedGalleries = galleries.slice(0, 5)
  
  // Navigate to next slide
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % limitedGalleries.length)
  }
  
  // Navigate to previous slide
  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + limitedGalleries.length) % limitedGalleries.length)
  }
  
  // Navigate to specific slide
  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }
  
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
  }, [])
  
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
  }, [])
  
  const hasGalleries = limitedGalleries && limitedGalleries.length > 0
  
  return (
    <section id="gallery-section" className="py-20 md:py-24 bg-white dark:bg-black">
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
        
        <div className="relative max-w-6xl mx-auto" ref={containerRef}>
          {/* Gallery Cards Container */}
          <div className="flex justify-center items-center h-[450px] relative">
            {!hasGalleries ? (
              <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl h-[400px] w-[300px]"></div>
            ) : (
              <>
                {limitedGalleries.map((gallery, index) => (
                  <div 
                    key={gallery._id} 
                    className={`absolute transition-all duration-500 ${
                      index === activeIndex ? 'z-10' : 'z-0'
                    }`}
                    onClick={() => goToSlide(index)}
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
          
          {/* Navigation Arrows */}
          {hasGalleries && limitedGalleries.length > 1 && (
            <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between px-4 md:px-10">
              <button
                onClick={goToPrev}
                className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md"
                aria-label="Previous"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={goToNext}
                className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md"
                aria-label="Next"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          )}
          
          {/* Dot indicators */}
          {hasGalleries && limitedGalleries.length > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
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
          <AppleButton href="/gallery">View All Album</AppleButton>
        </div>
        
        {/* Add custom styling */}
        <style jsx global>{`
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
