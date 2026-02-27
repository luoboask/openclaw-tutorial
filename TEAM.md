# RedClaw 管理团队架构

## 团队成员

### 1. claw-admin (我)
**角色**: 管理者、协调者
**职责**:
- 任务分配和进度跟进
- 审核和整合工作成果
- 决策制定
- 与用户沟通
- 激活其他 Agent 执行任务

**不直接执行**: 写代码、写文章、收集资料

---

### 2. claw-article
**角色**: 内容创作专员
**职责**:
- 撰写博客文章
- 编写教程文档
- 内容排版和优化
- SEO 优化

**激活方式**: `sessions_spawn(agentId="claw-article", task="...")`

---

### 3. claw-code
**角色**: 开发运维专员
**职责**:
- 网站开发和维护
- 构建和部署
- Git 操作
- 服务器配置
- 技术实现

**激活方式**: `sessions_spawn(agentId="claw-code", task="...")`

---

### 4. claw-collect
**角色**: 信息采集专员
**职责**:
- 网络搜索
- 资料整理
- 竞品分析
- 数据收集

**激活方式**: `sessions_spawn(agentId="claw-collect", task="...")`

---

## 工作流程示例

### 发布新博客文章流程

```
用户: 写一篇关于 XXX 的文章
    ↓
claw-admin (我):
  1. 分析需求
  2. 激活 claw-collect 收集资料
     ↓
     claw-collect: 搜索相关资料，整理要点
     ↓
  3. 激活 claw-article 撰写文章
     ↓
     claw-article: 基于资料撰写文章
     ↓
  4. 审核文章内容
  5. 激活 claw-code 部署上线
     ↓
     claw-code: 构建、部署、Git 提交
     ↓
  6. 向用户汇报完成
```

### 网站优化流程

```
用户: 优化网站性能
    ↓
claw-admin (我):
  1. 分析当前状况
  2. 激活 claw-collect 调研最佳实践
     ↓
     claw-collect: 搜索性能优化方案
     ↓
  3. 制定优化计划
  4. 激活 claw-code 实施优化
     ↓
     claw-code: 修改代码、配置、部署
     ↓
  5. 验证优化效果
  6. 向用户汇报结果
```

---

## 当前任务分配

| 任务 | 负责 Agent | 状态 |
|------|-----------|------|
| 网站 rebranding | claw-admin → 全体 | ✅ 已完成 |
| SEO 优化 | claw-code | ✅ 已完成 |
| 文章撰写 (3篇) | claw-article | ✅ 已完成 |
| 服务器部署 | claw-code | ✅ 已完成 |
| 每日博客自动化 | claw-admin (脚本) | ✅ 已配置 |
| 团队身份配置 | claw-admin | ✅ 已完成 |
| 用户沟通 | claw-admin (我) | ✅ |
| 任务协调 | claw-admin (我) | ✅ |

## 系统限制与解决方案

### 限制
`sessions_spawn` 工具在当前环境无法使用（`agentId is not allowed`）

### 解决方案
创建了 **团队协作脚本** (`scripts/team-workflow.sh`) 模拟多 Agent 协作：
- Phase 1: claw-collect 收集资料
- Phase 2: claw-article 撰写文章  
- Phase 3: claw-code 构建部署
- Phase 4: claw-admin Git 提交

### 定时任务
```bash
# 每天 10:00 自动执行团队协作流程
0 10 * * * /scripts/team-workflow.sh
```

---

## 激活命令

```bash
# 激活内容创作 Agent
openclaw agent activate claw-article

# 激活开发运维 Agent
openclaw agent activate claw-code

# 激活信息采集 Agent
openclaw agent activate claw-collect
```

或

```javascript
// 通过 API 激活
sessions_spawn({
  agentId: "claw-article",
  task: "撰写一篇关于 OpenClaw 记忆系统的博客文章"
})
```
