1:"$Sreact.fragment"
2:I[9113,["177","static/chunks/app/layout-46f5ac64a413e030.js"],"GoogleAnalytics"]
3:I[9766,[],""]
4:I[8924,[],""]
6:I[4431,[],"OutletBoundary"]
8:I[5278,[],"AsyncMetadataOutlet"]
a:I[4431,[],"ViewportBoundary"]
c:I[4431,[],"MetadataBoundary"]
d:"$Sreact.suspense"
f:I[7150,[],""]
:HL["/_next/static/css/aa32b0b675e4c200.css","style"]
0:{"P":null,"b":"kf3c0GpMIXhLjU6mThM2t","p":"","c":["","blog","telegram-bot-complete-guide",""],"i":false,"f":[[["",{"children":["blog",{"children":[["slug","telegram-bot-complete-guide","d"],{"children":["__PAGE__",{}]}]}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aa32b0b675e4c200.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"zh-CN","children":[["$","head",null,{"children":["$","$L2",null,{}]}],["$","body",null,{"className":"antialiased bg-white text-gray-900","children":["$","$L3",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}]]}]]}],{"children":["blog",["$","$1","c",{"children":[null,["$","$L3",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":[["slug","telegram-bot-complete-guide","d"],["$","$1","c",{"children":[null,["$","$L3",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":["__PAGE__",["$","$1","c",{"children":["$L5",null,["$","$L6",null,{"children":["$L7",["$","$L8",null,{"promise":"$@9"}]]}]]}],{},null,false]},null,false]},null,false]},null,false],["$","$1","h",{"children":[null,[["$","$La",null,{"children":"$Lb"}],null],["$","$Lc",null,{"children":["$","div",null,{"hidden":true,"children":["$","$d",null,{"fallback":null,"children":"$Le"}]}]}]]}],false]],"m":"$undefined","G":["$f",[]],"s":false,"S":true}
10:I[2619,["619","static/chunks/619-ba102abea3e3d0e4.js","84","static/chunks/84-3f02a199564964c0.js","953","static/chunks/app/blog/%5Bslug%5D/page-a88c1b847078254e.js"],""]
11:I[3874,["619","static/chunks/619-ba102abea3e3d0e4.js","84","static/chunks/84-3f02a199564964c0.js","953","static/chunks/app/blog/%5Bslug%5D/page-a88c1b847078254e.js"],"ArticleContent"]
12:T11d3,
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
2. 在搜索框输入 `BotFather`
3. 点击带有蓝色认证勾的 `@BotFather`

### 1.2 创建新 Bot

**发送命令:**
```
/newbot
```

**按提示操作:**
1. BotFather 会要求你输入 Bot 名称（显示名称）
   - 例如：`My OpenClaw Assistant`
   - 可以包含空格，用户会看到这个名字

2. 然后要求输入 Bot 用户名（唯一标识）
   - 必须以 `bot` 结尾
   - 例如：`my_claw_bot` 或 `myclawassistant_bot`
   - 不能包含空格

### 1.3 获取 Bot Token

创建成功后，BotFather 会发送一条消息包含 Token。

**重要:** 复制 Token 部分，例如：`123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

> ⚠️ **安全提示:** Token 就像密码，不要泄露给他人！

---

## 步骤 2: 配置 OpenClaw

### 2.1 打开配置文件

找到你的 OpenClaw 配置文件：

```bash
~/.openclaw/openclaw.json
```

### 2.2 添加 Telegram 配置

在配置文件的 `channels` 部分添加：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
    }
  }
}
```

### 2.3 保存配置文件

保存后，验证 JSON 格式是否正确。

---

## 步骤 3: 重启 OpenClaw Gateway

配置更改后需要重启 Gateway 才能生效：

```bash
openclaw gateway restart
```

等待启动完成，看到以下输出表示成功：

```
✓ Gateway started on port 18789
```

---

## 步骤 4: 测试连接

### 4.1 在 Telegram 中找到你的 Bot

