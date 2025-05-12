'use client'

import { useState, useRef, useEffect } from 'react'
import { FaTimes, FaLink, FaFacebook, FaTwitter, FaWhatsapp, FaTelegram, FaLinkedin } from 'react-icons/fa'

type ShareModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
}

export function ProgramShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])
  
  // Handle ESC key to close
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])
  
  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  
  if (!isOpen) return null
  
  // Encode for sharing
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(`Check out this program: ${title}`)
  
  // Share links
  const shareLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-[#1877F2] text-xl" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Facebook'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="text-[#1DA1F2] text-xl" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      label: 'X'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-[#25D366] text-xl" />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      label: 'Whatsapp'
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="text-[#0088CC] text-xl" />,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      label: 'Telegram'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-[#0A66C2] text-xl" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: 'LinkedIn'
    }
  ]
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full shadow-xl relative"
      >
        {/* Icon at top */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
          <FaLink className="text-gray-600 dark:text-gray-300 text-xl" />
        </div>
        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        
        <div className="p-8 pt-10">
          <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white sf-pro-display">
            Share with Friends
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6 sf-pro-text">
            Sharing is caring! Let others know about this program.
          </p>
          
          {/* Link input */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2 sf-pro-text">Share your link</p>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 bg-transparent border-none py-2 px-3 text-sm focus:outline-none focus:ring-0 text-gray-800 dark:text-gray-200"
              />
              <button 
                onClick={copyToClipboard}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-apple-blue dark:hover:text-blue-400"
                aria-label="Copy link"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Share to */}
          <p className="text-sm font-medium mb-3 sf-pro-text">Share to</p>
          <div className="flex justify-between">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center space-y-1 group"
              >
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                  {link.icon}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 sf-pro-text">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
