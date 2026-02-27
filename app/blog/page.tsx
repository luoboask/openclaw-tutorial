export const metadata = {
  title: '博客 - RedClaw',
  description: 'RedClaw 博客 - 分享基于 OpenClaw 自建 AI 助手的实战经验与深度思考',
}

import Link from 'next/link'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'

const blogPosts = [
  {
    id: 'openclaw-agent-guide',
    title: 'OpenClaw Agent 完全指南：深入理解与最佳实践',
    excerpt: '全面解析 Agent 架构、工作原理、配置方法和多 Agent 协作模式',
    date: '2026-02-27',
    readTime: '30 分钟',
    category: '核心概念',
    featured: false,
  },
  {
    id: 'openclaw-skills-guide',
    title: 'OpenClaw Skill 深度实践指南：从入门到精通',
    excerpt: '全面掌握 Skill 系统，从基础使用到高级开发，包含完整实战案例和最佳实践',
    date: '2026-02-27',
    readTime: '35 分钟',
    category: '实战教程',
    featured: true,
  },
  {
    id: 'openclaw-memory-system-deep-dive',
    title: 'OpenClaw 记忆系统技术详解',
    excerpt: '深入解析记忆系统架构、向量搜索、BM25算法、FTS全文搜索及数据库存储机制',
    date: '2026-02-27',
    readTime: '15 分钟',
    category: '技术文档',
    featured: false,
  },
  {
    id: 'telegram-bot-complete-guide',
    title: 'Telegram Bot 详细配置指南',
    excerpt: '从零开始配置 Telegram Bot 接入 OpenClaw，包含完整步骤和常见问题解答',
    date: '2026-02-24',
    readTime: '10 分钟',
    category: '频道配置',
    featured: false,
  },
  {
    id: 'openclaw-complete-guide',
    title: 'OpenClaw 完全指南：从零搭建你的 AI 助手',
    excerpt: '从安装到配置，从基础到进阶，完整的 OpenClaw 使用教程',
    date: '2026-02-14',
    readTime: '25 分钟',
    category: '完全指南',
    featured: false,
  },
  {
    id: 'telegram-quickstart',
    title: '5分钟上手：Telegram Bot 配置指南',
    excerpt: '最简单的 OpenClaw 接入方式，快速体验 AI 助手',
    date: '2026-02-13',
    readTime: '5 分钟',
    category: '实战教程',
    featured: false,
  },
  {
    id: 'tools-deep-dive',
    title: 'AI Agent 工具系统详解',
    excerpt: '深入了解 Browser、Exec、Search 等核心工具的使用方法',
    date: '2026-02-12',
    readTime: '15 分钟',
    category: '技术解析',
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            OpenClaw 博客
          </div>
          <h1 className="text-4xl font-bold mb-4">最新动态与深度文章</h1>
          <p className="text-gray-600">探索 OpenClaw 的无限可能</p>
        </div>
      </section>

      {featuredPost && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <span className="text-sm font-medium text-orange-600">精选文章</span>
            </div>
            <Link href={`/blog/${featuredPost.id}`} className="group block">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-200">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-12 flex items-center justify-center">
                    <div className="text-center text-white">
                      <BookOpen className="w-20 h-20 mx-auto mb-4 opacity-80" />
                      <span className="text-6xl font-bold">{featuredPost.readTime.split(' ')[0]}</span>
                      <span className="text-xl block mt-2">分钟阅读</span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredPost.date}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-orange-600 transition">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-orange-600 font-medium">
                      阅读全文 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border border-gray-200 overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/80 text-gray-700 text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-orange-600 transition">{post.title}</h3>
                    <p className="text-gray-600 text-sm flex-1">{post.excerpt}</p>
                    <div className="mt-4 flex items-center text-orange-600 text-sm font-medium">
                      阅读更多 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
