'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="p-8 md:p-12">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-3 border-b border-gray-200">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">{children}</h3>,
          h4: ({ children }) => <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">{children}</h4>,
          p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="text-gray-700">{children}</li>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-orange-500 bg-orange-50 pl-5 pr-4 py-3 my-4 rounded-r text-orange-900">{children}</blockquote>,
          code: ({ children }) => <code className="bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
          pre: ({ children }) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">{children}</pre>,
          a: ({ children, href }) => <a href={href} className="text-blue-600 hover:underline">{children}</a>,
          table: ({ children }) => <div className="overflow-x-auto my-4"><table className="w-full border-collapse border border-gray-300 bg-white">{children}</table></div>,
          thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
          tbody: ({ children }) => <tbody className="bg-white">{children}</tbody>,
          tr: ({ children }) => <tr className="border-t border-gray-300 even:bg-gray-50">{children}</tr>,
          th: ({ children }) => <th className="text-left font-semibold text-gray-900 p-3 border border-gray-300 bg-gray-100">{children}</th>,
          td: ({ children }) => <td className="text-gray-700 p-3 border border-gray-300">{children}</td>,
          hr: () => <hr className="my-8 border-gray-200" />,
          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
