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

export function AboutCard({ title, description, icon, iconBgColor = 'bg-blue-100' }: AboutCardProps) {
  return (
    <div className="w-full aspect-square rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg p-6 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Icon */}
      {icon ? (
        <div className={`rounded-full ${iconBgColor} dark:bg-opacity-30 p-2 w-12 h-12 flex items-center justify-center mb-4`}>
          <div className="relative w-6 h-6">
            <Image
              src={urlForImage(icon).url()}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 w-12 h-12 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-500 dark:text-blue-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}
      
      {/* Content */}
      <div className="overflow-hidden flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-5">{description}</p>
      </div>
    </div>
  )
}
