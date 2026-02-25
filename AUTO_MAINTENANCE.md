# 🤖 自动化巡检维护系统

**系统名称:** OpenClaw 网站自动维护  
**管理者:** claw-admin  
**部署时间:** 2026-02-24  
**执行频率:** 每日 09:00 + 每小时检查

---

## 📋 系统概览

### 自动化任务

| 任务 | 频率 | 执行时间 | 自动修复 |
|------|------|---------|---------|
| 网站健康检查 | 每日 | 09:00 | ✅ 自动重启 |
| 关键页面检查 | 每日 | 09:00 | ❌ 仅报告 |
| 构建测试 | 每日 | 09:00 | ❌ 仅报告 |
| Git 自动提交 | 每日 | 09:00 | ✅ 自动提交推送 |
| 日志清理 | 每日 | 09:00 | ✅ 自动清理 |
| 安全检查 | 每日 | 09:00 | ❌ 仅报告 |
| 内容发布检查 | 每日 | 09:00 | ❌ 需人工确认 |
| 备份检查 | 每日 | 09:00 | ✅ 自动备份 |
| 网站保活 | 每小时 | 整点 | ✅ 自动重启 |
| 深度清理 | 每周 | 周日 03:00 | ✅ 自动清理 |

---

## 🔧 系统组件

### 1. 巡检脚本
**路径:** `claw-admin/scripts/daily-maintenance.sh`

**功能:**
- 10 项自动检查
- 自动修复常见问题
- 生成详细报告
- 发送异常告警

### 2. Cron 定时任务
**配置:** `claw-admin/crontab.config`

```
每天 09:00    - 完整巡检维护
每小时整点    - 网站保活检查
每周日 03:00  - 深度清理
```

### 3. Heartbeat 配置
**路径:** `claw-admin/HEARTBEAT.md`

**功能:**
- 定义 OpenClaw Agent 响应规则
- 巡检任务清单
- 自动执行指令

### 4. 日志系统
**路径:** `claw-admin/logs/`

**文件:**
- `maintenance-YYYY-MM-DD.log` - 每日详细日志
- `summary-YYYY-MM-DD.md` - 每日摘要报告
- `alerts.log` - 异常告警记录
- `cron.log` - 定时任务执行日志

---

## 🚨 告警机制

### 告警触发条件

| 条件 | 级别 | 处理方式 |
|------|------|---------|
| 网站服务无法启动 | 🔴 严重 | 记录日志，需人工介入 |
| 构建失败 | 🔴 严重 | 记录日志，需人工修复 |
| 页面 404/500 | 🟡 警告 | 记录日志，检查链接 |
| 磁盘 >80% | 🟡 警告 | 自动清理缓存 |
| 安全漏洞 | 🟡 警告 | 记录日志，建议更新 |
| Git 推送失败 | 🟡 警告 | 记录日志，需人工处理 |

### 告警通知方式

1. **日志文件** - 所有异常记录到 `logs/alerts.log`
2. **摘要报告** - 每日报告标记异常项目
3. **Agent 消息** - 通过 OpenClaw 发送通知（需配置）

---

## 📊 巡检项目详解

### 检查 1: 网站服务状态
```bash
检查: curl http://localhost:3000/
自动修复: 如未运行，自动重启 npm run dev
```

### 检查 2: 关键页面访问
```bash
检查页面:
- /
- /docs
- /blog
- /about
- /docs/quickstart
- /docs/install

自动修复: 无，仅记录异常
```

### 检查 3: 网站构建测试
```bash
检查: npm run build
自动修复: 无，需人工修复代码问题
```

### 检查 4: Git 状态同步
```bash
检查: git status
自动修复: 
- 自动提交未提交更改
- 自动推送到远程仓库
```

### 检查 5: 依赖安全更新
```bash
检查: npm audit
自动修复: 无，需人工确认后更新
```

