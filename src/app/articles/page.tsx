import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getArticles, getSiteSettings } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Articles | Karir dan Karya Mahasiswa',
  description: 'Read our latest articles and stories',
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get page from URL query params, with fallback to 1
  const pageParam = searchParams.page ?? '1'
  const page = typeof pageParam === 'string' ? parseInt(pageParam) : 1
  
  // Get category filter if present
  const categoryParam = searchParams.category
  const category = typeof categoryParam === 'string' ? categoryParam : undefined
  
  // Constants for pagination
  const ARTICLES_PER_PAGE = 9
  
  // Fetch articles with pagination
  const articles = await getArticles(ARTICLES_PER_PAGE * page)
  const siteSettings = await getSiteSettings()
  
  // Calculate total pages (in a real app, you would get the total count from a query)
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  
  return (
    <div className="bg-white dark:bg-black min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Our Articles</h1>
          <p className="text-lg text-apple-gray dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {siteSettings?.articlesSubtitle || "Stay updated with our latest insights, news, and stories"}
          </p>
          
          {/* Categories Filter - Optional */}
          {/* <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Link href="/articles" className={`px-4 py-2 rounded-full ${!category ? 'bg-apple-blue text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
              All
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat._id} 
                href={`/articles?category=${cat.title}`}
                className={`px-4 py-2 rounded-full ${category === cat.title ? 'bg-apple-blue text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
              >
                {cat.title}
              </Link>
            ))}
          </div> */}
          
          {/* Articles Grid */}
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">No articles found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link key={article._id} href={`/articles/${article.slug.current}`}>
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Link
                  key={index}
                  href={`/articles?page=${index + 1}${category ? `&category=${category}` : ''}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    page === index + 1 
                      ? 'bg-apple-blue text-white' 
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {index + 1}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
