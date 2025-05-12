import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUpcomingProgramBySlug, getUpcomingPrograms } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { PortableText } from '@/components/ui/PortableText'
import { FaChevronLeft, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaCheckCircle, FaLock } from 'react-icons/fa'
import { UpcomingProgramShareButton } from '@/components/ui/UpcomingProgramShareButton'

export const dynamicParams = true

// Note: For Next.js 15, use the any type to avoid TypeScript errors
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const program = await getUpcomingProgramBySlug(params.slug)

  if (!program) {
    return {
      title: 'Program Not Found | Your Brand',
    }
  }

  return {
    title: `${program.title} | Your Brand`,
    description: program.description,
  }
}

export default async function ProgramPage({ params }: any) {
  const program = await getUpcomingProgramBySlug(params.slug)

  if (!program) {
    notFound()
  }

  // Format the program URL for sharing
  const programUrl = `https://yourwebsite.com/programs/${params.slug}`
  const isAvailable = program.status === 'registration-open'

  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back navigation */}
        <div className="mb-6 max-w-4xl mx-auto">
          <Link href="/programs" className="inline-flex items-center text-apple-gray hover:text-apple-blue dark:text-gray-400 dark:hover:text-blue-400 transition-ios font-medium sf-pro-text">
            <FaChevronLeft className="mr-2" size={14} />
            Back to Programs
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${
              program.status === 'registration-open' 
                ? 'bg-green-500' 
                : program.status === 'in-progress'
                  ? 'bg-blue-500'
                  : 'bg-yellow-500'
            }`}>
              {program.status === 'registration-open' 
                ? 'Registration Open' 
                : program.status === 'in-progress'
                  ? 'In Progress'
                  : 'Coming Soon'}
            </span>
          </div>

          {/* Program Header */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white sf-pro-display">
            {program.title}
          </h1>

          {/* Featured Image */}
          {program.mainImage && (
            <div className="relative w-full h-56 sm:h-72 md:h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={urlForImage(program.mainImage).width(1200).height(800).url()}
                alt={program.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Key Program Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date */}
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                <FaCalendarAlt className="text-apple-blue dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1 sf-pro-display">Date</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 sf-pro-text">
                  {formatDate(program.programDate)}
                </p>
                {program.registrationDate && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 sf-pro-text">
                    Registration opens: {formatDate(program.registrationDate)}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            {program.location && (
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                  <FaMapMarkerAlt className="text-green-500 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1 sf-pro-display">Location</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 sf-pro-text">
                    {program.location}
                  </p>
                </div>
              </div>
            )}

            {/* Price */}
            {program.price !== undefined && (
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                  <FaMoneyBillWave className="text-purple-500 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1 sf-pro-display">Price</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 sf-pro-text">
                    {program.price === 0 
                      ? 'Free' 
                      : `Rp ${program.price.toLocaleString('id-ID')}`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 sf-pro-display">About this Program</h2>
            <div className="prose dark:prose-invert prose-lg max-w-none sf-pro-text">
              {program.fullDescription ? (
                <PortableText value={program.fullDescription} />
              ) : (
                <p>{program.description}</p>
              )}
            </div>
          </div>

          {/* Program Features */}
          {program.features && program.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 sf-pro-display">What You'll Get</h2>
              <ul className="space-y-3">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-apple-blue dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 sf-pro-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Share and Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <UpcomingProgramShareButton url={programUrl} title={program.title} />
            
            {program.registrationLink && isAvailable ? (
              <a 
                href={program.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center py-3 px-6 bg-apple-blue text-white rounded-full font-medium hover:bg-blue-600 transition-ios sf-pro-text"
              >
                Register Now
              </a>
            ) : (
              <button 
                disabled={!isAvailable}
                className={`w-full md:w-auto inline-flex items-center justify-center py-3 px-6 rounded-full font-medium sf-pro-text ${
                  isAvailable 
                    ? 'bg-apple-blue text-white hover:bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {!isAvailable && <FaLock className="mr-2" size={14} />}
                {isAvailable ? 'Register Now' : 'Registration Closed'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
