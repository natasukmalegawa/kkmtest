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
}

export function Card({ title, description, icon, image, status, variant }: CardProps) {
  return (
    <>
      {variant === 'about' && (
        <div className="rounded-[24px] overflow-hidden morphism card-hover bg-white/80 dark:bg-gray-900/50 backdrop-blur-lg shadow-ios dark:shadow-ios-dark p-6 relative h-full flex flex-col justify-between transition-all">
          {/* Icon circle at top-left */}
          <div className="absolute top-6 left-6">
            {icon ? (
              className="rounded-full p-3 flex items-center justify-center w-12 h-12"
                style={{ 
                backgroundColor: iconBgColor || 'rgb(219 234 254)', // Tailwind blue-100
                }}
             >
              </div>
            ) : (
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-3 flex items-center justify-center w-12 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-apple-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Content at the bottom */}
          <div className="mt-auto">
            <h3 className="text-xl font-medium mb-2 mt-10">{title}</h3>
            <p className="text-apple-gray dark:text-gray-400 text-sm">{description}</p>
          </div>
        </div>
      )}
      
      {variant === 'program' && (
        <div className="rounded-ios overflow-hidden card-hover bg-gradient-to-br from-gray-900 to-gray-800 text-white p-0">
          <div className="relative h-40">
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
          
          <div className="p-5">
            <h3 className="text-xl font-medium mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
          </div>
        </div>
      )}
    </>
  )
}