### 检查 6: 日志清理
```bash
清理:
- 30 天前的巡检日志
- 7 天前的开发日志
- npm 缓存（每周日）
自动修复: 是
```

### 检查 7: 磁盘空间
```bash
检查: df -h
自动修复: 
- 如 >80%，自动清理构建缓存
- 如仍不足，发送告警
```

### 检查 8: 内容更新检查
```bash
检查: claw-article/workspace/articles/
自动修复: 无，需人工确认后发布
```

### 检查 9: 生成报告
```bash
生成: 
- 详细日志 (maintenance-YYYY-MM-DD.log)
- 摘要报告 (summary-YYYY-MM-DD.md)
自动修复: N/A
```

### 检查 10: 发送通知
```bash
操作: 如有异常，记录到 alerts.log
自动修复: N/A
```

---

## 📝 报告查看

### 查看今日巡检报告
```bash
# 详细日志
cat claw-admin/logs/maintenance-$(date +%Y-%m-%d).log

# 摘要报告
cat claw-admin/logs/summary-$(date +%Y-%m-%d).md

# 异常告警
cat claw-admin/logs/alerts.log
```

### 查看历史报告
```bash
# 列出所有报告
ls -lt claw-admin/logs/summary-*.md | head -10

# 查看最近 7 天摘要
for d in $(seq 0 6); do
  date_str=$(date -v-${d}d +%Y-%m-%d 2>/dev/null || date -d "-${d} days" +%Y-%m-%d)
  echo "=== $date_str ==="
  cat claw-admin/logs/summary-${date_str}.md 2>/dev/null || echo "无报告"
done
```

---

## 🎮 手动操作

### 立即执行巡检
```bash
claw-admin/scripts/daily-maintenance.sh
```

### 强制重启网站
```bash
cd claw-code/workspace/website
pkill -f "npm run dev"
npm run dev
```

### 手动发布文章
```bash
# 1. 将文章添加到 page.tsx
# 2. 更新博客列表
# 3. 构建测试
npm run build
# 4. 重启服务
```

### 查看定时任务
```bash
crontab -l
```

### 修改定时任务
```bash
crontab -e
```

---

## 🔍 故障排查

### 场景 1: 巡检脚本不执行
**检查:**
```bash
# 检查 cron 服务
ps aux | grep cron

# 检查脚本权限
ls -l claw-admin/scripts/daily-maintenance.sh

# 检查日志
cat claw-admin/logs/cron.log
```

### 场景 2: 网站无法自动重启
**检查:**
```bash
# 查看端口占用
lsof -i :3000

# 手动重启
cd claw-code/workspace/website
pkill -f "npm run dev"
npm run dev
```

### 场景 3: Git 自动提交失败
**检查:**
```bash
cd claw-code/workspace/website
git status
git remote -v
```

---

## 📈 维护统计

### 每日自动记录
- 网站运行时间
- 构建成功率
- 异常次数
- 磁盘使用率
- 新发布内容数

### 每周汇总
- 本周发布文章数
- 本周修复 Bug 数
- 本周更新页面数
- 系统稳定性评级

---

## 🔄 系统更新

### 更新巡检脚本
1. 修改 `scripts/daily-maintenance.sh`
2. 测试执行
3. 提交 Git

### 更新定时任务
1. 修改 `crontab.config`
2. 执行 `crontab crontab.config`
3. 验证 `crontab -l`

### 更新检查项
1. 修改 `HEARTBEAT.md`
2. 同步更新脚本
3. 测试验证

---

## ⚠️ 注意事项

1. **Git 凭证** - 确保 Git 配置了正确的 SSH key 或 credentials helper
2. **npm 权限** - 确保有权限运行 npm 命令
3. **磁盘空间** - 确保有足够的磁盘空间存放日志
4. **网络连接** - 确保能访问 GitHub 进行推送
5. **备份重要** - 关键配置和文章源文件已纳入 Git 管理

---

*系统部署: 2026-02-24*  
*管理者: claw-admin*  
*版本: 1.0*
