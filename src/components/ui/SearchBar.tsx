'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

export function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  
  // Handle outside click to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsExpanded(false)
    }
  }

  return (
    <div className="relative" ref={inputRef}>
      <div className={`
        flex items-center overflow-hidden transition-all duration-300 ease-in-out
        ${isExpanded 
          ? 'w-36 md:w-48 bg-gray-100 dark:bg-gray-800 rounded-full pl-3' // Added pl-3 for left padding
          : 'w-6 h-6'
        }
      `}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-center text-gray-600 dark:text-gray-300 w-6 h-6 ${isExpanded ? 'mr-1' : ''}`} // Added mr-1 margin when expanded
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
              className="w-full h-8 pr-3 text-sm bg-transparent border-0 focus:outline-none focus:ring-0"
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  )
}
