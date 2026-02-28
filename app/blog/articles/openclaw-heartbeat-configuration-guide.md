# OpenClaw Heartbeat 完全配置指南 - 让 AI 主动汇报工作

> **发布日期**: 2026-02-28  
> **标签**: #OpenClaw #Heartbeat #配置指南 #自动化  
> **分类**: 技术文档

---

## 📋 目录

1. [Heartbeat 是什么](#heartbeat-是什么)
2. [配置方式](#配置方式)
3. [配置字段说明](#配置字段说明)
4. [HEARTBEAT.md 文件](#heartbeatmd-文件)
5. [实际案例](#实际案例)
6. [Heartbeat vs Cron](#heartbeat-vs-cron)
7. [常见问题](#常见问题)

---

## Heartbeat 是什么

**Heartbeat（心跳）** 是 OpenClaw 的定期触发机制，让 AI Agent 主动检查后台任务并汇报。

**工作原理：**
```
每 30 分钟 (可配置)
    ↓
Gateway 触发心跳
    ↓
Agent 读取 HEARTBEAT.md (如果存在)
    ↓
Agent 执行心跳任务 (检查邮箱、日历、待办等)
    ↓
如果有需要关注的 → 发送消息给用户
如果一切正常 → 回复 HEARTBEAT_OK (自动丢弃，不发送)
```

**特点：**
- ✅ 有事汇报，没事沉默
- ✅ 避免打扰用户
- ✅ 保持后台任务监控

---

## 配置方式

### 方式 1：全局配置（所有 agent）

```json5
// ~/.openclaw/openclaw.json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "30m",
        "target": "none",
        "directPolicy": "allow"
      }
    }
  }
}
```

### 方式 2：针对特定 agent 配置

```json5
{
  "agents": {
    "list": [
      { "id": "main" },  // 不配置 heartbeat，不运行心跳
      {
        "id": "claw-admin",
        "heartbeat": {
          "every": "30m",
          "target": "none",
          "directPolicy": "allow"
        }
      }  // 运行心跳
    ]
  }
}
```

**注意：** 如果任何 `agents.list[]` 包含 `heartbeat` 块，**只有这些 agent** 会运行心跳。

---

## 配置字段说明

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `every` | `"30m"` | 心跳间隔，`"0m"` 禁用 |
| `target` | `"none"` | `"none"` (不发送) \| `"last"` (最后联系人) \| 频道 ID |
| `directPolicy` | `"allow"` | `"allow"` 允许 DM \| `"block"` 禁止 DM |
| `prompt` | (默认) | 自定义心跳提示词 |
| `activeHours` | (无) | 活动时间窗口 `{start: "09:00", end: "22:00"}` |
| `includeReasoning` | `false` | 是否发送推理过程 |

### target 选项

| 值 | 说明 |
|------|------|
| `"none"` | 运行心跳但不发送消息（静默模式） |
| `"last"` | 发送到最后使用的外部频道 |
| `"whatsapp"` | 发送到 WhatsApp |
| `"telegram"` | 发送到 Telegram |
| `"discord"` | 发送到 Discord |

---

## HEARTBEAT.md 文件

### 位置
agent workspace 根目录（如 `~/.openclaw/workspace-claw-admin/HEARTBEAT.md`）

### 示例内容

```markdown
# HEARTBEAT.md - claw-admin 心跳任务

## 定期任务
- [ ] 检查 `docs/` 目录中的新文章
- [ ] 发布新文章到知识库服务器
- [ ] 监控 OpenClaw 配置变更

## 当前待办
- 发布文章：`docs/openclaw-memory-search-ollama-guide.md`
```

### 心跳提示词

默认提示词（不可修改）：
```
Read HEARTBEAT.md if it exists (workspace context).
Follow it strictly.
Do not infer or repeat old tasks from prior chats.
If nothing needs attention, reply HEARTBEAT_OK.
```

---

## 实际案例

### 案例 1: claw-admin 配置

**位置**: `~/.openclaw/workspace-claw-admin/`

**配置**:
```json
{
  "id": "claw-admin",
  "workspace": "/Users/openmilo/clawall/claw-team/claw-admin",
  "heartbeat": {
    "every": "30m",
    "target": "none",
    "directPolicy": "allow"
  }
}
```

**HEARTBEAT.md**:
```markdown
# HEARTBEAT.md - claw-admin 心跳任务

## 定期任务
- [ ] 检查 `docs/` 目录中的新文章
- [ ] 发布新文章到知识库服务器
- [ ] 监控 OpenClaw 配置变更

## 当前待办
- 发布文章：`docs/openclaw-memory-search-ollama-guide.md`
```

### 案例 2: xhs-admin 配置

**位置**: `~/.openclaw/workspace/xhs-admin/`

**配置**:
```json
{
  "id": "xhs-admin",
  "heartbeat": {
    "every": "30m",
    "target": "none"
  }
}
```

**任务**: 小红书账号监控、笔记发布检查

---

## Heartbeat vs Cron

| 特性 | Heartbeat | Cron |
|------|-----------|------|
| **触发方式** | 定期（如每 30 分钟） | 定时（如每天 9:00） |
| **适合场景** | 后台检查、主动汇报 | 精确时间的任务 |
| **配置位置** | `agents.defaults.heartbeat` | `cron.jobs[]` |
| **会话隔离** | 在主会话运行 | 独立会话 |
| **提示词** | 读取 HEARTBEAT.md | 在 cron job 中定义 |

**选择建议：**
- 需要**定期检查** → 用 Heartbeat
- 需要**精确时间** → 用 Cron
- 需要**会话隔离** → 用 Cron

---

## 常见问题

### Q1: 如何禁用心跳？

```json5
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "0m"  // 设为 0m 禁用
      }
    }
  }
}
```

### Q2: 如何让心跳发送消息给我？

```json5
{
  "heartbeat": {
    "every": "30m",
    "target": "last"  // 发送到最后的联系人
  }
}
```

### Q3: 如何只在白天运行心跳？

```json5
{
  "heartbeat": {
    "every": "30m",
    "activeHours": {
      "start": "09:00",
      "end": "22:00",
      "timezone": "Asia/Shanghai"
    }
  }
}
```

### Q4: 心跳回复 HEARTBEAT_OK 后会怎样？

- `HEARTBEAT_OK` 会被自动识别
- 如果回复只有 `HEARTBEAT_OK` 或内容很短（≤300 字符），消息会被丢弃
- 用户不会收到"一切正常"的汇报

### Q5: 如何自定义心跳提示词？

```json5
{
  "heartbeat": {
    "every": "30m",
    "prompt": "检查系统状态，如果有异常立即汇报。"
  }
}
```

---

## 相关资源

- **OpenClaw 官方文档**: https://docs.openclaw.ai/gateway/heartbeat
- **Cron vs Heartbeat**: https://docs.openclaw.ai/automation/cron-vs-heartbeat
- **配置参考**: https://docs.openclaw.ai/gateway/configuration-reference

---

## 总结

Heartbeat 是 OpenClaw 的**主动检查机制**：

- ✅ 定期触发（默认 30 分钟）
- ✅ 读取 HEARTBEAT.md 任务清单
- ✅ 有事汇报，没事沉默
- ✅ 配置简单，效果显著

通过合理配置 Heartbeat，你可以让 AI 助手成为真正的"主动型"助手，而不是被动等待指令。🎯

---

*最后更新：2026-02-28*
