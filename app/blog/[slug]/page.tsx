import { notFound } from 'next/navigation'
import Link from 'next/link'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getArticleMeta, articlesMeta } from '@/lib/articles'

interface Article {
  title: string
  date: string
  readTime: string
  content: string
}

// 从 .md 文件读取文章内容
function getArticleContent(slug: string): Article | null {
  const meta = getArticleMeta(slug)
  if (!meta) return null

  try {
    // 尝试读取 .mdx 文件
    const filePath = join(process.cwd(), 'app', 'blog', 'articles', `${slug}.mdx`)
    const content = readFileSync(filePath, 'utf-8')
    
    return {
      title: meta.title,
      date: meta.date,
      readTime: meta.readTime,
      content: content,
    }
  } catch (error) {
    // 如果 .mdx 不存在，尝试 .md
    try {
      const filePath = join(process.cwd(), 'app', 'blog', 'articles', `${slug}.md`)
      const content = readFileSync(filePath, 'utf-8')
      
      return {
        title: meta.title,
        date: meta.date,
        readTime: meta.readTime,
        content: content,
      }
    } catch (error) {
      return null
    }
  }
}

export function generateStaticParams() {
  return articlesMeta.map((article) => ({ slug: article.id }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleContent(slug)

  if (!article) {
    notFound()
  }

  // 服务端渲染 markdown
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(article.content)
  
  const htmlContent = processedContent.toString()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/blog" className="text-gray-600 hover:text-red-600 mb-8 block">
          ← 返回博客
        </Link>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-12 text-white">
            <div className="flex items-center gap-4 mb-4 text-sm opacity-90">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="text-3xl font-bold">{article.title}</h1>
          </div>

          <div 
            className="p-8 md:p-12 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  )
}
