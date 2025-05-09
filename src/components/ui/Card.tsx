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
    <div className={`
      rounded-ios overflow-hidden card-hover
      ${variant === 'about' 
        ? 'bg-white dark:bg-apple-dark shadow-ios dark:shadow-ios-dark p-6' 
        : 'bg-gradient-to-br from-gray-900 to-gray-800 text-white p-0'
      }
    `}>
      {variant === 'about' && (
        <>
          <div className="mb-4">
            {icon ? (
              <Image
                src={urlForImage(icon).url()}
                alt={title}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-apple-blue flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-apple-gray dark:text-gray-400">{description}</p>
        </>
      )}
      
      {variant === 'program' && (
        <>
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
        </>
      )}
    </div>
  )
}
