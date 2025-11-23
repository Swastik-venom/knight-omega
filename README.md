<div align="center">

![new-api](/web/public/logo.png)

# Knight Omega

🍥 **新一代大模型网关与AI资产管理系统**

<p align="center">
  <strong>中文</strong> | 
  <a href="./README.en.md">English</a> | 
  <a href="./README.fr.md">Français</a> | 
  <a href="./README.ja.md">日本語</a>
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/Calcium-Ion/new-api/main/LICENSE">
    <img src="https://img.shields.io/github/license/Calcium-Ion/new-api?color=brightgreen" alt="license">
  </a>
  <a href="https://github.com/Calcium-Ion/new-api/releases/latest">
    <img src="https://img.shields.io/github/v/release/Calcium-Ion/new-api?color=brightgreen&include_prereleases" alt="release">
  </a>
  <a href="https://github.com/users/Calcium-Ion/packages/container/package/new-api">
    <img src="https://img.shields.io/badge/docker-ghcr.io-blue" alt="docker">
  </a>
  <a href="https://hub.docker.com/r/CalciumIon/new-api">
    <img src="https://img.shields.io/badge/docker-dockerHub-blue" alt="docker">
  </a>
  <a href="https://goreportcard.com/report/github.com/Calcium-Ion/new-api">
    <img src="https://goreportcard.com/badge/github.com/Calcium-Ion/new-api" alt="GoReportCard">
  </a>
</p>

<p align="center">
  <a href="https://trendshift.io/repositories/8227" target="_blank">
    <img src="https://trendshift.io/api/badge/repositories/8227" alt="Calcium-Ion%2Fnew-api | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/>
  </a>
</p>

<p align="center">
  <a href="#-快速开始">快速开始</a> •
  <a href="#-主要特性">主要特性</a> •
  <a href="#-部署">部署</a> •
  <a href="#-文档">文档</a> •
  <a href="#-帮助支持">帮助</a>
</p>

</div>

## 📝 项目说明

