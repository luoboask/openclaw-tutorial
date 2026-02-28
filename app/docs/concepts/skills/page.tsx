import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Skill 系统 - RedClaw 文档",
  description: "OpenClaw Skill 系统完全指南",
}

export default function SkillsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/docs" className="text-gray-600 hover:text-orange-600 flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回文档中心
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Skill 系统</h1>
        <p className="text-xl text-gray-600">OpenClaw Skill 系统完全指南</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>技能来源</h2>
        <ol>
          <li>内置技能 - OpenClaw 自带</li>
          <li>共享技能 - ~/.openclaw/skills</li>
          <li>专属技能 - workspace/skills</li>
        </ol>

        <h2>ClawHub</h2>
        <p>技能仓库：<a href="https://clawhub.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">clawhub.com</a></p>

        <h2>相关文章</h2>
        <ul>
          <li><Link href="/blog/openclaw-skill-system-guide" className="text-orange-600 hover:underline">Skill 系统完全指南</Link></li>
        </ul>
      </div>
    </div>
  )
}
