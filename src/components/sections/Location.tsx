'use client'

import { LocationCard } from '@/components/ui/LocationCard'
import { LocationCard as LocationCardType } from '@/types'

type LocationProps = {
  smallTitle?: string
  title: string
  subtitle: string
  card: LocationCardType
}

export function Location({ smallTitle, title, subtitle, card }: LocationProps) {
  return (
    <section 
      id="location-section" 
      className="py-20 md:py-24 relative bg-white dark:bg-apple-darker"
    >
      {/* Blur effect elements for glassmorphism effect (only visible in dark mode) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden dark:block hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/10 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-500/10 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase sf-pro-text">
              {smallTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 sf-pro-display dark:text-white">
            {title}
          </h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto sf-pro-text">
            {subtitle}
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          {card ? (
            <LocationCard card={card} />
          ) : (
            <div className="animate-pulse rounded-3xl h-[300px] bg-gray-200 dark:bg-gray-800"></div>
          )}
        </div>
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
    </section>
  )
}
