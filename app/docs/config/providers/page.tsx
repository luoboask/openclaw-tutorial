export const metadata = {
  title: 'AI 提供商设置 - OpenClaw 中文教程',
  description: '配置 Claude、GPT 等 AI 模型提供商',
}

export default function ProvidersPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">AI 提供商设置</h1>
      
      <p className="text-xl text-gray-600 mb-8">
        OpenClaw 支持多种 AI 模型提供商，你可以根据需要选择和配置。
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">支持的提供商</h2>

      <div className="space-y-6">
        {/* Anthropic Claude */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold">A</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Anthropic Claude</h3>
              <p className="text-sm text-gray-500">推荐 | 强大的推理能力</p>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <pre className="text-sm overflow-x-auto"><code>{`{
  "agents": {
    "defaults": {
      "model": "anthropic/claude-sonnet-4"
    }
  },
  "providers": {
    "anthropic": {
      "apiKey": "your-anthropic-api-key"
    }
  }
}`}</code></pre>
          </div>

          <a 
            href="https://console.anthropic.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-600 hover:underline"
          >
            获取 API Key →
          </a>
        </div>

        {/* OpenAI */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">O</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">OpenAI GPT</h3>
              <p className="text-sm text-gray-500">GPT-4 / GPT-3.5</p>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <pre className="text-sm overflow-x-auto"><code>{`{
  "agents": {
    "defaults": {
      "model": "openai/gpt-4"
    }
  },
  "providers": {
    "openai": {
      "apiKey": "your-openai-api-key"
    }
  }
}`}</code></pre>
          </div>

          <a 
            href="https://platform.openai.com/api-keys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-600 hover:underline"
          >
            获取 API Key →
          </a>
        </div>

        {/* Google Gemini */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">G</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Google Gemini</h3>
              <p className="text-sm text-gray-500">Google AI 模型</p>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <pre className="text-sm overflow-x-auto"><code>{`{
  "agents": {
    "defaults": {
      "model": "google/gemini-pro"
    }
  },
  "providers": {
    "google": {
      "apiKey": "your-google-api-key"
    }
  }
}`}</code></pre>
          </div>

          <a 
            href="https://ai.google.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-600 hover:underline"
          >
            获取 API Key →
          </a>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">配置说明</h2>

      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">1. 获取 API Key</h3>
          <p className="text-gray-600">
            访问对应提供商的控制台，创建 API Key。请妥善保管，不要泄露给他人。
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">2. 配置 openclaw.json</h3>
          <p className="text-gray-600">
            将 API Key 添加到配置文件的 providers 部分。
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">3. 重启 Gateway</h3>
          <p className="text-gray-600">
            配置更改后需要重启 Gateway 才能生效。
          </p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl mt-8">
        <h3 className="font-semibold text-lg mb-2">💡 提示</h3>
        <p className="text-gray-700">
          你可以同时配置多个提供商，在对话中通过 <code>/model</code> 命令切换模型。
        </p>
      </div>
    </div>
  )
}
