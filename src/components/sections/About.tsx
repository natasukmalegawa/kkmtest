'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { AboutCard } from '@/types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type AboutProps = {
  smallTitle?: string
  title: string
  subtitle: string
  cards: AboutCard[]
}

export function About({ smallTitle, title, subtitle, cards }: AboutProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  
  // Function to determine background color based on index
  const getIconBgColor = (index: number) => {
    const colors = ['bg-blue-100', 'bg-orange-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100']
    return colors[index % colors.length]
  }
  
  // Check if arrows should be shown
  const checkScrollPosition = () => {
    if (!carouselRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }
  
  // Scroll carousel
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    
    const scrollAmount = 300
    const newScrollLeft = 
      direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount
    
    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }
  
  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition)
      checkScrollPosition()
      
      return () => {
        carousel.removeEventListener('scroll', checkScrollPosition)
      }
    }
  }, [])
  
  return (
    <section id="about-section" className="py-20 md:py-24 bg-gray-50 dark:bg-apple-darker">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase">
              {smallTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            {title}
          </h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Left scroll button */}
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white dark:bg-gray-800 rounded-full shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
            </button>
          )}
          
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-5 pb-5 snap-x scroll-pl-4"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
          >
            {cards.length === 0 ? (
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-shrink-0 w-[200px] h-[200px] bg-gray-100 dark:bg-gray-800 rounded-[20px] animate-pulse snap-start"></div>
                ))}
              </>
            ) : (
              <>
                {cards.map((card, index) => (
                  <div key={index} className="flex-shrink-0 w-[200px] snap-start">
                    <Card 
                      title={card.title}
                      description={card.description}
                      icon={card.icon}
                      variant="about"
                      iconBgColor={getIconBgColor(index)}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          
          {/* Right scroll button */}
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white dark:bg-gray-800 rounded-full shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-gray-600 dark:text-gray-300" />
            </button>
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
        `}</style>
      </div>
    </section>
  )
}
