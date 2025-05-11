import ArticleCard from '@/components/ui/ArticleCard';
import { Article } from '@/types';

interface Props {
  articles: Article[];
}

export default function ArticlesPreview({ articles }: Props) {
  return (
    <section id="articles" className="py-16 section-gradient-4 gradient-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">Artikel Terbaru</span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            Latest Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Wawasan, cerita, dan sumber daya untuk membantu Anda dalam perjalanan karir.
          </p>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
