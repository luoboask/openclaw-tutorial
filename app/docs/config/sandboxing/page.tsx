import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Sandboxing 沙盒 - RedClaw 文档",
  description: "Docker 沙盒配置与安全隔离",
}

export default function SandboxingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/docs" className="text-gray-600 hover:text-orange-600 flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回文档中心
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sandboxing 沙盒</h1>
        <p className="text-xl text-gray-600">Docker 沙盒配置与安全隔离</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>什么是 Sandboxing？</h2>
        <p>OpenClaw 可以在 Docker 容器中运行工具，限制文件系统和进程访问。</p>

        <h2>配置模式</h2>
        <ul>
          <li>off - 关闭沙盒</li>
          <li>non-main - 仅非主会话使用</li>
          <li>all - 所有会话使用</li>
        </ul>

        <h2>工作空间访问</h2>
        <ul>
          <li>none - 无访问</li>
          <li>ro - 只读</li>
          <li>rw - 读写</li>
        </ul>
      </div>
    </div>
  )
}
