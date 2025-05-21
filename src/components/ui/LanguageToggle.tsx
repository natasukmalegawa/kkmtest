'use client'

import { useLanguage } from '@/components/providers/LanguageProvider'
import { FaGlobe } from 'react-icons/fa'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  
  return (
    <div className="flex bg-gray-200/80 dark:bg-gray-800/80 rounded-full p-0.5 h-8">
      <button 
        onClick={() => setLanguage('id')} 
        className={`px-2 flex items-center justify-center text-xs font-medium rounded-full transition-all duration-200 ${
          language === 'id' 
            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        aria-label="Bahasa Indonesia"
        title="Bahasa Indonesia"
      >
        <FaGlobe className="mr-1 h-3 w-3" />
        <span>ID</span>
      </button>
      <button 
        onClick={() => setLanguage('en')} 
        className={`px-2 flex items-center justify-center text-xs font-medium rounded-full transition-all duration-200 ${
          language === 'en' 
            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        aria-label="English"
        title="English"
      >
        <FaGlobe className="mr-1 h-3 w-3" />
        <span>EN</span>
      </button>
    </div>
  )
}
