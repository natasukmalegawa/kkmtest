'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity-image'
import { ContactCard as ContactCardType } from '@/types'
import { FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

type ContactCardProps = {
  card: ContactCardType
}

export function ContactCard({ card }: ContactCardProps) {
  // Format button link
  const buttonLink = card.buttonLink || '#'
  
  // Handle button click - if it's an email address or whatsapp
  const handleButtonClick = () => {
    if (card.buttonLink?.startsWith('mailto:')) {
      window.location.href = card.buttonLink
    } else if (card.buttonLink?.startsWith('https://wa.me/')) {
      window.open(card.buttonLink, '_blank')
    }
  }
  
  // Get icon based on card title
  const getIcon = () => {
    const title = card.title.toLowerCase()
    if (title.includes('instagram')) {
      return <FaInstagram className="w-5 h-5 mr-2" />
    } else if (title.includes('email')) {
      return <FaEnvelope className="w-5 h-5 mr-2" />
    } else if (title.includes('whatsapp')) {
      return <FaWhatsapp className="w-5 h-5 mr-2" />
    }
    return null
  }
  
  return (
    <div 
      className="rounded-3xl shadow-sm backdrop-blur-md max-w-sm mx-auto overflow-hidden"
      style={{ 
        background: card.backgroundColor || 'rgba(240, 240, 246, 0.85)',
        borderRadius: '28px',
      }}
    >
      {/* Header Section with Icon */}
      <div className="px-4 pt-5 pb-3 flex items-start">
        {card.icon && (
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden p-2 mr-3 shadow-sm">
            <Image
              src={urlForImage(card.icon).width(40).height(40).url()}
              alt={card.title}
              width={24}
              height={24}
              className="object-contain dark:invert"
            />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{card.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{card.subtitle}</p>
        </div>
      </div>
      
      {/* Personal Card - Styled like the image */}
      <div className="px-4 pb-5">
        <div 
          className="rounded-2xl p-4 flex flex-col items-center"
          style={{ 
            background: card.cardBackgroundColor || 'rgba(255, 180, 180, 0.85)', 
            borderRadius: '20px',
          }}
        >
          <div className="w-24 h-24 mb-2 relative">
            {card.memojiImage && (
              <Image
                src={urlForImage(card.memojiImage).width(200).height(200).url()}
                alt="Memoji"
                fill
                className="object-contain"
              />
            )}
          </div>
          <h4 
            className="text-xl font-medium mb-1"
            style={{ color: card.textColor || '#000000' }}
          >
            {card.personalName}
          </h4>
          <p 
            className="text-sm"
            style={{ color: card.textColor ? adjustColorOpacity(card.textColor, 0.8) : '#666666' }}
          >
            {card.contactInfo}
          </p>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="px-4 pb-5">
        <a
          href={buttonLink}
          onClick={handleButtonClick}
          className="block w-full text-center py-3 px-4 rounded-full text-gray-700 dark:text-white bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm font-medium hover:shadow-md transition-all duration-200 flex items-center justify-center"
          target={buttonLink.startsWith('http') ? '_blank' : '_self'}
          rel="noopener noreferrer"
        >
          {getIcon()}
          {card.buttonText}
        </a>
      </div>
    </div>
  )
}

// Helper function to adjust color opacity
function adjustColorOpacity(hexColor: string, opacity: number): string {
  // Convert hex to rgb
  let r = 0, g = 0, b = 0;
  
  // 3 digits
  if (hexColor.length === 4) {
    r = parseInt(hexColor[1] + hexColor[1], 16);
    g = parseInt(hexColor[2] + hexColor[2], 16);
    b = parseInt(hexColor[3] + hexColor[3], 16);
  } 
  // 6 digits
  else if (hexColor.length === 7) {
    r = parseInt(hexColor.substring(1, 3), 16);
    g = parseInt(hexColor.substring(3, 5), 16);
    b = parseInt(hexColor.substring(5, 7), 16);
  }
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
