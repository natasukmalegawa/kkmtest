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
    <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg program-card overflow-hidden shadow-lg transition-all duration-300 border border-white/20 rounded-2xl">
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <Image
            src={urlForImage(image).url()}
            alt={title}
            fill
            className="object-cover img-zoom"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold heading-apple mb-2 text-apple-darkgray dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>

        {status && (
          <span className="bg-purple-100 dark:bg-purple-400/20 text-purple-600 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-400/40">
            {status}
          </span>
        )}
      </div>
    </div>
  )
}
