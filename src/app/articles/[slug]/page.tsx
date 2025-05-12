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

// Import CSS global untuk styling font & prose
import '@/app/articles/articles-styles.css'

// Generate Metadata untuk halaman artikel
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found | Your Brand',
    }
  }

  return {
    title: `${article.title} | Your Brand`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  // Jika artikel tidak ditemukan, tampilkan halaman 404
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

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {article.author.image && (
                <Image
                  src={urlForImage(article.author.image).width(40).height(40).url()}
                  alt={article.author.name}
                  className="rounded-full"
                  width={40}
                  height={40}
                />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-apple-gray dark:text-gray-300">
                  {article.author.name}
                </p>
                <p className="text-xs text-apple-gray dark:text-gray-500">{formatDate(article.publishedAt)}</p>
              </div>
            </div>
          </div>

          {article.mainImage && (
            <div className="mb-8">
              <Image
                src={urlForImage(article.mainImage).width(800).height(500).url()}
                alt={article.title}
                className="rounded-lg shadow-lg"
                width={800}
                height={500}
              />
            </div>
          )}

          <div className="prose prose-xl max-w-none dark:prose-invert">
            <PortableText value={article.body} />
          </div>

          <div className="mt-8">
            <ShareButtons url={articleUrl} />
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-apple-gray dark:text-gray-200">Related Articles</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <div key={relatedArticle._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <Link href={`/articles/${relatedArticle.slug.current}`}>
                    <Image
                      src={urlForImage(relatedArticle.mainImage).width(400).height(250).url()}
                      alt={relatedArticle.title}
                      className="w-full h-56 object-cover"
                      width={400}
                      height={250}
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">{relatedArticle.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{relatedArticle.excerpt}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
