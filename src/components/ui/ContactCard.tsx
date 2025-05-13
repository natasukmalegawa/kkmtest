'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity-image'
import { ContactCard as ContactCardType } from '@/types'

type ContactCardProps = {
  card: ContactCardType
}

export function ContactCard({ card }: ContactCardProps) {
  // State to track button hover
  const [isHovering, setIsHovering] = useState(false)
  
  // Format button link
  const buttonLink = card.buttonLink || '#'
  
  // Handle button click - if it's an email address
  const handleButtonClick = () => {
    if (card.buttonLink?.startsWith('mailto:')) {
      window.location.href = card.buttonLink
    }
  }
  
  return (
    <div 
      className="px-4 py-6 rounded-3xl shadow-sm backdrop-blur-md max-w-sm mx-auto transform-gpu"
      style={{ 
        background: card.backgroundColor || 'rgba(240, 240, 246, 0.85)',
        borderRadius: '28px',
      }}
    >
      {/* Header Section with Icon */}
      <div className="flex items-start mb-3"> {/* Reduced margin bottom */}
        {card.icon && (
          <div className="bg-white rounded-xl overflow-hidden p-2 mr-3 shadow-sm">
            <Image
              src={urlForImage(card.icon).width(40).height(40).url()}
              alt={card.title}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-0.5">{card.title}</h3> {/* Reduced margin bottom */}
          <p className="text-gray-600 dark:text-gray-300 text-sm">{card.subtitle}</p>
        </div>
      </div>
      
      {/* Personal Card with Stacked Cards Layout */}
      <div className="perspective-1000 my-4 relative h-[180px] w-full">
        {/* Background stacked cards */}
        <div 
          className="absolute top-4 left-4 right-4 bottom-4 rounded-2xl transform-gpu rotate-[-8deg] z-10"
          style={{ 
            background: 'rgba(240, 180, 170, 0.5)', 
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }}
        ></div>
        
        <div 
          className="absolute top-2 left-2 right-2 bottom-2 rounded-2xl transform-gpu rotate-[-4deg] z-20"
          style={{ 
            background: 'rgba(240, 180, 170, 0.7)', 
            boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
          }}
        ></div>
        
        {/* Main card with memoji */}
        <div 
          className="absolute inset-0 rounded-2xl p-4 flex flex-col items-center z-30 transform-gpu"
          style={{ 
            background: card.cardBackgroundColor || 'rgba(240, 180, 170, 0.85)', 
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          }}
        >
          <div className="w-24 h-24 mb-2 relative transform-gpu scale-110 -translate-y-2">
            {card.memojiImage && (
              <Image
                src={urlForImage(card.memojiImage).width(200).height(200).url()}
                alt="Memoji"
                fill
                className="object-contain"
              />
            )}
          </div>
          <h4 className="text-gray-800 dark:text-white text-xl font-medium mb-1">{card.personalName}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{card.contactInfo}</p>
        </div>
      </div>
      
      {/* Action Button */}
      <a
        href={buttonLink}
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="block w-full text-center py-3 px-4 rounded-full text-gray-700 dark:text-white bg-white/70 dark:bg-gray-800/30 backdrop-blur-sm font-medium hover:shadow-md transition-all duration-200 flex items-center justify-center"
        target={buttonLink.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
      >
        {/* Add custom icon for each type */}
        {card.title.toLowerCase().includes('instagram') && (
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        )}
        {card.title.toLowerCase().includes('email') && (
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        )}
        
        {card.buttonText}
      </a>
    </div>
  )
}
