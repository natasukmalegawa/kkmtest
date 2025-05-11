'use client'

import { useState, useRef, useEffect } from 'react'
import { Article } from '@/types'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { AppleButton } from '@/components/ui/AppleButton'

type ArticlesProps = {
  smallTitle?: string
  title: string
  subtitle: string
  articles: Article[]
}

export function Articles({ smallTitle, title, subtitle, articles }: ArticlesProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      if (window.innerWidth < 640) {
        return window.innerWidth - 64; // Mobile, almost full width
      } else if (window.innerWidth < 1024) {
        return (window.innerWidth - 64) / 2; // Tablet, 2 cards per row
      } else {
        return (window.innerWidth - 96) / 3; // Desktop, 3 cards per row
      }
    }
    return 320; // Default fallback
  };
  
  const [cardWidth, setCardWidth] = useState(320);
  
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
    <section id="articles-section" className="py-20 md:py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
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
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-10 snap-x"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
          >
            {articles.length === 0 ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 animate-pulse snap-center"
                    style={{ width: `${cardWidth}px` }}
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-[400px]"></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {articles.map((article, index) => (
                  <div 
                    key={article._id} 
                    className="flex-shrink-0 snap-center"
                    style={{ width: `${cardWidth}px` }}
                    ref={(el) => { slideRefs.current[index] = el }}
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </>
            )}
          </div>
          
          {/* Dot indicators */}
          {articles.length > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {articles.map((_, index) => (
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
          <AppleButton href="/articles">Read All Articles</AppleButton>
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
