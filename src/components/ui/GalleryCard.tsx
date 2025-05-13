'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Gallery } from '@/types'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { FaExpand, FaDownload, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { motion } from 'framer-motion'

type GalleryCardProps = {
  gallery: Gallery
  index: number
  isActive: boolean
}

export function GalleryCard({ gallery, index, isActive }: GalleryCardProps) {
  const [showFullImage, setShowFullImage] = useState(false)
  
  // Hitung rotasi berdasarkan index dan status aktif
  const getRotation = () => {
    if (isActive) return 0
    return index % 2 === 0 ? -5 : 5
  }
  
  // Hitung z-index berdasarkan status aktif
  const getZIndex = () => {
    return isActive ? 10 : 1
  }
  
  // Hitung posisi berdasarkan status aktif
  const getPosition = () => {
    if (isActive) return 0
    return index % 2 === 0 ? -20 : 20
  }
  
  // Fungsi untuk mengunduh gambar (dipindahkan ke modal full image)
  const downloadImage = () => {
    const imageUrl = urlForImage(gallery.mainImage).url()
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `${gallery.title.replace(/\s+/g, '-').toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  // Format waktu dari date
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }
  
  return (
    <>
      <motion.div 
        className="relative rounded-3xl overflow-hidden shadow-lg cursor-pointer card-stack-item"
        style={{ 
          zIndex: getZIndex(),
        }}
        initial={{ rotate: getRotation(), x: getPosition() }}
        animate={{ 
          rotate: getRotation(),
          x: getPosition(),
          scale: isActive ? 1 : 0.9,
          opacity: isActive ? 1 : 0.8
        }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: isActive ? 1.02 : 0.95 }}
      >
        {/* Gambar Utama */}
        <div className="relative h-[400px] w-[300px]">
          <Image
            src={urlForImage(gallery.mainImage).width(600).height(800).url()}
            alt={gallery.title}
            fill
            className="object-cover"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
          
          {/* Title di pojok kiri atas */}
          <div className="absolute top-4 left-4 text-white">
            <h3 className="text-xl font-bold sf-pro-display">{gallery.title}</h3>
          </div>
          
          {/* Date Box di pojok kiri bawah */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center">
              <FaCalendarAlt className="mr-1.5" size={12} />
              <span className="text-xs font-medium">{formatDate(gallery.date)}</span>
            </div>
            
            {gallery.location && (
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center">
                <FaMapMarkerAlt className="mr-1.5" size={12} />
                <span className="text-xs font-medium">{gallery.location}</span>
              </div>
            )}
          </div>
          
          {/* Time di pojok kanan bawah */}
          <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center text-white">
            <FaClock className="mr-1.5" size={12} />
            <span className="text-xs font-medium">{formatTime(gallery.date)}</span>
          </div>
          
          {/* Tombol Full View di pojok kanan atas dengan morphism effect */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowFullImage(true)
            }}
            className="absolute top-4 right-4 morphism p-2.5 rounded-full text-gray-700 dark:text-white hover:bg-white/40 dark:hover:bg-white/20 transition-colors shadow-md"
            aria-label="View full image"
          >
            <FaExpand size={14} />
          </button>
        </div>
      </motion.div>
      
      {/* Modal Full Image */}
      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Image
              src={urlForImage(gallery.mainImage).width(1200).height(1600).url()}
              alt={gallery.title}
              width={1200}
              height={1600}
              className="object-contain max-h-[90vh]"
            />
            
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  downloadImage()
                }}
                className="morphism p-3 rounded-full text-gray-700 dark:text-white hover:bg-white/40 dark:hover:bg-white/20 transition-colors shadow-md"
                aria-label="Download image"
              >
                <FaDownload size={18} />
              </button>
              
              <button
                onClick={() => setShowFullImage(false)}
                className="morphism p-3 rounded-full text-gray-700 dark:text-white hover:bg-white/40 dark:hover:bg-white/20 transition-colors shadow-md"
                aria-label="Close"
              >
                <span className="text-xl font-bold">×</span>
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 text-white p-4 bg-black/50 rounded-lg">
              <h3 className="text-xl font-bold mb-1 sf-pro-display">{gallery.title}</h3>
              {gallery.description && (
                <p className="text-sm opacity-90 sf-pro-text">{gallery.description}</p>
              )}
              <div className="flex justify-between mt-2 text-sm opacity-80">
                <span>{formatDate(gallery.date)}</span>
                {gallery.location && <span>{gallery.location}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
