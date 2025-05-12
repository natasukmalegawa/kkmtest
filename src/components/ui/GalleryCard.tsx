'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Gallery } from '@/types'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { FaExpand, FaDownload } from 'react-icons/fa'
import { motion } from 'framer-motion'

type GalleryCardProps = {
  gallery: Gallery
  index: number
  isActive: boolean
}

export function GalleryCard({ gallery, index, isActive }: GalleryCardProps) {
  const [showFullImage, setShowFullImage] = useState(false)
  
  // Ekstrak warna dominan dari gambar (simulasi)
  const dominantColor = 'rgba(0, 128, 128, 0.2)' // Ini akan diganti dengan ekstraksi warna sebenarnya
  
  // Hitung rotasi berdasarkan index
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
  
  // Fungsi untuk mengunduh gambar
  const downloadImage = () => {
    const imageUrl = urlForImage(gallery.mainImage).url()
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `${gallery.title.replace(/\s+/g, '-').toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <>
      <motion.div 
        className="relative rounded-3xl overflow-hidden shadow-lg cursor-pointer"
        style={{ 
          zIndex: getZIndex(),
          boxShadow: `0 10px 30px ${dominantColor}`,
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          {/* Konten di atas gambar */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-xl font-bold mb-1 sf-pro-display">{gallery.title}</h3>
            
            <div className="flex flex-col space-y-1 text-sm opacity-90 sf-pro-text">
              <div className="flex items-center">
                <span className="text-xs">{formatDate(gallery.date)}</span>
              </div>
              
              {gallery.location && (
                <div className="flex items-center">
                  <span className="text-xs">{gallery.location}</span>
                </div>
              )}
            </div>
            
            {/* Tombol Full View */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowFullImage(true)
              }}
              className="absolute bottom-4 right-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
              aria-label="View full image"
            >
              <FaExpand size={14} />
            </button>
          </div>
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
                className="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Download image"
              >
                <FaDownload size={18} />
              </button>
              
              <button
                onClick={() => setShowFullImage(false)}
                className="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition-colors"
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
