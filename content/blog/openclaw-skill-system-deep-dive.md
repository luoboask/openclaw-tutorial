---
title: "OpenClaw Skill 系统深度解析：原理、实现与最佳实践"
description: "深入解析 OpenClaw 的 Skill 系统架构，包括 Skill 的角色定位、两种实现方式（Prompt-based vs Code-based）、工作原理详解以及开发最佳实践"
date: 2026-02-24
author: "OpenClaw Assistant"
tags: ["openclaw", "skill", "架构设计", "插件系统", "AI工具"]
category: "技术文档"
slug: "openclaw-skill-system-deep-dive"
---

# OpenClaw Skill 系统深度解析：原理、实现与最佳实践

> 本文深入剖析 OpenClaw 的 Skill 系统，从架构设计到具体实现，帮助开发者理解并创建自己的 Skill。

---

## 一、什么是 Skill？

在 OpenClaw 中，**Skill（技能）**是能力扩展的基本单元。它让 OpenClaw 从一个简单的对话 AI，进化为能够执行实际任务的专业助手。

### 1.1 核心定位

```
┌─────────────────────────────────────────┐
│           OpenClaw 核心系统              │
│  (记忆系统、工具调用、AI 推理引擎)        │
└─────────────────────────────────────────┘
                    ↓
        ┌───────────────────┐
        │    Skill 层       │  ← 能力扩展单元
        │  ┌───┐ ┌───┐     │
        │  │ A │ │ B │ ... │  ← 各种 Skill
        │  └───┘ └───┘     │
        └───────────────────┘
                    ↓
        ┌───────────────────┐
        │    外部世界       │
        │  (API、文件、网络) │
        └───────────────────┘
```

**通俗理解**：
- 如果把 OpenClaw 比作一个人，**Skill** 就是这个人的各种技能
- 没有 Skill，OpenClaw 只是一个会聊天的 AI
- 有了 Skill，OpenClaw 可以搜索网页、分析股票、操作 GitHub、处理视频...

### 1.2 Skill 的三大角色

| 角色 | 说明 | 示例 Skill |
|------|------|-----------|
| **🛠️ 工具封装** | 将复杂操作封装为简单调用 | `bing-search` 封装了 curl + 网页解析 |
| **🧠 知识增强** | 提供专业领域的分析框架和方法论 | `us-stock-analysis` 提供投资分析流程 |
| **🔗 外部连接** | 连接第三方服务和 API | `github` 连接 GitHub API |

---

## 二、Skill 的两种实现方式

OpenClaw 支持两种 Skill 实现方式，各有适用场景：

### 2.1 纯 Prompt 实现（声明式）

```
my-skill/
├── SKILL.md              # 唯一的必需文件
└── references/           # 可选的参考文档
    └── framework.md
```

**特点**：
- 只有 `SKILL.md`，没有代码文件
- 通过详细的指令告诉 AI 如何完成任务
- 依赖 AI 的推理能力和工具使用能力

**适用场景**：
- 数据分析、推理、生成类任务
- 需要 AI 进行复杂判断和综合
- 不需要外部工具或系统调用

**示例**：`us-stock-analysis`

```markdown
---
name: us-stock-analysis
description: Comprehensive US stock analysis including fundamental analysis...
---

## Analysis Workflow

1. **Gather Data**
   - Use web_search to get current stock price
   - Search for financial statements
   
2. **Analyze Fundamentals**
   - Read references/fundamental-analysis.md
   - Calculate key metrics (P/E, ROE, etc.)
   
3. **Generate Report**
   - Follow references/report-template.md
   - Output structured analysis
```

**工作原理**：
```
用户请求 → AI 读取 SKILL.md → 按工作流执行 → 使用工具 → 生成结果
```

### 2.2 代码实现（命令式）

```
my-skill/
├── SKILL.md              # 定义和说明
├── scripts/              # 代码目录
│   ├── run.sh           # Bash 脚本
│   ├── tool.py          # Python 脚本
│   └── helper.js        # Node.js 脚本
└── references/           # 可选
```

**特点**：
- `SKILL.md` + `scripts/` 代码文件
- 实际执行代码完成具体任务
- 更可靠、可控、精确

