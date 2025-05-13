'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity-image'
import { UpcomingProgram } from '@/types'
import { formatDate } from '@/lib/utils'
import { FaLock, FaLockOpen, FaShareAlt, FaCalendarCheck, FaCalendarTimes, FaLink, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { UpcomingProgramShareModal } from './UpcomingProgramShareModal'

type UpcomingProgramCardProps = {
  program: UpcomingProgram
}

export function UpcomingProgramCard({ program }: UpcomingProgramCardProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  
  const isAvailable = program.status === 'registration-open'
  const programUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/programs/${program.slug.current}` 
    : `/programs/${program.slug.current}`
  
  // Get status icon and text
  const getStatusInfo = () => {
    switch(program.status) {
      case 'coming-soon':
        return {
          icon: <FaLock size={14} />,
          text: 'Coming Soon',
          bgColor: 'bg-yellow-500',
          buttonText: 'View Details'
        }
      case 'registration-open':
        return {
          icon: <FaLockOpen size={14} />,
          text: 'Registration Open',
          bgColor: 'bg-green-500',
          buttonText: 'Register Now'
        }
      case 'registration-closed':
        return {
          icon: <FaCalendarTimes size={14} />,
          text: 'Registration Closed',
          bgColor: 'bg-red-500',
          buttonText: 'View Details'
        }
      case 'in-progress':
        return {
          icon: <FaLink size={14} />,
          text: 'In Progress',
          bgColor: 'bg-blue-500',
          buttonText: 'View Details'
        }
      case 'completed':
        return {
          icon: <FaCalendarCheck size={14} />,
          text: 'Completed',
          bgColor: 'bg-gray-500',
          buttonText: 'View Summary'
        }
      default:
        return {
          icon: <FaLock size={14} />,
          text: 'Coming Soon',
          bgColor: 'bg-yellow-500',
          buttonText: 'View Details'
        }
    }
  }
  
  const statusInfo = getStatusInfo()
    
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      {/* Program Image with Overlay for Text */}
      <div className="relative h-[320px]">
        {program.mainImage ? (
          <Image
            src={urlForImage(program.mainImage).width(600).height(400).url()}
            alt={program.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
        )}
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
        
        {/* Title and Subtitle positioned at center */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md sf-pro-display">{program.title}</h3>
          <p className="text-sm text-white/90 line-clamp-2 drop-shadow-md sf-pro-text">{program.description}</p>
        </div>
        
        {/* Share Button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-black transition-colors"
          aria-label="Share program"
        >
          <FaShareAlt size={14} />
        </button>
        
        {/* Bottom section with date, location, price and button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          {/* Date, Location, Price info */}
          <div className="flex flex-col justify-end h-[40px]">
            <div className="flex items-center text-xs text-white sf-pro-text drop-shadow-md">
              <FaCalendarAlt className="mr-1" size={12} />
              {formatDate(program.programDate)}
              {program.location && (
                <>
                  <span className="mx-1">|</span>
                  <FaMapMarkerAlt className="mr-1" size={12} />
                  {program.location}
                </>
              )}
            </div>
            
            {program.price !== undefined && (
              <div className="flex items-center text-xs text-white font-medium sf-pro-text drop-shadow-md mt-1">
                {program.price === 0 ? 'Free' : `Rp ${program.price.toLocaleString('id-ID')}`}
              </div>
            )}
          </div>
          
          {/* Action Button */}
          <Link 
            href={`/programs/${program.slug.current}`}
            className={`inline-flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-colors sf-pro-text ${
              isAvailable 
                ? 'bg-apple-blue text-white hover:bg-blue-600'
                : 'bg-white/90 text-gray-800 hover:bg-white'
            }`}
          >
            {statusInfo.icon && <span className="mr-2">{statusInfo.icon}</span>}
            {statusInfo.buttonText}
          </Link>
        </div>
      </div>
      
      {/* Share Modal */}
      <UpcomingProgramShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={program.title}
        url={programUrl}
      />
    </div>
  )
}
