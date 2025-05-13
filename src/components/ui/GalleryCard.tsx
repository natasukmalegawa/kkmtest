'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Gallery } from '@/types'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { FaShareAlt, FaDownload, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

type GalleryCardProps = {
  gallery: Gallery
  index: number
  isActive: boolean
  totalCards: number
}

export function GalleryCard({ gallery, index, isActive, totalCards }: GalleryCardProps) {
  const [showFullImage, setShowFullImage] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Format date for display
  const formattedDate = new Date(gallery.date)
  const month = formattedDate.toLocaleString('default', { month: 'short' }).toUpperCase()
  const day = formattedDate.getDate()
  
  // Calculate stacking position
  const getStackPosition = () => {
    if (isActive) return { zIndex: totalCards, scale: 1, y: 0, rotate: 0 }
    
    // Calculate position based on distance from active index
    const distance = Math.min(Math.abs(index - 0), totalCards - Math.abs(index - 0))
    const scale = 1 - (distance * 0.05)
    const y = distance * 10
    const rotate = (index % 2 === 0) ? -2 : 2
    
    return {
      zIndex: totalCards - distance,
      scale,
      y,
      rotate
    }
  }
  
  // Handle download image
  const downloadImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    const imageUrl = urlForImage(gallery.mainImage).url()
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `${gallery.title.replace(/\s+/g, '-').toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  // Handle share image
  const shareImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: gallery.title,
        text: gallery.description || `Check out this image: ${gallery.title}`,
        url: window.location.href,
      })
    }
  }
  
  // Get stack position values
  const position = getStackPosition()
  
  return (
    <>
      <motion.div 
        className="relative overflow-hidden rounded-3xl shadow-lg cursor-pointer"
        style={{ 
          width: '340px',
          height: '440px',
          transformOrigin: 'center bottom',
        }}
        initial={false}
        animate={{
          zIndex: position.zIndex,
          scale: position.scale,
          y: position.y,
          rotate: position.rotate,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        whileHover={{ scale: isActive ? 1.02 : position.scale * 1.02 }}
        onClick={() => isActive && setShowFullImage(true)}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          <Image
            src={urlForImage(gallery.mainImage).width(680).height(880).url()}
            alt={gallery.title}
            fill
            className="object-cover"
            priority={isActive}
          />
          
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          
          {/* Date box in bottom left corner */}
          <div className="absolute bottom-5 left-5 bg-white/90 dark:bg-gray-800/90 rounded-lg overflow-hidden shadow-md">
            <div className="bg-blue-500 text-white text-xs font-medium px-2 py-1 text-center">
              {month}
            </div>
            <div className="px-3 py-2 text-center">
              <span className="text-lg font-bold text-gray-900 dark:text-white">{day}</span>
            </div>
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-2xl font-bold mb-2 sf-pro-display">{gallery.title}</h3>
            
            {gallery.location && (
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-white/80" size={14} />
                <span className="text-sm text-white/90">{gallery.location}</span>
              </div>
            )}
            
            <div className="flex items-center mb-4">
              <FaClock className="mr-2 text-white/80" size={14} />
              <span className="text-sm text-white/90">
                {formattedDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                {' '}{formattedDate.toLocaleDateString([], {timeZoneName: 'short'}).split(', ')[1]}
              </span>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-2">
              <button
                onClick={downloadImage}
                className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Download image"
              >
                <FaDownload size={16} />
              </button>
              
              <button
                onClick={shareImage}
                className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Share image"
              >
                <FaShareAlt size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Full Image Modal */}
      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowFullImage(false)}
          ref={modalRef}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={urlForImage(gallery.mainImage).width(1920).height(1080).url()}
                alt={gallery.title}
                fill
                className="object-contain"
              />
            </div>
            
            {/* Modal controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={downloadImage}
                className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Download image"
              >
                <FaDownload size={18} />
              </button>
              
              <button
                onClick={shareImage}
                className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Share image"
              >
                <FaShareAlt size={18} />
              </button>
              
              <button
                onClick={() => setShowFullImage(false)}
                className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <span className="text-xl font-bold">×</span>
              </button>
            </div>
            
            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-2xl font-bold mb-2 sf-pro-display">{gallery.title}</h3>
              
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-4">
                  {gallery.location && (
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" size={14} />
                      <span>{gallery.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <FaClock className="mr-2" size={14} />
                    <span>{formattedDate.toLocaleDateString()}</span>
                  </div>
                </div>
                
                {gallery.description && (
                  <p className="text-sm mt-2 opacity-90 max-w-3xl">{gallery.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
