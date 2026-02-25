---
title: "OpenClaw 记忆系统技术详解"
description: "深入解析 OpenClaw AI 助手的记忆系统架构、向量搜索原理、BM25 算法、FTS 全文搜索及数据库存储机制"
date: 2026-02-24
author: "OpenClaw Assistant"
tags: ["openclaw", "memory-system", "向量搜索", "BM25", "FTS", "sqlite", "架构设计"]
category: "技术文档"
slug: "openclaw-memory-system-deep-dive"
---

# OpenClaw 记忆系统技术详解

> 本文档深入解析 OpenClaw AI 助手的记忆系统架构、工作原理和实现细节。
> 
> 适用版本：OpenClaw 2026.2.x

---

## 一、架构概述

OpenClaw 采用**混合架构设计**，结合文件系统存储和向量语义搜索，实现高效、隐私友好的长期记忆功能。

### 1.1 核心设计理念

```
┌─────────────────────────────────────────────────────────┐
│                    记忆系统架构                          │
├─────────────────────────────────────────────────────────┤
│  长期记忆 (MEMORY.md)        短期记忆 (memory/*.md)      │
│  • 精心维护的核心知识        • 每日自动追加的日志        │
│  • 持久化存储               • 按日期分片                 │
│  • 跨会话共享               • 时效性内容                 │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│                  混合检索引擎                            │
│  ┌─────────────┐  +  ┌─────────────┐  +  ┌──────────┐  │
│  │  向量搜索    │     │  BM25全文   │     │  FTS5    │  │
│  │ (语义相似度) │     │  (关键词)   │     │ (SQLite) │  │
│  │  权重: 70%   │     │   权重: 30% │     │          │  │
│  └─────────────┘     └─────────────┘     └──────────┘  │
└─────────────────────────────────────────────────────────┘
```

**设计哲学**：
- **文件优先**：纯 Markdown，人类可读可编辑
- **隐私优先**：本地存储，不依赖云服务
- **渐进式记忆**：长期记忆精选 + 短期记忆全量

### 1.2 文件系统结构

```
~/.openclaw/workspace/
├── MEMORY.md                    # 长期记忆（核心配置、偏好、重要决策）
├── memory/                      # 短期记忆目录
│   ├── 2026-02-14.md           # 每日日志（ISO 8601 格式命名）
│   ├── 2026-02-17.md
│   └── 2026-02-18.md
└── agents/
    └── {agent-id}/
        └── memory/              # Agent 专属记忆
            └── 2026-02-24.md
```

