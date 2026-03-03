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

### 6. 内容更新检查
- [ ] 检查 claw-article/workspace/articles/ 是否有新文章
- [ ] 如有新内容，发布到网站
- [ ] 更新博客列表

### 7. 生成报告
- [ ] 生成巡检报告
- [ ] 生成摘要
- [ ] 如有异常，记录到 alerts.log

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

### 自动化发布流程

1. **检查** `content/articles/` 目录中的新文章
2. **转换** Markdown 为 MDX 格式
3. **添加** Frontmatter 元数据
4. **构建** Next.js 网站
5. **部署** 到服务器 31.220.53.241
6. **验证** HTTP 200 状态
7. **提交** Git 更改
8. **生成** 日报报告

---

## 响应规则

1. **如果一切正常**: 回复 HEARTBEAT_OK **并主动告知用户巡检完成**
2. **如果发现异常**: 执行修复并报告问题
3. **如果无法自动修复**: 发送告警通知用户

---

## 📢 用户偏好

- ✅ 每日任务执行后 **主动汇报结果**（2026-03-03 更新）

---

*配置时间: 2026-02-24*
*执行者: claw-admin*
*更新时间: 2026-03-01 - 新增完整工作流*

---

## ✅ 已发布文章（2026-02-28）

### 1. Memory Search 配置指南 ✅
- **文件**: openclaw-memory-search-ollama-guide.md
- **标签**: #OpenClaw #MemorySearch #Ollama #配置指南
- **状态**: ✅ 已发布到网站
- **URL**: /blog/openclaw-memory-search-ollama-guide

### 2. Heartbeat 配置指南 ✅
- **文件**: openclaw-heartbeat-configuration-guide.md
- **标签**: #OpenClaw #Heartbeat #配置指南 #自动化
- **状态**: ✅ 已发布到网站
- **URL**: /blog/openclaw-heartbeat-configuration-guide

### 3. OpenClaw 搜索功能完全使用指南 ✅
- **文件**: openclaw-search-guide.md
- **状态**: ✅ 已发布

### 4. Next.js 14 新特性深度解析 ✅
- **文件**: nextjs-14-new-features.md
- **状态**: ✅ 已发布

### 5. 多 Agent 协作实战 V2 ✅
- **文件**: multi-agent-collaboration-practice-v2.md
- **状态**: ✅ 已发布

---

*更新时间：2026-02-28 17:40*
