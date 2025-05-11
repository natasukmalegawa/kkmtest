'use client'

import { useEffect, useRef } from 'react'
import { Article } from '@/types'
import ArticleCard from '@/components/ui/ArticleCard'
import Swiper from 'swiper'
import 'swiper/css'

type Props = {
  articles: Article[]
}

export default function ArticlesPreview({ articles }: Props) {
  const swiperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        slidesPerView: 1.1,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      })
    }
  }, [])

  return (
    <section id="articles" className="py-16 section-gradient-4 gradient-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">
            Artikel Terbaru
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            Latest Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Wawasan, cerita, dan sumber daya untuk membantu Anda dalam perjalanan karir.
          </p>
        </div>

        <div className="article-carousel-container fade-up">
          <div className="swiper article-carousel" ref={swiperRef}>
            <div className="swiper-wrapper pb-10">
              {articles.map((article) => (
                <div className="swiper-slide" key={article._id}>
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
            <div className="swiper-pagination mt-4"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
