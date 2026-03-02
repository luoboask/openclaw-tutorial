#!/bin/bash
# deploy.sh - 本地开发自动同步部署到服务器
# 用法: ./deploy.sh [commit message]

set -e

# 配置
SERVER_IP="31.220.53.241"
SERVER_USER="root"
SERVER_PATH="/www/wwwroot/openclaw-tutorial"
SSH_KEY="$HOME/.ssh/id_ed25519_server_31_220_53_241"
LOCAL_PATH="/Users/openmilo/clawall/claw-team/claw-code/workspace/website"

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 获取 commit message
if [ -z "$1" ]; then
    COMMIT_MSG="auto: update $(date +%Y-%m-%d-%H:%M)"
else
    COMMIT_MSG="$1"
fi

echo "========================================"
echo "  OpenClaw 网站自动部署"
echo "========================================"
echo ""

# 步骤 1: 本地构建测试
echo "步骤 1/6: 本地构建测试..."
cd "$LOCAL_PATH"
if npm run build > /tmp/build.log 2>&1; then
    log_info "✅ 本地构建成功"
else
    log_error "❌ 本地构建失败"
    cat /tmp/build.log
    exit 1
fi

# 步骤 2: Git 提交
echo ""
echo "步骤 2/6: Git 提交更改..."
cd "$LOCAL_PATH"
git add .
if git commit -m "$COMMIT_MSG" > /tmp/git.log 2>&1; then
    log_info "✅ Git 提交成功: $COMMIT_MSG"
else
    log_warn "⚠️  没有更改需要提交"
fi

# 步骤 3: 推送到 GitHub
echo ""
echo "步骤 3/6: 推送到 GitHub..."
cd "$LOCAL_PATH"
if git push origin main; then
    log_info "✅ 推送成功"
else
    log_error "❌ 推送失败"
    exit 1
fi

# 步骤 4: 服务器拉取更新
echo ""
echo "步骤 4/6: 服务器拉取更新..."
if ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "cd $SERVER_PATH && git pull origin main" > /tmp/pull.log 2>&1; then
    log_info "✅ 服务器拉取成功"
else
    log_error "❌ 服务器拉取失败"
    cat /tmp/pull.log
    exit 1
fi

# 步骤 5: 服务器构建
echo ""
echo "步骤 5/6: 服务器构建..."
if ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "cd $SERVER_PATH && npm install && npm run build" > /tmp/server-build.log 2>&1; then
    log_info "✅ 服务器构建成功"
else
    log_error "❌ 服务器构建失败"
    cat /tmp/server-build.log
    exit 1
fi

# 步骤 6: 重启服务
echo ""
echo "步骤 6/6: 重启 PM2 服务..."
if ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "pm2 restart openclaw-tutorial" > /tmp/pm2.log 2>&1; then
    log_info "✅ 服务重启成功"
else
    log_warn "⚠️  服务重启可能需要手动检查"
fi

# 验证部署
echo ""
echo "验证部署..."
sleep 2
if curl -s -o /dev/null -w "%{http_code}" http://$SERVER_IP/ | grep -q "200"; then
    log_info "✅ 网站访问正常 (HTTP 200)"
else
    log_warn "⚠️  网站可能需要几秒钟启动"
fi

echo ""
echo "========================================"
echo "  部署完成!"
echo "========================================"
echo ""
echo "访问地址:"
echo "  - http://$SERVER_IP"
echo "  - http://$SERVER_IP:3000"
echo ""
echo "宝塔面板:"
echo "  - 可以在面板中管理网站"
echo ""
