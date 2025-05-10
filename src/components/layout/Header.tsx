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
  const [activeLang, setActiveLang] = useState('ID')
  
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
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-apple-darker/90 backdrop-blur-md transition-ios">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and left section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-apple-blue font-semibold text-xl">Brand</span>
            </Link>
          </div>
          
          {/* Center navigation - desktop only */}
          <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
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
          
          {/* Right section with search, theme, language, and mobile menu */}
          <div className="flex items-center space-x-3">
            <SearchBar />
            
            {/* Language toggle */}
            <div className="hidden md:flex bg-gray-100 dark:bg-gray-800 rounded-full p-0.5">
              <button 
                onClick={() => setActiveLang('ID')} 
                className={`px-2 py-1 text-xs font-medium rounded-full transition-ios ${
                  activeLang === 'ID' 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                ID
              </button>
              <button 
                onClick={() => setActiveLang('EN')} 
                className={`px-2 py-1 text-xs font-medium rounded-full transition-ios ${
                  activeLang === 'EN' 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
            
            <ThemeToggle />
            
            {/* Mobile menu button with smooth animation */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden items-center justify-center w-5 h-5 transition-ios"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span 
                  className={`absolute h-0.5 w-5 bg-current transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-2' : 'rotate-0'
                  }`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-5 bg-current top-2 transition-opacity duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-5 bg-current top-4 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-2' : 'rotate-0'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile menu with smooth height animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-6">            
            {/* Mobile navigation */}
            <div className="flex flex-col space-y-3">
              {loading ? (
                <div className="flex flex-col space-y-4 items-center">
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
                      className="text-apple-gray hover:text-apple-dark dark:hover:text-white text-base font-medium transition-ios text-center py-2"
                    >
                      {item.title}
                    </Link>
                  ))}
                </>
              )}
            </div>
            
            {/* Mobile language and theme toggles */}
            <div className="flex space-x-3 justify-center">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-0.5">
                <button 
                  onClick={() => setActiveLang('ID')} 
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-ios ${
                    activeLang === 'ID' 
                      ? 'bg-white dark:bg-gray-700 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  ID
                </button>
                <button 
                  onClick={() => setActiveLang('EN')} 
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-ios ${
                    activeLang === 'EN' 
                      ? 'bg-white dark:bg-gray-700 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  EN
                </button>
              </div>
              
              {/* Mobile theme toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