> [!NOTE]  
> 本项目为开源项目，在[Knight Omega](https://github.com/songquanpeng/one-api)的基础上进行二次开发

> [!IMPORTANT]  
> - 本项目仅供个人学习使用，不保证稳定性，且不提供任何技术支持
> - 使用者必须在遵循 OpenAI 的 [使用条款](https://openai.com/policies/terms-of-use) 以及**法律法规**的情况下使用，不得用于非法用途
> - 根据 [《生成式人工智能服务管理暂行办法》](http://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm) 的要求，请勿对中国地区公众提供一切未经备案的生成式人工智能服务

---

## 🤝 我们信任的合作伙伴

<p align="center">
  <em>排名不分先后</em>
</p>

<p align="center">
  <a href="https://www.cherry-ai.com/" target="_blank">
    <img src="./docs/images/cherry-studio.png" alt="Cherry Studio" height="80" />
  </a>
  <a href="https://bda.pku.edu.cn/" target="_blank">
    <img src="./docs/images/pku.png" alt="北京大学" height="80" />
  </a>
  <a href="https://www.compshare.cn/?ytag=GPU_yy_gh_newapi" target="_blank">
    <img src="./docs/images/ucloud.png" alt="UCloud 优刻得" height="80" />
  </a>
  <a href="https://www.aliyun.com/" target="_blank">
    <img src="./docs/images/aliyun.png" alt="阿里云" height="80" />
  </a>
  <a href="https://io.net/" target="_blank">
    <img src="./docs/images/io-net.png" alt="IO.NET" height="80" />
  </a>
</p>

---

## 🙏 特别鸣谢

<p align="center">
  <a href="https://www.jetbrains.com/?from=new-api" target="_blank">
    <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo" width="120" />
  </a>
</p>

<p align="center">
  <a href="https://www.cherry-ai.com/" target=_blank><img
    src="./docs/images/cherry-studio.png" alt="Cherry Studio" height="120"
  /></a>
  <a href="https://bda.pku.edu.cn/" target=_blank><img
    src="./docs/images/pku.png" alt="北京大学" height="120"
  /></a>
  <a href="https://www.compshare.cn/?ytag=GPU_yy_gh_newapi" target=_blank><img
    src="./docs/images/ucloud.png" alt="UCloud 优刻得" height="120"
  /></a>
  <a href="https://www.aliyun.com/" target=_blank><img
    src="./docs/images/aliyun.png" alt="阿里云" height="120"
  /></a>
  <a href="https://io.net/" target=_blank><img
    src="./docs/images/io-net.png" alt="IO.NET" height="120"
  /></a>
</p>
<p>&nbsp;</p>

## 📚 文档

详细文档请访问我们的官方Wiki：[https://docs.newapi.pro/](https://docs.newapi.pro/)

也可访问AI生成的DeepWiki:
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/QuantumNous/new-api)

### 🎮 控制台测试工具

Knight Omega 提供了强大的浏览器控制台测试工具，让您可以直接在浏览器开发者工具中测试 AI 模型：

```javascript
// 在浏览器控制台中使用
playground.help()                    // 显示帮助信息
await playground.chat("Hello!")      // 简单对话
await playground.listModels()        // 列出可用模型
```

📖 **详细文档：**
- [控制台测试工具完整文档](./docs/CONSOLE_PLAYGROUND.md)
- [快速参考指南](./docs/CONSOLE_PLAYGROUND_QUICK_REFERENCE.md)

## ✨ 主要特性

> 详细特性请参考 [特性说明](https://docs.newapi.pro/wiki/features-introduction)

### 🎨 核心功能

| 特性 | 说明 |
|------|------|
| 🎨 全新 UI | 现代化的用户界面设计 |
| 🌍 多语言 | 支持中文、英文、法语、日语 |
| 🔄 数据兼容 | 完全兼容原版 One API 数据库 |
| 📈 数据看板 | 可视化控制台与统计分析 |
| 🔒 权限管理 | 令牌分组、模型限制、用户管理 |

### 💰 支付与计费

- ✅ 在线充值（易支付、Stripe）
- ✅ 模型按次数收费
- ✅ 缓存计费支持（OpenAI、Azure、DeepSeek、Claude、Qwen等所有支持的模型）
- ✅ 灵活的计费策略配置

### 🔐 授权与安全

- 🤖 LinuxDO 授权登录
- 📱 Telegram 授权登录
- 🔑 OIDC 统一认证
- 🔍 Key 查询使用额度（配合 [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool)）

### 🚀 高级功能

**API 格式支持：**
- ⚡ [OpenAI Responses](https://docs.newapi.pro/api/openai-responses)
- ⚡ [OpenAI Realtime API](https://docs.newapi.pro/api/openai-realtime)（含 Azure）
- ⚡ [Claude Messages](https://docs.newapi.pro/api/anthropic-chat)
- ⚡ [Google Gemini](https://docs.newapi.pro/api/google-gemini-chat/)
- 🔄 [Rerank 模型](https://docs.newapi.pro/api/jinaai-rerank)（Cohere、Jina）

**智能路由：**
- ⚖️ 渠道加权随机
- 🔄 失败自动重试
- 🚦 用户级别模型限流

**格式转换：**
- 🔄 OpenAI ⇄ Claude Messages
- 🔄 OpenAI ⇄ Gemini Chat
- 🔄 思考转内容功能

**Reasoning Effort 支持：**

<details>
<summary>查看详细配置</summary>

**OpenAI 系列模型：**
- `o3-mini-high` - High reasoning effort
- `o3-mini-medium` - Medium reasoning effort
- `o3-mini-low` - Low reasoning effort
- `gpt-5-high` - High reasoning effort
- `gpt-5-medium` - Medium reasoning effort
- `gpt-5-low` - Low reasoning effort

**Claude 思考模型：**
- `claude-3-7-sonnet-20250219-thinking` - 启用思考模式

**Google Gemini 系列模型：**
- `gemini-2.5-flash-thinking` - 启用思考模式
- `gemini-2.5-flash-nothinking` - 禁用思考模式
- `gemini-2.5-pro-thinking` - 启用思考模式
- `gemini-2.5-pro-thinking-128` - 启用思考模式，并设置思考预算为128tokens

</details>

---

## 🤖 模型支持

> 详情请参考 [接口文档 - 中继接口](https://docs.newapi.pro/api)

| 模型类型 | 说明 | 文档 |
|---------|------|------|
| 🤖 OpenAI GPTs | gpt-4-gizmo-* 系列 | - |
| 🎨 Midjourney-Proxy | [Midjourney-Proxy(Plus)](https://github.com/novicezk/midjourney-proxy) | [文档](https://docs.newapi.pro/api/midjourney-proxy-image) |
| 🎵 Suno-API | [Suno API](https://github.com/Suno-API/Suno-API) | [文档](https://docs.newapi.pro/api/suno-music) |
| 🔄 Rerank | Cohere、Jina | [文档](https://docs.newapi.pro/api/jinaai-rerank) |
| 💬 Claude | Messages 格式 | [文档](https://docs.newapi.pro/api/anthropic-chat) |
| 🌐 Gemini | Google Gemini 格式 | [文档](https://docs.newapi.pro/api/google-gemini-chat/) |
| 🔧 Dify | ChatFlow 模式 | - |
| 🎯 自定义 | 支持完整调用地址 | - |

### 📡 支持的接口

<details>
<summary>查看完整接口列表</summary>

- [聊天接口 (Chat Completions)](https://docs.newapi.pro/api/openai-chat)
- [响应接口 (Responses)](https://docs.newapi.pro/api/openai-responses)
- [图像接口 (Image)](https://docs.newapi.pro/api/openai-image)
- [音频接口 (Audio)](https://docs.newapi.pro/api/openai-audio)
- [视频接口 (Video)](https://docs.newapi.pro/api/openai-video)
- [嵌入接口 (Embeddings)](https://docs.newapi.pro/api/openai-embeddings)
- [重排序接口 (Rerank)](https://docs.newapi.pro/api/jinaai-rerank)
- [实时对话 (Realtime)](https://docs.newapi.pro/api/openai-realtime)
- [Claude 聊天](https://docs.newapi.pro/api/anthropic-chat)
- [Google Gemini 聊天](https://docs.newapi.pro/api/google-gemini-chat)

</details>

---

## 🚢 部署

> [!TIP]
> **最新版 Docker 镜像：** `calciumion/new-api:latest`

### 📋 部署要求

| 组件 | 要求 |
|------|------|
| **本地数据库** | SQLite（Docker 需挂载 `/data` 目录）|
| **远程数据库** | MySQL ≥ 5.7.8 或 PostgreSQL ≥ 9.6 |
| **容器引擎** | Docker / Docker Compose |

### ⚙️ 环境变量配置

<details>
<summary>常用环境变量配置</summary>

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `SESSION_SECRET` | 会话密钥（多机部署必须） | - |
| `CRYPTO_SECRET` | 加密密钥（Redis 必须） | - |
| `SQL_DSN` | 数据库连接字符串 | - |
| `REDIS_CONN_STRING` | Redis 连接字符串 | - |
| `STREAMING_TIMEOUT` | 流式超时时间（秒） | `300` |
| `AZURE_DEFAULT_API_VERSION` | Azure API 版本 | `2025-04-01-preview` |
| `ERROR_LOG_ENABLED` | 错误日志开关 | `false` |

📖 **完整配置：** [环境变量文档](https://docs.newapi.pro/installation/environment-variables)

</details>

### 🔧 部署方式

<details>
<summary><strong>方式 1：Docker Compose（推荐）</strong></summary>

```bash
# 克隆项目
git clone https://github.com/QuantumNous/new-api.git
cd new-api

# 编辑配置
nano docker-compose.yml
# 或使用vim编辑器
# vim docker-compose.yml

```

#### 直接使用Docker镜像
```shell
# 使用SQLite
docker run --name new-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -v /home/ubuntu/data/new-api:/data calciumion/new-api:latest

# 使用MySQL
docker run --name new-api -d --restart always -p 3000:3000 -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" -e TZ=Asia/Shanghai -v /home/ubuntu/data/new-api:/data calciumion/new-api:latest
```

## 渠道重试与缓存
渠道重试功能已经实现，可以在`设置->运营设置->通用设置->失败重试次数`设置重试次数，**建议开启缓存**功能。

### 缓存设置方法
1. `REDIS_CONN_STRING`：设置Redis作为缓存
2. `MEMORY_CACHE_ENABLED`：启用内存缓存（设置了Redis则无需手动设置）

## 接口文档

详细接口文档请参考[接口文档](https://docs.newapi.pro/api)：

- [聊天接口（Chat Completions）](https://docs.newapi.pro/api/openai-chat)
- [响应接口 （Responses）](https://docs.newapi.pro/api/openai-responses)
- [图像接口（Image）](https://docs.newapi.pro/api/openai-image)
- [重排序接口（Rerank）](https://docs.newapi.pro/api/jinaai-rerank)
- [实时对话接口（Realtime）](https://docs.newapi.pro/api/openai-realtime)
- [Claude聊天接口](https://docs.newapi.pro/api/anthropic-chat)
- [Google Gemini聊天接口](https://docs.newapi.pro/api/google-gemini-chat)

## 相关项目
- [Knight Omega](https://github.com/songquanpeng/one-api)：原版项目
- [Midjourney-Proxy](https://github.com/novicezk/midjourney-proxy)：Midjourney接口支持
- [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool)：用key查询使用额度

其他基于Knight Omega的项目：
- [new-api-horizon](https://github.com/Calcium-Ion/new-api-horizon)：Knight Omega高性能优化版

## 💬 帮助支持

如有问题，请参考[帮助支持](https://docs.newapi.pro/support)：
- [社区交流](https://docs.newapi.pro/support/community-interaction)
- [反馈问题](https://docs.newapi.pro/support/feedback-issues)
- [常见问题](https://docs.newapi.pro/support/faq)

## 🌟 Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=Calcium-Ion/new-api&type=Date)](https://star-history.com/#Calcium-Ion/new-api&Date)

</div>

---

<div align="center">

### 💖 感谢使用 Knight Omega

如果这个项目对你有帮助，欢迎给我们一个 ⭐️ Star！

**[官方文档](https://docs.newapi.pro/)** • **[问题反馈](https://github.com/Calcium-Ion/new-api/issues)** • **[最新发布](https://github.com/Calcium-Ion/new-api/releases)**

<sub>Built with ❤️ by QuantumNous</sub>

</div>
