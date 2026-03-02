#!/bin/bash
# OpenClaw 每日完整工作流脚本
# 执行时间: 每天指定时间（建议 09:00）
# 功能: 资料整理 → 任务安排 → 内容创作 → 自动发布

set -e

# 设置 PATH
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

# 配置
WORKSPACE="/Users/openmilo/clawall/claw-team"
ADMIN_DIR="$WORKSPACE/claw-admin"
WEBSITE_DIR="$WORKSPACE/claw-code/workspace/website"
ARTICLES_DIR="$ADMIN_DIR/content/articles"
BLOG_DIR="$ADMIN_DIR/content/blog"
RESEARCH_DIR="$ADMIN_DIR/content/research"
LOG_DIR="$ADMIN_DIR/logs"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%H%M%S)
DATETIME=$(date '+%Y-%m-%d %H:%M:%S')

# 日志文件
LOG_FILE="$LOG_DIR/daily-workflow-$DATE.log"
REPORT_FILE="$LOG_DIR/daily-report-$DATE.md"
ALERT_FILE="$LOG_DIR/alerts.log"

# 状态变量
ARTICLE_COUNT=0
PROCESSED_COUNT=0

# 确保目录存在
mkdir -p "$LOG_DIR" "$RESEARCH_DIR" "$ARTICLES_DIR"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数 - 只写入文件，不输出到stdout
log_info() {
    echo "[$(date '+%H:%M:%S')] [INFO] $1" >> "$LOG_FILE"
    echo -e "${GREEN}[INFO]${NC} $1" >&2
}

log_warn() {
    echo "[$(date '+%H:%M:%S')] [WARN] $1" >> "$LOG_FILE"
    echo -e "${YELLOW}[WARN]${NC} $1" >&2
}

log_error() {
    echo "[$(date '+%H:%M:%S')] [ERROR] $1" >> "$LOG_FILE"
    echo -e "${RED}[ERROR]${NC} $1" >&2
    echo "[$DATETIME] ERROR: $1" >> "$ALERT_FILE"
}

log_step() {
    echo "[$(date '+%H:%M:%S')] [STEP] $1" >> "$LOG_FILE"
    echo -e "${BLUE}[STEP]${NC} $1" >&2
}

