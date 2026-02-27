import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { getAllArticles, getFeaturedArticle, ArticleMeta } from '@/lib/articles'

export const metadata: Metadata = {
  title: '博客 - RedClaw',
  description: 'RedClaw 博客 - 分享基于 OpenClaw 自建 AI 助手的实战经验与深度思考',
}

export default function BlogPage() {
  const articles = getAllArticles()
  const featuredArticle = getFeaturedArticle()
  const regularArticles = articles.filter(article => !article.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            RedClaw 博客
          </div>
          <h1 className="text-4xl font-bold mb-4">最新动态与深度文章</h1>
          <p className="text-gray-600">探索 OpenClaw 的无限可能</p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <span className="text-sm font-medium text-red-600">精选文章</span>
            </div>
            <Link href={`/blog/${featuredArticle.id}`} className="group block">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-200">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-red-500 to-red-700 p-12 flex items-center justify-center">
                    <div className="text-center text-white">
                      <BookOpen className="w-20 h-20 mx-auto mb-4 opacity-80" />
                      <span className="text-6xl font-bold">{featuredArticle.readTime.split(' ')[0]}</span>
                      <span className="text-xl block mt-2">分钟阅读</span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        {featuredArticle.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredArticle.date}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-red-600 transition">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">{featuredArticle.excerpt}</p>
                    <div className="flex items-center text-red-600 font-medium">
                      阅读全文 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/blog/${article.id}`} className="group block">
      <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border border-gray-200 overflow-hidden h-full flex flex-col">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/80 text-gray-700 text-xs font-medium">
              {article.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {article.readTime}
            </span>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4" />
            {article.date}
          </div>
          <h3 className="text-lg font-bold mb-3 group-hover:text-red-600 transition line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm flex-1 line-clamp-3">{article.excerpt}</p>
          <div className="mt-4 flex items-center text-red-600 text-sm font-medium">
            阅读更多 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </article>
    </Link>
  )
}
