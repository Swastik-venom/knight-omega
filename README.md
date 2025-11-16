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

Knight Omega提供了丰富的功能，详细特性请参考[特性说明](https://docs.newapi.pro/wiki/features-introduction)：

1. 🎨 全新的UI界面
2. 🌍 多语言支持
3. 💰 支持在线充值功能，当前支持易支付和Stripe
4. 🔍 支持用key查询使用额度（配合[neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool)）
5. 🔄 兼容原版Knight Omega的数据库
6. 💵 支持模型按次数收费
7. ⚖️ 支持渠道加权随机
8. 📈 数据看板（控制台）
9. 🔒 令牌分组、模型限制
10. 🤖 支持更多授权登陆方式（LinuxDO,Telegram、OIDC）
11. 🔄 支持Rerank模型（Cohere和Jina），[接口文档](https://docs.newapi.pro/api/jinaai-rerank)
12. ⚡ 支持OpenAI Realtime API（包括Azure渠道），[接口文档](https://docs.newapi.pro/api/openai-realtime)
13. ⚡ 支持 **OpenAI Responses** 格式，[接口文档](https://docs.newapi.pro/api/openai-responses)
14. ⚡ 支持 **Claude Messages** 格式，[接口文档](https://docs.newapi.pro/api/anthropic-chat)
15. ⚡ 支持 **Google Gemini** 格式，[接口文档](https://docs.newapi.pro/api/google-gemini-chat/)
16. 🧠 支持通过模型名称后缀设置 reasoning effort：
    1. OpenAI o系列模型
        - 添加后缀 `-high` 设置为 high reasoning effort (例如: `o3-mini-high`)
        - 添加后缀 `-medium` 设置为 medium reasoning effort (例如: `o3-mini-medium`)
        - 添加后缀 `-low` 设置为 low reasoning effort (例如: `o3-mini-low`)
    2. Claude 思考模型
        - 添加后缀 `-thinking` 启用思考模式 (例如: `claude-3-7-sonnet-20250219-thinking`)
17. 🔄 思考转内容功能
18. 🔄 针对用户的模型限流功能
19. 🔄 请求格式转换功能，支持以下三种格式转换：
    1. OpenAI Chat Completions => Claude Messages （OpenAI格式调用Claude模型）
    2. Clade Messages => OpenAI Chat Completions (可用于Claude Code调用第三方模型)
    3. OpenAI Chat Completions => Gemini Chat （OpenAI格式调用Gemini模型）
20. 💰 缓存计费支持，开启后可以在缓存命中时按照设定的比例计费：
    1. 在 `系统设置-运营设置` 中设置 `提示缓存倍率` 选项
    2. 在渠道中设置 `提示缓存倍率`，范围 0-1，例如设置为 0.5 表示缓存命中时按照 50% 计费
    3. 支持的渠道：
        - [x] OpenAI
        - [x] Azure
        - [x] DeepSeek
        - [x] Claude

## 模型支持

此版本支持多种模型，详情请参考[接口文档-中继接口](https://docs.newapi.pro/api)：

1. 第三方模型 **gpts** （gpt-4-gizmo-*）
2. 第三方渠道[Midjourney-Proxy(Plus)](https://github.com/novicezk/midjourney-proxy)接口，[接口文档](https://docs.newapi.pro/api/midjourney-proxy-image)
3. 第三方渠道[Suno API](https://github.com/Suno-API/Suno-API)接口，[接口文档](https://docs.newapi.pro/api/suno-music)
4. 自定义渠道，支持填入完整调用地址
5. Rerank模型（[Cohere](https://cohere.ai/)和[Jina](https://jina.ai/)），[接口文档](https://docs.newapi.pro/api/jinaai-rerank)
6. Claude Messages 格式，[接口文档](https://docs.newapi.pro/api/anthropic-chat)
7. Google Gemini格式，[接口文档](https://docs.newapi.pro/api/google-gemini-chat/)
8. Dify，当前仅支持chatflow
9. 更多接口请参考[接口文档](https://docs.newapi.pro/api)

## 环境变量配置

详细配置说明请参考[安装指南-环境变量配置](https://docs.newapi.pro/installation/environment-variables)：

- `GENERATE_DEFAULT_TOKEN`：是否为新注册用户生成初始令牌，默认为 `false`
- `STREAMING_TIMEOUT`：流式回复超时时间，默认300秒
- `DIFY_DEBUG`：Dify渠道是否输出工作流和节点信息，默认 `true`
- `GET_MEDIA_TOKEN`：是否统计图片token，默认 `true`
- `GET_MEDIA_TOKEN_NOT_STREAM`：非流情况下是否统计图片token，默认 `true`
- `UPDATE_TASK`：是否更新异步任务（Midjourney、Suno），默认 `true`
- `GEMINI_VISION_MAX_IMAGE_NUM`：Gemini模型最大图片数量，默认 `16`
- `MAX_FILE_DOWNLOAD_MB`: 最大文件下载大小，单位MB，默认 `20`
- `CRYPTO_SECRET`：加密密钥，用于加密Redis数据库内容
- `AZURE_DEFAULT_API_VERSION`：Azure渠道默认API版本，默认 `2025-04-01-preview`
- `NOTIFICATION_LIMIT_DURATION_MINUTE`：邮件等通知限制持续时间，默认 `10`分钟
- `NOTIFY_LIMIT_COUNT`：用户通知在指定持续时间内的最大数量，默认 `2`
- `ERROR_LOG_ENABLED=true`: 是否记录并显示错误日志，默认`false`
- `TASK_PRICE_PATCH=sora-2-all,sora-2-pro-all`: 异步任务设置某些模型按次计费，多个模型用逗号分隔，例如`sora-2-all,sora-2-pro-all`，表示sora-2-all和sora-2-pro-all模型异步任务仅按次计费，不按秒等计费。

## 部署

详细部署指南请参考[安装指南-部署方式](https://docs.newapi.pro/installation)：

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
