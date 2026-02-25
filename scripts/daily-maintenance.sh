#!/bin/bash
# daily-maintenance.sh - OpenClaw 网站每日自动巡检维护脚本
# 由 claw-admin 管理
# 执行时间: 每天 09:00

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="/Users/openmilo/clawall/claw-team"
WEBSITE_DIR="$WORKSPACE/claw-code/workspace/website"
LOG_DIR="$WORKSPACE/claw-admin/logs"
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)
REPORT_FILE="$LOG_DIR/maintenance-$DATE.log"

# 创建日志目录
mkdir -p $LOG_DIR

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1" | tee -a $REPORT_FILE
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a $REPORT_FILE
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $REPORT_FILE
}

# 分隔线
log_separator() {
    echo "========================================" | tee -a $REPORT_FILE
}

# 开始巡检
log_separator
echo "OpenClaw 网站每日巡检维护" | tee -a $REPORT_FILE
echo "日期: $DATE $TIME" | tee -a $REPORT_FILE
echo "执行者: claw-admin (自动化)" | tee -a $REPORT_FILE
log_separator

# ==================== 检查 1: 网站服务状态 ====================
log_info "检查 1/10: 网站服务状态"

if curl -s http://localhost:3000/ > /dev/null; then
    log_info "✅ 网站服务运行正常 (端口 3000)"
else
    log_error "❌ 网站服务未运行，尝试重启..."
    cd $WEBSITE_DIR
    pkill -f "npm run dev" 2>/dev/null
    sleep 2
    nohup npm run dev > /tmp/website-dev.log 2>&1 &
    sleep 5
    if curl -s http://localhost:3000/ > /dev/null; then
        log_info "✅ 网站服务重启成功"
    else
        log_error "❌ 网站服务重启失败，需要人工介入"
    fi
fi

# ==================== 检查 2: 关键页面访问 ====================
log_info "检查 2/10: 关键页面访问"

PAGES=(
    "http://localhost:3000/"
    "http://localhost:3000/docs"
    "http://localhost:3000/blog"
    "http://localhost:3000/about"
    "http://localhost:3000/docs/quickstart"
    "http://localhost:3000/docs/install"
)

BROKEN_PAGES=0
for page in "${PAGES[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" $page)
    # 200 和 308 都是正常的
    if [ "$STATUS" = "200" ] || [ "$STATUS" = "308" ]; then
        log_info "✅ $page - OK"
    else
        log_error "❌ $page - HTTP $STATUS"
        BROKEN_PAGES=$((BROKEN_PAGES + 1))
    fi
done

if [ $BROKEN_PAGES -gt 0 ]; then
    log_warn "发现 $BROKEN_PAGES 个页面异常"
fi

# ==================== 检查 3: 网站构建 ====================
log_info "检查 3/10: 网站构建测试"

cd $WEBSITE_DIR
if npm run build > /tmp/build-test.log 2>&1; then
    log_info "✅ 网站构建成功"
    BUILD_STATUS="OK"
else
    log_error "❌ 网站构建失败"
    log_error "构建日志: /tmp/build-test.log"
    BUILD_STATUS="FAILED"
fi

# ==================== 检查 4: Git 状态 ====================
log_info "检查 4/10: Git 仓库状态"

cd $WEBSITE_DIR
if [ -d .git ]; then
    # 检查未提交更改
    UNCOMMITTED=$(git status --porcelain | wc -l)
    if [ $UNCOMMITTED -gt 0 ]; then
        log_warn "发现 $UNCOMMITTED 个未提交更改"
        log_info "自动提交更改..."
        git add .
        git commit -m "auto: daily maintenance update $DATE" 2>/dev/null
        if [ $? -eq 0 ]; then
            log_info "✅ 自动提交成功"
            # 尝试推送
            git push origin main 2>/dev/null && log_info "✅ 自动推送成功" || log_warn "推送失败，可能需要手动处理"
        else
            log_warn "自动提交失败或无更改"
        fi
    else
        log_info "✅ Git 仓库干净，无未提交更改"
    fi
else
    log_warn "⚠️  未找到 Git 仓库"
fi

# ==================== 检查 5: 依赖更新检查 ====================
log_info "检查 5/10: 依赖安全更新"

cd $WEBSITE_DIR
# 检查是否有安全漏洞（需要 npm audit）
npm audit --audit-level=high > /tmp/npm-audit.log 2>&1
if [ $? -eq 0 ]; then
    log_info "✅ 无高危安全漏洞"
