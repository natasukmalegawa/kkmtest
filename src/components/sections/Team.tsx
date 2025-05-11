'use client'

import { useState, useRef, useEffect } from 'react'
import { TeamMember } from '@/types'
import TeamCard from '@/components/ui/TeamCard'

type TeamProps = {
  smallTitle?: string
  title: string
  subtitle: string
  members: TeamMember[]
}

export function Team({ smallTitle, title, subtitle, members }: TeamProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [cardWidth, setCardWidth] = useState(280)
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleCardInfo = (id: string) => {
    setActiveCard(activeCard === id ? null : id)
  }

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
    <section className="py-20 md:py-24 bg-white dark:bg-apple-darker">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase">
              {smallTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">{title}</h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {members.map((member) => (
            <TeamCard
              key={member._id}
              member={member}
              isActive={activeCard === member._id}
              onToggle={() => toggleCardInfo(member._id)}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div
          className="sm:hidden flex overflow-x-auto scrollbar-hide gap-5 pb-4 snap-x"
          ref={carouselRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {members.map((member, index) => (
            <div
              key={member._id}
              className="flex-shrink-0 snap-center"
              style={{ width: `${cardWidth}px` }}
              ref={(el) => (slideRefs.current[index] = el)}
            >
              <TeamCard
                member={member}
                isActive={activeCard === member._id}
                onToggle={() => toggleCardInfo(member._id)}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        {members.length > 1 && (
          <div className="sm:hidden flex justify-center space-x-2 mt-4">
            {members.map((_, index) => (
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