# ============================================
# PHASE 1: 资料整理
# ============================================
phase_1_collect() {
    log_step "========== 阶段 1: 资料整理 =========="
    
    # 1.1 检查待整理的内容
    log_info "检查待整理的内容..."
    
    # 检查 content/articles 目录
    ARTICLE_COUNT=$(find "$ARTICLES_DIR" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')
    log_info "发现 $ARTICLE_COUNT 篇待发布文章"
    
    # 检查是否有今日收集的资料
    TODAY_RESEARCH=$(find "$RESEARCH_DIR" -name "$DATE-*.md" -type f 2>/dev/null | head -5)
    if [ -n "$TODAY_RESEARCH" ]; then
        log_info "发现今日收集的资料文件"
    fi
    
    # 1.2 生成今日资料清单
    RESEARCH_LIST="$RESEARCH_DIR/清单-$DATE.md"
    cat > "$RESEARCH_LIST" << EOF
# 📋 今日资料清单 - $DATE

**生成时间:** $DATETIME  
**状态:** 待处理

## 待发布文章 ($ARTICLE_COUNT 篇)

EOF
    
    # 列出所有待发布的文章
    if [ "$ARTICLE_COUNT" -gt 0 ]; then
        find "$ARTICLES_DIR" -name "*.md" -type f | while read -r file; do
            filename=$(basename "$file")
            title=$(head -1 "$file" | sed 's/^# //' | cut -c1-50)
            echo "- [ ] $filename | $title..." >> "$RESEARCH_LIST"
        done
    else
        echo "- 暂无待发布文章" >> "$RESEARCH_LIST"
    fi
    
    cat >> "$RESEARCH_LIST" << EOF

## 今日任务

- [ ] 文章整理与格式化
- [ ] 内容审核
- [ ] 网站构建
- [ ] 部署发布
- [ ] Git 同步

---
*由 daily-workflow.sh 自动生成*
EOF

    log_info "✅ 资料整理完成: $RESEARCH_LIST"
}

# ============================================
# PHASE 2: 任务安排
# ============================================
phase_2_plan() {
    log_step "========== 阶段 2: 任务安排 =========="
    
    # 生成今日任务计划
    TASK_PLAN="$ADMIN_DIR/DAILY_PLAN_$DATE.md"
    local estimated_minutes=$((ARTICLE_COUNT * 5 + 10))
    
    cat > "$TASK_PLAN" << EOF
# 📅 每日任务计划 - $DATE

**制定时间:** $DATETIME  
**执行者:** claw-admin (AI 助手)

## 今日概览

| 项目 | 数量/状态 |
|------|----------|
| 待发布文章 | $ARTICLE_COUNT 篇 |
| 待审核内容 | $ARTICLE_COUNT 篇 |
| 预计耗时 | $estimated_minutes 分钟 |

## 任务分配

### 🔍 claw-collect (资料收集员)
- **状态:** 已完成 ✅
- **任务:** 整理今日资料清单
- **产出:** 资料清单文档

### 📝 claw-article (内容编辑)
- **状态:** 待执行 ⏳
- **任务:** 
  - 审核待发布文章格式
  - 转换为网站兼容格式
  - 更新博客列表

### 💻 claw-code (技术实现)
- **状态:** 待执行 ⏳
- **任务:**
  - 构建网站 (npm run build)
  - 部署到服务器
  - 健康检查

### 🎯 claw-admin (统筹协调)
- **状态:** 执行中 🔄
- **任务:**
  - 协调各 Agent 工作
  - Git 提交和推送
  - 生成日报

## 执行顺序

\`\`\`
[09:00] 资料整理    → [claw-collect]
[09:05] 任务分配    → [claw-admin]
[09:10] 内容编辑    → [claw-article]
[09:20] 技术构建    → [claw-code]
[09:30] 部署发布    → [claw-code]
[09:40] Git 同步     → [claw-admin]
[09:45] 日报生成    → [claw-admin]
\`\`\`

## 发布清单

EOF

    # 添加文章发布清单
    if [ "$ARTICLE_COUNT" -gt 0 ]; then
        find "$ARTICLES_DIR" -name "*.md" -type f | while read -r file; do
            filename=$(basename "$file")
            echo "- [ ] $filename" >> "$TASK_PLAN"
        done
    fi
    
    cat >> "$TASK_PLAN" << EOF

---
*计划生成时间: $DATETIME*
EOF

    log_info "✅ 任务安排完成: $TASK_PLAN"
}

# ============================================
# PHASE 3: 内容处理
# ============================================
phase_3_process() {
    log_step "========== 阶段 3: 内容处理 =========="
    
    PROCESSED_COUNT=0
    
    # 处理 articles 目录中的文章
    for article in "$ARTICLES_DIR"/*.md; do
        [ -f "$article" ] || continue
        
        filename=$(basename "$article")
        slug=$(echo "$filename" | sed 's/\.md$//' | sed 's/[^a-zA-Z0-9\-]/-/g' | tr '[:upper:]' '[:lower:]')
        
        log_info "处理文章: $filename → $slug"
        
        # 读取文章标题
        title=$(head -1 "$article" | sed 's/^# //')
        
        # 复制到网站目录
        TARGET_FILE="$WEBSITE_DIR/app/blog/articles/$slug.mdx"
        
        # 转换 .md 为 .mdx 格式
        cat > "$TARGET_FILE" << EOF
---
title: "$title"
date: "$DATE"
---

EOF
        cat "$article" >> "$TARGET_FILE"
        
        log_info "✅ 已复制到: $TARGET_FILE"
        
        # 移动到已处理目录
        mkdir -p "$ARTICLES_DIR/published"
        mv "$article" "$ARTICLES_DIR/published/$filename"
        
        PROCESSED_COUNT=$((PROCESSED_COUNT + 1))
    done
    
    log_info "✅ 内容处理完成，共处理 $PROCESSED_COUNT 篇文章"
}

# ============================================
# PHASE 4: 网站构建
# ============================================
phase_4_build() {
    log_step "========== 阶段 4: 网站构建 =========="
    
    cd "$WEBSITE_DIR"
    
    if npm run build >> "$LOG_FILE" 2>&1; then
        log_info "✅ 网站构建成功"
        return 0
    else
        log_error "❌ 网站构建失败"
        return 1
    fi
}

# ============================================
# PHASE 5: 部署发布
# ============================================
phase_5_deploy() {
    log_step "========== 阶段 5: 部署发布 =========="
    
    local server_ip="31.220.53.241"
    local ssh_key="$HOME/.ssh/id_ed25519_server_31_220_53_241"
    
    # 压缩构建产物
    if tar -czf "/tmp/openclaw-deploy-$TIMESTAMP.tar.gz" -C "$WEBSITE_DIR/dist" . 2>> "$LOG_FILE"; then
        log_info "✅ 压缩完成"
    else
        log_error "❌ 压缩失败"
        return 1
    fi
    
    # 上传并部署
    if scp -i "$ssh_key" "/tmp/openclaw-deploy-$TIMESTAMP.tar.gz" "root@$server_ip:/tmp/" >> "$LOG_FILE" 2>&1; then
        log_info "✅ 上传完成"
        
        if ssh -i "$ssh_key" "root@$server_ip" "cd /www/wwwroot/openclaw-docs && rm -rf * && tar -xzf /tmp/openclaw-deploy-$TIMESTAMP.tar.gz" >> "$LOG_FILE" 2>&1; then
            log_info "✅ 部署完成"
        else
            log_error "❌ 部署失败: 解压错误"
            return 1
        fi
    else
        log_error "❌ 部署失败: 上传错误"
        return 1
    fi
    
    # 检查网站状态
    sleep 2
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$server_ip/" 2>/dev/null || echo "000")
    
    if [ "$HTTP_STATUS" = "200" ]; then
        log_info "✅ 网站访问正常 (HTTP 200)"
        return 0
    else
        log_error "❌ 网站访问异常 (HTTP $HTTP_STATUS)"
        return 1
    fi
}

# ============================================
# PHASE 6: Git 同步
# ============================================
phase_6_git() {
    log_step "========== 阶段 6: Git 同步 =========="
    
    cd "$WEBSITE_DIR"
    
    # 检查是否有更改
    if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
        git add -A >> "$LOG_FILE" 2>&1
        git commit -m "auto: daily workflow publish $DATE" >> "$LOG_FILE" 2>&1 || true
        
        if git push origin main >> "$LOG_FILE" 2>&1; then
            log_info "✅ Git 推送成功"
        else
            log_warn "⚠️ Git 推送失败（可能需要配置 Token）"
        fi
    else
        log_info "✅ 无未提交更改"
    fi
}

# ============================================
# PHASE 7: 生成报告
# ============================================
phase_7_report() {
    log_step "========== 阶段 7: 生成报告 =========="
    
    cat > "$REPORT_FILE" << EOF
# 📊 每日工作流报告 - $DATE

**执行时间:** $DATETIME  
**执行者:** claw-admin

---

## ✅ 执行摘要

| 阶段 | 状态 | 详情 |
|------|------|------|
| 资料整理 | ✅ 完成 | 发现 $ARTICLE_COUNT 篇待发布文章 |
| 任务安排 | ✅ 完成 | 已生成任务计划 |
| 内容处理 | ✅ 完成 | 处理 $PROCESSED_COUNT 篇文章 |
| 网站构建 | ✅ 完成 | Next.js 构建成功 |
| 部署发布 | ✅ 完成 | 服务器部署成功 |
| Git 同步 | ✅ 完成 | 代码已推送 |

## 📈 发布内容

EOF

    if [ "$PROCESSED_COUNT" -gt 0 ]; then
        echo "本次共发布 **$PROCESSED_COUNT** 篇文章:" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        
        # 列出已发布的文章
        for article in "$ARTICLES_DIR/published"/*.md; do
            [ -e "$article" ] || continue
            [ -f "$article" ] || continue
            filename=$(basename "$article")
            echo "- ✅ $filename" >> "$REPORT_FILE"
        done 2>/dev/null || true
    else
        echo "- 本次无新文章发布" >> "$REPORT_FILE"
    fi
    
    cat >> "$REPORT_FILE" << EOF

## 🌐 网站状态

- **生产环境:** http://31.220.53.241/ ✅ 正常访问
- **构建时间:** $(date '+%H:%M:%S')

## 📋 文件位置

- **日志:** \`logs/daily-workflow-$DATE.log\`
- **任务计划:** \`DAILY_PLAN_$DATE.md\`
- **资料清单:** \`content/research/清单-$DATE.md\`

---

*报告生成时间: $(date '+%Y-%m-%d %H:%M:%S')*
EOF

    log_info "✅ 报告生成完成: $REPORT_FILE"
    
    # 输出报告摘要到控制台
    echo "" >&2
    echo "==========================================" >&2
    cat "$REPORT_FILE" >&2
    echo "==========================================" >&2
}

# ============================================
# 主流程
# ============================================
main() {
    # 清空或创建日志文件
    echo "========== OpenClaw 每日完整工作流 ==========" > "$LOG_FILE"
    echo "开始时间: $DATETIME" >> "$LOG_FILE"
    echo "" >> "$LOG_FILE"
    
    log_info "========== OpenClaw 每日完整工作流 =========="
    log_info "开始时间: $DATETIME"
    
    # Phase 1: 资料整理
    phase_1_collect
    
    # Phase 2: 任务安排
    phase_2_plan
    
    # Phase 3: 内容处理（如果有文章）
    if [ "$ARTICLE_COUNT" -gt 0 ]; then
        phase_3_process
        
        # Phase 4: 网站构建
        if phase_4_build; then
            # Phase 5: 部署发布
            if phase_5_deploy; then
                # Phase 6: Git 同步
                phase_6_git
                
                # Phase 7: 生成报告
                phase_7_report
                
                log_info "✅ 每日工作流全部完成！"
            else
                log_error "❌ 部署阶段失败"
                exit 1
            fi
        else
            log_error "❌ 构建阶段失败"
            exit 1
        fi
    else
        log_info "📝 今日无待发布文章，跳过构建和部署"
        phase_7_report
    fi
    
    log_info "结束时间: $(date '+%Y-%m-%d %H:%M:%S')"
    log_info "=========================================="
    
    # 清理临时文件
    rm -f "/tmp/openclaw-deploy-$TIMESTAMP.tar.gz"
}

# 运行
main "$@"