else
    VULNERABILITIES=$(grep -c "high\|critical" /tmp/npm-audit.log 2>/dev/null || echo "0")
    if [ "$VULNERABILITIES" != "0" ]; then
        log_warn "发现 $VULNERABILITIES 个高危漏洞"
        log_warn "请手动运行: npm audit fix"
    fi
fi

# ==================== 检查 6: 日志清理 ====================
log_info "检查 6/10: 日志文件清理"

# 清理超过 30 天的日志
find $LOG_DIR -name "maintenance-*.log" -mtime +30 -delete 2>/dev/null
find /tmp -name "website-dev.log" -mtime +7 -delete 2>/dev/null

# 清理 npm 缓存（每周日）
if [ "$(date +%u)" = "7" ]; then
    npm cache clean --force 2>/dev/null
    log_info "✅ 已清理 npm 缓存"
fi

log_info "✅ 日志清理完成"

# ==================== 检查 7: 磁盘空间 ====================
log_info "检查 7/10: 磁盘空间检查"

DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    log_warn "⚠️  磁盘使用率 ${DISK_USAGE}%，建议清理"
    # 自动清理
    rm -rf $WEBSITE_DIR/.next/cache/* 2>/dev/null
    rm -rf $WEBSITE_DIR/node_modules/.cache/* 2>/dev/null
    log_info "已清理构建缓存"
else
    log_info "✅ 磁盘使用率 ${DISK_USAGE}%，正常"
fi

# ==================== 检查 8: 内容更新检查 ====================
log_info "检查 8/10: 内容更新检查"

# 检查是否有待发布的文章
ARTICLES_DIR="$WORKSPACE/claw-article/workspace/articles"
if [ -d "$ARTICLES_DIR" ]; then
    NEW_ARTICLES=$(find $ARTICLES_DIR -name "*.md" -mtime -1 | wc -l)
    if [ $NEW_ARTICLES -gt 0 ]; then
        log_warn "发现 $NEW_ARTICLES 篇新文章待发布"
        log_warn "请手动执行发布流程"
    else
        log_info "✅ 无新文章待发布"
    fi
fi

# ==================== 检查 9: 生成巡检报告 ====================
log_info "检查 9/10: 生成巡检报告"

REPORT_SUMMARY="$LOG_DIR/summary-$DATE.md"
cat > $REPORT_SUMMARY << EOF
# 巡检报告 - $DATE

**巡检时间:** $TIME  
**执行者:** claw-admin (自动化)  
**状态:** ${BUILD_STATUS:-未知}

## 检查结果

| 检查项 | 状态 |
|--------|------|
| 网站服务 | $([ "$BUILD_STATUS" = "OK" ] && echo "✅ 正常" || echo "❌ 异常") |
| 关键页面 | $(if [ $BROKEN_PAGES -eq 0 ]; then echo "✅ 全部正常"; else echo "❌ $BROKEN_PAGES 个异常"; fi) |
| 网站构建 | $([ "$BUILD_STATUS" = "OK" ] && echo "✅ 成功" || echo "❌ 失败") |
| Git 状态 | $([ $UNCOMMITTED -eq 0 ] 2>/dev/null && echo "✅ 干净" || echo "⚠️ 有未提交更改") |
| 磁盘空间 | ${DISK_USAGE}% |

## 详细日志

查看完整日志: \`logs/maintenance-$DATE.log\`

## 后续行动

$(if [ $BROKEN_PAGES -gt 0 ] || [ "$BUILD_STATUS" != "OK" ]; then echo "- [ ] 需要人工检查异常项目"; else echo "- ✅ 无需操作，系统正常"; fi)
EOF

log_info "✅ 报告已生成: $REPORT_SUMMARY"

# ==================== 检查 10: 发送通知 ====================
log_info "检查 10/10: 发送巡检通知"

# 如果有严重问题，记录到告警文件
if [ "$BUILD_STATUS" = "FAILED" ] || [ $BROKEN_PAGES -gt 0 ]; then
    echo "[$DATE $TIME] 巡检发现异常，请检查 $REPORT_FILE" >> $LOG_DIR/alerts.log
    log_error "⚠️  巡检完成，发现异常需要处理"
else
    log_info "✅ 巡检完成，一切正常"
fi

log_separator
echo "巡检维护完成时间: $(date +%H:%M:%S)" | tee -a $REPORT_FILE
log_separator

# 返回状态
[ "$BUILD_STATUS" = "OK" ] && [ $BROKEN_PAGES -eq 0 ] && exit 0 || exit 1
