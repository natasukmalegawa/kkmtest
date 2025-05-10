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
    <div className="relative h-8">
      <div className={`
        flex items-center overflow-hidden transition-all duration-200 bg-gray-200/80 dark:bg-gray-800/80 rounded-full h-8
        ${isExpanded ? 'w-32 md:w-40' : 'w-8'}
      `}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center h-8 w-8 text-gray-600 dark:text-gray-400"
          aria-label="Search"
        >
          <FaSearch className="h-3.5 w-3.5" />
        </button>
        
        {isExpanded && (
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari konten..."
              className="w-full h-full text-xs bg-transparent border-0 focus:outline-none focus:ring-0 pl-0 pr-2"
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  )
}
