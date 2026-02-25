import { notFound } from 'next/navigation'
import Link from 'next/link'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

interface Article {
  title: string
  date: string
  readTime: string
  content: string
}

const articles: Record<string, Article> = {
  'telegram-bot-complete-guide': {
    title: 'Telegram Bot 详细配置指南',
    date: '2026-02-24',
    readTime: '10 分钟',
    content: `
# Telegram Bot 详细配置指南

> 本教程将带你从零开始，完成 Telegram Bot 的创建和 OpenClaw 接入配置。

---

## 📋 概述

| 项目 | 内容 |
|------|------|
| **难度** | ⭐ 简单 |
| **预计时间** | 5-10 分钟 |
| **前提条件** | Telegram 账号 |
| **适用版本** | OpenClaw 2026.2.x |

**你将学到:**
- 如何在 Telegram 中创建 Bot
- 如何获取 Bot Token
- 如何配置 OpenClaw 连接 Telegram
- 如何测试和故障排查

---

## 步骤 1: 在 Telegram 中创建 Bot

### 1.1 打开 Telegram，搜索 @BotFather

BotFather 是 Telegram 官方的 Bot 管理机器人。

**操作:**
1. 打开 Telegram 应用
2. 在搜索框输入 \`BotFather\`
3. 点击带有蓝色认证勾的 \`@BotFather\`

### 1.2 创建新 Bot

**发送命令:**
\`\`\`
/newbot
\`\`\`

**按提示操作:**
1. BotFather 会要求你输入 Bot 名称（显示名称）
   - 例如：\`My OpenClaw Assistant\`
   - 可以包含空格，用户会看到这个名字

2. 然后要求输入 Bot 用户名（唯一标识）
   - 必须以 \`bot\` 结尾
   - 例如：\`my_claw_bot\` 或 \`myclawassistant_bot\`
   - 不能包含空格

### 1.3 获取 Bot Token

创建成功后，BotFather 会发送一条消息包含 Token。

**重要:** 复制 Token 部分，例如：\`123456789:ABCdefGHIjklMNOpqrsTUVwxyz\`

> ⚠️ **安全提示:** Token 就像密码，不要泄露给他人！

---

## 步骤 2: 配置 OpenClaw

### 2.1 打开配置文件

找到你的 OpenClaw 配置文件：

\`\`\`bash
~/.openclaw/openclaw.json
\`\`\`

### 2.2 添加 Telegram 配置

在配置文件的 \`channels\` 部分添加：

\`\`\`json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
    }
  }
}
\`\`\`

### 2.3 保存配置文件

保存后，验证 JSON 格式是否正确。

---

## 步骤 3: 重启 OpenClaw Gateway

配置更改后需要重启 Gateway 才能生效：

\`\`\`bash
openclaw gateway restart
\`\`\`

等待启动完成，看到以下输出表示成功：

\`\`\`
✓ Gateway started on port 18789
\`\`\`

---

## 步骤 4: 测试连接

### 4.1 在 Telegram 中找到你的 Bot

1. 在 Telegram 搜索框输入你设置的 Bot 用户名
2. 例如：\`@my_claw_bot\`
3. 点击进入聊天界面

### 4.2 发送测试消息

发送任意消息，例如：
\`\`\`
你好
\`\`\`

如果配置正确，你的 AI 助手会回复你！

### 4.3 常用命令测试

尝试发送以下命令：

\`\`\`
/help          # 查看帮助
/session       # 查看会话信息
/clear         # 清空当前会话
\`\`\`

---

## 🔧 常见问题

### Q1: Bot 不回复消息

**可能原因:**
- Token 配置错误
- Gateway 未启动
- 网络问题

**解决方案:**
1. 检查配置文件中的 Token 是否正确
2. 检查 Gateway 状态：\`openclaw gateway status\`
3. 查看日志：\`openclaw logs\`

### Q2: 提示 "Channel not enabled"

**原因:** Telegram 频道未启用

**解决:** 确保配置文件中 \`enabled: true\`

### Q3: Token 泄露了怎么办？

**紧急处理:**
1. 立即在 BotFather 中发送 \`/revoke\`
2. 获取新 Token
3. 更新配置文件
4. 重启 Gateway

### Q4: 如何让 Bot 回复群组消息？

**步骤:**
1. 将 Bot 添加到群组
2. 在群组中发送 \`/start\`
3. 给 Bot 管理员权限（可选，但推荐）

### Q5: 支持哪些消息类型？

**支持:**
- 文字消息
- 图片（带描述）
- 语音消息（需配置语音识别）

**不支持:**
- 视频
- 文件
- 贴纸

---

## 🎨 进阶配置

### 设置 Bot 头像和描述

在 BotFather 中发送：

\`\`\`
/setuserpic   # 设置头像
/setabouttext # 设置关于信息
/setdescription # 设置描述
\`\`\`

### 配置隐私模式

在群组中，Bot 默认只能看到以下消息：
- @提及 Bot 的消息
- 回复 Bot 的消息
- Bot 发送的命令

如需看到所有消息，需要：
1. 给 Bot 管理员权限
2. 或在 BotFather 中关闭隐私模式：\`/setprivacy\` → Disabled

---

## ✅ 验证清单

配置完成后，检查以下项目：

- [ ] 能在 Telegram 中搜索到 Bot
- [ ] 发送消息后能收到回复
- [ ] \`/help\` 命令正常工作
- [ ] 重启 Gateway 后依然有效

---

## 📝 总结

恭喜！你已经成功将 Telegram Bot 接入 OpenClaw。

**下一步建议:**
- 尝试其他功能，如图片发送
- 邀请朋友加入群组体验
- 查看其他频道接入教程（Discord、WhatsApp）

**需要帮助?**
- 查看官方文档: https://docs.openclaw.ai
- 加入社区 Discord: https://discord.gg/clawd

---

*最后更新: 2026-02-24*  
*适用版本: OpenClaw 2026.2.x*
    `,
  },
  'openclaw-complete-guide': {
    title: 'OpenClaw 完全指南：从零搭建你的 AI 助手',
    date: '2026-02-14',
    readTime: '25 分钟',
    content: `
# OpenClaw 完全指南

OpenClaw 是一个强大的开源 AI 网关，让你能够通过熟悉的聊天应用与 AI 助手对话。

## 什么是 OpenClaw？

OpenClaw 的核心是一个 AI Agent 网关，它：
- 连接多个聊天应用（WhatsApp、Telegram、Discord 等）
- 提供丰富的工具系统（浏览器、命令执行、文件操作等）
- 完全自托管，数据由你掌控

## 核心功能

### 1. 多频道支持
同时接入多个聊天应用，统一管理和回复消息。

### 2. 工具系统
- **Browser**: 控制浏览器，访问网页
- **Exec**: 执行系统命令
- **Search**: 网络搜索
- **File**: 文件读写操作

### 3. 会话管理
- 持久化对话历史
- 多会话并行
- 长期记忆

## 快速开始

1. 安装 OpenClaw
2. 配置 AI 提供商
3. 接入聊天应用
4. 开始对话

## 结语

OpenClaw 让 AI 助手触手可及，无需切换应用即可享受 AI 的强大能力。
    `,
  },
  'telegram-quickstart': {
    title: '5分钟上手：Telegram Bot 配置指南',
    date: '2026-02-13',
    readTime: '5 分钟',
    content: `
# Telegram Bot 配置指南

Telegram 是接入 OpenClaw 最简单的方式之一。

## 步骤 1：创建 Bot

1. 在 Telegram 中搜索 @BotFather
2. 发送 /newbot 命令
3. 按提示设置 Bot 名称和用户名
4. 保存获得的 API Token

## 步骤 2：配置 OpenClaw

在 openclaw.json 中添加 Telegram 配置，设置 botToken。

## 步骤 3：重启 Gateway

使用命令 openclaw gateway restart 重启服务。

## 步骤 4：开始对话

在 Telegram 中找到你的 Bot，开始对话！

## 常用命令

- /start - 开始使用
- /help - 查看帮助
- /session - 查看会话信息
    `,
  },
  'tools-deep-dive': {
    title: 'AI Agent 工具系统详解',
    date: '2026-02-12',
    readTime: '15 分钟',
    content: `
# AI Agent 工具系统详解

工具是 OpenClaw 的核心能力，让 AI 能够实际操作和交互。

## 工具类型

### Browser 工具
控制浏览器，实现网页访问、截图、表单填写、元素点击和数据提取。

### Exec 工具
执行系统命令，运行脚本，查看系统状态，文件操作。

### Search 工具
网络搜索能力，包括网页搜索、新闻搜索、图片搜索。

## 工具调用流程

1. AI 分析用户意图
2. 决定需要使用的工具
3. 执行工具调用
4. 获取结果并回复

## 安全考虑

- 所有工具执行都需要用户确认（可配置）
- 支持白名单机制
- 审计日志记录

## 自定义工具

你还可以开发自己的工具，扩展 AI 的能力边界。
    `,
  },
  'openclaw-memory-system-deep-dive': {
    title: 'OpenClaw 记忆系统技术详解',
    date: '2026-02-24',
    readTime: '30 分钟',
    content: `
# OpenClaw 记忆系统技术详解

本文深入解析 OpenClaw AI 助手的记忆系统架构、工作原理和实现细节。

适用版本：OpenClaw 2026.2.x

---

## 概述

OpenClaw 采用混合架构设计，结合文件系统存储和向量语义搜索，实现高效、隐私友好的长期记忆功能。

### 核心设计理念

**双轨记忆系统**

- **长期记忆** (MEMORY.md)：精心维护的核心知识，持久化存储，跨会话共享
- **短期记忆** (memory/*.md)：每日自动追加的日志，按日期分片

**混合检索引擎**

- 向量搜索（语义相似度）—— 权重 70%
- BM25 全文（关键词）—— 权重 30%
- FTS5（SQLite）—— 辅助索引

**设计哲学**

- 文件优先：纯 Markdown，人类可读可编辑
- 隐私优先：本地存储，不依赖云服务
- 渐进式记忆：长期记忆精选 + 短期记忆全量

### 文件系统结构

\`\`\`
~/.openclaw/workspace/
├── MEMORY.md                    # 长期记忆
├── memory/                      # 短期记忆目录
│   ├── 2026-02-14.md
│   ├── 2026-02-17.md
│   └── 2026-02-18.md
└── agents/{id}/memory/          # Agent 专属记忆
\`\`\`

---

## 向量搜索原理

### 文本向量化

将文本转换为高维向量（768-4096 维）。

**示例**

> "OpenClaw Agent 工作机制"
>
> 经过嵌入模型处理后 → 768 维向量数组

**语义特性**

- 相似的文本在向量空间中距离近
- "苹果"和"水果"向量接近
- "苹果"和"iPhone"在特定语境下也接近

### 相似度计算

使用**余弦相似度**：

\`\`\`
similarity = (A·B) / (||A|| × ||B||)

范围: -1 ~ 1
阈值: >0.5 认为相关
\`\`\`

### 分块策略

| 参数 | 值 | 说明 |
|------|-----|------|
| chunkSize | 400 tokens | 每块大小 |
| overlap | 80 tokens | 重叠保持上下文 |
| strategy | tokens | 按 token 分割 |

**分块目的**

1. 控制向量粒度（太长会稀释语义）
2. 支持精确检索（找到具体段落）
3. 避免上下文窗口溢出

---

## 混合搜索策略

### 向量搜索 vs 关键词搜索

| 方式 | 优势 | 劣势 | 适用场景 |
|------|------|------|---------|
| 向量搜索 | 语义理解、同义词 | 精确术语匹配差 | 概念搜索 |
| BM25/FTS | 精确匹配、速度快 | 无法理解语义 | 代码、ID、错误信息 |

### BM25 算法

BM25（Best Match 25）比简单的"出现次数"更智能，考虑三个因素：

**1. 词频（TF）**

不是线性增长：
- 出现 1 次 → 基础分
- 出现 2 次 → 分数增加，但不如 2 倍
- 出现 10 次 → 分数饱和（防止关键词堆砌）

**公式**

\`\`\`
score = (TF × (k1 + 1)) / (TF + k1 × (1 - b + b × (doc_len / avg_len)))

k1 = 1.2（控制词频饱和度）
b = 0.75（控制文档长度惩罚）
\`\`\`

**2. 逆文档频率（IDF）**

- 常见词（如"的"）→ 出现在 99% 文档 → IDF 很低
- 专业词（如"OpenClaw"）→ 只出现在 5% 文档 → IDF 很高

**3. 文档长度归一化**

- 100字文档出现1次"Agent" → 密度 1%
- 10000字文档出现10次"Agent" → 密度 0.1%（实际相关性更低）

### FTS 全文搜索

FTS 使用**倒排索引**，比传统搜索快 100-1000 倍。

| 搜索方式 | 原理 | 速度 |
|---------|------|------|
| 传统搜索 | 线性扫描每个文档 | O(n) |
| FTS 搜索 | 直接查倒排索引 | O(1) |

**FTS5 优势**

- 比 LIKE '%关键词%' 快 100-1000 倍
- 自动按匹配度排序
- 支持布尔查询（AND / OR / NOT）

---

## 数据库存储

### SQLite + 扩展

- 标准表：files, chunks, meta
- FTS5 虚拟表：全文检索
- sqlite-vec 扩展：向量相似度计算

### 核心数据表

**files 表** —— 文件元数据

| 字段 | 说明 |
|------|------|
| path | 文件路径 |
| source | 来源（memory/sessions）|
| hash | 内容哈希（检测变化）|
| mtime | 修改时间 |
| size | 文件大小 |

**chunks 表** —— 核心数据

| 字段 | 说明 |
|------|------|
| id | 唯一标识 |
| path | 所属文件 |
| source | 来源 |
| start_line / end_line | 行号范围 |
| hash | 内容哈希 |
| model | 使用的嵌入模型 |
| text | 原始文本 |
| embedding | 序列化向量 |

### Agent 隔离

每个 Agent 拥有独立的数据库，保证数据安全和隐私。

---

## 写入时机

### 四种触发时机

1. **会话启动时** —— 检查记忆文件变化，同步到 SQLite
2. **搜索前** —— 确保搜索结果是最新的
3. **文件变化时** —— 1.5秒防抖后触发同步
4. **定时同步** —— 每30分钟自动同步一次

### 批量处理机制

**非批量的问题**

\`\`\`
100 个 chunks
→ 100 次 API 调用
→ 100 次数据库写入
→ 非常慢！
\`\`\`

**批量的优化**

\`\`\`
100 个 chunks
→ 1 次 API 调用
→ 1 次事务写入
→ 快 10-100 倍！
\`\`\`

**配置参数**

| 参数 | 值 | 说明 |
|------|-----|------|
| enabled | true | 启用批量 |
| maxSize | 100 | 每批最多 chunks |
| concurrency | 4 | 并发批数 |
| intervalMs | 1000 | 批次间隔 |
| timeoutMs | 120000 | 超时时间 |

### 索引流程

\`\`\`
1. 触发条件满足
2. 扫描文件系统，计算哈希
3. 对比数据库，识别变化
4. 批量处理变化
5. 更新 files 表
6. 提交事务
\`\`\`

---

## 配置选项

### 嵌入提供商

支持三种方式：

1. **远程 API** —— OpenAI / Gemini
2. **Ollama 本地** —— 推荐，免费
3. **本地 GGUF** —— 完全离线

### 搜索配置

| 参数 | 说明 |
|------|------|
| hybrid.enabled | 启用混合搜索 |
| vectorWeight | 向量权重（默认 70%）|
| textWeight | 文本权重（默认 30%）|
| minScore | 最低相似度阈值 |
| maxResults | 最大返回结果数 |

---

## 性能优化

| 优化项 | 效果 |
|--------|------|
| sqlite-vec 扩展 | 向量计算加速 |
| 嵌入缓存 | 避免重复计算 |
| 批量索引 | 减少 I/O |
| 调整 chunkSize | 默认 400，可增大减少块数 |
| 定期清理旧日志 | 控制索引规模 |

---

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 搜索无结果 | 相似度低于阈值 | 降低 minScore |
| 结果不相关 | 向量/文本权重不当 | 调整 vectorWeight |
| 索引慢 | 嵌入模型慢 | 换更快的模型或使用缓存 |
| GGUF 加载失败 | 兼容性问题 | 使用 Ollama 替代 |

---

## 总结

OpenClaw 记忆系统的核心技术：

1. **文件系统存储** —— 纯 Markdown，人类可读
2. **向量语义搜索** —— 理解同义词和上下文
3. **BM25 + FTS** —— 精确关键词匹配
4. **混合融合算法** —— 综合语义和关键词优势
5. **批量处理机制** —— 优化性能和资源使用
6. **Agent 隔离** —— 保证数据安全和隐私

这套架构平衡了搜索质量、隐私保护和性能效率，是 OpenClaw 成为优秀 AI 助手的关键基础设施。

---

*文档版本: 1.0*  
*最后更新: 2026-02-24*  
*作者: OpenClaw Assistant*
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]

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
        <Link href="/blog" className="text-gray-600 hover:text-orange-600 mb-8 block">
          返回博客
        </Link>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-12 text-white">
            <div className="flex items-center gap-4 mb-4 text-sm opacity-90">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="text-3xl font-bold">{article.title}</h1>
          </div>

          <div 
            className="p-8 md:p-12 prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:pb-4 prose-h1:border-b prose-h1:border-gray-200 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:pl-5 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:my-4 prose-blockquote:rounded-r prose-blockquote:text-orange-900 prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-gray-200 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-4 prose-pre:code:bg-transparent prose-pre:code:text-gray-100 prose-pre:code:p-0 prose-pre:code:border-0 prose-ul:list-disc prose-ul:list-inside prose-ul:text-gray-700 prose-ul:mb-4 prose-ul:space-y-2 prose-ol:list-decimal prose-ol:list-inside prose-ol:text-gray-700 prose-ol:mb-4 prose-ol:space-y-2 prose-li:text-gray-700 prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-gray-300 prose-table:bg-white prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-4 prose-thead:bg-gray-100 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 prose-th:p-3 prose-th:border prose-th:border-gray-300 prose-td:text-gray-700 prose-td:p-3 prose-td:border prose-td:border-gray-300 prose-tr:border-t prose-tr:border-gray-300 even:prose-tr:bg-gray-50 prose-hr:my-8 prose-hr:border-gray-200"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  )
}
