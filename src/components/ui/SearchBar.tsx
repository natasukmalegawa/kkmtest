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
        flex items-center transition-ios
        ${isExpanded ? 'w-48 md:w-64' : 'w-9'}
      `}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-0 top-0 flex items-center justify-center h-9 w-9 text-apple-gray hover:text-apple-dark dark:hover:text-white"
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
              className="w-full h-9 pl-10 pr-4 text-base rounded-full bg-gray-100 dark:bg-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-apple-blue"
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  )
}
