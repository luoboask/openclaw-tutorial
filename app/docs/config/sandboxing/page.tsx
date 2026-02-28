import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Sandboxing 沙盒 - RedClaw 文档",
  description: "Docker 沙盒配置与安全隔离",
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/docs" className="text-gray-600 hover:text-orange-600 flex items-center mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />返回文档
      </Link>
      <h1 className="text-4xl font-bold mb-4">Sandboxing 沙盒</h1>
      <p>OpenClaw 支持在 Docker 容器中运行工具，实现安全隔离。</p>
    </div>
  )
}
