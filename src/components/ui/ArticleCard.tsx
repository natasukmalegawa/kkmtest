import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity-image'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'

type ArticleCardProps = {
  article: Article
  appleStyle?: boolean
}

export function ArticleCard({ article, appleStyle = false }: ArticleCardProps) {
  return (
    <div className={`h-full flex flex-col ${!appleStyle && 'bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300'}`}>
      {/* Article Image */}
      <div className="relative w-full h-48">
        {article.mainImage ? (
          <Image
            src={urlForImage(article.mainImage).width(600).height(400).url()}
            alt={article.title}
            fill
            className={`object-cover ${appleStyle && 'group-hover:scale-105 transition-all duration-500'}`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
        )}
        
        {/* Category Badge */}
        {article.categories && article.categories[0] && (
          <div className="absolute top-3 left-3">
            <span className="bg-apple-blue text-white px-2 py-1 rounded-full text-xs font-medium">
              {article.categories[0].title}
            </span>
          </div>
        )}
      </div>
      
      {/* Article Content */}
      <div className={`p-5 flex-grow flex flex-col ${appleStyle && 'bg-[#f5f5f7] dark:bg-gray-800'}`}>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-apple-blue dark:group-hover:text-blue-400 transition-ios sf-pro-display">
          {article.title}
        </h3>
        
        {/* Author and Date */}
        <div className="flex items-center mb-3">
          <div className="w-7 h-7 rounded-full overflow-hidden mr-2 bg-gray-200 dark:bg-gray-700">
            {article.author?.image ? (
              <Image
                src={urlForImage(article.author.image).width(100).height(100).url()}
                alt={article.author.name}
                width={28}
                height={28}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-700 dark:text-gray-300 font-medium sf-pro-text">{article.author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 sf-pro-text">{formatDate(article.publishedAt)}</p>
          </div>
        </div>
        
        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 sf-pro-text">{article.excerpt}</p>
        )}
        
        {/* Read More Link */}
        <div className="mt-auto">
          <span className="text-apple-blue dark:text-blue-400 text-sm font-medium group-hover:underline inline-flex items-center sf-pro-text">
            Read more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
