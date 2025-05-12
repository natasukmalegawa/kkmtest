import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { searchArticles } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { FaChevronLeft } from 'react-icons/fa'

// Metadata sebagai objek statis
export const metadata = {
  title: 'Search Results | Your Brand',
  description: 'Search for articles and content',
}

// Gunakan any type untuk menghindari TypeScript errors di Next.js 15
export default async function SearchPage({ searchParams }: any) {
  const queryParam = searchParams.q
  const query = typeof queryParam === 'string' ? queryParam : ''
  
  // Only search if there's a query
  const articles = query ? await searchArticles(query) : []
  
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black">
      {/* Back navigation */}
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <Link href="/articles" className="inline-flex items-center text-apple-gray hover:text-apple-blue dark:text-gray-400 dark:hover:text-blue-400 transition-ios font-medium sf-pro-text">
          <FaChevronLeft className="mr-2" size={14} />
          Back to Articles
        </Link>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2 sf-pro-display">Search Results</h1>
          <p className="text-lg text-apple-gray dark:text-gray-400 text-center mb-12 sf-pro-text">
            {query ? `Showing results for "${query}"` : 'Enter a search term to find articles'}
          </p>
          
          {/* Search Results */}
          {!query ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400 sf-pro-text">Enter a search term in the search bar above</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400 sf-pro-text">No results found for "{query}"</p>
              <p className="mt-2 text-gray-500 dark:text-gray-500 sf-pro-text">Try using different keywords or check your spelling</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link key={article._id} href={`/articles/${article.slug.current}`} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <div className="relative w-full h-48">
                      {article.mainImage ? (
                        <Image
                          src={urlForImage(article.mainImage).width(600).height(400).url()}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                      )}
                      
                      {article.categories && article.categories[0] && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-apple-blue text-white px-2 py-0.5 rounded-full text-xs font-medium sf-pro-text">
                            {article.categories[0].title}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col bg-[#f5f5f7] dark:bg-gray-800">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-apple-blue dark:group-hover:text-blue-400 transition-ios sf-pro-display">{article.title}</h3>
                      
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
                          <p className="text-xs text-gray-700 dark:text-gray-300 font-medium sf-pro-text">{article.author.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 sf-pro-text">{formatDate(article.publishedAt)}</p>
                        </div>
                      </div>
                      
                      {article.excerpt && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 sf-pro-text">{article.excerpt}</p>
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
