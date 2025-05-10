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
    <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-white/20 h-[220px] w-full">
      {/* Icon */}
      {icon ? (
        <div className={`${iconBgColor} rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
          <div className="relative w-8 h-8">
            <Image
              src={urlForImage(icon).url()}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}
      
      {/* Content */}
      <div className="overflow-hidden">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 line-clamp-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  )
}
