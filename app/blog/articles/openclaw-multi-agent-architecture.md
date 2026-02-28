# OpenClaw 多 Agent 架构详解：从单 Agent 到团队协作

> 深入理解 OpenClaw 的多 Agent 路由机制，构建真正的 AI 团队协作系统

**发布日期**: 2026-02-28  
**阅读时间**: 20 分钟  
**标签**: #OpenClaw #MultiAgent #架构 #团队协作

---

## 什么是多 Agent 架构？

OpenClaw 的核心设计允许在一个 Gateway 进程中运行**多个完全隔离的 Agent**，每个 Agent 拥有独立的工作空间、认证配置和会话存储。

### 单 Agent vs 多 Agent

| 特性 | 单 Agent | 多 Agent |
|------|----------|----------|
| 工作空间 | 共享 | 完全隔离 |
| 认证配置 | 统一 | 各自独立 |
| 会话历史 | 混合 | 分离存储 |
| 技能加载 | 全局 | 可定制 |
| 适用场景 | 个人使用 | 团队协作 |

---

## 核心概念

### 1. Agent 的定义

一个 **Agent** 是一个完全独立的大脑，包含：

- **工作空间** (Workspace): 文件、AGENTS.md/SOUL.md/USER.md、本地笔记
- **状态目录** (agentDir): 认证配置、模型注册表、专属配置
- **会话存储** (Sessions): 聊天历史和路由状态

```
~/.openclaw/agents/<agentId>/
├── agent/
│   └── auth-profiles.json    # 独立的 API 密钥
├── sessions/                 # 隔离的会话历史
│   └── *.jsonl
└── config/                   # 专属配置
```

### 2. 认证隔离

每个 Agent 读取自己的认证文件：

```json
~/.openclaw/agents/<agentId>/agent/auth-profiles.json
```

⚠️ **重要**: 永远不要重复使用 `agentDir`，否则会导致认证和会话冲突。

---

## 快速开始：创建多 Agent

### 使用向导创建 Agent

```bash
# 创建一个工作 Agent
openclaw agents add work

# 创建一个个人 Agent
openclaw agents add personal

# 查看所有 Agent 和绑定
openclaw agents list --bindings
```

### 手动配置

编辑 `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "list": [
      {
        "id": "claw-admin",
        "workspace": "/Users/openmilo/clawall/claw-team/claw-admin",
        "agentDir": "~/.openclaw/agents/claw-admin/agent"
      },
      {
        "id": "claw-collect",
        "workspace": "/Users/openmilo/clawall/claw-team/claw-collect",
        "agentDir": "~/.openclaw/agents/claw-collect/agent"
      }
    ]
  }
}
```

---

## 消息路由：Bindings

Bindings 决定入站消息如何路由到特定 Agent。

### 绑定类型

```json
{
  "agents": {
    "bindings": [
      {
        "agentId": "claw-admin",
        "channel": "telegram",
        "accountId": "admin_bot"
      }
    ]
  }
}
```

### 路由规则

| 条件 | 路由到 |
|------|--------|
| 特定账号收到消息 | 绑定的 Agent |
| 无匹配绑定 | 默认 Agent (main) |
| 直接 @Agent | 被提及的 Agent |

---

## 实战案例：RedClaw 团队架构

我们的 4 Agent 协作系统：

```
┌─────────────────────────────────────────┐
│           Gateway (统一入口)             │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐            │
│  │claw-admin│  │claw-collect│          │
│  │ 项目经理  │  │ 研究员    │          │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │claw-article│ │claw-code │           │
│  │ 内容创作  │  │ 开发工程师│            │
│  └──────────┘  └──────────┘            │
└─────────────────────────────────────────┘
```

### 工作流

```
用户请求
    ↓
claw-admin 接收任务
    ↓
并行分配给:
├── claw-collect → 搜索资料
├── claw-article → 撰写内容
└── claw-code    → 技术实现
    ↓
claw-admin 整合结果
    ↓
部署上线
```

---

## 技能隔离

### 三种技能位置

1. **内置技能**: OpenClaw 安装包自带
2. **共享技能**: `~/.openclaw/skills` (所有 Agent 可用)
3. **专属技能**: `<workspace>/skills` (仅当前 Agent)

### 优先级

```
<workspace>/skills (最高)
    ↓
~/.openclaw/skills
    ↓
内置技能 (最低)
```

---

## 安全注意事项

### 隔离边界

- 每个 Agent 的 **workspace** 是默认工作目录，但不是硬沙盒
- 绝对路径可以访问主机其他位置（除非启用沙盒）
- 建议为敏感操作启用 Sandboxing

### 最佳实践

✅ **推荐做法**:
- 每个 Agent 独立的工作目录
- 不共享 `agentDir`
- 为生产环境启用沙盒

❌ **避免做法**:
- 多个 Agent 使用相同的 `agentDir`
- 在 Agent 之间共享敏感认证文件

---

## 总结

OpenClaw 的多 Agent 架构让你能够：

✅ **隔离**: 每个 Agent 独立的工作空间和配置  
✅ **协作**: 多个 Agent 并行处理不同任务  
✅ **灵活**: 通过 bindings 灵活路由消息  
✅ **安全**: 认证和状态完全隔离  

---

**相关资源**:
- [RedClaw 多 Agent 协作实战](/blog/multi-agent-collaboration-practice)
- [OpenClaw 官方文档](https://docs.openclaw.ai/concepts/multi-agent)

---

*本文整理自 OpenClaw 官方文档，结合 RedClaw 实战经验*
