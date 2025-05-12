import { Metadata } from 'next'
import { getGalleries } from '@/lib/sanity-queries'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gallery - Our Dokumentation',
  description: 'Lihat dokumentasi kegiatan dan acara kami',
}

export default async function GalleryPage() {
  const galleries = await getGalleries()
  
  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white sf-pro-display">
            Dokumentasi
          </h1>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto sf-pro-text">
            Lihat dokumentasi kegiatan dan acara kami yang telah berlangsung
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <Link 
              key={gallery._id}
              href={`/gallery/${gallery.slug.current}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="relative h-64">
                  <Image
                    src={urlForImage(gallery.mainImage).width(600).height(400).url()}
                    alt={gallery.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 sf-pro-display">
                    {gallery.title}
                  </h3>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 sf-pro-text">
                    <span>{formatDate(gallery.date)}</span>
                    {gallery.location && <span>{gallery.location}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
