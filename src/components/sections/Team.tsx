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
    setActiveCard(activeCard === id ? null : id)
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

        {members.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-ios animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {members.map((member) => {
              const isActive = activeCard === member._id
              return (
                <div
                  key={member._id}
                  className={`team-card relative overflow-hidden rounded-2xl shadow-lg transition-all border border-white/20 bg-white/70 dark:bg-white/10 backdrop-blur-lg ${isActive ? 'active' : ''}`}
                >
                  <div className="relative overflow-hidden">
                    {member.image && (
                      <Image
                        src={urlForImage(member.image).url()}
                        alt={member.name}
                        width={500}
                        height={500}
                        className="w-full aspect-square object-cover img-zoom"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold heading-apple mb-1 text-apple-darkgray dark:text-white">{member.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.position}</p>
                    <button
                      onClick={() => toggleCardInfo(member._id)}
                      className="team-btn w-full py-2 bg-apple-blue text-white rounded-full btn-apple transition-all"
                    >
                      {isActive ? 'Hide' : 'Get in Touch'}
                    </button>

                    <div
                      className={`team-social-buttons ${
                        isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'
                      }`}
                    >
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center"
                        >
                          <FaInstagram className="text-white" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center"
                        >
                          <FaEnvelope className="text-white" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center"
                        >
                          <FaLinkedin className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
