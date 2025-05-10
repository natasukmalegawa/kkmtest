'use client'

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search query:', searchQuery)
    // Implement search functionality here
    setSearchQuery('')
    setIsExpanded(false)
  }
  
  return (
    <div className="relative">
      <div className={`
        flex items-center overflow-hidden transition-all duration-300 ease-in-out
        ${isExpanded 
          ? 'w-36 md:w-48 bg-gray-100 dark:bg-gray-800 rounded-full' 
          : 'w-6 h-6'
        }
      `}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center text-gray-600 dark:text-gray-300 w-6 h-6"
          aria-label="Search"
        >
          <FaSearch className="h-4 w-4" />
        </button>
        
        {isExpanded && (
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari konten..."
              className="w-full h-8 pl-1 pr-3 text-sm bg-transparent border-0 focus:outline-none focus:ring-0"
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  )
}
