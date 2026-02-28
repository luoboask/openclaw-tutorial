import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Heartbeat 心跳 - RedClaw 文档",
  description: "定期任务与自动巡检配置",
}

export default function HeartbeatPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/docs" className="text-gray-600 hover:text-orange-600 flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回文档中心
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Heartbeat 心跳</h1>
        <p className="text-xl text-gray-600">定期任务与自动巡检配置</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>什么是 Heartbeat？</h2>
        <p>Heartbeat 是 OpenClaw 的定期触发机制，让 AI Agent 主动检查后台任务并汇报。</p>

        <h2>配置方式</h2>
        <p>在 openclaw.json 中配置：</p>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">{`{
  "agents": {
    "defaults": {
      "heartbeat": {
        "enabled": true,
        "intervalMinutes": 30
      }
    }
  }
}`}</pre>

        <h2>HEARTBEAT.md</h2>
        <p>在工作空间创建 HEARTBEAT.md 文件定义心跳任务。</p>

        <h2>相关文章</h2>
        <ul>
          <li><Link href="/blog/openclaw-heartbeat-configuration-guide" className="text-orange-600 hover:underline">Heartbeat 配置指南</Link></li>
        </ul>
      </div>
    </div>
  )
}
