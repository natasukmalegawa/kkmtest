import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { searchArticles } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Search Results | Your Brand',
  description: 'Search for articles and content',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const queryParam = searchParams.q
  const query = typeof queryParam === 'string' ? queryParam : ''
  
  // Only search if there's a query
  const articles = query ? await searchArticles(query) : []
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Search Results</h1>
          <p className="text-lg text-apple-gray dark:text-gray-400 text-center mb-12">
            {query ? `Showing results for "${query}"` : 'Enter a search term to find articles'}
          </p>
          
          {/* Search Results - Content remains the same */}
          {!query ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">Enter a search term in the search bar above</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">No results found for "{query}"</p>
              <p className="mt-2 text-gray-500 dark:text-gray-500">Try using different keywords or check your spelling</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link key={article._id} href={`/articles/${article.slug.current}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    {/* Article card content remains the same */}
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
                    
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{article.title}</h3>
                      
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
                      
                      {article.excerpt && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{article.excerpt}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