**适用场景**：
- 调用外部 API 或系统命令
- 文件处理、格式转换
- 需要精确计算或数据处理
- 依赖特定工具（如 ffmpeg、curl）

**示例**：`bing-search`

**SKILL.md**：
```markdown
---
name: bing-search
description: Search the web using Bing
---

## Usage

```bash
{baseDir}/scripts/bing-search.sh "query" [num_results]
```
```

**scripts/bing-search.sh**：
```bash
#!/bin/bash

QUERY="${1:-}"
NUM_RESULTS="${2:-10}"

# URL encode
ENCODED_QUERY=$(echo "$QUERY" | perl -MURI::Escape -ne 'print uri_escape($_)')

# Fetch and parse results
curl -s "https://www.bing.com/search?q=$ENCODED_QUERY" | \
grep -oE 'href="https?://[^"]+"' | \
head -$NUM_RESULTS
```

**工作原理**：
```
用户请求 → AI 读取 SKILL.md → 调用 scripts/xxx.sh → 脚本执行 → 返回结果 → AI 展示
```

### 2.3 两种方式对比

| 维度 | 纯 Prompt | 代码实现 |
|------|----------|---------|
| **复杂度** | 低（纯配置） | 中（需要编码） |
| **灵活性** | 高（AI 自适应） | 中（按代码逻辑） |
| **可靠性** | 中（依赖 AI 能力） | 高（精确可控） |
| **性能** | 中（AI 推理耗时） | 高（直接执行） |
| **错误处理** | 依赖 AI | 代码中精确处理 |
| **适用场景** | 分析、推理、生成 | 工具、API、数据处理 |

---

## 三、Skill 的工作原理详解

### 3.1 完整生命周期

```
1. 发现 (Discovery)
   ↓
2. 加载 (Loading)
   ↓
3. 匹配 (Matching)
   ↓
4. 执行 (Execution)
   ↓
5. 输出 (Output)
```

#### 1. 发现阶段

```bash
# 本地 Skill
openclaw skills list
# 读取 ~/.openclaw/workspace/skills/*/

# 市场 Skill
clawhub search "web search"
# 从 clawhub.com 搜索
```

#### 2. 加载阶段

```javascript
// OpenClaw 启动时
for (const skillDir of skillsDirectories) {
  const skillMd = readFile(`${skillDir}/SKILL.md`);
  const config = parseYamlFrontmatter(skillMd);
  
  skills.push({
    name: config.name,
    description: config.description,
    metadata: config.metadata,
    content: skillMd,
    path: skillDir
  });
}
```

#### 3. 匹配阶段

```
用户输入: "分析一下特斯拉股票"
                ↓
AI 分析意图: 股票分析
                ↓
匹配 Skill: us-stock-analysis
(因为 description 包含 "stock analysis")
```

#### 4. 执行阶段

**纯 Prompt Skill**：
```
AI 读取 SKILL.md
    ↓
识别分析类型: Comprehensive Report
    ↓
按工作流执行:
  Step 1: web_search("TSLA financial metrics")
  Step 2: read("references/fundamental-analysis.md")
  Step 3: analyze(data)
  Step 4: generate(report)
```

**代码 Skill**：
```
AI 读取 SKILL.md
    ↓
提取命令模板: {baseDir}/scripts/bing-search.sh "{query}"
    ↓
替换变量:
  baseDir = /Users/xxx/.openclaw/workspace/skills/bing-search
  query = "特斯拉股价"
    ↓
执行: /bin/bash /Users/xxx/.../bing-search.sh "特斯拉股价"
    ↓
捕获输出
    ↓
AI 展示结果
```

### 3.2 Skill 调用流程图

```
┌─────────────────────────────────────────┐
│           用户输入                        │
│    "搜索一下 OpenClaw 教程"              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│        OpenClaw 意图识别                │
│    识别为 "web_search" 意图             │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│        Skill 匹配                         │
│  匹配到 bing-search (description 匹配)   │
└─────────────────────────────────────────┘
                    ↓
        ┌───────────────────┐
        │   执行方式分支     │
        └───────────────────┘
           ↓              ↓
    ┌──────────┐   ┌──────────┐
    │ Prompt   │   │ 代码     │
    │ Skill    │   │ Skill    │
    └──────────┘   └──────────┘
           ↓              ↓
    ┌──────────┐   ┌──────────┐
    │ AI 按    │   │ 执行     │
    │ 工作流   │   │ scripts/ │
    │ 执行     │   │ xxx.sh   │
    └──────────┘   └──────────┘
           ↓              ↓
    ┌─────────────────────────┐
    │       返回结果          │
    └─────────────────────────┘
```

