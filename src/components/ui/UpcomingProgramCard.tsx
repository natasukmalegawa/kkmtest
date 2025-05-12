'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity-image'
import { UpcomingProgram } from '@/types'
import { formatDate } from '@/lib/utils'
import { FaLock, FaLockOpen, FaShareAlt, FaCalendarCheck, FaCalendarTimes, FaLink } from 'react-icons/fa'
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      {/* Program Image */}
      <div className="relative h-48">
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
        
        {/* Status Badge with Icon */}
        <div className="absolute top-3 left-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium text-white flex items-center space-x-1 ${statusInfo.bgColor}`}>
            {statusInfo.icon}
            <span>{statusInfo.text}</span>
          </div>
        </div>
        
        {/* Share Button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-black transition-colors"
          aria-label="Share program"
        >
          <FaShareAlt size={14} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-grow flex flex-col bg-[#f5f5f7] dark:bg-gray-800">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 sf-pro-display">{program.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 sf-pro-text">{program.description}</p>
        </div>
        
        {/* Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 sf-pro-text">
            <span className="font-medium mr-2">Date:</span> 
            {formatDate(program.programDate)}
          </div>
          
          {program.location && (
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 sf-pro-text">
              <span className="font-medium mr-2">Location:</span> 
              {program.location}
            </div>
          )}
          
          {program.price !== undefined && (
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 sf-pro-text">
              <span className="font-medium mr-2">Price:</span> 
              {program.price === 0 ? 'Free' : `Rp ${program.price.toLocaleString('id-ID')}`}
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <div className="mt-auto">
          <Link 
            href={`/programs/${program.slug.current}`}
            className={`inline-flex items-center justify-center w-full py-2 px-4 rounded-full text-sm font-medium transition-colors sf-pro-text ${
              isAvailable 
                ? 'bg-apple-blue text-white hover:bg-blue-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
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
