import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaDownload } from 'react-icons/fa'

// Define types for our params
type Params = {
  slug: string
}

export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  const gallery = await getGallery(params.slug)
  
  if (!gallery) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
  
  return {
    title: `${gallery.title} - KKM Gallery`,
    description: gallery.description || 'Lihat dokumentasi kegiatan dan acara kami',
  }
}

async function getGallery(slug: string) {
  return client.fetch(`
    *[_type == "gallery" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      date,
      location,
      description
    }
  `, { slug })
}

export default async function GalleryDetailPage({ 
  params 
}: { 
  params: Params 
}) {
  const gallery = await getGallery(params.slug)
  
  if (!gallery) {
    notFound()
  }
  
  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link 
            href="/gallery" 
            className="inline-flex items-center text-apple-blue dark:text-blue-400 font-medium hover:underline sf-pro-text"
          >
            <FaArrowLeft className="mr-2" size={12} />
            Back to Gallery
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md">
          <div className="relative h-[50vh] md:h-[70vh]">
            <Image
              src={urlForImage(gallery.mainImage).width(1200).height(800).url()}
              alt={gallery.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sf-pro-display">
                  {gallery.title}
                </h1>
                
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-gray-600 dark:text-gray-400 sf-pro-text mb-4">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Date:</span> 
                    {formatDate(gallery.date)}
                  </div>
                  
                  {gallery.location && (
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Location:</span> 
                      {gallery.location}
                    </div>
                  )}
                </div>
              </div>
              
              <a
                href={urlForImage(gallery.mainImage).url()}
                download={`${gallery.title.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                className="inline-flex items-center justify-center py-2 px-4 rounded-full bg-apple-blue text-white hover:bg-blue-600 transition-colors text-sm font-medium sf-pro-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDownload className="mr-2" size={14} />
                Download
              </a>
            </div>
            
            {gallery.description && (
              <div className="mt-6 text-gray-700 dark:text-gray-300 sf-pro-text">
                <p>{gallery.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