---

## 四、Skill 的核心组件

### 4.1 SKILL.md 结构

```markdown
---
name: skill-name                    # 必需：唯一标识
description: What this skill does   # 必需：AI 匹配依据
homepage: https://example.com       # 可选：项目主页
metadata:                           # 可选：元数据
  requires:
    bins: ["curl", "ffmpeg"]       # 必需的二进制工具
    env: ["API_KEY"]                # 必需的环境变量
  install:                          # 安装指令
    - kind: brew
      formula: ffmpeg
---

# Skill Title

## Overview
简要说明这个 Skill 的功能

## Usage
使用示例和说明

## Workflow (Prompt Skill)
详细的工作流程步骤

## Examples
- "示例查询 1"
- "示例查询 2"

## Reference Files
引用的参考文档说明
```

### 4.2 Metadata 详解

```yaml
metadata:
  # 依赖检查
  requires:
    bins: ["node", "npm"]           # 系统必须安装的工具
    env: ["OPENAI_API_KEY"]          # 必需的环境变量
    npm: ["axios"]                   # npm 依赖
    pip: ["requests"]                # pip 依赖
  
  # 自动安装
  install:
    - kind: brew                     # Homebrew 安装
      formula: ffmpeg
      bins: ["ffmpeg"]
    - kind: npm                      # npm 安装
      package: "@some/package"
  
  # ClawHub 展示信息
  clawdbot:
    emoji: "🔍"                      # 图标
    color: "#FF0000"                 # 主题色
```

### 4.3 scripts/ 目录规范

```
scripts/
├── main.sh          # 主入口脚本（推荐）
├── utils.sh         # 工具函数
├── api-client.py    # Python 辅助脚本
└── config.json      # 配置文件
```

**最佳实践**：
- 使用 `{baseDir}` 占位符表示技能根目录
- 脚本要有明确的输入输出
- 返回 JSON 格式便于 AI 解析
- 错误处理要完善

---

## 五、创建自定义 Skill 实战

### 5.1 创建一个简单的代码 Skill

**目标**：创建一个天气查询 Skill

```bash
# 1. 创建目录
mkdir -p ~/.openclaw/workspace/skills/weather-query/scripts

# 2. 创建 SKILL.md
cat > ~/.openclaw/workspace/skills/weather-query/SKILL.md << 'EOF'
---
name: weather-query
description: Query weather information for a city using wttr.in
metadata:
  requires:
    bins: ["curl"]
---

# Weather Query

Query weather information for any city worldwide.

## Usage

```bash
{baseDir}/scripts/weather.sh "city_name"
```

## Examples

```bash
{baseDir}/scripts/weather.sh "Beijing"
{baseDir}/scripts/weather.sh "New York"
{baseDir}/scripts/weather.sh "London"
```

## Note

Uses wttr.in service which provides free weather data.
EOF

# 3. 创建脚本
cat > ~/.openclaw/workspace/skills/weather-query/scripts/weather.sh << 'EOF'
#!/bin/bash

CITY="${1:-Beijing}"

# Replace space with +
CITY_ENCODED=$(echo "$CITY" | sed 's/ /+/g')

echo "🌤️ Weather for: $CITY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

curl -s "wttr.in/$CITY_ENCODED?format=3"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Query complete"
EOF

chmod +x ~/.openclaw/workspace/skills/weather-query/scripts/weather.sh

# 4. 立即使用！
# 在 OpenClaw 中输入："查询北京天气"
```

### 5.2 创建一个复杂的 Prompt Skill

**目标**：创建一个代码审查 Skill

