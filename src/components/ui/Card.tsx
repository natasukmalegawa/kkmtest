import Image from 'next/image'
import { urlForImage } from '@/lib/sanity-image'

type CardProps = {
  title: string
  description: string
  icon?: {
    asset: {
      _ref: string
    }
  }
  image?: {
    asset: {
      _ref: string
    }
  }
  status?: string
  variant: 'about' | 'program'
  iconBgColor?: string
}

export function Card({ title, description, icon, image, status, variant, iconBgColor = 'bg-blue-100' }: CardProps) {
  return (
    <>
      {variant === 'about' && (
        <div className="rounded-[20px] bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col h-full aspect-square">
          {/* Left-aligned icon circle */}
          <div className="mb-3">
            {icon ? (
              <div className={`rounded-full ${iconBgColor} dark:bg-opacity-30 p-2.5 w-9 h-9 flex items-center justify-center`}>
                <Image
                  src={urlForImage(icon).url()}
                  alt={title}
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2.5 w-9 h-9 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-apple-blue dark:text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Left-aligned content */}
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-xs">{description}</p>
        </div>
      )}
      
      {variant === 'program' && (
        <div className="rounded-ios overflow-hidden card-hover bg-gradient-to-br from-gray-900 to-gray-800 text-white p-0 aspect-square">
          <div className="relative h-1/2">
            {image ? (
              <Image
                src={urlForImage(image).url()}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
            )}
            
            {status && (
              <div className="absolute top-3 right-3">
                <span className="inline-block bg-black/60 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1">
                  {status}
                </span>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-gray-300 text-xs">{description}</p>
          </div>
        </div>
      )}
    </>
  )
}
