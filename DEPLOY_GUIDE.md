# 🚀 自动部署指南

**部署方式:** 本地开发 → GitHub → 服务器自动拉取 → 构建 → 重启  
**部署目标:** 31.220.53.241 (宝塔服务器)  
**最后更新:** 2026-02-25

---

## 🎯 部署流程

```
本地修改代码
    ↓
本地构建测试 (npm run build)
    ↓
Git 提交 (git commit)
    ↓
推送到 GitHub (git push)
    ↓
服务器拉取更新 (git pull)
    ↓
服务器构建 (npm run build)
    ↓
重启服务 (pm2 restart)
    ↓
✅ 部署完成
```

---

## 🚀 快速部署

### 方法 1: 使用 npm 命令 (推荐)

```bash
cd /Users/openmilo/clawall/claw-team/claw-code/workspace/website

# 部署（自动生成 commit message）
npm run deploy

# 或者带自定义 commit message
npm run deploy "feat: 添加新功能 xxx"
```

### 方法 2: 直接运行脚本

```bash
# 部署
/Users/openmilo/clawall/claw-team/claw-admin/scripts/deploy.sh

# 带 commit message
/Users/openmilo/clawall/claw-team/claw-admin/scripts/deploy.sh "fix: 修复 xxx 问题"
```

---

## 📋 部署步骤详解

### 第 1 步: 本地开发

```bash
cd claw-code/workspace/website

# 启动开发服务器
npm run dev

# 在 http://localhost:3000 查看效果
```

### 第 2 步: 本地测试构建

```bash
# 测试生产构建
npm run build

# 确保没有错误
```

### 第 3 步: 执行部署

```bash
# 一键部署
npm run deploy "你的提交信息"
```

部署脚本会自动执行：
1. ✅ 本地构建测试
2. ✅ Git add .
3. ✅ Git commit
4. ✅ Git push (推送到 GitHub)
5. ✅ SSH 到服务器
6. ✅ 服务器 git pull
7. ✅ 服务器 npm run build
8. ✅ pm2 restart
9. ✅ 验证网站访问

---

## ✅ 部署成功标志

部署完成后会看到：

```
========================================
  部署完成!
========================================

访问地址:
  - http://31.220.53.241
  - http://31.220.53.241:3000

宝塔面板:
  - 可以在面板中管理网站
```

---

## 🔧 高级配置

### 只提交代码不部署

```bash
git add .
git commit -m "你的提交信息"
git push origin main
```

### 手动部署到服务器

```bash
# SSH 到服务器
ssh -i ~/.ssh/id_ed25519_server_31_220_53_241 root@31.220.53.241

# 手动拉取和构建
cd /www/wwwroot/openclaw-tutorial
git pull origin main
npm run build
pm2 restart openclaw-tutorial
```

### 查看部署日志

```bash
# 本地日志
cat /tmp/deploy.log

# 服务器日志
ssh -i ~/.ssh/id_ed25519_server_31_220_53_241 root@31.220.53.241 "pm2 logs openclaw-tutorial"
```

---

## 🐛 常见问题

### Q: 部署失败怎么办？

**A:** 检查以下几点：
1. 本地构建是否成功？
2. GitHub 是否有权限？
3. SSH 密钥是否配置正确？
4. 服务器是否有空间？

### Q: 如何回滚？

**A:** 
```bash
# 本地回滚
git revert HEAD
npm run deploy

# 或服务器手动回滚
ssh root@31.220.53.241 "cd /www/wwwroot/openclaw-tutorial && git reset --hard HEAD~1 && npm run build && pm2 restart openclaw-tutorial"
```

### Q: 部署后网站没有更新？

**A:** 
- 等待几秒钟，PM2 重启需要时间
- 检查浏览器缓存，按 Ctrl+F5 强制刷新
- 查看服务器 PM2 状态: `pm2 status`

---

## 📊 部署状态检查

```bash
# 检查本地 Git 状态
git status

# 检查 GitHub 最新提交
git log origin/main -1

# 检查服务器运行状态
curl http://31.220.53.241/

# 检查宝塔面板中的状态
# 登录宝塔面板 → 网站 → 查看 openclaw-tutorial.com
```

---

## 🔒 安全提示

- SSH 密钥已配置，无需密码
- GitHub Token 已删除，使用 SSH 方式推送
- 服务器使用 PM2 管理进程，崩溃自动重启
- 建议定期备份重要数据

---

*配置时间: 2026-02-25*  
*维护者: claw-admin*
