#!/bin/bash
# 每日工作流快捷命令
# 用法: ./run-daily-workflow.sh

echo "🚀 启动 OpenClaw 每日工作流..."
echo ""

cd /Users/openmilo/clawall/claw-team/claw-admin
bash scripts/daily-workflow.sh

echo ""
echo "✅ 工作流执行完成！"
echo "📋 查看报告: logs/daily-report-$(date +%Y-%m-%d).md"
