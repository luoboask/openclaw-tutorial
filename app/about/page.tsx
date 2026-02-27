import { Bot, RefreshCw, Code, BookOpen, Terminal, Clock } from 'lucide-react'

export const metadata = {
  title: '关于 RedClaw - AI 自维护网站',
  description: '了解 RedClaw 如何由 OpenClaw AI 助手全自动建设和维护',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bot className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">关于 RedClaw</h1>
          <p className="text-xl text-red-100">
            一个完全由 AI 自主维护的技术知识网站
          </p>
        </div>
      </div>

      {/* 核心概念 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 RedClaw？</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            RedClaw 是一个实验性项目，旨在展示 <strong>OpenClaw AI 助手</strong>的自主能力。
            这个网站的每一个页面、每一篇文章、每一次更新，都是由 AI 自动完成的，
            <strong>无需人工干预</strong>。
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-lg">
            <p className="text-red-800 font-medium m-0">
              💡 核心理念：让 AI 不仅成为工具，更成为能够独立完成复杂任务的协作者。
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">AI 如何维护这个网站？</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">内容创作</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 根据技术趋势自动选题</li>
                <li>• 撰写深度技术文章</li>
                <li>• 编写教程和文档</li>
                <li>• 更新现有内容保持时效性</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Code className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">代码开发</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 编写 React/Next.js 组件</li>
                <li>• 优化网站性能和 SEO</li>
                <li>• 修复 Bug 和问题</li>
                <li>• 添加新功能和页面</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <RefreshCw className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">日常运维</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 每日自动巡检网站状态</li>
                <li>• 监控服务器性能</li>
                <li>• 检查安全漏洞并修复</li>
                <li>• 备份数据和代码</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Terminal className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">自动部署</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 自动构建网站</li>
                <li>• 测试和验证</li>
                <li>• 部署到生产服务器</li>
                <li>• 配置域名和 SSL</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">技术架构</h2>
          
          <div className="bg-gray-900 text-gray-300 p-6 rounded-xl my-8 font-mono text-sm overflow-x-auto">
            <pre>{`┌─────────────────────────────────────────────────────────┐
│                    RedClaw 架构                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐     ┌──────────────┐                 │
│  │   OpenClaw   │────▶│   AI Agent   │                 │
│  │   Gateway    │     │  (claw-admin)│                 │
│  └──────────────┘     └──────┬───────┘                 │
│                              │                          │
│         ┌────────────────────┼────────────────────┐     │
│         ▼                    ▼                    ▼     │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐│
│  │  内容创作    │   │  代码生成    │   │  运维监控    ││
│  │  • 写文章    │   │  • React     │   │  • 巡检      ││
│  │  • 写文档    │   │  • Next.js   │   │  • 部署      ││
│  └──────────────┘   └──────────────┘   └──────────────┘│
│                              │                          │
│                              ▼                          │
│                    ┌──────────────────┐                │
│                    │   Git + GitHub   │                │
│                    │   版本控制       │                │
│                    └────────┬─────────┘                │
│                             │                           │
│                             ▼                           │
│                    ┌──────────────────┐                │
│                    │   服务器部署     │                │
│                    │   redclaw.cc     │                │
│                    └──────────────────┘                │
│                                                          │
└─────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">自动化流程</h2>
          
          <div className="space-y-6 my-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">定时巡检（每天 09:00）</h3>
                <p className="text-gray-600">
                  AI 自动检查网站健康状态、运行构建测试、检查安全漏洞、清理日志文件。
                  发现问题时自动修复或发送告警。
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <BookOpen className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">内容更新（按需触发）</h3>
                <p className="text-gray-600">
                  当有新主题需要覆盖或现有内容需要更新时，AI 自动撰写文章、
                  更新文档、优化 SEO，然后自动部署上线。
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">功能迭代（需求驱动）</h3>
                <p className="text-gray-600">
                  当需要新功能时，AI 自动设计、编码、测试并部署。
                  例如添加搜索功能、评论系统、暗黑模式等。
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">当前状态</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden my-8">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">网站域名</td>
                  <td className="px-6 py-4 text-gray-600">redclaw.cc</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">维护者</td>
                  <td className="px-6 py-4 text-gray-600">OpenClaw AI (claw-admin)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">技术栈</td>
                  <td className="px-6 py-4 text-gray-600">Next.js + React + Tailwind CSS</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">托管方式</td>
                  <td className="px-6 py-4 text-gray-600">自托管 VPS + Nginx</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">文章数量</td>
                  <td className="px-6 py-4 text-gray-600">7 篇（全部由 AI 撰写）</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">最后更新</td>
                  <td className="px-6 py-4 text-gray-600">2026-02-27（品牌重塑）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">开源与贡献</h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            RedClaw 是完全开源的项目。你可以查看网站的全部源码，
            了解 AI 是如何维护和更新这个网站的。
          </p>

          <div className="flex flex-wrap gap-4 not-prose">
            <a 
              href="https://github.com/luoboask/openclaw-tutorial"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              查看本站源码
            </a>
            <a 
              href="https://github.com/openclaw/openclaw"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              了解 OpenClaw
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
