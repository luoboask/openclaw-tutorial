export const metadata = {
  title: '什么是 OpenClaw？ - OpenClaw 中文教程',
  description: '了解 OpenClaw 的核心概念、架构设计和使用场景',
}

export default function IntroPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">什么是 OpenClaw？</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          OpenClaw 是一个开源的 AI 网关，让你可以通过各种聊天应用与你的个人 AI 助手对话。
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">核心概念</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">🤖 AI Agent</h3>
            <p className="text-gray-600">OpenClaw 的核心是一个 AI Agent，它能够理解你的指令，调用各种工具，完成复杂任务。</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">📱 多频道接入</h3>
            <p className="text-gray-600">支持 WhatsApp、Telegram、Discord、iMessage 等主流聊天应用，让你随时随地与 AI 对话。</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">🔧 工具系统</h3>
            <p className="text-gray-600">内置浏览器、命令执行、文件操作、网络搜索等工具，让 AI 能够实际操作你的设备。</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">🏠 完全自托管</h3>
            <p className="text-gray-600">运行在你自己的设备上，数据完全由你掌控，无需担心隐私泄露。</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">架构设计</h2>
        
        <div className="bg-slate-50 p-6 rounded-xl mb-8">
          <pre className="text-sm overflow-x-auto">
            <code>{`┌─────────────────────────────────────────────────────────────┐
│                      聊天应用层                              │
│  WhatsApp │ Telegram │ Discord │ iMessage │ Signal │ Slack │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      Gateway 网关                            │
│         消息路由 │ 会话管理 │ 身份验证 │ 工具调度            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI Agent 核心                           │
│         LLM 调用 │ 工具执行 │ 记忆管理 │ 上下文理解          │
└─────────────────────────────────────────────────────────────┘`}</code>
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">使用场景</h2>
        
        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <span className="text-orange-600 mr-3">💬</span>
            <div>
              <strong>个人 AI 助手</strong>
              <p className="text-gray-600">通过熟悉的聊天应用与 AI 对话，无需切换应用。</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 mr-3">🔍</span>
            <div>
              <strong>信息检索</strong>
              <p className="text-gray-600">让 AI 帮你搜索网页、查找文档、整理资料。</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 mr-3">⚡</span>
            <div>
              <strong>自动化任务</strong>
              <p className="text-gray-600">执行命令、操作文件、部署服务，一句话搞定。</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 mr-3">🌐</span>
            <div>
              <strong>浏览器控制</strong>
              <p className="text-gray-600">让 AI 帮你浏览网页、填写表单、获取信息。</p>
            </div>
          </li>
        </ul>

        <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl mt-8">
          <h3 className="font-semibold text-lg mb-2">准备好开始了吗？</h3>
          <p className="text-gray-700 mb-4">
            跟着我们的快速开始指南，5 分钟完成部署。
          </p>
          <a href="/docs/quickstart" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
            快速开始 →
          </a>
        </div>
      </div>
    </div>
  )
}
