# 🤖 OpenClaw 网站管理团队

**创建时间:** 2026-02-24  
**管理者:** claw-admin  
**项目:** OpenClaw 中文教程网站

---

## 👥 团队成员

| 角色 | 职责 | 工作目录 | 模型 | 状态 |
|------|------|----------|------|------|
| **claw-admin** | 管理者、协调、决策 | `/claw-admin/` | `kimi-coding/k2p5` | 🟢 活跃 |
| **claw-article** | 内容创作、文章撰写 | `/claw-article/` | `kimi-coding/k2p5` | ⏸️ 待命 |
| **claw-code** | 开发运维、网站构建 | `/claw-code/` | `kimi-coding/k2p5` | 🟢 活跃 |
| **claw-collect** | 信息采集、资料搜索 | `/claw-collect/` | `ollama/qwen3:8b` | ⏸️ 待命 |

---

## 🎯 当前任务

查看本周任务清单: [TASKS_WEEK_2026-02-24.md](./TASKS_WEEK_2026-02-24.md)

查看维护方案: [MAINTENANCE_PLAN.md](./MAINTENANCE_PLAN.md)

### 本周重点
1. **完善频道接入教程** — claw-article 负责编写 Telegram、Discord 详细配置
2. **添加搜索功能** — claw-code 负责实现网站搜索
3. **收集最新功能** — claw-collect 负责跟踪 OpenClaw 更新

---

## 🔄 工作流程

### 任务分配流程

```
用户/需求 → claw-admin (分析/分解)
                ↓
        ┌───────┼───────┐
        ↓       ↓       ↓
   claw-  claw-  claw-
   article code   collect
   (内容) (开发) (资料)
        ↓       ↓       ↓
        └───────┼───────┘
                ↓
          claw-admin (审核/整合)
                ↓
            完成任务
```

### 各角色工作流程

#### claw-admin (管理者)
1. 接收用户需求
2. 分析任务并分解
3. 分配给合适角色
4. 跟进进度
5. 审核输出
6. 整合结果并交付

#### claw-article (内容创作)
1. 接收写作主题
2. 向 claw-collect 请求资料（如有需要）
3. 撰写文章
4. 保存到 `workspace/articles/`
5. 通知 claw-admin 完成

#### claw-code (开发运维)
1. 接收开发任务
2. 修改代码
3. 本地构建测试 `npm run build`
4. 提交到 Git
5. 记录日志到 `logs/`
6. 通知 claw-admin 完成

#### claw-collect (信息采集)
1. 接收采集任务
2. 使用 web_search / browser 收集信息
3. 整理成报告
4. 保存到 `memory/`
5. 通知 claw-admin 完成

---

## 📝 工作记录

### 2026-02-24 工作日志

#### 已完成
- ✅ 修复首页所有链接（`.html` → Next.js 路由）
- ✅ 创建缺失页面:
  - `/docs/intro` - OpenClaw 介绍
  - `/docs/config/providers` - AI 提供商设置
  - `/docs/config/sessions` - 会话管理
  - `/blog/[slug]` - 博客文章动态路由
- ✅ 移除不存在的文章链接
- ✅ 网站全面测试，所有页面 200

#### 待办
- [ ] 博客文章内容填充（当前为占位）
- [ ] 网站部署到生产环境
- [ ] 持续内容更新计划

---

## 📋 常用命令速查

```bash
# 网站开发 (claw-code)
cd claw-code/workspace/website
npm run dev      # 开发服务器
npm run build    # 构建静态站点

# Git 操作
git add .
git commit -m "描述"
git push origin main

# 服务管理
openclaw gateway restart
```

---

## 📁 项目结构

```
claw-team/
├── claw-admin/          # 管理者
│   ├── TEAM.md          # 本文档
│   └── workspace/       # 工作空间
│
├── claw-article/        # 内容创作
│   ├── SKILL.md
│   └── workspace/
│       └── articles/    # 文章输出
│
├── claw-code/           # 开发运维
│   ├── SKILL.md
│   ├── logs/            # 部署日志
│   └── workspace/
│       └── website/     # Next.js 网站
│           ├── app/     # 页面源码
│           └── dist/    # 构建输出
│
└── claw-collect/        # 信息采集
    ├── SKILL.md
    └── memory/          # 采集报告
```

---

## ⚡ 快速任务模板

### 发布新文章
```
claw-admin → 分配主题 → claw-collect (收集资料)
                              ↓
                    claw-article (撰写文章)
                              ↓
                    claw-code (更新网站)
                              ↓
                         claw-admin (发布)
```

### 修复网站问题
```
claw-admin → 问题分析 → claw-code (修复代码)
                              ↓
                    构建测试 + Git 提交
                              ↓
                         claw-admin (验证)
```

---

*最后更新: 2026-02-24 by claw-admin*
