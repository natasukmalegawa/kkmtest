import Image from 'next/image'
import { urlForImage } from '@/lib/sanity-image'

type ProgramCardProps = {
  title: string
  description: string
  image?: {
    asset: {
      _ref: string
    }
  }
  status?: string
}

export function ProgramCard({ title, description, image, status }: ProgramCardProps) {
  return (
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
  )
}
