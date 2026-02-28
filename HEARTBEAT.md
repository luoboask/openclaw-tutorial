# 🤖 自动巡检维护指令

**执行者:** claw-admin  
**频率:** 每天 09:00  
**任务:** 自动巡检和维护 OpenClaw 中文教程网站

---

## 每日自动执行清单

### 1. 网站健康检查
- [ ] 检查网站服务是否运行 (localhost:3000)
- [ ] 如未运行，自动重启: `cd claw-code/workspace/website && npm run dev`
- [ ] 检查关键页面 HTTP 200:
  - /
  - /docs
  - /blog
  - /about
  - /docs/quickstart

### 2. 构建测试
- [ ] 运行 `npm run build` 测试构建
- [ ] 如构建失败，记录错误并尝试修复

### 3. Git 同步
- [ ] 检查未提交更改
- [ ] 自动提交更改: `git add . && git commit -m "auto: daily maintenance $(date +%Y-%m-%d)"`
- [ ] 推送到远程: `git push origin main`

### 4. 日志清理
- [ ] 删除 30 天前的巡检日志
- [ ] 清理 npm 缓存（每周日）
- [ ] 清理构建缓存

### 5. 安全检查
- [ ] 运行 `npm audit` 检查安全漏洞
- [ ] 检查磁盘空间使用率
- [ ] 如发现高危漏洞或磁盘 >80%，发送告警

### 6. 内容更新检查
- [ ] 检查 claw-article/workspace/articles/ 是否有新文章
- [ ] 如有新内容，发布到网站
- [ ] 更新博客列表

### 7. 生成报告
- [ ] 生成巡检报告保存到 logs/maintenance-YYYY-MM-DD.log
- [ ] 生成摘要保存到 logs/summary-YYYY-MM-DD.md
- [ ] 如有异常，记录到 logs/alerts.log

---

## 执行脚本

运行以下命令执行巡检:
```bash
/Users/openmilo/clawall/claw-team/claw-admin/scripts/daily-maintenance.sh
```

---

## 响应规则

1. **如果一切正常**: 回复 `HEARTBEAT_OK`
2. **如果发现异常**: 执行修复并报告问题
3. **如果无法自动修复**: 发送告警通知用户

---

*配置时间: 2026-02-24*  
*执行者: claw-admin*

---

## 📝 待发布文章（2026-02-28 新增）

### 1. Memory Search 配置指南
- **文件**: `~/.openclaw/workspace-claw-admin/docs/openclaw-memory-search-ollama-guide.md`
- **标签**: #OpenClaw #MemorySearch #Ollama #配置指南
- **状态**: 已创建，待发布

### 2. Heartbeat 配置指南
- **文件**: `~/.openclaw/workspace-claw-admin/docs/openclaw-heartbeat-configuration-guide.md`
- **标签**: #OpenClaw #Heartbeat #配置指南 #自动化
- **状态**: 已创建，待发布

### 发布任务
- [ ] 检查上述文档是否存在
- [ ] 发布到 OpenClaw 知识库服务器
- [ ] 添加对应标签和分类
- [ ] 发布后记录发布 URL

---

*更新时间：2026-02-28 17:36*
