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
    <div className="rounded-[20px] bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col h-[220px] w-full">
      {/* Left-aligned icon circle */}
      <div className="mb-3">
        {icon ? (
          <div className={`rounded-full ${iconBgColor} dark:bg-opacity-30 p-2 w-10 h-10 flex items-center justify-center overflow-hidden`}>
            <div className="relative w-5 h-5">
              <Image
                src={urlForImage(icon).url()}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-apple-blue dark:text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Left-aligned content with truncation */}
      <div className="overflow-hidden flex-1 flex flex-col">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-xs line-clamp-6 overflow-ellipsis">{description}</p>
      </div>
    </div>
  )
}
