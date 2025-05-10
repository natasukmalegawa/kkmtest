import Image from 'next/image'
import { urlForImage } from '@/lib/sanity-image'

type AboutCardProps = {
  title: string
  description: string
  icon?: {
    asset: {
      _ref: string
    }
  }
  iconBgColor?: string
}

export function AboutCard({ title, description, icon, iconBgColor = 'bg-blue-500' }: AboutCardProps) {
  return (
    <div className="relative overflow-visible pt-3 sm:pt-2">
      <div className="group w-full mt-3 sm:mt-2 mb-6 sm:mb-8 h-auto perspective-1000">
        {/* Card */}
        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-7 sm:p-8 shadow-lg 
                        transition-all duration-300 transform group-hover:-translate-y-2 
                        border border-white/20 h-full w-full relative will-change-transform">
          {/* Icon */}
          {icon ? (
            <div className={`${iconBgColor} rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-5 sm:mb-6`}>
              <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                <Image
                  src={urlForImage(icon).url()}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="bg-blue-500 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-5 sm:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}

          {/* Content */}
          <div className="overflow-hidden">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 line-clamp-1">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-3">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
