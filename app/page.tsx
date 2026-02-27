import Link from 'next/link'
import { BookOpen, Zap, Shield, MessageCircle, Terminal, ChevronRight, Brain, Code, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
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
                  基于OpenClaw自建
                </span>
              </div>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/docs" className="text-gray-600 hover:text-red-600 transition">文档</Link>
              <Link href="/blog" className="text-gray-600 hover:text-red-600 transition">博客</Link>
              <Link href="/docs/channels" className="text-gray-600 hover:text-red-600 transition">频道接入</Link>
              <Link href="/docs/tools" className="text-gray-600 hover:text-red-600 transition">工具</Link>
            </div>
            <div className="flex items-center gap-2">
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
              <Zap className="w-4 h-4 mr-2" />
              基于 OpenClaw 自建设及自维护的知识型网站
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              构建你的专属
              <span className="block text-red-600 mt-2">AI 助手知识库</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              RedClaw 是一个完全自托管的 AI 知识平台。从搭建到运维，从入门到精通，
              记录和分享 AI 助手的实战经验与深度思考。
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/docs/quickstart"
                className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition flex items-center shadow-lg hover:shadow-xl"
              >
                <Terminal className="w-5 h-5 mr-2" />
                开始搭建
              </Link>
              <Link 
                href="/blog"
                className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-red-600 hover:text-red-600 transition flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                阅读博客
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择自建？</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              在这个 AI 快速发展的时代，拥有自己的 AI 基础设施不再是奢望
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "数据自主", desc: "所有数据存储在本地，完全掌控隐私" },
              { icon: Brain, title: "持续学习", desc: "长期记忆系统，越用越懂你" },
              { icon: Code, title: "无限扩展", desc: "通过 Skills 和 Extensions 自由扩展能力" },
              { icon: Users, title: "多场景覆盖", desc: "支持多种聊天应用，随时随地使用" },
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
            <p className="text-gray-600">系统化的知识体系，从理论到实践</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/docs" className="group">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-xl transition h-full">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition">
                  <BookOpen className="w-7 h-7 text-red-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">完整文档</h3>
                <p className="text-gray-600 mb-4">从安装到配置，从基础到进阶的完整教程体系</p>
                <span className="text-red-600 font-medium group-hover:underline">开始学习 →</span>
              </div>
            </Link>

            <Link href="/blog" className="group">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-xl transition h-full">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition">
                  <Zap className="w-7 h-7 text-orange-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">实战博客</h3>
                <p className="text-gray-600 mb-4">深度技术文章、使用技巧、最佳实践分享</p>
                <span className="text-red-600 font-medium group-hover:underline">阅读文章 →</span>
              </div>
            </Link>

            <Link href="/docs/channels" className="group">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-xl transition h-full">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition">
                  <MessageCircle className="w-7 h-7 text-blue-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">频道接入</h3>
                <p className="text-gray-600 mb-4">WhatsApp、Telegram、Discord 等接入指南</p>
                <span className="text-red-600 font-medium group-hover:underline">查看接入 →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">开始你的 RedClaw 之旅</h2>
          <p className="text-xl text-red-100 mb-8">
            从零开始搭建属于你的 AI 助手，完全自托管，永久免费
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/docs/quickstart"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              5 分钟快速开始
            </Link>
            <Link 
              href="/docs"
              className="bg-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-800 transition border border-red-500"
            >
              浏览全部文档
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
            </div>
            <div>
              <h4 className="font-semibold mb-4">文档</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/docs/quickstart" className="hover:text-white">快速开始</Link></li>
                <li><Link href="/docs/install" className="hover:text-white">安装指南</Link></li>
                <li><Link href="/docs/config" className="hover:text-white">配置参考</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">社区</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://github.com/openclaw/openclaw" className="hover:text-white">GitHub</a></li>
                <li><a href="https://discord.com/invite/clawd" className="hover:text-white">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">关于</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">关于本站</Link></li>
                <li><Link href="/changelog" className="hover:text-white">更新日志</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2026 RedClaw - 基于 OpenClaw 自建设及自维护</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
