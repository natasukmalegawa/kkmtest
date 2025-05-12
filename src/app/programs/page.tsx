import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import { getUpcomingPrograms, getSiteSettings } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { UpcomingProgram } from '@/types'

export const metadata: Metadata = {
  title: 'Programs | Your Brand',
  description: 'Explore our range of programs and events',
}

export default async function ProgramsPage() {
  const programs = await getUpcomingPrograms()
  const siteSettings = await getSiteSettings()
  
  // Organize programs by status
  const openPrograms = programs.filter(p => p.status === 'registration-open')
  const comingSoonPrograms = programs.filter(p => p.status === 'coming-soon')
  const inProgressPrograms = programs.filter(p => p.status === 'in-progress')
  
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black">
      {/* Back navigation */}
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <Link href="/" className="inline-flex items-center text-apple-gray hover:text-apple-blue dark:text-gray-400 dark:hover:text-blue-400 transition-ios font-medium sf-pro-text">
          <FaChevronLeft className="mr-2" size={14} />
          Back to Home
        </Link>
      </div>
      
      {/* Hero banner */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 sf-pro-display">
            Our Programs
          </h1>
          <p className="text-lg text-apple-gray dark:text-gray-400 max-w-3xl mx-auto sf-pro-text">
            {siteSettings?.upcomingProgramsSubtitle || 
              "Expand your knowledge and skills with our carefully designed programs"}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Open Registration */}
        {openPrograms.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 sf-pro-display">
              Open for Registration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openPrograms.map(program => (
                <ProgramListItem key={program._id} program={program} highlight />
              ))}
            </div>
          </div>
        )}
        
        {/* Coming Soon */}
        {comingSoonPrograms.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 sf-pro-display">
              Coming Soon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonPrograms.map(program => (
                <ProgramListItem key={program._id} program={program} />
              ))}
            </div>
          </div>
        )}
        
        {/* In Progress */}
        {inProgressPrograms.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 sf-pro-display">
              In Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressPrograms.map(program => (
                <ProgramListItem key={program._id} program={program} />
              ))}
            </div>
          </div>
        )}
        
        {programs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400 sf-pro-text">
              No programs available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Definisikan interface untuk props komponen
interface ProgramListItemProps {
  program: UpcomingProgram;
  highlight?: boolean;
}

// Helper component for program list items
function ProgramListItem({ program, highlight = false }: ProgramListItemProps) {
  const isAvailable = program.status === 'registration-open'
  
  return (
    <Link 
      href={`/programs/${program.slug.current}`}
      className={`block rounded-2xl overflow-hidden transition-all duration-300 h-full ${
        highlight ? 'border-2 border-apple-blue shadow-md' : 'border border-gray-200 dark:border-gray-700'
      } hover:shadow-lg`}
    >
      <div className="flex flex-col h-full">
        {/* Program Image */}
        <div className="relative h-48">
          {program.mainImage ? (
            <Image
              src={urlForImage(program.mainImage).width(600).height(400).url()}
              alt={program.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
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
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 flex-grow flex flex-col bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 sf-pro-display">{program.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 sf-pro-text">{program.description}</p>
          
          {/* Information */}
          <div className="mt-auto space-y-2">
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 sf-pro-text">
              <span className="font-medium mr-2">Date:</span> 
              {formatDate(program.programDate)}
            </div>
            
            {program.location && (
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 sf-pro-text">
                <span className="font-medium mr-2">Location:</span> 
                {program.location}
              </div>
            )}
            
            {program.price !== undefined && (
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 sf-pro-text">
                <span className="font-medium mr-2">Price:</span> 
                {program.price === 0 ? 'Free' : `Rp ${program.price.toLocaleString('id-ID')}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
