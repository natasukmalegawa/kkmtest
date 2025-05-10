'use client'

import { useState, useRef, useEffect } from 'react'
import { AboutCard } from '@/components/ui/AboutCard'
import { AboutCard as AboutCardType } from '@/types'

type AboutProps = {
  smallTitle?: string
  title: string
  subtitle: string
  cards: AboutCardType[]
}

export function About({ smallTitle, title, subtitle, cards }: AboutProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Function to determine background color based on index
  const getIconBgColor = (index: number) => {
    const colors = ['bg-blue-100', 'bg-orange-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100']
    return colors[index % colors.length]
  }
  
  // Navigate to slide
  const goToSlide = (index: number) => {
    if (carouselRef.current && slideRefs.current[index]) {
      setActiveSlide(index);
      
      const scrollPosition = slideRefs.current[index]?.offsetLeft || 0;
      carouselRef.current.scrollTo({
        left: scrollPosition - 16, // Adjust for padding
        behavior: 'smooth'
      });
    }
  };
  
  // Handle scroll events to update active slide
  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const scrollPosition = carouselRef.current.scrollLeft;
    const viewportWidth = carouselRef.current.clientWidth;
    const centerPosition = scrollPosition + (viewportWidth / 2);
    
    // Find which slide is closest to the center
    let closestSlideIndex = 0;
    let closestDistance = Number.MAX_VALUE;
    
    slideRefs.current.forEach((slideRef, index) => {
      if (!slideRef) return;
      
      const slideCenter = slideRef.offsetLeft + (slideRef.clientWidth / 2);
      const distance = Math.abs(centerPosition - slideCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSlideIndex = index;
      }
    });
    
    if (activeSlide !== closestSlideIndex) {
      setActiveSlide(closestSlideIndex);
    }
  };
  
  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  // Responsive card width
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? window.innerWidth - 64 : 220;
    }
    return 220;
  };
  
  const [cardWidth, setCardWidth] = useState(220);
  
  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-5 pb-8 snap-x"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
          >
            {cards.length === 0 ? (
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 animate-pulse snap-center"
                    style={{ width: `${cardWidth}px` }}
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-[20px] h-[220px]"></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {cards.map((card, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 snap-center"
                    style={{ width: `${cardWidth}px` }}
                    ref={(el) => { slideRefs.current[index] = el }}
                  >
                    <AboutCard 
                      title={card.title}
                      description={card.description}
                      icon={card.icon}
                      iconBgColor={getIconBgColor(index)}
                    />
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
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;  
            overflow: hidden;
          }
          .line-clamp-6 {
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;  
            overflow: hidden;
          }
        `}</style>
      </div>
    </section>
  )
}
