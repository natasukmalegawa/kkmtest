import { Article } from '@/types'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { AppleButton } from '@/components/ui/AppleButton'

type ArticlesProps = {
  smallTitle?: string
  title: string
  subtitle: string
  articles: Article[]
}

export function Articles({ smallTitle, title, subtitle, articles }: ArticlesProps) {
  return (
    <section id="articles-section" className="py-20 md:py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase">
              {smallTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            {title}
          </h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {articles.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <AppleButton href="/articles">Read All Articles</AppleButton>
        </div>
      </div>
    </section>
  )
}
