import Link from 'next/link'

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-lg text-apple-gray dark:text-gray-400 mb-8">
          We couldn't find the article you're looking for.
        </p>
        <Link 
          href="/articles" 
          className="px-6 py-3 bg-apple-blue text-white rounded-full hover:bg-blue-600 transition-all duration-300"
        >
          View All Articles
        </Link>
      </div>
    </div>
  )
}
