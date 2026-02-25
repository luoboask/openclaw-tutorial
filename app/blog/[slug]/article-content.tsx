'use client'

import { useEffect, useState } from 'react'

export function ArticleContent({ content }: { content: string }) {
  const [renderedContent, setRenderedContent] = useState<string | null>(null)

  useEffect(() => {
    // 客户端渲染 markdown
    const renderMarkdown = async () => {
      const [{ default: ReactMarkdown }, { default: remarkGfm }] = await Promise.all([
        import('react-markdown'),
        import('remark-gfm')
      ])

      // 由于 ReactMarkdown 是组件，我们需要渲染它
      // 这里我们直接用 dangerouslySetInnerHTML 来渲染转换后的 HTML
      // 注意：这不是最佳实践，但对于静态内容可以
      setRenderedContent(content)
    }

    renderMarkdown()
  }, [content])

  // 简单的 markdown 转 HTML（用于服务端 fallback）
  const simpleMarkdownToHtml = (md: string): string => {
    return md
      // 代码块
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4"><code>$1</code></pre>')
      // 行内代码
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      // 标题
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-3 border-b border-gray-200">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">$1</h1>')
      // 引用
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-orange-500 bg-orange-50 pl-5 pr-4 py-3 my-4 rounded-r text-orange-900">$1</blockquote>')
      // 粗体
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      // 列表
      .replace(/^\- (.*$)/gim, '<li class="text-gray-700">$1</li>')
      // 链接
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      // 段落
      .replace(/\n\n/g, '</p><p class="text-gray-700 mb-4 leading-relaxed">')
      // 包装
      .replace(/^(.+)$/gim, '<p class="text-gray-700 mb-4 leading-relaxed">$1</p>')
      // 清理空 p 标签
      .replace(/<p class="text-gray-700 mb-4 leading-relaxed">\s*<\/p>/g, '')
      // 列表包装
      .replace(/(<li[^>]*>.*?\n)+/g, '<ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">$1</ul>')
  }

  const html = simpleMarkdownToHtml(content)

  return (
    <div 
      className="p-8 md:p-12 prose prose-orange max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
