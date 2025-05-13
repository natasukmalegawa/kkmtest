'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity-image'
import { UpcomingProgram } from '@/types'
import { formatDate } from '@/lib/utils'
import { FaLock, FaLockOpen, FaCalendarCheck, FaCalendarTimes, FaLink, FaPlus, FaShareAlt } from 'react-icons/fa'
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
    <div className="relative overflow-hidden rounded-3xl shadow-sm h-full w-full max-w-[320px] mx-auto">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60"></div>
        
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col p-5">
          {/* Top Section - Title and Status */}
          <div className="mb-auto">
            {/* Status Badge with Icon */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white space-x-1 ${statusInfo.bgColor} mb-3`}>
              {statusInfo.icon}
              <span>{statusInfo.text}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1 sf-pro-display">{program.title}</h3>
            <p className="text-sm text-white/90 line-clamp-2 sf-pro-text">{program.description}</p>
          </div>
          
          {/* Bottom Section with Progressive Blur Effect */}
          <div className="relative mt-auto">
            {/* Progressive blur effect */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-[2px] -mx-5 -mb-5"></div>
            
            {/* Information and Button Container */}
            <div className="relative flex items-end justify-between z-10">
              {/* Date, Location, Price Info */}
              <div className="space-y-1">
                <div className="flex flex-col bg-white/20 backdrop-blur-md rounded-lg p-2 text-white">
                  <div className="text-xs font-medium">{formatDate(program.programDate)}</div>
                  {program.location && (
                    <div className="text-xs">{program.location}</div>
                  )}
                  {program.price !== undefined && (
                    <div className="text-xs">
                      {program.price === 0 ? 'Free' : `Rp ${program.price.toLocaleString('id-ID')}`}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Button */}
              <Link 
                href={`/programs/${program.slug.current}`}
                className={`flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-ios ${isAvailable ? 'bg-white text-black' : 'bg-white/80 text-black'}`}
              >
                <FaPlus size={12} className="mr-2" />
                {statusInfo.buttonText}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Share Button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-ios"
          aria-label="Share program"
        >
          <FaShareAlt size={14} />
        </button>
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
