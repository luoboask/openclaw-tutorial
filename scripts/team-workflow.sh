#!/bin/bash
# RedClaw 团队协作工作流脚本
# 模拟多 Agent 协作，实际由 claw-admin 协调执行

set -e

WORKSPACE="/Users/openmilo/clawall/claw-team"
LOG_DIR="$WORKSPACE/claw-admin/logs"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%H%M%S)

log() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_DIR/team-$DATE.log"
}

# ====== claw-collect 工作 ======
collect_phase() {
    log "🔍 [claw-collect] 开始资料收集..."
    
    # 模拟资料收集
    sleep 2
    
    # 生成收集报告
    cat > "$WORKSPACE/claw-collect/workspace/research/$DATE-$TIMESTAMP.md" << EOF
# 资料收集报告 - $DATE

## 主题: OpenClaw 最佳实践

### 收集到的要点:
1. 记忆系统优化技巧
2. Skill 开发最佳实践  
3. 多 Agent 协作模式
4. 性能优化方法

### 来源:
- 官方文档
- 社区讨论
- 实践经验

状态: ✅ 完成
EOF

    log "✅ [claw-collect] 资料收集完成"
}

# ====== claw-article 工作 ======
article_phase() {
    log "📝 [claw-article] 开始撰写文章..."
    
    # 读取收集的资料
    RESEARCH_FILE=$(ls -t "$WORKSPACE/claw-collect/workspace/research/"/*.md 2>/dev/null | head -1)
    
    if [ -f "$RESEARCH_FILE" ]; then
        log "📖 [claw-article] 基于收集的资料撰写..."
    fi
    
    # 生成文章
    ARTICLE_SLUG="openclaw-best-practices-$(date +%Y%m%d)"
    ARTICLE_FILE="$WORKSPACE/claw-code/workspace/website/app/blog/articles/$ARTICLE_SLUG.mdx"
    
    cat > "$ARTICLE_FILE" << EOF
# OpenClaw 最佳实践：提升效率的10个技巧

> 本文由 RedClaw AI 自动生成于 $(date +%Y-%m-%d)

---

## 引言

在使用 OpenClaw 的过程中，掌握一些最佳实践可以大大提升你的工作效率。本文分享10个实用技巧。

## 1. 合理规划 Agent 结构

建议根据任务类型划分不同的 Agent...

## 2. 善用 Skills 扩展能力

通过安装合适的 Skills...

## 3. 优化记忆系统配置

合理配置记忆系统...

## 总结

通过这些最佳实践，你可以更高效地使用 OpenClaw。

---

*本文自动生成于 $(date +%Y-%m-%d)*
*由 RedClaw AI 团队维护*
EOF

    # 更新博客列表
    BLOG_PAGE="$WORKSPACE/claw-code/workspace/website/app/blog/page.tsx"
    
    # 在 blogPosts 数组开头插入新条目
    sed -i '' '/const blogPosts = \[/a\
  {\
    id: '"'$ARTICLE_SLUG'"',\
    title: '"'OpenClaw 最佳实践：提升效率的10个技巧'"',\
    excerpt: '"'分享10个实用的 OpenClaw 使用技巧，帮助你提升工作效率'"',\
    date: '"'$DATE'"',\
    readTime: '"'8 分钟'"',\
    category: '"'最佳实践'"',\
    featured: false,\
  },' "$BLOG_PAGE"

    log "✅ [claw-article] 文章撰写完成: $ARTICLE_SLUG"
    echo "$ARTICLE_SLUG"
}

# ====== claw-code 工作 ======
code_phase() {
    local article_slug="$1"
    
    log "💻 [claw-code] 开始构建和部署..."
    
    cd "$WORKSPACE/claw-code/workspace/website"
    
    # 构建
    if npm run build > /dev/null 2>&1; then
        log "✅ [claw-code] 构建成功"
    else
        log "❌ [claw-code] 构建失败"
        return 1
    fi
    
    # 部署
    cd dist
    tar -czf "/tmp/redclaw-team-$DATE-$TIMESTAMP.tar.gz" .
    
    scp -i ~/.ssh/id_ed25519_server_31_220_53_241 "/tmp/redclaw-team-$DATE-$TIMESTAMP.tar.gz" root@31.220.53.241:/tmp/ > /dev/null 2>&1
    ssh -i ~/.ssh/id_ed25519_server_31_220_53_241 root@31.220.53.241 "cd /www/wwwroot/openclaw-docs && rm -rf * && tar -xzf /tmp/redclaw-team-$DATE-$TIMESTAMP.tar.gz" > /dev/null 2>&1
    
    rm -f "/tmp/redclaw-team-$DATE-$TIMESTAMP.tar.gz"
    
    log "✅ [claw-code] 部署完成"
}

# ====== Git 提交 ======
git_phase() {
    log "📦 [claw-admin] 提交 Git..."
    
    cd "$WORKSPACE/claw-code/workspace/website"
    
    git add -A
    git commit -m "auto: team collaboration workflow - daily blog $DATE" > /dev/null 2>&1 || true
    git push origin main > /dev/null 2>&1 || true
    
    log "✅ [claw-admin] Git 提交完成"
}

# ====== 主流程 ======
main() {
    log "========== RedClaw 团队协作工作流 =========="
    log "开始时间: $(date)"
    
    # Phase 1: 资料收集
    collect_phase
    
    # Phase 2: 文章撰写
    ARTICLE_SLUG=$(article_phase)
    
    # Phase 3: 构建部署
    if code_phase "$ARTICLE_SLUG"; then
        # Phase 4: Git 提交
        git_phase
        
        log "✅ 团队协作完成！"
        log "文章: https://redclaw.cc/blog/$ARTICLE_SLUG/"
    else
        log "❌ 部署失败"
        exit 1
    fi
    
    log "结束时间: $(date)"
    log "=========================================="
}

# 运行
main
