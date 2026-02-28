// 文章元数据索引
// 完整文章内容存放在 app/blog/articles/ 目录下的 .md 文件中

export interface ArticleMeta {
  id: string
  title: string
  date: string
  readTime: string
  category: string
  featured: boolean
  excerpt: string
}

export const articlesMeta: ArticleMeta[] = [
  {
    id: "openclaw-multi-agent-architecture",
    title: "OpenClaw 多 Agent 架构详解：从单 Agent 到团队协作",
    date: "2026-02-28",
    readTime: "20 分钟",
    category: "架构设计",
    featured: false,
    excerpt: "深入理解 OpenClaw 的多 Agent 路由机制，构建真正的 AI 团队协作系统",
  },
  {
    id: "openclaw-skill-system-guide",
    title: "OpenClaw Skill 系统完全指南：打造你的专属工具集",
    date: "2026-02-28",
    readTime: "25 分钟",
    category: "进阶教程",
    featured: false,
    excerpt: "从使用到开发，全面掌握 OpenClaw 的 Skill 系统，扩展 Agent 能力",
  },

  {
    id: "openclaw-memory-search-ollama-guide",
    title: "OpenClaw Memory Search 完全配置指南 - 使用 Ollama 实现本地向量搜索",
    date: "2026-02-28",
    readTime: "20 分钟",
    category: "技术文档",
    featured: false,
    excerpt: "详细讲解如何配置 Memory Search 长期记忆功能，使用 Ollama 实现稳定的本地向量搜索",
  },
  {
    id: "openclaw-heartbeat-configuration-guide",
    title: "OpenClaw Heartbeat 完全配置指南 - 让 AI 主动汇报工作",
    date: "2026-02-28",
    readTime: "15 分钟",
    category: "配置指南",
    featured: false,
    excerpt: "全面掌握 Heartbeat 心跳机制，配置 AI Agent 定期自动检查任务并主动汇报",
  },

  {
    id: "openclaw-search-guide",
    title: "OpenClaw 搜索功能完全使用指南",
    date: "2026-02-27",
    readTime: "15 分钟",
    category: "功能指南",
    featured: false,
    excerpt: "全面掌握 web_search 和 web_fetch 工具，快速获取网络信息，让 AI 助手更智能",
  },
  {
    id: "nextjs-14-new-features",
    title: "Next.js 14 新特性深度解析",
    date: "2026-02-27",
    readTime: "25 分钟",
    category: "技术解析",
    featured: false,
    excerpt: "深入解析 Turbopack、Server Actions、Partial Prerendering 等 Next.js 14 核心新特性",
  },
  {
    id: "multi-agent-collaboration-practice-v2",
    title: "多 Agent 协作实战 V2：完整复盘与最佳实践",
    date: "2026-02-27",
    readTime: "25 分钟",
    category: "团队实践",
    featured: false,
    excerpt: "升级版多 Agent 协作指南，包含更详细的故障排查、监控脚本和长期规划",
  },
  {
    id: "redclaw-deployment-guide",
    title: "RedClaw 部署完全指南：从 0 到上线",
    date: "2026-02-27",
    readTime: "30 分钟",
    category: "部署教程",
    featured: true,
    excerpt: "手把手教你部署一个自托管的 AI 知识网站，包含 VPS、Nginx、自动化部署等完整流程",
  },
  {
    id: "multi-agent-collaboration-practice",
    title: "多 Agent 协作实战：从失败到成功的完整记录",
    date: "2026-02-27",
    readTime: "20 分钟",
    category: "团队实践",
    featured: false,
    excerpt: "真实案例记录 RedClaw 团队首次实现 3 个 Agent 同时工作的完整过程与经验总结",
  },
  {
    id: "openclaw-agent-guide",
    title: "OpenClaw Agent 完全指南：深入理解与最佳实践",
    date: "2026-02-27",
    readTime: "30 分钟",
    category: "核心概念",
    featured: false,
    excerpt: "全面解析 Agent 架构、工作原理、配置方法和多 Agent 协作模式",
  },
  {
    id: "openclaw-skills-guide",
    title: "OpenClaw Skill 深度实践指南：从入门到精通",
    date: "2026-02-27",
    readTime: "35 分钟",
    category: "实战教程",
    featured: true,
    excerpt: "全面掌握 Skill 系统，从基础使用到高级开发，包含完整实战案例和最佳实践",
  },
  {
    id: "openclaw-memory-system-deep-dive",
    title: "OpenClaw 记忆系统技术详解",
    date: "2026-02-27",
    readTime: "15 分钟",
    category: "技术文档",
    featured: false,
    excerpt: "深入解析记忆系统架构、向量搜索、BM25算法、FTS全文搜索及数据库存储机制",
  },
  {
    id: "telegram-bot-complete-guide",
    title: "Telegram Bot 详细配置指南",
    date: "2026-02-24",
    readTime: "10 分钟",
    category: "频道配置",
    featured: false,
    excerpt: "从零开始配置 Telegram Bot 接入 OpenClaw，包含完整步骤和常见问题解答",
  },
  {
    id: "openclaw-complete-guide",
    title: "OpenClaw 完全指南：从零搭建你的 AI 助手",
    date: "2026-02-14",
    readTime: "25 分钟",
    category: "完全指南",
    featured: false,
    excerpt: "从安装到配置，从基础到进阶，完整的 OpenClaw 使用教程",
  },
  {
    id: "telegram-quickstart",
    title: "5分钟上手：Telegram Bot 配置指南",
    date: "2026-02-13",
    readTime: "5 分钟",
    category: "实战教程",
    featured: false,
    excerpt: "最简单的 OpenClaw 接入方式，快速体验 AI 助手",
  },
  {
    id: "tools-deep-dive",
    title: "AI Agent 工具系统详解",
    date: "2026-02-12",
    readTime: "15 分钟",
    category: "技术解析",
    featured: false,
    excerpt: "深入了解 Browser、Exec、Search 等核心工具的使用方法",
  },
]

export function getArticleMeta(id: string): ArticleMeta | undefined {
  return articlesMeta.find(article => article.id === id)
}

export function getAllArticles(): ArticleMeta[] {
  return articlesMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedArticle(): ArticleMeta | undefined {
  return articlesMeta.find(article => article.featured)
}
