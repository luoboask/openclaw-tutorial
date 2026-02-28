# OpenClaw Memory Search 完全配置指南 - 使用 Ollama 实现本地向量搜索

> **发布日期**: 2026-02-28  
> **标签**: #OpenClaw #MemorySearch #Ollama #配置指南 #最佳实践  
> **分类**: 技术文档

---

## 📋 目录

1. [问题背景](#问题背景)
2. [正确配置方案](#正确配置方案)
3. [前置条件](#前置条件)
4. [配置步骤](#配置步骤)
5. [验证与测试](#验证与测试)
6. [错误配置避坑](#错误配置避坑)
7. [性能对比](#性能对比)
8. [常见问题](#常见问题)
9. [相关资源](#相关资源)

---

## 问题背景

**Memory Search** 是 OpenClaw 的长期记忆功能，通过向量嵌入（Embedding）实现语义搜索。它的工作原理是：

1. 将 Markdown 记忆文件（`MEMORY.md` + `memory/*.md`）切分成 chunks
2. 使用 Embedding 模型生成向量
3. 存储到 SQLite + sqlite-vec 向量数据库
4. 搜索时计算查询向量与存储向量的相似度

### 🔴 已知问题

OpenClaw 默认的 `local` provider 存在**并发初始化 bug**（[Issue #15639](https://github.com/openclaw/openclaw/issues/15639)）：

```
❌ 症状：memory_search 查询超时 300 秒
❌ 原因：并发调用 ensureContext() 导致模型重复加载
❌ 状态：Open (未修复)
```

因此，我们需要找到一种稳定可靠的替代方案。

---

## 正确配置方案

### ✅ 推荐配置（通过 Ollama）

编辑 `~/.openclaw/openclaw.json`：

```json5
{
  "agents": {
    "defaults": {
      "memorySearch": {
        "enabled": true,
        "provider": "openai",
        "model": "nomic-embed-text:latest",
        "remote": {
          "baseUrl": "http://localhost:11434/v1/",
          "apiKey": "ollama"
        }
      }
    }
  }
}
```

### 配置说明

| 字段 | 值 | 说明 |
|------|------|------|
| `provider` | `"openai"` | 使用 OpenAI 兼容 API 协议 |
| `model` | `"nomic-embed-text:latest"` | Ollama 中的 embedding 模型 |
| `remote.baseUrl` | `"http://localhost:11434/v1/"` | Ollama 的 OpenAI 兼容端点 |
| `remote.apiKey` | `"ollama"` | 任意值（Ollama 不需要验证） |

### 为什么这样配置有效？

1. ✅ 通过 HTTP API 调用 Ollama，**避开了 `local` provider 的并发初始化 bug**
2. ✅ 利用 Ollama 的 OpenAI 兼容 API (`/v1/embeddings`)
3. ✅ 模型完全本地运行，无需 API 费用
4. ✅ 性能优秀（nomic-embed-text 响应时间 ~0.45 秒）

---

## 前置条件

### 1. 安装 Ollama

```bash
# macOS
brew install ollama

# 启动 Ollama（如果未运行）
ollama serve
```

### 2. 拉取 Embedding 模型

```bash
ollama pull nomic-embed-text:latest
```

### 3. 验证模型

```bash
ollama list | grep embed
# 输出示例：
# nomic-embed-text:latest    0a109f422b47    274 MB    运行中
```

### 4. 测试 Embedding API

```bash
curl -s http://localhost:11434/api/embeddings \
  -d '{"model": "nomic-embed-text:latest", "prompt": "test"}' \
  | jq '{status: (if .embedding then "OK" else "FAIL" end), vector_length: (.embedding | length)}'
# 输出：{"status": "OK", "vector_length": 768}
```

---

## 配置步骤

### 步骤 1：编辑配置文件

```bash
code ~/.openclaw/openclaw.json
# 或
vim ~/.openclaw/openclaw.json
```

### 步骤 2：添加 memorySearch 配置

在 `agents.defaults` 中添加（或修改）`memorySearch` 字段：

```json5
{
  "agents": {
    "defaults": {
      "memorySearch": {
        "enabled": true,
        "provider": "openai",
        "model": "nomic-embed-text:latest",
        "remote": {
          "baseUrl": "http://localhost:11434/v1/",
          "apiKey": "ollama"
        }
      }
    }
  }
}
```

### 步骤 3：重启 Gateway

```bash
openclaw gateway restart
```

### 步骤 4：重建索引

```bash
openclaw memory index --verbose
```

---

## 验证与测试

### 1. 检查状态

```bash
openclaw memory status
```

**成功标志：**
```
✅ Provider: openai (requested: openai)
✅ Model: nomic-embed-text:latest
✅ Indexed: 5/5 files · 6 chunks
✅ Vector: ready
✅ Vector dims: 768
```

**失败标志：**
```
❌ Provider: none (requested: xxx)
❌ Model: none
❌ Indexed: 0/5 files · 0 chunks
❌ Vector: unknown
```

### 2. 测试搜索

```bash
openclaw memory search "OpenClaw 记忆"
```

**预期输出：**
```json
{
  "results": [
    {
      "path": "MEMORY.md",
      "score": 0.42,
      "snippet": "...",
      "citation": "MEMORY.md#L1-L53"
    }
  ],
  "provider": "openai",
  "model": "nomic-embed-text:latest",
  "mode": "hybrid"
}
```

---

## 错误配置避坑

### ❌ 错误 1：provider 设为 "ollama"

```json5
{
  "memorySearch": {
    "provider": "ollama"  // ❌ OpenClaw 不支持此 provider
  }
}
```

**结果**：Gateway 启动报错或配置被忽略

### ❌ 错误 2：使用 local provider

```json5
{
  "memorySearch": {
    "provider": "local",
    "model": "~/.node-llama-cpp/models/embeddinggemma-300m-qat-Q8_0.gguf"
  }
}
```

**结果**：查询超时 300 秒（并发初始化 bug）

### ❌ 错误 3：缺少 remote 配置

```json5
{
  "memorySearch": {
    "provider": "openai",
    "model": "nomic-embed-text:latest"
    // ❌ 缺少 remote 配置，会调用真正的 OpenAI API
  }
}
```

**结果**：需要 OpenAI API Key，且产生费用

---

## 性能对比

| 模型 | 尺寸 | 响应时间 | 向量维度 | 推荐度 |
|------|------|---------|---------|--------|
| **nomic-embed-text:latest** | 274 MB | **0.45s** | 768 | ⭐⭐⭐⭐⭐ |
| qwen3-embedding:0.6b | 639 MB | 7s | 768 | ⭐⭐⭐ |
| qwen3-embedding:4b | 2.5 GB | 9.5s | 768 | ⭐⭐ |

**推荐**：`nomic-embed-text:latest` - 最快、最轻量、专为语义搜索设计

---

## 常见问题

### Q1: 为什么选择 `provider: "openai"` 而不是 `"ollama"`？

**A**: OpenClaw 的 memorySearch 不支持 `"ollama"` provider。但支持 `"openai"` provider 配合自定义 `remote.baseUrl`，可以指向任何 OpenAI 兼容的 API 端点（包括 Ollama）。

### Q2: 需要配置 OpenAI API Key 吗？

**A**: 不需要。`remote.apiKey` 可以设置为任意值（如 `"ollama"`），因为 Ollama 不验证 API Key。

### Q3: 如果 Ollama 没有运行会怎样？

**A**: memory search 会失败。请确保 Ollama 服务正在运行：
```bash
ollama ps  # 检查运行状态
ollama serve  # 启动服务
```

### Q4: 可以更换其他 embedding 模型吗？

**A**: 可以。只需：
1. 拉取新模型：`ollama pull 模型名`
2. 修改配置：`"model": "模型名"`
3. 重建索引：`openclaw memory index --force`

### Q5: 索引需要多久重建一次？

**A**: OpenClaw 会自动监控记忆文件变化并增量更新。手动强制重建：
```bash
openclaw memory index --force
```

---

## 相关资源

- **OpenClaw 官方文档**: https://docs.openclaw.ai/concepts/memory
- **Issue #15639** (local provider bug): https://github.com/openclaw/openclaw/issues/15639
- **Ollama Embedding API**: https://github.com/ollama/ollama/blob/main/docs/api.md#generate-embeddings
- **nomic-embed-text 模型**: https://ollama.com/library/nomic-embed-text

---

## 总结

通过 `provider: "openai"` + `remote.baseUrl` 指向 Ollama，是使用 OpenClaw Memory Search 的**最佳方案**：

- ✅ 稳定可靠（避开 local provider bug）
- ✅ 完全本地（无需 API 费用）
- ✅ 性能优秀（0.45 秒响应）
- ✅ 配置简单（只需 4 个字段）

按照本指南配置后，你将获得一个高效、稳定的本地向量搜索系统。🎯

---

*最后更新：2026-02-28*
