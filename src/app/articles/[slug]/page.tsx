import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getRelatedArticles } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { PortableText } from '@/components/ui/PortableText'
import { FaChevronLeft } from 'react-icons/fa'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found | Karir dan Karya Mahasiswa',
    }
  }
  
  return {
    title: `${article.title} | Karir dan Karya Mahasiswa`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }
  
  // Fetch related articles
  const relatedArticles = await getRelatedArticles(article._id, 3)
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back navigation */}
        <div className="mb-6">
          <Link href="/articles" className="inline-flex items-center text-apple-gray hover:text-apple-blue dark:text-gray-400 dark:hover:text-blue-400 transition-ios font-medium">
            <FaChevronLeft className="mr-2" size={14} />
            Back to Articles
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-apple-gray dark:text-gray-400">
            <Link href="/articles" className="hover:underline">Articles</Link>
            <span className="mx-2">/</span>
            {article.categories && article.categories[0] && (
              <>
                <Link href={`/articles?category=${article.categories[0].title}`} className="hover:underline">
                  {article.categories[0].title}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-apple-gray dark:text-gray-300">{article.title}</span>
          </div>
          
          {/* Article Header */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          
          {/* Author and Date */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200 dark:bg-gray-700">
              {article.author?.image ? (
                <Image
                  src={urlForImage(article.author.image).width(100).height(100).url()}
                  alt={article.author.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">{article.author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(article.publishedAt)}</p>
            </div>
          </div>
          
          {/* Featured Image */}
          {article.mainImage && (
            <div className="relative w-full h-80 md:h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={urlForImage(article.mainImage).width(1200).height(800).url()}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          {/* Article Content */}
          <div className="prose dark:prose-invert prose-lg max-w-none">
            <PortableText value={article.body} />
          </div>
          
          {/* Tags/Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/articles?category=${category.title}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-apple-gray dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-8 relative pb-2 inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-apple-blue">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle._id} href={`/articles/${relatedArticle.slug.current}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-ios h-full flex flex-col">
                    <div className="relative h-40">
                      {relatedArticle.mainImage ? (
                        <Image
                          src={urlForImage(relatedArticle.mainImage).width(400).height(300).url()}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                      )}
                    </div>
                    
                    <div className="p-4 flex-grow">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{relatedArticle.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(relatedArticle.publishedAt)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
