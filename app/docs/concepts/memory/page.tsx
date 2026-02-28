import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Memory 记忆系统 - RedClaw 文档",
  description: "OpenClaw 长期记忆与向量搜索",
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/docs" className="text-gray-600 hover:text-orange-600 flex items-center mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />返回文档
      </Link>
      <h1 className="text-4xl font-bold mb-4">Memory 记忆系统</h1>
      <p>OpenClaw 的长期记忆功能基于 Markdown 文件和向量搜索。</p>
    </div>
  )
}
