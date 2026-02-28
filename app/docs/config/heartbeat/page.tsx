import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Heartbeat 心跳配置 - RedClaw 文档",
  description: "配置定期任务与自动巡检",
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/docs" className="text-gray-600 hover:text-orange-600 flex items-center mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />返回文档
      </Link>
      <h1 className="text-4xl font-bold mb-4">Heartbeat 心跳配置</h1>
      <p>Heartbeat 是 OpenClaw 的定期触发机制，让 AI Agent 主动检查后台任务。</p>
    </div>
  )
}
