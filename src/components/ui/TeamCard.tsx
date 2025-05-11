'use client'

import Image from 'next/image'
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { TeamMember } from '@/types'
import { urlForImage } from '@/lib/sanity-image'

type Props = {
  member: TeamMember
  isActive: boolean
  onToggle: () => void
}

export default function TeamCard({ member, isActive, onToggle }: Props) {
  return (
    <div
      className={`team-card relative overflow-hidden rounded-2xl shadow-lg transition-apple border border-white/20 bg-white/70 dark:bg-white/10 backdrop-blur-lg ${
        isActive ? 'active' : ''
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {member.image ? (
          <Image
            src={urlForImage(member.image).url()}
            alt={member.name}
            width={500}
            height={500}
            className="w-full aspect-square object-cover img-zoom"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold heading-apple mb-1 text-apple-darkgray dark:text-white">
          {member.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.position}</p>

        {/* Get in Touch Button */}
        <button
          onClick={onToggle}
          className="team-btn px-5 py-2 mx-auto block text-sm bg-apple-blue text-white rounded-full btn-apple transition-apple font-medium max-w-max"
        >
          {isActive ? 'Hide' : 'Get in Touch'}
        </button>

        {/* Social Buttons */}
        <div
          className={`team-social-buttons transition-all ${
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
}
