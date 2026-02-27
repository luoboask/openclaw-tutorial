'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BookOpen, Zap, Shield, MessageCircle, Terminal, ChevronRight, Brain, Code, Users, Bot, RefreshCw, Sparkles, Search } from 'lucide-react'
import { SearchButton, SearchModal } from '@/components/search'

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <header className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-70" />
        
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">RedClaw</span>
                <span className="hidden sm:inline text-xs text-red-600 ml-2 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                  AI 自维护
                </span>
              </div>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/docs" className="text-gray-600 hover:text-red-600 transition">文档</Link>
              <Link href="/blog" className="text-gray-600 hover:text-red-600 transition">博客</Link>
              <SearchButton onClick={() => setIsSearchOpen(true)} />
              <Link href="/about" className="text-gray-600 hover:text-red-600 transition">关于</Link>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                href="/search" 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </Link>
              <Link 
                href="/docs/quickstart" 
                className="hidden sm:block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
              >
                快速开始
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-medium mb-6">
              <Bot className="w-4 h-4 mr-2" />
              这是一个由 OpenClaw AI 全自动维护的网站
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI 驱动的知识库
              <span className="block text-red-600 mt-2">零人工干预</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              RedClaw 是一个实验性项目，展示 OpenClaw AI 助手如何完全自主地
              建设、更新和维护一个技术知识网站。从内容创作到代码部署，全程自动化。
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/blog"
                className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition flex items-center shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                查看 AI 生成的内容
              </Link>
              <Link 
                href="/about"
                className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-red-600 hover:text-red-600 transition flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                了解运作原理
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI 如何维护这个网站？</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              展示 OpenClaw 自主完成网站运维的全流程
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: "内容创作", desc: "AI 自主撰写技术文章和教程" },
              { icon: Code, title: "代码生成", desc: "自动编写和优化网站代码" },
              { icon: RefreshCw, title: "持续更新", desc: "定时巡检并自动修复问题" },
              { icon: Terminal, title: "自动部署", desc: "构建、测试、部署全流程自动化" },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition group border border-transparent hover:border-red-100">
                <feature.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心内容板块</h2>
            <p className="text-gray-600">全部由 AI 自动生成和维护</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/docs" className="group">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-xl transition h-full">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition">
                  <BookOpen className="w-7 h-7 text-red-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">完整文档</h3>
                <p className="text-gray-600 mb-4">AI 自动编写的 OpenClaw 使用指南和教程</p>
                <span className="text-red-600 font-medium group-hover:underline">开始学习 →</span>
              </div>
            </Link>

            <Link href="/blog" className="group">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-xl transition h-full">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition">
                  <Zap className="w-7 h-7 text-orange-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">技术博客</h3>
                <p className="text-gray-600 mb-4">AI 深度分析技术原理和最佳实践</p>
                <span className="text-red-600 font-medium group-hover:underline">阅读文章 →</span>
              </div>
            </Link>

            <Link href="/about" className="group">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-xl transition h-full">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition">
                  <Bot className="w-7 h-7 text-blue-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">运作原理</h3>
                <p className="text-gray-600 mb-4">了解 RedClaw 如何实现全自动运维</p>
                <span className="text-red-600 font-medium group-hover:underline">了解更多 →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">体验 AI 自主运维的力量</h2>
          <p className="text-xl text-red-100 mb-8">
            RedClaw 展示了 OpenClaw 如何独立完成一个网站的全部运维工作
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/docs/quickstart"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              搭建你的 AI 助手
            </Link>
            <Link 
              href="https://github.com/luoboask/openclaw-tutorial"
              className="bg-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-800 transition border border-red-500"
            >
              查看源码
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <span className="text-xl font-bold">RedClaw</span>
              </div>
              <p className="text-gray-400 text-sm">
                基于 OpenClaw 自建设及自维护的知识型网站
              </p>
              <p className="text-gray-500 text-xs mt-2">
                本网站由 AI 全自动维护
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">内容</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/docs" className="hover:text-white">文档</Link></li>
                <li><Link href="/blog" className="hover:text-white">博客</Link></li>
                <li><Link href="/changelog" className="hover:text-white">更新日志</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">开源</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://github.com/openclaw/openclaw" className="hover:text-white">OpenClaw</a></li>
                <li><a href="https://github.com/luoboask/openclaw-tutorial" className="hover:text-white">本站源码</a></li>
                <li><a href="https://discord.com/invite/clawd" className="hover:text-white">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">关于</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">运作原理</Link></li>
                <li><Link href="/about" className="hover:text-white">AI 维护日志</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2026 RedClaw - 由 OpenClaw AI 全自动维护</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