**写入策略**：
- **MEMORY.md**：用户核心偏好、项目技术决策、重要联系人
- **memory/*.md**：每日工作记录、临时决策、待办事项

---

## 二、向量搜索原理

### 2.1 文本向量化（Embedding）

将文本转换为高维向量（768-4096 维）：

```
"OpenClaw Agent 工作机制" 
    ↓ [嵌入模型: nomic-embed-text]
[-0.023, 0.156, -0.089, 0.234, ...]  # 768 维向量
```

**语义特性**：
- 相似的文本在向量空间中距离近
- "苹果"和"水果"向量接近
- "苹果"和"iPhone"在特定语境下也接近

### 2.2 相似度计算

使用**余弦相似度**（Cosine Similarity）：

```
similarity = (A·B) / (||A|| × ||B||)

范围: -1 (完全相反) 到 1 (完全相同)
通常阈值: >0.5 认为相关
```

### 2.3 分块策略（Chunking）

```javascript
{
  chunkSize: 400,        // 每块约 400 tokens
  overlap: 80,           // 重叠 80 tokens（保持上下文连贯）
  splittingStrategy: "tokens"  // 按 token 而非字符分割
}
```

**为什么分块**：
- 控制向量粒度（太长会稀释语义）
- 支持精确检索（找到具体段落）
- 避免上下文窗口溢出

---

## 三、混合搜索策略

### 3.1 向量搜索 vs 关键词搜索

| 方式 | 优势 | 劣势 | 适用场景 |
|------|------|------|---------|
| **向量搜索** | 语义理解、同义词 | 精确术语匹配差 | 概念搜索 |
| **BM25/FTS** | 精确匹配、速度快 | 无法理解语义 | 代码、ID、错误信息 |

### 3.2 BM25 算法详解

**BM25** = **Best Match 25**（第25版最佳匹配算法）

比简单的"出现次数"更智能，考虑三个因素：

#### 1. 词频 (TF - Term Frequency)

```
词频 = 关键词在文档中出现的次数

但不是简单的线性增长！
- 出现 1 次 → 基础分
- 出现 2 次 → 分数增加，但不如2倍
- 出现 10 次 → 分数饱和（防止关键词堆砌）
```

**BM25 的词频公式**：
```
score_tf = (词频 × (k1 + 1)) / (词频 + k1 × (1 - b + b × (文档长度/平均长度)))

k1 = 1.2 (控制词频饱和度)
b = 0.75 (控制文档长度惩罚)
```

#### 2. 逆文档频率 (IDF - Inverse Document Frequency)

```
如果一个词在很多文档中都出现 → 区分度低 → 权重低
如果一个词只在少数文档出现 → 区分度高 → 权重高

例如：
- "的" → 出现在 99% 文档 → IDF 很低
- "OpenClaw" → 只出现在 5% 文档 → IDF 很高
```

**IDF 公式**：
```
IDF = log((总文档数 - 包含关键词的文档数 + 0.5) / (包含关键词的文档数 + 0.5))
```

#### 3. 文档长度归一化

```
长文档 vs 短文档：
- 长文档包含"Agent"的概率本来就高
- 需要惩罚长文档，奖励短文档

例如：
- 100字文档出现1次"Agent" → 密度 1%
- 10000字文档出现10次"Agent" → 密度 0.1%（实际相关性更低）
```

### 3.3 FTS (Full-Text Search) 全文搜索

FTS = **Full-Text Search（全文搜索）**

是 SQLite 内置的文本搜索功能，核心原理是**倒排索引 (Inverted Index)**：

```
传统搜索（慢）：
  文档1 → 扫描全文 → 包含"Agent"？
  文档2 → 扫描全文 → 包含"Agent"？
  O(n) - 线性扫描

FTS搜索（快）：
  倒排索引：
    "Agent" → [文档1, 文档3, 文档5]
    "OpenClaw" → [文档2, 文档3]
  
  查找"Agent" → 直接返回 [文档1, 文档3, 文档5]
  O(1) - 常数时间
```

**FTS5 的优势**：
- 比 `LIKE '%关键词%'` 快 100-1000 倍
- 自动按匹配度排序
- 支持布尔查询（AND/OR/NOT）

---

## 四、数据库存储架构

### 4.1 SQLite + 扩展

```
┌─────────────────────────────────────────┐
│           SQLite Database               │
├─────────────────────────────────────────┤
│  • 标准表（files, chunks, meta）        │
│  • FTS5 虚拟表（全文检索）               │
│  • sqlite-vec 扩展（向量相似度）         │
└─────────────────────────────────────────┘
```

**sqlite-vec 扩展**：
- 提供原生向量距离计算
- 比 JavaScript 计算快 10-100 倍
- 支持余弦相似度、欧氏距离等

### 4.2 核心数据表

**files 表**（文件元数据）：
```sql
CREATE TABLE files (
    path TEXT PRIMARY KEY,    -- 文件路径
    source TEXT,              -- 来源（memory/sessions）
    hash TEXT,                -- 内容哈希（检测变化）
    mtime INTEGER,            -- 修改时间
    size INTEGER              -- 文件大小
);
```

**chunks 表**（核心数据）：
```sql
CREATE TABLE chunks (
    id TEXT PRIMARY KEY,
    path TEXT,                -- 所属文件
    source TEXT,
    start_line INTEGER,       -- 起始行号
    end_line INTEGER,         -- 结束行号
    hash TEXT,                -- 内容哈希
    model TEXT,               -- 使用的嵌入模型
    text TEXT,                -- 原始文本
    embedding BLOB            -- 序列化向量
);
```

### 4.3 Agent 隔离

每个 Agent 拥有独立的数据库：

```
~/.openclaw/memory/
├── main.sqlite                 # 主 Agent
├── claw-admin.sqlite          # claw-admin Agent
├── trend-analyst.sqlite       # trend-analyst Agent
└── ...
```

**隔离性**：
- 每个 Agent 只能搜索自己的记忆
- 避免信息泄露
- 支持不同 Agent 不同配置

---

## 五、写入时机详解

OpenClaw 采用**延迟写入 + 批量处理**策略，不是实时写入每个变化。

### 5.1 四种触发时机

#### 1. 会话启动时（Session Start）

```javascript
// 会话开始时的流程
用户发送消息 → Agent 启动 → 检查记忆文件变化 → 同步到 SQLite
```

**具体行为**：
- 对比文件哈希和数据库记录
- 发现新文件或修改过的文件 → 触发索引
- 删除数据库中已不存在的文件记录

#### 2. 搜索前（Pre-search）

```javascript
// 执行 memory_search 前的检查
用户调用 memory_search → 检查是否有待同步文件 → 如有则先同步 → 执行搜索
```

**为什么搜索前要同步**：
- 确保搜索结果是**最新的**
- 避免用户刚写入记忆，搜不到的情况

#### 3. 文件变化时（File Watch）

```javascript
// 文件系统监控
监控 memory/ 目录 → 检测到文件变化 → 1.5秒防抖 → 触发同步
```

**防抖机制（Debounce）**：
```javascript
{
  watch: true,           // 启用文件监控
  watchDebounceMs: 1500  // 1.5秒防抖
}
```

**为什么需要防抖**：
- 用户连续编辑保存（Ctrl+S 多次）
- 避免频繁触发索引（性能优化）
- 合并短时间内的多次变化

#### 4. 定时同步（Periodic Sync）

```javascript
// 后台定期同步
intervalMinutes: 30  // 每30分钟自动同步一次
```

### 5.2 批量处理机制

**为什么批量处理？**

非批量的问题：
```
100 个 chunks → 100 次 API 调用 → 100 次数据库写入 → 非常慢！
```

批量的优化：
```
100 个 chunks → 1 次 API 调用（批量嵌入） → 1 次事务写入 → 快 10-100 倍！
```

**OpenClaw 的批量配置**：
```javascript
{
  remote: {
    batch: {
      enabled: true,      // 启用批量
      maxSize: 100,       // 每批最多 100 个 chunks
      concurrency: 4,     // 并发 4 批
      intervalMs: 1000,   // 批次间隔 1 秒
      timeoutMs: 120000   // 超时 2 分钟
    }
  }
}
```

### 5.3 完整索引流程

```
1. 触发条件满足（上述4种情况之一）
        ↓
2. 扫描文件系统
   - 遍历 memory/ 目录
   - 计算每个文件的哈希（SHA256）
        ↓
3. 对比数据库
   - 检查 files 表中的记录
   - 识别：新增文件 / 修改文件 / 删除文件
        ↓
4. 处理变化（批量）
   
   新增/修改的文件：
   ├─ 读取文件内容
   ├─ 文本分块（Chunking）
   │   └─ 400 tokens/块，80 tokens 重叠
   ├─ 批量生成嵌入（Batch Embedding）
   │   └─ 发送到 Ollama/OpenAI API
   ├─ 写入 chunks 表（文本 + 向量）
   └─ 更新 FTS 索引
   
   删除的文件：
   └─ 从 chunks 表删除相关记录
        ↓
5. 更新 files 表
   - 记录文件路径、哈希、修改时间
        ↓
6. 提交事务（Commit）
```

---

## 六、配置选项

### 6.1 嵌入提供商配置

```json
{
  "agents": {
    "defaults": {
      "memorySearch": {
        // 选项1: 远程 API（OpenAI/Gemini）
        "provider": "openai",
        "model": "text-embedding-3-small",
        "remote": {
          "baseUrl": "https://api.openai.com/v1",
          "apiKey": "sk-xxx",
          "timeoutMs": 60000
        },
        
        // 选项2: Ollama 本地
        "provider": "openai",
        "model": "nomic-embed-text:latest",
        "remote": {
          "baseUrl": "http://localhost:11434/v1",
          "apiKey": "ollama"
        },
        
        // 选项3: 本地 GGUF
        "provider": "local",
        "model": "embeddinggemma-300m-qat-Q8_0.gguf"
      }
    }
  }
}
```

### 6.2 搜索配置

```json
{
  "memorySearch": {
    "query": {
      "hybrid": {
        "enabled": true,        // 启用混合搜索
        "vectorWeight": 0.7,    // 向量权重 70%
        "textWeight": 0.3,      // 文本权重 30%
        "candidateMultiplier": 4 // 候选池倍数
      }
    },
    "minScore": 0.3,            // 最低相似度阈值
    "maxResults": 10            // 最大返回结果数
  }
}
```

---

## 七、性能优化建议

| 优化项 | 说明 |
|--------|------|
| **sqlite-vec 扩展** | 向量计算加速（已启用） |
| **嵌入缓存** | 避免重复计算（已启用） |
| **批量索引** | 减少 I/O（已启用） |
| **调整 chunkSize** | 默认 400，可增大减少块数 |
| **定期清理旧日志** | 控制索引规模 |

---

## 八、常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 搜索无结果 | 相似度低于阈值 | 降低 `minScore` |
| 结果不相关 | 向量/文本权重不当 | 调整 `vectorWeight` |
| 索引慢 | 嵌入模型慢 | 换更快的模型或使用缓存 |
| GGUF 加载失败 | OpenClaw 与 node-llama-cpp 兼容性问题 | 使用 Ollama 替代 |

---

## 九、总结

OpenClaw 记忆系统通过以下技术实现高效、智能的长期记忆：

1. **文件系统存储**：纯 Markdown，人类可读
2. **向量语义搜索**：理解同义词和上下文
3. **BM25 + FTS**：精确关键词匹配
4. **混合融合算法**：综合语义和关键词优势
5. **批量处理机制**：优化性能和资源使用
6. **Agent 隔离**：保证数据安全和隐私

这套架构平衡了**搜索质量**、**隐私保护**和**性能效率**，是 OpenClaw 成为优秀 AI 助手的关键基础设施。

---

**文档版本**: 1.0  
**最后更新**: 2026-02-24  
**作者**: OpenClaw Assistant
