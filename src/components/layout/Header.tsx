'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SearchBar } from '@/components/ui/SearchBar'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { getNavigation } from '@/lib/sanity-queries'
import { Navigation } from '@/types'

export function Header() {
  const [navigation, setNavigation] = useState<Navigation[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    async function fetchNavigation() {
      try {
        const navItems = await getNavigation()
        setNavigation(navItems || [])
      } catch (error) {
        console.error('Error fetching navigation:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNavigation()
  }, [])
  
  // Fallback navigation if Sanity fails
  const fallbackNavigation = [
    { title: "Products", url: "#products" },
    { title: "Features", url: "#features" },
    { title: "Careers", url: "#careers" },
    { title: "News", url: "#news" }
  ]
  
  const navItems = navigation.length > 0 ? navigation : fallbackNavigation
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-apple-darker/80 backdrop-blur-md transition-ios">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-apple-blue font-semibold text-xl">Brand</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              {loading ? (
                <div className="flex space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-apple-gray hover:text-apple-dark dark:hover:text-white text-sm font-medium transition-ios"
                    >
                      {item.title}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchBar />
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden items-center"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 pb-6 transition-ios">
            <div className="flex flex-col space-y-4">
              {loading ? (
                <div className="flex flex-col space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={() => setIsOpen(false)}
                      className="text-apple-gray hover:text-apple-dark dark:hover:text-white text-base font-medium transition-ios px-2 py-1"
                    >
                      {item.title}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
