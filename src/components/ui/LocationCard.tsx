'use client'

import Image from 'next/image'
import { urlForImage } from '@/lib/sanity-image'
import { LocationCard as LocationCardType } from '@/types'
import { FaMapMarkerAlt, FaShare, FaSave, FaPhone } from 'react-icons/fa'

type LocationCardProps = {
  card: LocationCardType
}

export function LocationCard({ card }: LocationCardProps) {
  // Handle share button click
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${card.title} - ${card.address}`,
        text: `${card.address}, ${card.city}`,
        url: card.mapUrl,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(card.mapUrl, '_blank')
    }
  }

  // Handle save button click
  const handleSave = () => {
    window.open(card.mapUrl, '_blank')
  }

  // Handle call button click
  const handleCall = () => {
    if (card.phoneNumber) {
      window.location.href = `tel:${card.phoneNumber}`
    }
  }

  return (
    <div 
      className="rounded-3xl overflow-hidden shadow-lg backdrop-blur-lg max-w-md mx-auto"
      style={{ 
        background: card.backgroundColor || 'rgba(240, 240, 246, 0.85)',
        borderRadius: '28px',
      }}
    >
      {/* Map Image */}
      <div className="relative w-full h-48 sm:h-56">
        {card.mapImage && (
          <Image
            src={urlForImage(card.mapImage).width(600).height(400).url()}
            alt="Location Map"
            fill
            className="object-cover"
          />
        )}
        
        {/* Close button (X) in top right */}
        <button 
          className="absolute top-4 right-4 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Location Info */}
      <div className="p-5 bg-white/90 dark:bg-gray-800/90">
        <div className="flex items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{card.title}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <FaMapMarkerAlt className="mr-1 text-gray-500" />
              <p>{card.address}, {card.city}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {/* Call Button */}
          <button
            onClick={handleCall}
            className="col-span-1 bg-gray-100 dark:bg-gray-700 rounded-xl py-3 flex flex-col items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
            disabled={!card.phoneNumber}
          >
            <div className="bg-gray-200 dark:bg-gray-600 rounded-full p-2 mb-1">
              <FaPhone className="text-gray-700 dark:text-gray-300" size={16} />
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300">{card.callButtonText}</span>
          </button>
          
          {/* Save Button */}
          <button
            onClick={handleSave}
            className="col-span-1 bg-gray-100 dark:bg-gray-700 rounded-xl py-3 flex flex-col items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <div className="bg-gray-200 dark:bg-gray-600 rounded-full p-2 mb-1">
              <FaSave className="text-gray-700 dark:text-gray-300" size={16} />
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300">{card.saveButtonText}</span>
          </button>
          
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="col-span-2 bg-gray-100 dark:bg-gray-700 rounded-xl py-3 flex flex-col items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <div className="bg-gray-200 dark:bg-gray-600 rounded-full p-2 mb-1">
              <FaShare className="text-gray-700 dark:text-gray-300" size={16} />
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300">{card.shareButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
