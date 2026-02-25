# 2026-02-17 案例系统重构 - 详细教程

## 变更内容

将原有的案例卡片页面重构为案例系统，每个案例都有独立的详细搭建教程页面。

## 结构变更

### 之前
- `/cases` - 案例列表页面，卡片点击跳转到通用文档

### 现在
- `/cases` - 案例列表页面，卡片链接到详细教程
- `/cases/personal-ai-assistant` - 详细教程页面（示例）
- `/cases/[case-slug]` - 其他案例的详细教程（待创建）

## 已完成工作

### 1. 案例列表页面更新
- 每个案例添加了 `slug` 字段
- 按钮文字统一为 "查看详细教程"
- 链接指向 `/cases/{slug}`

### 2. 创建第一个详细教程
**个人 AI 助手教程** (`/cases/personal-ai-assistant`)
- ✅ 前置要求说明
- ✅ WhatsApp 配置方案（含二维码登录说明）
- ✅ Telegram 配置方案（含 BotFather 步骤）
- ✅ 高级配置（语音支持、系统提示词）
- ✅ 常见问题折叠面板
- ✅ 前后导航链接

### 3. 待创建的详细教程
根据用户需要，可以为以下案例创建详细教程：

| 案例 | Slug | 预计内容 |
|------|------|----------|
| 第二大脑 | second-brain | 记忆功能配置、知识管理 |
| 编程助手 | coding-assistant | 自定义工具开发、Git 集成 |
| 运维监控 | devops-monitoring | Cron 任务、告警配置 |
| 智能客服 | smart-customer-service | 知识库配置、工单系统 |
| 内容创作助手 | content-creation | 写作工作流、模板配置 |
| 团队知识库 | team-knowledge-base | 文档索引、权限管理 |
| 智能学习助手 | learning-assistant | 题库配置、学习计划 |
| 会议助手 | meeting-assistant | 语音转文字、待办提取 |
| 智能导购 | shopping-assistant | 商品推荐、订单查询 |
| 健康顾问 | health-advisor | 健康数据追踪、用药提醒 |
| 智能工作流 | workflow-automation | 多服务联动、定时任务 |
| 信息搜集助手 | info-collection | 爬虫配置、日报生成 |

## 技术实现

每个案例教程页面使用：
- `prose-lg prose-slate` - 更大的阅读字体
- `leading-loose` - 宽松的行高
- 代码块高亮
- 折叠面板（FAQ）
- 前后导航链接

## 访问方式

1. 访问案例列表：http://localhost:3456/cases
2. 点击任意案例卡片的 "查看详细教程" 按钮
3. 或直接访问：http://localhost:3456/cases/personal-ai-assistant/
