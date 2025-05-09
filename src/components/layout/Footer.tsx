'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { getFooter } from '@/lib/sanity-queries'
import { FooterColumn } from '@/types'

export function Footer() {
  const [footer, setFooter] = useState<{
    columns: FooterColumn[];
    copyright: string;
  } | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchFooter() {
      try {
        const footerData = await getFooter()
        setFooter(footerData)
      } catch (error) {
        console.error('Error fetching footer:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchFooter()
  }, [])
  
  // Fallback footer if Sanity fails
  const fallbackFooter = {
    columns: [
      {
        title: "About Us",
        links: [
          { title: "Our Story", url: "#" },
          { title: "Team", url: "#" },
          { title: "Careers", url: "#" },
          { title: "Contact", url: "#" }
        ]
      },
      {
        title: "Products",
        links: [
          { title: "Features", url: "#" },
          { title: "Pricing", url: "#" },
          { title: "FAQ", url: "#" },
          { title: "Support", url: "#" }
        ]
      },
      {
        title: "Resources",
        links: [
          { title: "Blog", url: "#" },
          { title: "Documentation", url: "#" },
          { title: "Community", url: "#" },
          { title: "Events", url: "#" }
        ]
      }
    ],
    copyright: "© 2023 Your Brand. All rights reserved."
  }
  
  const footerData = footer || fallbackFooter
  
  return (
    <footer className="bg-apple-light dark:bg-black py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-apple-blue font-semibold text-xl">Brand</span>
            </Link>
            <p className="text-apple-gray text-sm mb-6 max-w-xs">
              Designed to help you achieve more through clean design and innovative technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-apple-gray hover:text-apple-blue dark:hover:text-white transition-ios">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-apple-gray hover:text-apple-blue dark:hover:text-white transition-ios">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-apple-gray hover:text-apple-blue dark:hover:text-white transition-ios">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-apple-gray hover:text-apple-blue dark:hover:text-white transition-ios">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-apple-gray hover:text-apple-blue dark:hover:text-white transition-ios">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          {loading ? (
            <>
              {[1, 2, 3, 4].map((column) => (
                <div key={column} className="flex flex-col space-y-3">
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4"></div>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <>
              {footerData.columns.map((column, index) => (
                <div key={index}>
                  <h3 className="font-medium text-apple-dark dark:text-white mb-4">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          href={link.url}
                          className="text-apple-gray hover:text-apple-blue dark:hover:text-white text-sm transition-ios"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-apple-gray text-sm">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
