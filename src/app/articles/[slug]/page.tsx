import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getRelatedArticles } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity-image'
import { formatDate } from '@/lib/utils'
import { PortableText } from '@/components/ui/PortableText'
import { FaChevronLeft } from 'react-icons/fa'
import ShareButtons from '@/components/ui/ShareButtons'

import '@/app/articles/articles-styles.css'

export const dynamicParams = true

// Definisi props yang benar untuk page dan generateMetadata
type Params = {
  slug: string;
}

type Props = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found | Your Brand',
    }
  }

  return {
    title: `${article.title} | Your Brand`,
    description: article.excerpt || 'No description available.',
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article._id, 3)
  const articleUrl = `https://kkmtest.vercel.app/articles/${params.slug}`

  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 max-w-4xl mx-auto">
          <Link href="/articles" className="inline-flex items-center text-apple-gray hover:text-apple-blue dark:text-gray-400 dark:hover:text-blue-400 transition-ios font-medium sf-pro-text">
            <FaChevronLeft className="mr-2" size={14} />
            Back to Articles
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-sm text-apple-gray dark:text-gray-400 sf-pro-text">
            <Link href="/articles" className="hover:underline">Articles</Link>
            <span className="mx-2">/</span>
            {article.categories?.[0] && (
              <>
                <Link href={`/articles?category=${article.categories[0].title}`} className="hover:underline">
                  {article.categories[0].title}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-apple-gray dark:text-gray-300">{article.title}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white sf-pro-display">
            {article.title}
          </h1>

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
              <p className="text-sm text-gray-900 dark:text-white font-medium sf-pro-text">{article.author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 sf-pro-text">{formatDate(article.publishedAt)}</p>
            </div>
          </div>

          {article.mainImage && (
            <div className="relative w-full h-56 sm:h-72 md:h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={urlForImage(article.mainImage).width(1200).height(800).url()}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mb-8 flex justify-center">
            <ShareButtons 
              url={articleUrl}
              title={article.title}
            />
          </div>

          <div className="prose dark:prose-invert prose-lg max-w-none sf-pro-text">
            <PortableText value={article.body} />
          </div>

          {Array.isArray(article.categories) && article.categories.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/articles?category=${category.title}`}
                  className="rounded-full border border-neutral-200 px-4 py-1 text-sm text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-8 relative pb-3 inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-apple-blue sf-pro-display">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle._id} href={`/articles/${relatedArticle.slug.current}`} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-ios h-full flex flex-col">
                    <div className="relative h-40">
                      {relatedArticle.mainImage ? (
                        <Image
                          src={urlForImage(relatedArticle.mainImage).width(400).height(300).url()}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                      )}
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col bg-[#f5f5f7] dark:bg-gray-800">
                      <div className="text-apple-gray dark:text-gray-400 text-xs mb-1 sf-pro-text">
                        {formatDate(relatedArticle.publishedAt)}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-apple-blue dark:group-hover:text-blue-400 transition-ios sf-pro-display">
                        {relatedArticle.title}
                      </h3>
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
