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
      ${isExpanded ? 'w-48 md:w-64 bg-gray-100 dark:bg-gray-800 rounded-full px-2' : 'w-8 h-8'}
    `}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-8 h-8 text-apple-gray hover:text-apple-dark dark:hover:text-white"
        aria-label="Search"
      >
        <FaSearch className="w-5 h-5" />
      </button>

      {isExpanded && (
        <form onSubmit={handleSearch} className="w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari konten..."
            className="w-full h-8 pl-2 pr-4 text-sm bg-transparent border-0 focus:outline-none focus:ring-0"
            autoFocus
          />
        </form>
      )}
    </div>
  </div>
)
            />
          </form>
        )}
      </div>
    </div>
  )
}
