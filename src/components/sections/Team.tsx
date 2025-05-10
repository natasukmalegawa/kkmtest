'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { urlForImage } from '@/lib/sanity-image'
import { TeamMember } from '@/types'

type TeamProps = {
  smallTitle?: string
  title: string
  subtitle: string
  members: TeamMember[]
}

export function Team({ smallTitle, title, subtitle, members }: TeamProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  
  const toggleCardInfo = (id: string) => {
    if (activeCard === id) {
      setActiveCard(null)
    } else {
      setActiveCard(id)
    }
  }
  
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-apple-darker">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase">
              {smallTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            {title}
          </h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Rest of the Team component code remains the same */}
        {members.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-ios animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {members.map((member) => (
              <div 
                key={member._id}
                className="rounded-ios overflow-hidden morphism card-hover shadow-ios dark:shadow-ios-dark"
              >
                <div className="relative h-64 bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  {member.image && (
                    <Image
                      src={urlForImage(member.image).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  
                  {/* Rest of the member card code remains the same */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/50 to-transparent text-white">
                    {activeCard === member._id ? (
                      <div className="flex flex-col items-center justify-center space-y-4 h-full">
                        <div className="flex space-x-4">
                          {member.instagram && (
                            <a 
                              href={member.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-pink-500 rounded-full p-3 hover:bg-pink-500 hover:text-white transition-ios"
                            >
                              <FaInstagram size={20} />
                            </a>
                          )}
                          
                          {member.email && (
                            <a 
                              href={`mailto:${member.email}`}
                              className="bg-white text-blue-500 rounded-full p-3 hover:bg-blue-500 hover:text-white transition-ios"
                            >
                              <FaEnvelope size={20} />
                            </a>
                          )}
                          
                          {member.linkedin && (
                            <a 
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-blue-700 rounded-full p-3 hover:bg-blue-700 hover:text-white transition-ios"
                            >
                              <FaLinkedin size={20} />
                            </a>
                          )}
                        </div>
                        
                        <button
                          onClick={() => toggleCardInfo(member._id)}
                          className="text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 transition-ios"
                        >
                          Back
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-medium text-lg">{member.name}</h3>
                        <p className="text-white/80 text-sm">{member.position}</p>
                        
                        <button
                          onClick={() => toggleCardInfo(member._id)}
                          className="mt-3 text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 transition-ios inline-block"
                        >
                          More Info
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