1. 在 Telegram 搜索框输入你设置的 Bot 用户名
2. 例如：`@my_claw_bot`
3. 点击进入聊天界面

### 4.2 发送测试消息

发送任意消息，例如：
```
你好
```

如果配置正确，你的 AI 助手会回复你！

### 4.3 常用命令测试

尝试发送以下命令：

```
/help          # 查看帮助
/session       # 查看会话信息
/clear         # 清空当前会话
```

---

## 🔧 常见问题

### Q1: Bot 不回复消息

**可能原因:**
- Token 配置错误
- Gateway 未启动
- 网络问题

**解决方案:**
1. 检查配置文件中的 Token 是否正确
2. 检查 Gateway 状态：`openclaw gateway status`
3. 查看日志：`openclaw logs`

### Q2: 提示 "Channel not enabled"

**原因:** Telegram 频道未启用

**解决:** 确保配置文件中 `enabled: true`

### Q3: Token 泄露了怎么办？

**紧急处理:**
1. 立即在 BotFather 中发送 `/revoke`
2. 获取新 Token
3. 更新配置文件
4. 重启 Gateway

### Q4: 如何让 Bot 回复群组消息？

**步骤:**
1. 将 Bot 添加到群组
2. 在群组中发送 `/start`
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

```
/setuserpic   # 设置头像
/setabouttext # 设置关于信息
/setdescription # 设置描述
```

### 配置隐私模式

在群组中，Bot 默认只能看到以下消息：
- @提及 Bot 的消息
- 回复 Bot 的消息
- Bot 发送的命令

如需看到所有消息，需要：
1. 给 Bot 管理员权限
2. 或在 BotFather 中关闭隐私模式：`/setprivacy` → Disabled

---

## ✅ 验证清单

配置完成后，检查以下项目：

- [ ] 能在 Telegram 中搜索到 Bot
- [ ] 发送消息后能收到回复
- [ ] `/help` 命令正常工作
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
    5:["$","div",null,{"className":"min-h-screen bg-gradient-to-b from-slate-50 to-white","children":["$","div",null,{"className":"max-w-4xl mx-auto px-4 py-12","children":[["$","$L10",null,{"href":"/blog","className":"text-gray-600 hover:text-orange-600 mb-8 block","children":"返回博客"}],["$","article",null,{"className":"bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden","children":[["$","div",null,{"className":"bg-gradient-to-br from-orange-500 to-red-600 p-12 text-white","children":[["$","div",null,{"className":"flex items-center gap-4 mb-4 text-sm opacity-90","children":[["$","span",null,{"children":"2026-02-24"}],["$","span",null,{"children":"10 分钟"}]]}],["$","h1",null,{"className":"text-3xl font-bold","children":"Telegram Bot 详细配置指南"}]]}],["$","$L11",null,{"content":"$12"}]]}]]}]}]
b:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
7:null
9:{"metadata":[["$","title","0",{"children":"OpenClaw 中文教程 - 自托管 AI 网关"}],["$","meta","1",{"name":"description","content":"OpenClaw 中文教程网站 - 学习如何部署和配置 OpenClaw，将 AI 助手接入 WhatsApp、Telegram、Discord 等聊天应用"}],["$","meta","2",{"name":"author","content":"OpenClaw 中文社区"}],["$","meta","3",{"name":"keywords","content":"OpenClaw, AI, 自托管, WhatsApp, Telegram, Discord, 教程"}],["$","meta","4",{"property":"og:title","content":"OpenClaw 中文教程"}],["$","meta","5",{"property":"og:description","content":"自托管 AI 网关，连接你的所有聊天应用"}],["$","meta","6",{"property":"og:type","content":"website"}],["$","meta","7",{"name":"twitter:card","content":"summary"}],["$","meta","8",{"name":"twitter:title","content":"OpenClaw 中文教程"}],["$","meta","9",{"name":"twitter:description","content":"自托管 AI 网关，连接你的所有聊天应用"}]],"error":null,"digest":"$undefined"}
e:"$9:metadata"
