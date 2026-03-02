# 🤖 Telegram Bot 详细配置指南

> 完整教程：从创建 Bot 到接入 OpenClaw，全程只需 5 分钟

---

## 📋 概述

| 项目 | 说明 |
|------|------|
| **难度** | ⭐ 简单 |
| **预计时间** | 5-10 分钟 |
| **前提条件** | 已有 Telegram 账号 |
| **输出结果** | 可用的 Telegram AI 助手 |

---

## 步骤 1: 创建 Bot (1分钟)

### 1.1 打开 BotFather

1. 在 Telegram 中搜索 `@BotFather`
2. 点击「开始」或发送 `/start`

### 1.2 创建新 Bot

发送命令：
```
/newbot
```

BotFather 会要求你：
1. **输入 Bot 名称** - 显示名称（如"我的AI助手"）
2. **输入用户名** - 必须以 `bot` 结尾（如 `myaihelper_bot`）

✅ **成功提示：**
```
Done! Congratulations on your new bot. 
You will find it at t.me/myaihelper_bot
Use this token to access the HTTP API:
123456789:ABCdefGHIjklMNOpqrSTUvwxyz
```

⚠️ **重要：** 保存好你的 **Token**（上面那串字符），后面会用到！

---

## 步骤 2: 配置 Bot 功能 (2分钟)

### 2.1 设置命令菜单

发送给 BotFather：
```
/setcommands
```

选择你的 Bot，然后发送命令列表：
```
start - 开始使用
help - 查看帮助
reset - 重置对话
status - 查看状态
```

### 2.2 设置 Bot 描述（可选）

```
/setdescription
```

输入描述，例如：
```
我是你的私人 AI 助手，可以帮你回答问题、生成内容、处理任务。
Powered by OpenClaw + Claude/GPT
```

### 2.3 设置关于信息（可选）

```
/setabouttext
```

输入简介，例如：
```
🤖 AI 智能助手
📚 知识问答 | 📝 内容创作 | 💻 代码辅助
🔒 端到端加密 | 🏠 自托管 | 🔓 隐私优先
```

---

## 步骤 3: 配置 OpenClaw (2分钟)

### 3.1 编辑配置文件

打开 OpenClaw 配置文件：
```bash
# 使用你喜欢的编辑器
nano ~/.openclaw/config.yaml
# 或
vim ~/.openclaw/config.yaml
# 或直接在图形界面编辑
```

### 3.2 添加 Telegram 频道配置

在 `channels.telegram` 部分添加：

```yaml
channels:
  telegram:
    enabled: true
    bots:
      - name: "my-ai-bot"           # 内部名称，自定义
        token: "YOUR_BOT_TOKEN"     # 替换为你的 Token
        allowed_chats: []           # 留空表示允许所有聊天
        # allowed_chats: [123456789]  # 或指定允许的用户ID
```

### 3.3 保存并重启

保存文件后，重启 OpenClaw Gateway：
```bash
openclaw gateway restart
```

---

## 步骤 4: 测试连接 (1分钟)

### 4.1 在 Telegram 中测试

1. 打开你的 Bot（搜索用户名如 `@myaihelper_bot`）
2. 点击「开始」或发送 `/start`
3. 发送任意消息，如 "你好"

### 4.2 验证响应

如果配置正确，Bot 会在几秒钟内回复 AI 生成的消息。

✅ **成功标志：** 收到 AI 回复  
❌ **无响应：** 检查 Gateway 日志

查看日志排查问题：
```bash
openclaw logs --follow
```

---

## 🔧 常见问题

### Q1: Bot 不回复消息

**检查清单：**
- [ ] Token 是否复制正确（包含数字和冒号）
- [ ] Gateway 是否已重启
- [ ] 网络是否能访问 Telegram API
- [ ] 查看日志是否有错误信息

### Q2: 如何限制特定用户使用

在 `allowed_chats` 中添加用户 ID：
```yaml
allowed_chats: [123456789, 987654321]
```

获取用户 ID 的方法：
- 让用户发送消息给 Bot
- 查看日志中的 `chat.id`
- 或临时使用 `@userinfobot`

### Q3: 如何让 Bot 支持群聊

1. 将 Bot 添加到群组
2. 在群组中发送 `/start` 或直接 @Bot 提问
3. 如需限制群聊，将群组 ID 加入 `allowed_chats`

> 群组 ID 通常是负数，如 `-1001234567890`

### Q4: 如何自定义 Bot 的 AI 人格

在配置中添加系统提示词：
```yaml
channels:
  telegram:
    enabled: true
    bots:
      - name: "my-ai-bot"
        token: "YOUR_TOKEN"
        system_prompt: |
          你是一个友好、专业的 AI 助手。
          回答要简洁明了，使用中文。
          如果不确定，请诚实地说不知道。
```

---

## 🚀 进阶配置

### 启用语音消息（可选）

配置语音转文字：
```yaml
channels:
  telegram:
    bots:
      - name: "my-ai-bot"
        token: "YOUR_TOKEN"
        voice:
          enabled: true
          # 使用 OpenAI Whisper 或其他服务
          stt_provider: "openai"
          stt_model: "whisper-1"
```

### 使用特定 AI 模型

为 Bot 指定模型：
```yaml
channels:
  telegram:
    bots:
      - name: "my-ai-bot"
        token: "YOUR_TOKEN"
        model: "claude-3-5-sonnet-20241022"  # 或其他模型
```

---

## 📝 配置示例（完整版）

```yaml
channels:
  telegram:
    enabled: true
    bots:
      # 个人助手 Bot
      - name: "personal-assistant"
        token: "123456789:ABCdefGHIjklMNOpqrSTUvwxyz"
        allowed_chats: [123456789]  # 仅自己使用
        model: "claude-3-5-sonnet-20241022"
        system_prompt: |
          你是我的私人助手，帮我管理日常任务、回答问题和提供建议。

      # 家庭共享 Bot
      - name: "family-bot"
        token: "987654321:ZYXwvutsRQponMLKjihGFEDcba"
        allowed_chats: [111111111, 222222222, 333333333]
        model: "gpt-4o-mini"
        system_prompt: |
          你是一个友好的家庭助手，适合回答日常生活中的各种问题。
```

---

## ✅ 完成检查清单

- [ ] 已通过 BotFather 创建 Bot
- [ ] 已保存 Bot Token
- [ ] 已在 OpenClaw 中配置 Telegram 频道
- [ ] 已重启 Gateway
- [ ] Bot 能正常回复消息

---

## 🔗 相关资源

- [BotFather 官方文档](https://core.telegram.org/bots#botfather)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [OpenClaw 官方文档](/docs/channels/telegram)

---

**编写时间:** 2026-02-25  
**作者:** claw-article  
**版本:** 1.0
