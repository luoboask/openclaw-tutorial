'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ArrowLeft, FileText, BookOpen, Loader2 } from 'lucide-react'

declare global {
  interface Window {
    pagefind?: any;
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [pagefindLoaded, setPagefindLoaded] = useState(false)
  const debounceRef = useRef<any>(null)

  // 加载 Pagefind
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/pagefind/pagefind.js'
    script.async = true
    script.onload = () => {
      setPagefindLoaded(true)
    }
    document.body.appendChild(script)
  }, [])

  // 搜索
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(async () => {
      if (!pagefindLoaded || !window.pagefind) {
        setResults([])
        return
      }

      setIsSearching(true)
      try {
        const search = await window.pagefind.search(query)
        const searchResults = await Promise.all(
          search.results.slice(0, 20).map(async (r: any) => {
            const data = await r.data()
            return {
              title: data.meta.title || '未命名',
              excerpt: data.excerpt || '',
              url: data.url,
              type: data.meta.type || '文档',
              category: data.meta.category || ''
            }
          })
        )
        setResults(searchResults)
      } catch (error) {
        console.error('Pagefind search error:', error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, pagefindLoaded])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const hotSearches = ['Agent 配置', 'Skill 开发', '记忆系统', 'Telegram 接入', '快速开始']

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-red-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-red-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold">站内搜索</h1>
          <p className="text-red-100 mt-2">在 RedClaw 知识库中查找内容</p>
        </div>
      </div>

      {/* Search Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章、文档、教程..."
            className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition"
            autoFocus
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          {isSearching && (
            <Loader2 className="absolute right-14 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
          )}
        </form>

        {/* Hot Searches */}
        {!results.length && !isSearching && query.length < 2 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 mb-3">热门搜索</h3>
            <div className="flex flex-wrap gap-2">
              {hotSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-medium text-gray-500">
              找到 {results.length} 个结果
            </h3>
            {results.map((result, idx) => (
              <Link
                key={idx}
                href={result.url}
                className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    {result.type === '博客' || result.type === 'blog' ? (
                      <BookOpen className="w-5 h-5 text-red-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                        {result.type}
                      </span>
                      {result.category && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {result.category}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 hover:text-red-600">
                      {result.title}
                    </h4>
                    <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {query.length >= 2 && !isSearching && results.length === 0 && (
          <div className="mt-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关内容</h3>
            <p className="text-gray-600">请尝试其他关键词或浏览文档</p>
          </div>
        )}

        {/* Initial State */}
        {query.length < 2 && !results.length && (
          <div className="mt-12 text-center text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">输入关键词开始搜索</p>
            <p className="text-sm mt-2">支持全文搜索，匹配标题和内容</p>
          </div>
        )}
      </div>
    </div>
  )
}
