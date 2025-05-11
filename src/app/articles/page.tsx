import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getArticles, getSiteSettings, getCategories } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { AppleButton } from '@/components/ui/AppleButton'
import { FaChevronLeft } from 'react-icons/fa'

// Import global styles (akan dibuat terpisah)
import '@/app/articles/articles-styles.css'

export const metadata: Metadata = {
  title: 'Articles | Your Brand',
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
  
  // Fetch articles and categories
  const allArticles = await getArticles(100) // Fetch more articles for filtering
  const categories = await getCategories()
  const siteSettings = await getSiteSettings()
  
  // Filter articles by category if needed
  const filteredArticles = category 
    ? allArticles.filter(article => 
        article.categories?.some(cat => cat.title.toLowerCase() === category.toLowerCase())
      )
    : allArticles
  
  // Featured article is the latest one
  const featuredArticle = filteredArticles[0]
  // Rest of the articles
  const restArticles = filteredArticles.slice(1)
  
  // Constants for pagination
  const ARTICLES_PER_PAGE = 9
  const startIndex = (page - 1) * ARTICLES_PER_PAGE
  const paginatedArticles = restArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)
  
  // Calculate total pages 
  const totalPages = Math.ceil(restArticles.length / ARTICLES_PER_PAGE)
  
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black">
      {/* Back navigation */}
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <Link href="/" className="inline-flex items-center text-apple-gray hover:text-apple-blue dark:text-gray-400 dark:hover:text-blue-400 transition-ios font-medium">
          <FaChevronLeft className="mr-2" size={14} />
          Back to Home
        </Link>
      </div>
      
      {/* Hero Banner - Improved style like homepage */}
      <div className="relative h-64 md:h-80 mb-12 overflow-hidden">
        {featuredArticle?.mainImage && (
          <>
            <Image
              src={urlForImage(featuredArticle.mainImage).width(1600).height(800).url()}
              alt="Articles background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]"></div>
          </>
        )}
        
        <div className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center relative z-10">
          <div className="max-w-3xl text-center px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white sf-pro-display">
              {category ? category : 'Our Articles'}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto sf-pro-text">
              {siteSettings?.articlesSubtitle || "Stay updated with our latest insights, news, and stories"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link 
            href="/articles" 
            className={`px-4 py-2 rounded-full transition-ios sf-pro-text ${
              !category 
                ? 'bg-apple-blue text-white shadow-sm' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              href={`/articles?category=${cat.title}`}
              className={`px-4 py-2 rounded-full transition-ios sf-pro-text ${
                category === cat.title 
                  ? 'bg-apple-blue text-white shadow-sm' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>
        
        {/* No articles case */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 sf-pro-text">No articles found</p>
            <div className="mt-8">
              <AppleButton href="/articles">View All Articles</AppleButton>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <div className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md transition-ios hover:shadow-lg flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    {featuredArticle.mainImage ? (
                      <Image
                        src={urlForImage(featuredArticle.mainImage).width(800).height(600).url()}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                    )}
                    <div className="absolute top-4 left-4">
                      {featuredArticle.categories && featuredArticle.categories[0] && (
                        <span className="bg-apple-blue text-white px-3 py-1 rounded-full text-xs font-medium sf-pro-text">
                          {featuredArticle.categories[0].title}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <div className="text-apple-gray dark:text-gray-400 text-sm mb-3 sf-pro-text">
                      {formatDate(featuredArticle.publishedAt)}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 sf-pro-display">
                      <Link href={`/articles/${featuredArticle.slug.current}`} className="hover:text-apple-blue dark:hover:text-blue-400 transition-ios">
                        {featuredArticle.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 sf-pro-text">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200 dark:bg-gray-700">
                        {featuredArticle.author?.image ? (
                          <Image
                            src={urlForImage(featuredArticle.author.image).width(100).height(100).url()}
                            alt={featuredArticle.author.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium sf-pro-text">By {featuredArticle.author.name}</span>
                    </div>
                    <div className="mt-auto">
                      <AppleButton href={`/articles/${featuredArticle.slug.current}`}>
                        Read Article
                      </AppleButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Latest Articles Heading - Improved spacing for underline */}
            <div className="text-center mb-10">
              <h2 className="inline-block text-2xl font-bold relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-apple-blue sf-pro-display">
                Latest Articles
              </h2>
            </div>
            
            {/* Articles Grid - Redesigned for compact view */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {paginatedArticles.map((article, index) => (
                <Link href={`/articles/${article.slug.current}`} key={article._id} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-ios h-full flex flex-col">
                    <div className="relative h-48">
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
                      <div className="absolute top-3 left-3">
                        {article.categories && article.categories[0] && (
                          <span className="bg-apple-blue text-white px-2 py-0.5 rounded-full text-xs font-medium sf-pro-text">
                            {article.categories[0].title}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col bg-[#f5f5f7] dark:bg-gray-800">
                      <div className="text-apple-gray dark:text-gray-400 text-xs mb-1 sf-pro-text">
                        {formatDate(article.publishedAt)}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-apple-blue dark:group-hover:text-blue-400 transition-ios sf-pro-display">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 sf-pro-text">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="mt-auto flex items-center text-xs">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gray-200 dark:bg-gray-700">
                          {article.author?.image ? (
                            <Image
                              src={urlForImage(article.author.image).width(100).height(100).url()}
                              alt={article.author.name}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full"></div>
                          )}
                        </div>
                        <span className="sf-pro-text">By {article.author.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Pagination with iOS style */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                  {/* Previous page button */}
                  {page > 1 && (
                    <Link
                      href={`/articles?page=${page - 1}${category ? `&category=${category}` : ''}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-ios"
                      aria-label="Previous page"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  )}
                  
                  {/* Page numbers */}
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    
                    // Show current page, first, last, and pages around current
                    if (
                      pageNumber === 1 || 
                      pageNumber === totalPages || 
                      (pageNumber >= page - 1 && pageNumber <= page + 1)
                    ) {
                      return (
                        <Link
                          key={index}
                          href={`/articles?page=${pageNumber}${category ? `&category=${category}` : ''}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-full transition-ios sf-pro-text ${
                            page === pageNumber 
                              ? 'bg-apple-blue text-white' 
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNumber}
                        </Link>
                      )
                    }
                    
                    // Show dots for skipped pages
                    if (
                      (pageNumber === 2 && page > 3) || 
                      (pageNumber === totalPages - 1 && page < totalPages - 2)
                    ) {
                      return (
                        <span 
                          key={index}
                          className="w-10 h-10 flex items-center justify-center text-gray-400"
                        >
                          ...
                        </span>
                      )
                    }
                    
                    return null;
                  })}
                  
                  {/* Next page button */}
                  {page < totalPages && (
                    <Link
                      href={`/articles?page=${page + 1}${category ? `&category=${category}` : ''}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-ios"
                      aria-label="Next page"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