```markdown
---
name: code-review
description: Perform comprehensive code review including style, security, performance, and best practices analysis
---

# Code Review

Perform multi-dimensional code review.

## Review Dimensions

1. **Style & Formatting**
   - Check code style consistency
   - Verify naming conventions
   - Check indentation and formatting

2. **Security**
   - Identify potential vulnerabilities
   - Check for SQL injection risks
   - Verify input validation

3. **Performance**
   - Identify inefficient algorithms
   - Check for unnecessary operations
   - Suggest optimizations

4. **Best Practices**
   - Check design patterns usage
   - Verify error handling
   - Check documentation

## Workflow

1. Read the code provided
2. Analyze each dimension
3. Identify issues with severity (Critical/Warning/Suggestion)
4. Provide specific recommendations
5. Generate structured review report

## Output Format

```markdown
## Code Review Report

### Summary
- Total Issues: X
- Critical: X
- Warnings: X
- Suggestions: X

### Detailed Findings

#### 1. Style & Formatting
- [Severity] Description
  - Location: file:line
  - Suggestion: how to fix

#### 2. Security
...

#### 3. Performance
...

#### 4. Best Practices
...

### Recommendations
1. Priority 1: ...
2. Priority 2: ...
```
```

---

## 六、Skill 的进阶技巧

### 6.1 组合多个 Skill

```
用户: "搜索 Tesla 最新新闻并分析对股价的影响"

AI 执行:
1. 调用 bing-search: "Tesla news today"
2. 获取新闻内容
3. 调用 us-stock-analysis: 分析新闻对 TSLA 的影响
4. 生成综合分析报告
```

### 6.2 Skill 间的数据传递

```bash
# Skill A 输出
{ "ticker": "TSLA", "price": 250.00 }

# Skill B 接收并处理
./analyze.sh '{ "ticker": "TSLA", "price": 250.00 }'
```

### 6.3 条件执行

```markdown
## Conditional Execution

If the user asks for "quick info":
- Use Basic Stock Info workflow

If the user asks for "detailed analysis":
- Use Comprehensive Report workflow

If the user asks to "compare":
- Use Stock Comparison workflow
```

---

## 七、最佳实践与注意事项

### 7.1 设计原则

1. **单一职责**：一个 Skill 只做一件事，做好一件事
2. **清晰描述**：description 要准确，便于 AI 匹配
3. **输入明确**：说明需要什么输入，格式是什么
4. **输出规范**：输出格式要一致，便于解析
5. **错误处理**：考虑各种异常情况

### 7.2 常见陷阱

| 陷阱 | 说明 | 解决方案 |
|------|------|---------|
| **描述太泛** | AI 无法准确匹配 | description 要具体 |
| **步骤不清** | AI 执行混乱 | 工作流要详细明确 |
| **依赖未声明** | 运行时出错 | metadata.requires 要完整 |
| **输出不固定** | 难以解析 | 使用结构化输出 |
| **错误未处理** | 程序崩溃 | 完善的错误处理 |

### 7.3 性能优化

- **缓存结果**：避免重复调用 API
- **批量处理**：减少网络请求次数
- **异步执行**：不阻塞主流程
- **超时设置**：防止长时间等待

---

## 八、总结

### Skill 的核心价值

1. **🎯 专业化**：每个 Skill 专注一个领域
2. **🔧 可复用**：一次开发，多次使用
3. **🧩 可组合**：多个 Skill 协同工作
4. **🚀 可扩展**：通过 ClawHub 不断扩展能力
5. **🤖 AI 友好**：声明式配置，AI 易于理解和调用

### 选择合适的实现方式

| 场景 | 推荐方式 |
|------|---------|
| 需要分析、推理、生成 | **纯 Prompt** |
| 需要调用 API、处理文件 | **代码实现** |
| 需要精确计算 | **代码实现** |
| 需要复杂判断和综合 | **纯 Prompt** |

### Skill 让 OpenClaw 从"聊天"到"做事"

```
没有 Skill:
"你知道怎么搜索网页吗？"
"我知道，但我做不到"

有了 Skill:
"搜索一下 OpenClaw 教程"
"🔍 找到 10 个相关结果..."
```

---

## 参考资料

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [ClawHub 技能市场](https://clawhub.com)
- [Skill 开发指南](https://docs.openclaw.ai/skills/development)

---

**本文作者**: OpenClaw Assistant  
**最后更新**: 2026-02-24  
**适用版本**: OpenClaw 2026.2.x
