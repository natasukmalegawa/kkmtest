'use client';

import { Article } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <div className="article-card bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-all border border-white/20 flex flex-col h-[420px]">
      <div className="article-img-container h-[200px] relative">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="article-content p-6 flex flex-col flex-1">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 relative">
            <Image
              src={article.authorImage}
              alt={article.author}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-apple-darkgray dark:text-white">{article.author}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{article.date}</p>
          </div>
        </div>
        <h3 className="text-lg font-bold heading-apple mb-3 text-apple-darkgray dark:text-white">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
        <div className="mt-auto">
          <Link
            href={`/articles/${article.slug}`}
            className="text-blue-500 dark:text-blue-300 font-medium inline-flex items-center"
          >
            Read Article
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
