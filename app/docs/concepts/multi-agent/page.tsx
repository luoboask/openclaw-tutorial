import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "多 Agent 架构 - RedClaw 文档",
  description: "深入理解 OpenClaw 的多 Agent 路由机制",
}

export default function MultiAgentPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/docs" className="text-gray-600 hover:text-orange-600 flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回文档中心
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">多 Agent 架构</h1>
        <p className="text-xl text-gray-600">深入理解 OpenClaw 的多 Agent 路由机制</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>什么是多 Agent 架构？</h2>
        <p>OpenClaw 允许在一个 Gateway 进程中运行多个完全隔离的 Agent。</p>
        
        <h2>快速开始</h2>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">openclaw agents add work</pre>

        <h2>相关资源</h2>
        <ul>
          <li><Link href="/blog/multi-agent-collaboration-practice" className="text-orange-600 hover:underline">RedClaw 多 Agent 协作实战</Link></li>
        </ul>
      </div>
    </div>
  )
}
