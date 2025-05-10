'use client'

import { useState } from 'react'
import { TeamMember } from '@/types'
import TeamCard from '@/components/ui/TeamCard'

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
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">{title}</h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {members.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-ios animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {members.map((member) => (
              <TeamCard
                key={member._id}
                member={member}
                isActive={activeCard === member._id}
                onToggle={() => toggleCardInfo(member._id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
