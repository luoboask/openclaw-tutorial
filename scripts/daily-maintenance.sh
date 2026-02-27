#!/bin/bash
# OpenClaw 网站每日维护脚本
# 运行时间: 每天 09:00

set -e

# 配置
WEBSITE_DIR="/Users/openmilo/clawall/claw-team/claw-code/workspace/website"
LOG_DIR="/Users/openmilo/clawall/claw-team/claw-admin/logs"
SERVER_IP="31.220.53.241"
SSH_KEY="$HOME/.ssh/id_ed25519_server_31_220_53_241"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 日志文件
LOG_FILE="$LOG_DIR/maintenance-$DATE.log"
SUMMARY_FILE="$LOG_DIR/summary-$DATE.md"
ALERT_FILE="$LOG_DIR/alerts.log"

# 确保日志目录存在
mkdir -p "$LOG_DIR"

# 记录开始
echo "========== OpenClaw 网站维护任务 ==========" >> "$LOG_FILE"
echo "开始时间: $(date)" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    echo "[$(date)] ERROR: $1" >> "$ALERT_FILE"
}

# 维护报告
REPORT="# 📊 OpenClaw 网站维护报告\n\n**日期:** $DATE\n**时间:** $(date +%H:%M:%S)\n\n"

# ============================================
# 1. 本地网站健康检查
# ============================================
log_info "1. 检查本地网站构建状态..."
cd "$WEBSITE_DIR"

if npm run build >> "$LOG_FILE" 2>&1; then
    log_info "✅ 本地构建成功"
    REPORT+="## ✅ 构建状态\n\n- 本地构建: 成功\n"
else
    log_error "❌ 本地构建失败"
    REPORT+="## ❌ 构建状态\n\n- 本地构建: 失败\n"
    echo "$REPORT" > "$SUMMARY_FILE"
    exit 1
fi

# ============================================
# 2. 部署到服务器
# ============================================
log_info "2. 部署到生产服务器..."

# 压缩并上传
if tar -czf "/tmp/openclaw-dist-$TIMESTAMP.tar.gz" -C "$WEBSITE_DIR/dist" . 2>> "$LOG_FILE"; then
    if scp -i "$SSH_KEY" "/tmp/openclaw-dist-$TIMESTAMP.tar.gz" "root@$SERVER_IP:/tmp/" >> "$LOG_FILE" 2>&1; then
        if ssh -i "$SSH_KEY" "root@$SERVER_IP" "cd /www/wwwroot/openclaw-docs && rm -rf * && tar -xzf /tmp/openclaw-dist-$TIMESTAMP.tar.gz" >> "$LOG_FILE" 2>&1; then
            log_info "✅ 部署成功"
            REPORT+="- 服务器部署: 成功\n"
        else
            log_error "❌ 部署失败：解压失败"
            REPORT+="- 服务器部署: 失败（解压）\n"
        fi
    else
        log_error "❌ 部署失败：上传失败"
        REPORT+="- 服务器部署: 失败（上传）\n"
    fi
else
    log_error "❌ 部署失败：压缩失败"
    REPORT+="- 服务器部署: 失败（压缩）\n"
fi

# ============================================
# 3. 检查服务器网站状态
# ============================================
log_info "3. 检查服务器网站状态..."

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP/" 2>> "$LOG_FILE" || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    log_info "✅ 网站访问正常 (HTTP 200)"
    REPORT+="- 网站状态: HTTP 200 ✅\n"
else
    log_error "❌ 网站访问异常 (HTTP $HTTP_STATUS)"
    REPORT+="- 网站状态: HTTP $HTTP_STATUS ❌\n"
fi

# ============================================
# 4. Git 同步
# ============================================
log_info "4. 检查并同步 Git..."
cd "$WEBSITE_DIR"

if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    git add . >> "$LOG_FILE" 2>&1
    git commit -m "auto: daily maintenance $DATE" >> "$LOG_FILE" 2>&1 || true
    if git push origin main >> "$LOG_FILE" 2>&1; then
        log_info "✅ Git 推送成功"
        REPORT+="- Git 同步: 成功\n"
    else
        log_warn "⚠️ Git 推送失败（可能需要配置 Token）"
        REPORT+="- Git 同步: 失败\n"
    fi
else
    log_info "✅ 无未提交更改"
    REPORT+="- Git 同步: 无更改\n"
fi

# ============================================
# 5. 安全检查
# ============================================
log_info "5. 运行安全检查..."
cd "$WEBSITE_DIR"

if npm audit --audit-level=high >> "$LOG_FILE" 2>&1; then
    log_info "✅ 无高危安全漏洞"
    REPORT+="- 安全审计: 通过\n"
else
    log_warn "⚠️ 发现安全漏洞，请检查日志"
    REPORT+="- 安全审计: 发现警告\n"
fi

# ============================================
# 6. 磁盘空间检查
# ============================================
log_info "6. 检查磁盘空间..."

DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    log_error "⚠️ 磁盘使用率过高: ${DISK_USAGE}%"
    REPORT+="- 磁盘空间: ${DISK_USAGE}% ⚠️\n"
else
    log_info "✅ 磁盘空间充足: ${DISK_USAGE}%"
    REPORT+="- 磁盘空间: ${DISK_USAGE}% ✅\n"
fi

# ============================================
# 7. 日志清理
# ============================================
log_info "7. 清理旧日志..."

# 删除 30 天前的日志
find "$LOG_DIR" -name "*.log" -mtime +30 -delete 2>> "$LOG_FILE"
find "$LOG_DIR" -name "*.md" -mtime +30 -delete 2>> "$LOG_FILE"
log_info "✅ 已清理 30 天前的日志"

# 每周日清理 npm 缓存
if [ "$(date +%u)" = "7" ]; then
    npm cache clean --force >> "$LOG_FILE" 2>&1 || true
    log_info "✅ 已清理 npm 缓存"
fi

# ============================================
# 8. 生成摘要
# ============================================
REPORT+="\n## 📋 详细日志\n\n完整日志请查看: \`maintenance-$DATE.log\`\n"
REPORT+="\n---\n*维护任务完成于 $(date)*"

echo -e "$REPORT" > "$SUMMARY_FILE"

# 记录结束
echo "" >> "$LOG_FILE"
echo "结束时间: $(date)" >> "$LOG_FILE"
echo "==========================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

log_info "维护任务完成！"
log_info "摘要: $SUMMARY_FILE"
log_info "日志: $LOG_FILE"

# 清理临时文件
rm -f "/tmp/openclaw-dist-$TIMESTAMP.tar.gz"

exit 0
