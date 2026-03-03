# 🤖 自动巡检维护指令

**执行者:** claw-admin
**频率:** 每天 09:00
**任务:** 自动巡检和维护 OpenClaw 中文教程网站

---

## 每日自动执行清单

### 1. 网站健康检查
- [ ] 检查网站服务是否运行 (localhost:3000)
- [ ] 如未运行，自动重启
- [ ] 检查关键页面 HTTP 200: /, /docs, /blog, /about

### 2. 构建测试
- [ ] 运行 npm run build 测试构建
- [ ] 如构建失败，记录错误并尝试修复

### 3. Git 同步
- [ ] 检查未提交更改
- [ ] 自动提交更改
- [ ] 推送到远程

### 4. 日志清理
- [ ] 删除 30 天前的巡检日志
- [ ] 清理 npm 缓存（每周日）

### 5. 安全检查
- [ ] 运行 npm audit 检查安全漏洞
- [ ] 检查磁盘空间使用率

### 6. 内容更新检查 ✅ **每日至少4篇**
- [ ] 检查 claw-article/workspace/articles/ 待发布文章
- [ ] 选择4篇文章转换为 MDX 格式
- [ ] 添加 Frontmatter 元数据
- [ ] 发布到 content/articles/published/
- [ ] 更新已发布文章列表

### 7. 生成报告
- [ ] 生成巡检报告
- [ ] 生成文章发布摘要
- [ ] 如有异常，记录到 alerts.log

---

## 📋 文章发布管理

### 待发布文章池 (claw-article/workspace/articles/)
| # | 文件名 | 标题 | 状态 |
|---|--------|------|------|
| 1 | openclaw-search-guide.md | OpenClaw 搜索功能完全使用指南 | 🕐 待发布 |
| 2 | nextjs-14-new-features.md | Next.js 14 新特性深度解析 | 🕐 待发布 |
| 3 | redclaw-deployment-guide.md | RedClaw 部署完全指南 | 🕐 待发布 |
| 4 | multi-agent-collaboration-practice-v2.md | 多 Agent 协作实战 V2 | 🕐 待发布 |
| 5 | website-search-tutorial.md | 网站搜索教程 | 🕐 待发布 |
| 6 | multi-agent-collaboration-practice.md | 多 Agent 协作实战 | 🕐 待发布 |
| 7 | 2026-02-24-telegram-complete-guide.md | Telegram 完整指南 | 🕐 待发布 |
| 8 | 2026-02-15-ai-agent-trends.mdx | AI Agent 趋势 | 🕐 待发布 |

### 今日发布计划 (2026-03-03) ✅ 已完成
- [x] 1. openclaw-search-guide.md → 2026-03-03-openclaw-search-guide.mdx
- [x] 2. nextjs-14-new-features.md → 2026-03-03-nextjs-14-features.mdx
- [x] 3. redclaw-deployment-guide.md → 2026-03-03-redclaw-deployment-guide.mdx
- [x] 4. multi-agent-collaboration-practice-v2.md → 2026-03-03-multi-agent-collaboration-v2.mdx

---

## 🆕 每日完整工作流（新）

**执行脚本:** `scripts/daily-workflow.sh`
**执行时间:** 每天 09:00
**功能:** 资料整理 → 任务安排 → 内容创作 → 自动发布

### 工作流7个阶段

| 阶段 | 任务 | 负责 Agent |
|------|------|-----------|
| 1 | 资料整理 | claw-collect |
| 2 | 任务安排 | claw-admin |
| 3 | 内容处理 | claw-article |
| 4 | 网站构建 | claw-code |
| 5 | 部署发布 | claw-code |
| 6 | Git 同步 | claw-admin |
| 7 | 生成报告 | claw-admin |

---

## 响应规则

1. **如果一切正常**: 回复 HEARTBEAT_OK **并主动告知用户巡检完成和文章发布情况**
2. **如果发现异常**: 执行修复并报告问题
3. **如果无法自动修复**: 发送告警通知用户

---

## 📢 用户偏好

- ✅ 每日任务执行后 **主动汇报结果**（2026-03-03 更新）
- ✅ **每日至少发布4篇文章**（2026-03-03 更新）

---

*配置时间: 2026-02-24*
*执行者: claw-admin*
*更新时间: 2026-03-03 - 新增每日4篇文章发布任务*

---

## ✅ 已发布文章清单

### 已发布 (2026-02-28)
1. Memory Search 配置指南 ✅
2. Heartbeat 配置指南 ✅
3. OpenClaw 搜索功能完全使用指南 ✅
4. Next.js 14 新特性深度解析 ✅
5. 多 Agent 协作实战 V2 ✅

### 2026-02-25
- Telegram 完整指南 ✅

---

*更新时间：2026-03-03 13:10*
