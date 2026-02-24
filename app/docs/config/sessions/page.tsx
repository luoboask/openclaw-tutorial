export const metadata = {
  title: '会话管理 - OpenClaw 中文教程',
  description: '了解 OpenClaw 的会话隔离、持久化和多会话管理',
}

export default function SessionsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">会话管理</h1>
      
      <p className="text-xl text-gray-600 mb-8">
        OpenClaw 使用会话来管理对话上下文，支持多会话并行和持久化存储。
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">会话概念</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">🎯 会话隔离</h3>
          <p className="text-gray-600">每个聊天频道都有独立的会话，不同频道的对话不会相互影响。</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">💾 持久化存储</h3>
          <p className="text-gray-600">会话历史会自动保存，重启后仍然可以继续之前的对话。</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">🔒 隐私保护</h3>
          <p className="text-gray-600">所有会话数据都存储在本地，不会上传到云端。</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">⚡ 内存优化</h3>
          <p className="text-gray-600">支持会话过期和自动清理，避免内存无限增长。</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">会话配置</h2>

      <div className="bg-slate-50 p-6 rounded-xl mb-8">
        <pre className="text-sm overflow-x-auto">
          <code>{`{
  "memory": {
    "backend": "sqlite",
    "sqlite": {
      "path": "~/.openclaw/memory.db"
    }
  },
  "agents": {
    "defaults": {
      "maxHistoryMessages": 100,
      "sessionTimeoutMinutes": 60
    }
  }
}`}</code>
        </pre>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">配置项说明</h2>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">memory.backend</span>
            <span className="text-sm text-gray-500">string</span>
          </div>
          <p className="text-gray-600 text-sm">会话存储后端，支持 sqlite、qmd 等</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">maxHistoryMessages</span>
            <span className="text-sm text-gray-500">number</span>
          </div>
          <p className="text-gray-600 text-sm">单个会话保留的最大消息数，超出部分会被截断</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">sessionTimeoutMinutes</span>
            <span className="text-sm text-gray-500">number</span>
          </div>
          <p className="text-gray-600 text-sm">会话空闲超时时间（分钟），超时后会被清理</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">常用命令</h2>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">/session</code>
            <span className="text-gray-500">或</span>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">/s</code>
          </div>
          <p className="text-gray-600">查看当前会话信息</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">/clear</code>
          </div>
          <p className="text-gray-600">清空当前会话历史</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">/reset</code>
          </div>
          <p className="text-gray-600">重置当前会话（相当于开始新对话）</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">/memory</code>
          </div>
          <p className="text-gray-600">查看长期记忆内容</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">多设备同步</h2>

      <p className="text-gray-600 mb-4">
        如果你在多个设备上运行 OpenClaw，可以配置共享的存储后端来实现会话同步。
      </p>

      <div className="bg-slate-50 p-6 rounded-xl mb-8">
        <pre className="text-sm overflow-x-auto">
          <code>{`{
  "memory": {
    "backend": "qmd",
    "qmd": {
      "url": "http://your-qmd-server:7700"
    }
  }
}`}</code>
        </pre>
      </div>

      <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl mt-8">
        <h3 className="font-semibold text-lg mb-2">⚠️ 注意事项</h3>
        <ul className="space-y-2 text-gray-700">
          <li>会话数据包含对话内容，请确保存储位置安全</li>
          <li>定期备份重要的会话数据</li>
          <li>修改存储配置后需要重启 Gateway</li>
        </ul>
      </div>
    </div>
  )
}
