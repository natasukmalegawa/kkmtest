'use client'

import { useState, useRef, useEffect } from 'react'
import { ProgramCard } from '@/components/ui/ProgramCard'
import { Program } from '@/types'

type ProgramsProps = {
  smallTitle?: string
  title: string
  subtitle: string
  programs: Program[]
}

export function Programs({ smallTitle, title, subtitle, programs }: ProgramsProps) {
  const [cardWidth, setCardWidth] = useState(280)  // default desktop
  const carouselRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      setCardWidth(window.innerWidth < 640 ? window.innerWidth - 64 : 280)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

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

  const handleScroll = () => {
    if (!carouselRef.current) return
    const scrollPosition = carouselRef.current.scrollLeft
    const viewportWidth = carouselRef.current.clientWidth
    const centerPosition = scrollPosition + viewportWidth / 2

    let closestSlideIndex = 0
    let closestDistance = Number.MAX_VALUE

    slideRefs.current.forEach((slideRef, index) => {
      if (!slideRef) return
      const slideCenter = slideRef.offsetLeft + slideRef.clientWidth / 2
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

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll)
      return () => carousel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="py-20 md:py-24 bg-apple-light dark:bg-black">
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

        {/* Desktop: grid, Mobile: carousel */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {programs.map((program, index) => (
            <ProgramCard 
              key={index}
              title={program.title}
              description={program.description}
              image={program.image}
              status={program.status}
            />
          ))}
        </div>

        {/* Mobile carousel */}
        <div 
          className="sm:hidden flex overflow-x-auto scrollbar-hide gap-5 pb-4 snap-x"
          ref={carouselRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {programs.map((program, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center"
              style={{ width: `${cardWidth}px` }}
              ref={(el) => { slideRefs.current[index] = el }}
            >
              <ProgramCard 
                title={program.title}
                description={program.description}
                image={program.image}
                status={program.status}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {programs.length > 1 && (
          <div className="sm:hidden flex justify-center space-x-2 mt-4">
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
