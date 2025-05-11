'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity-image'
import { Article } from '@/types'

type Props = {
  article: Article
}

export default function ArticleCard({ article }: Props) {
  const {
    title,
    slug,
    excerpt,
    coverImage,
    author,
    publishedAt,
  } = article

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="article-card bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-apple border border-white/20 flex flex-col h-full">
      {/* Cover image */}
      <div className="article-img-container h-48 overflow-hidden relative">
        {coverImage ? (
          <Image
            src={urlForImage(coverImage).url()}
            alt={title}
            fill
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="article-content p-6 flex flex-col flex-1">
        {/* Author */}
        <div className="flex items-center mb-4">
          {author?.image && (
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={urlForImage(author.image).url()}
                alt={author.name}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-apple-darkgray dark:text-white">{author?.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{formattedDate}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold heading-apple mb-3 text-apple-darkgray dark:text-white">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{excerpt}</p>

        {/* Read more link */}
        <div className="mt-auto">
          <Link
            href={`/articles/${slug.current}`}
            className="text-blue-500 dark:text-blue-300 font-medium inline-flex items-center"
          >
            Read Article
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
