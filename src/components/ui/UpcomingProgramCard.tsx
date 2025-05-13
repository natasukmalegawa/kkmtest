'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity-image'
import { UpcomingProgram } from '@/types'
import { formatDate } from '@/lib/utils'
import { FaLock, FaLockOpen, FaCalendarCheck, FaCalendarTimes, FaLink, FaCalendarAlt, FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa'
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
          buttonText: 'More Info'
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
          buttonText: 'More Info'
        }
      case 'in-progress':
        return {
          icon: <FaLink size={14} />,
          text: 'In Progress',
          bgColor: 'bg-blue-500',
          buttonText: 'More Info'
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
          buttonText: 'More Info'
        }
    }
  }
  
  const statusInfo = getStatusInfo()
    
  return (
    <div className="relative overflow-hidden rounded-[24px] shadow-lg h-full w-full max-w-[320px] mx-auto">
      {/* Program Image with Overlay */}
      <div className="relative h-full w-full aspect-[3/4]">
        {program.mainImage ? (
          <Image
            src={urlForImage(program.mainImage).width(600).height(800).url()}
            alt={program.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
        )}
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
        
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col p-6">
          {/* Top Section - Status Info */}
          <div className="flex justify-between items-center mb-8">
            {/* Status Text Only */}
            <div className="text-xs font-medium text-white drop-shadow-md">
              {statusInfo.text}
            </div>
            
            {/* Share Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-ios"
              aria-label="Share program"
            >
              <FaShareAlt size={14} />
            </button>
          </div>
          
          {/* Center Content - Title and Subtitle */}
          <div className="flex flex-col items-center justify-center text-center mt-4 mb-auto px-2">
            <h3 className="text-2xl font-bold text-white mb-2 sf-pro-display drop-shadow-md">{program.title}</h3>
            <p className="text-sm text-white/90 line-clamp-2 sf-pro-text drop-shadow-md">{program.description}</p>
          </div>
          
          {/* Bottom Section with Progressive Blur Effect */}
          <div className="relative mt-auto pt-8">
            {/* Progressive blur effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-[2px] -mx-6 -mb-6"></div>
            
            {/* Information and Button Container */}
            <div className="relative flex flex-col z-10 space-y-4">
              {/* Date, Location, Price Info */}
              <div className="flex items-center text-white drop-shadow-md">
                <div className="flex items-center text-xs">
                  <FaCalendarAlt size={10} className="mr-1" />
                  <span>{formatDate(program.programDate)}</span>
                </div>
                {program.location && (
                  <div className="flex items-center text-xs ml-2">
                    <span className="mx-1">|</span>
                    <FaMapMarkerAlt size={10} className="mr-1" />
                    <span>{program.location}</span>
                  </div>
                )}
              </div>
              
              {program.price !== undefined && (
                <div className="text-xs text-white drop-shadow-md">
                  {program.price === 0 ? 'Free' : `Rp ${program.price.toLocaleString('id-ID')}`}
                </div>
              )}
              
              {/* Action Button */}
              <Link 
                href={`/programs/${program.slug.current}`}
                className={`inline-flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-ios w-auto self-end ${isAvailable ? 'bg-white text-black' : 'bg-white/90 text-black'}`}
              >
                {statusInfo.icon}
                <span className="ml-2">{statusInfo.buttonText}</span>
              </Link>
            </div>
          </div>
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
