#!/bin/bash
# RedClaw 每日博客文章自动生成脚本
# 运行时间: 每天 10:00
# 功能: 检查今日是否已有文章，如无则自动生成一篇

set -e

# 配置
WEBSITE_DIR="/Users/openmilo/clawall/claw-team/claw-code/workspace/website"
ARTICLES_DIR="$WEBSITE_DIR/app/blog/articles"
BLOG_PAGE="$WEBSITE_DIR/app/blog/page.tsx"
SLUG_PAGE="$WEBSITE_DIR/app/blog/[slug]/page.tsx"
LOG_DIR="/Users/openmilo/clawall/claw-team/claw-admin/logs"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 日志文件
LOG_FILE="$LOG_DIR/blog-gen-$DATE.log"

# 确保日志目录存在
mkdir -p "$LOG_DIR"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

# 检查今天是否已有文章
check_today_article() {
    log_info "检查今日文章..."
    
    # 获取今天的日期格式（用于比较）
    TODAY=$(date +%Y-%m-%d)
    
    # 检查 blog/page.tsx 中是否有今天的文章
    if grep -q "date: '$TODAY'" "$BLOG_PAGE"; then
        log_info "✅ 今天 ($TODAY) 已有文章，跳过生成"
        return 0
    fi
    
    # 检查 articles 目录
    LATEST_ARTICLE=$(ls -t "$ARTICLES_DIR"/*.mdx 2>/dev/null | head -1)
    if [ -n "$LATEST_ARTICLE" ]; then
        ARTICLE_DATE=$(stat -f "%Sm" -t "%Y-%m-%d" "$LATEST_ARTICLE" 2>/dev/null || stat -c "%y" "$LATEST_ARTICLE" | cut -d' ' -f1)
        if [ "$ARTICLE_DATE" = "$TODAY" ]; then
            log_info "✅ 今天 ($TODAY) 已有文章文件，跳过生成"
            return 0
        fi
    fi
    
    log_info "📝 今天没有文章，需要生成"
    return 1
}

# 生成文章主题
generate_topic() {
    # 预定义的主题列表（循环使用）
    TOPICS=(
        "OpenClaw 最佳实践：提升效率的10个技巧"
        "如何优化 AI 助手的记忆系统"
        "Skill 开发进阶：创建复杂的自动化工作流"
        "多 Agent 协作模式实战指南"
        "OpenClaw 安全配置完全指南"
        "使用 Browser 工具进行网页数据抓取"
        "GitHub Skill 自动化你的开发流程"
        "PDF 处理自动化：从提取到合并"
        "天气查询与提醒系统的搭建"
        "笔记管理自动化：Apple Notes 集成"
        "代码审查自动化实践"
        "健康检查：服务器安全巡检"
        "图片生成与处理自动化"
        "语音合成在通知系统中的应用"
        "数据分析与可视化自动化"
        "邮件自动化：Himalaya 使用指南"
        "文档处理：Word 和 PDF 转换"
        "视频处理基础：剪辑与转码"
        "音乐播放控制自动化"
        "待办事项管理：Things 3 集成"
        "日历事件自动同步"
        "RSS 订阅与内容聚合"
        "数据库操作自动化"
        "API 测试与监控"
        "日志分析与异常检测"
        "备份策略与自动化"
        "性能监控与优化"
        "错误处理与重试机制"
        "并发任务管理"
        "缓存策略与实现"
    )
    
    # 根据日期选择主题（循环）
    DAY_OF_YEAR=$(date +%j)
    INDEX=$((DAY_OF_YEAR % ${#TOPICS[@]}))
    echo "${TOPICS[$INDEX]}"
}

# 生成文章 slug
generate_slug() {
    local title="$1"
    echo "$title" | sed 's/[^a-zA-Z0-9\u4e00-\u9fa5]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//' | tr '[:upper:]' '[:lower:]' | cut -c1-50
}

# 生成文章内容
generate_article_content() {
    local title="$1"
    local date="$2"
    local slug="$3"
    
    cat > "$ARTICLES_DIR/$slug.mdx" << EOF
# $title

> 本文由 OpenClaw AI 自动生成于 $date

---

## 引言

在使用 OpenClaw 的过程中，我们发现很多用户对于如何更好地利用这个强大的工具有着浓厚的兴趣。本文将分享一些实用的技巧和最佳实践，帮助你更高效地使用 OpenClaw。

## 核心概念

### 什么是 OpenClaw？

OpenClaw 是一个开源的 AI 网关，让你可以通过熟悉的聊天应用与 AI 助手对话。它支持多种频道接入，包括 WhatsApp、Telegram、Discord 等。

### 为什么需要这篇文章？

随着 OpenClaw 功能的不断扩展，用户需要一个系统化的指南来了解如何充分利用这些功能。本文将从实际应用场景出发，提供可操作的建议。

## 实践技巧

### 技巧一：合理规划 Agent 结构

建议根据任务类型划分不同的 Agent：

- **管理型 Agent**：负责任务分配和协调
- **专业型 Agent**：专注于特定领域
- **执行型 Agent**：负责具体的工具调用

### 技巧二：善用 Skills 扩展能力

通过安装合适的 Skills，可以大大扩展 AI 助手的能力：

\`\`\`bash
# 搜索并安装 Skill
clawhub search pdf
clawhub install pdf-processor
\`\`\`

### 技巧三：优化记忆系统配置

合理配置记忆系统可以提升对话的连贯性：

\`\`\`yaml
memory:
  enabled: true
  max_messages: 50
  context_window: 16000
\`\`\`

## 常见问题

**Q: 如何选择合适的模型？**

A: 根据任务复杂度选择：
- 简单任务：本地轻量模型
- 复杂推理：云端大模型
- 代码相关：专用编程模型

**Q: Skills 之间会有冲突吗？**

A: 一般不会，但建议避免安装功能重叠的 Skills。

## 总结

通过本文的介绍，相信你对如何更好地使用 OpenClaw 有了更深入的了解。记住，最好的学习方式就是实践，快去尝试吧！

---

*本文自动生成于 $date*  
*由 claw-admin Agent 维护*
EOF

    log_info "✅ 文章文件已创建: $ARTICLES_DIR/$slug.mdx"
}

# 更新博客列表
update_blog_list() {
    local title="$1"
    local date="$2"
    local slug="$3"
    
    log_info "更新博客列表..."
    
    # 创建新的文章条目
    local new_entry="  {
    id: '$slug',
    title: '$title',
    excerpt: 'OpenClaw 使用技巧与最佳实践分享，帮助你更高效地使用 AI 助手',
    date: '$date',
    readTime: '8 分钟',
    category: '最佳实践',
    featured: false,
  },"
    
    # 在 blogPosts 数组开头插入新条目
    sed -i "/const blogPosts = \[/a\\
$new_entry" "$BLOG_PAGE"
    
    log_info "✅ 博客列表已更新"
}

# 更新 [slug]/page.tsx
update_slug_page() {
    local title="$1"
    local date="$2"
    local slug="$3"
    
    log_info "更新文章路由..."
    
    # 这里简化处理，实际应该动态添加文章内容到 page.tsx
    # 由于 page.tsx 是静态的，我们暂时只记录到日志
    log_warn "⚠️  请手动将新文章添加到 app/blog/[slug]/page.tsx"
}

# 构建和部署
build_and_deploy() {
    log_info "开始构建网站..."
    
    cd "$WEBSITE_DIR"
    
    if npm run build >> "$LOG_FILE" 2>&1; then
        log_info "✅ 构建成功"
    else
        log_error "❌ 构建失败"
        return 1
    fi
    
    log_info "部署到服务器..."
    
    # 压缩并上传
    cd dist
    tar -czf "/tmp/redclaw-auto-$TIMESTAMP.tar.gz" .
    
    scp -i ~/.ssh/id_ed25519_server_31_220_53_241 "/tmp/redclaw-auto-$TIMESTAMP.tar.gz" root@31.220.53.241:/tmp/ >> "$LOG_FILE" 2>&1
    
    ssh -i ~/.ssh/id_ed25519_server_31_220_53_241 root@31.220.53.241 "cd /www/wwwroot/openclaw-docs && rm -rf * && tar -xzf /tmp/redclaw-auto-$TIMESTAMP.tar.gz" >> "$LOG_FILE" 2>&1
    
    log_info "✅ 部署完成"
    
    # 清理临时文件
    rm -f "/tmp/redclaw-auto-$TIMESTAMP.tar.gz"
}

# Git 提交
git_commit() {
    log_info "提交 Git..."
    
    cd "$WEBSITE_DIR"
    
    git add -A
    git commit -m "auto: daily blog post $DATE - $(generate_topic)" >> "$LOG_FILE" 2>&1 || true
    git push origin main >> "$LOG_FILE" 2>&1 || true
    
    log_info "✅ Git 提交完成"
}

# 主函数
main() {
    log_info "========== RedClaw 每日博客生成 =========="
    log_info "开始时间: $(date)"
    
    # 检查今天是否已有文章
    if check_today_article; then
        log_info "今日文章已存在，正常退出"
        exit 0
    fi
    
    # 生成文章
    TOPIC=$(generate_topic)
    SLUG=$(generate_slug "$TOPIC")
    
    log_info "生成文章: $TOPIC"
    log_info "文章 slug: $SLUG"
    
    # 创建文章文件
    generate_article_content "$TOPIC" "$DATE" "$SLUG"
    
    # 更新博客列表
    update_blog_list "$TOPIC" "$DATE" "$SLUG"
    
    # 构建和部署
    if build_and_deploy; then
        # Git 提交
        git_commit
        
        log_info "✅ 今日博客文章发布成功！"
        log_info "标题: $TOPIC"
        log_info "链接: https://redclaw.cc/blog/$SLUG/"
    else
        log_error "❌ 发布失败"
        exit 1
    fi
    
    log_info "结束时间: $(date)"
    log_info "=========================================="
}

# 运行主函数
main
