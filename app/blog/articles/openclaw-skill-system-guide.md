# OpenClaw Skill 系统完全指南：打造你的专属工具集

> 从使用到开发，全面掌握 OpenClaw 的 Skill 系统

**发布日期**: 2026-02-28  
**阅读时间**: 25 分钟  
**标签**: #OpenClaw #Skill #工具开发 #进阶教程

---

## 什么是 Skill？

**Skill（技能）** 是 OpenClaw 用来教 Agent 如何使用工具的指令集合。每个 Skill 是一个包含 `SKILL.md` 文件的目录，其中定义了：

- 工具的描述和用途
- 调用参数说明
- 使用示例和最佳实践

OpenClaw 使用 **[AgentSkills](https://agentskills.io)** 兼容格式，这意味着你可以使用社区共享的 Skill。

---

## Skill 的三种来源

### 1. 内置技能 (Bundled)

OpenClaw 安装时自带的技能，包括：
- `browser` - 浏览器控制
- `exec` - 执行命令
- `web_search` - 网络搜索
- `web_fetch` - 网页抓取
- `read` / `write` - 文件操作

### 2. 共享技能 (Managed)

安装在 `~/.openclaw/skills`，所有 Agent 都可以使用：

```bash
# 查看已安装的共享技能
ls ~/.openclaw/skills/
```

### 3. 专属技能 (Workspace)

放在 Agent 工作空间的 `skills/` 目录，仅当前 Agent 可用：

```
workspace/
├── AGENTS.md
├── skills/
│   ├── my-custom-tool/
│   │   └── SKILL.md
│   └── internal-api/
│       └── SKILL.md
└── ...
```

---

## 加载优先级

当技能名称冲突时，优先级从高到低：

```
<workspace>/skills/    (最高)
    ↓
~/.openclaw/skills/     (共享)
    ↓
内置技能                (最低)
```

你也可以通过配置添加额外的技能目录：

```json
{
  "skills": {
    "load": {
      "extraDirs": ["/path/to/shared/skills"]
    }
  }
}
```

---

## 使用 ClawHub 管理技能

**ClawHub** 是 OpenClaw 的官方技能仓库：[https://clawhub.com](https://clawhub.com)

### 常用命令

```bash
# 安装技能到当前工作空间
clawhub install weather

# 更新所有已安装技能
clawhub update --all

# 同步技能（扫描 + 发布更新）
clawhub sync --all

# 搜索技能
clawhub search database
```

### 安装位置

默认安装到当前目录的 `./skills`，或回退到配置的 OpenClaw workspace。

---

## 创建自定义 Skill

### 基本结构

```
my-skill/
└── SKILL.md          # 必须文件
```

### SKILL.md 格式

```markdown
---
name: my-api-client
description: 调用内部 API 的客户端工具
---

# My API Client

用于调用公司内部 REST API 的工具。

## 工具

### my_api_call

调用 API 端点。

**参数**:
- `endpoint` (string, required): API 端点路径
- `method` (string): HTTP 方法，默认 GET
- `data` (object): 请求体数据

**示例**:
```typescript
// 获取用户信息
await my_api_call({
  endpoint: "/users/123",
  method: "GET"
});

// 创建订单
await my_api_call({
  endpoint: "/orders",
  method: "POST",
  data: { product: "A001", quantity: 2 }
});
```

**注意事项**:
- 所有请求自动包含认证头
-  Rate limit: 100 请求/分钟
```

---

## 进阶配置

### 技能门控 (Gating)

控制技能何时可用：

```json
{
  "skills": {
    "entries": [
      {
        "name": "production-deploy",
        "enabled": false,              // 默认禁用
        "env": {                       // 环境变量
          "DEPLOY_TOKEN": "xxx"
        },
        "onlyIf": {
          "env": "DEPLOY_TOKEN"       // 仅当环境变量存在时启用
        }
      }
    ]
  }
}
```

### 按通道启用

```json
{
  "skills": {
    "entries": [
      {
        "name": "admin-tools",
        "channels": ["slack", "discord"],  // 仅在特定频道可用
        "users": ["admin@company.com"]    // 仅限特定用户
      }
    ]
  }
}
```

---

## 安全最佳实践

⚠️ **重要提醒**:

1. **第三方技能视为不可信代码**
   - 安装前仔细阅读 SKILL.md
   - 了解工具会执行什么操作

2. **敏感信息处理**
   - 使用 `env` 或 `apiKey` 注入密钥
   - 不要将密钥写在 prompt 中
   - 密钥仅注入主机进程（不在沙盒中）

3. **沙盒建议**
   - 对不可信输入启用沙盒
   - 高风险工具使用沙盒运行
   - 参考 [Sandboxing](/gateway/sandboxing)

4. **权限控制**
   - 使用门控限制敏感技能
   - 按用户/通道控制访问
   - 生产环境禁用开发工具

---

## 实战：创建数据库查询 Skill

### 目录结构

```
db-query-skill/
└── SKILL.md
```

### SKILL.md 内容

```markdown
---
name: db-query
description: 安全的数据库查询工具
---

# Database Query Tool

只读查询公司内部数据库。

## 工具

### query_sql

执行 SQL 查询（仅 SELECT）。

**参数**:
- `sql` (string, required): SQL 查询语句
- `limit` (number): 最大返回行数，默认 100

**示例**:
```typescript
// 查询最近订单
await query_sql({
  sql: "SELECT * FROM orders ORDER BY created_at DESC LIMIT 10"
});

// 统计用户数
await query_sql({
  sql: "SELECT COUNT(*) as total FROM users WHERE status = \u0027active\u0027"
});
```

**限制**:
- 仅允许 SELECT 语句
- 单表最大返回 1000 行
- 查询超时 30 秒

**安全**:
- 自动过滤危险操作 (DROP, DELETE, UPDATE)
- 敏感字段自动脱敏
```

### 安装使用

```bash
# 复制到工作空间
mkdir -p ~/my-project/skills
cp -r db-query-skill ~/my-project/skills/

# 重启 OpenClaw 后生效
```

---

## 故障排查

### Skill 未加载

1. 检查目录结构是否正确
2. 确认 SKILL.md 格式有效
3. 查看是否有语法错误

### 工具调用失败

1. 检查参数类型是否匹配
2. 确认环境变量已配置
3. 查看 OpenClaw 日志

### 权限问题

1. 检查门控配置
2. 确认用户/通道白名单
3. 验证技能是否被禁用

---

## 总结

Skill 系统是 OpenClaw 最强大的功能之一：

✅ **扩展性**: 轻松添加新工具能力  
✅ **可复用**: 通过 ClawHub 分享和复用  
✅ **安全**: 门控机制控制访问权限  
✅ **灵活**: 支持自定义开发  

掌握 Skill 系统，你就能为 Agent 装备任何需要的工具。

---

**相关资源**:
- [OpenClaw Skill 深度实践指南](/blog/openclaw-skills-guide)
- [ClawHub 官网](https://clawhub.com)
- [AgentSkills 规范](https://agentskills.io)

---

*本文整理自 OpenClaw 官方文档*
