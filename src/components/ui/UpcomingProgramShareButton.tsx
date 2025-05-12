'use client'

import { useState } from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { UpcomingProgramShareModal } from './UpcomingProgramShareModal'

type UpcomingProgramShareButtonProps = {
  url: string
  title: string
}

export function UpcomingProgramShareButton({ url, title }: UpcomingProgramShareButtonProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  
  return (
    <>
      <button
        onClick={() => setShowShareModal(true)}
        className="inline-flex items-center justify-center py-2 px-5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-ios sf-pro-text"
      >
        <FaShareAlt className="mr-2" size={14} />
        Share Program
      </button>
      
      <UpcomingProgramShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={title}
        url={url}
      />
    </>
  )
}
