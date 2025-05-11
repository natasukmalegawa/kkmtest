import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity-image'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      {/* Article Image */}
      <div className="relative w-full h-48">
        {article.mainImage ? (
          <Image
            src={urlForImage(article.mainImage).width(600).height(400).url()}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
        )}
      </div>
      
      {/* Article Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{article.title}</h3>
        
        {/* Author and Date */}
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200 dark:bg-gray-700">
            {article.author?.image ? (
              <Image
                src={urlForImage(article.author.image).width(100).height(100).url()}
                alt={article.author.name}
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">{article.author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(article.publishedAt)}</p>
          </div>
        </div>
        
        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{article.excerpt}</p>
        )}
        
        {/* Read More Button */}
        <div className="mt-auto">
          <Link 
            href={`/articles/${article.slug.current}`}
            className="text-apple-blue dark:text-blue-400 text-sm font-medium hover:underline inline-flex items-center"
          >
            Read more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
