<p align="right">
   <a href="./README.md">中文</a> | <strong>English</strong> | <a href="./README.fr.md">Français</a> | <a href="./README.ja.md">日本語</a>
</p>

> [!NOTE]
> **MT (Machine Translation)**: This document is machine translated. For the most accurate information, please refer to the [Chinese version](./README.md).

<div align="center">

![new-api](/web/public/logo.png)

# Knight Omega

🍥 Next-Generation Large Model Gateway and AI Asset Management System

<a href="https://trendshift.io/repositories/8227" target="_blank"><img src="https://trendshift.io/api/badge/repositories/8227" alt="Calcium-Ion%2Fnew-api | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

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
</div>

## 📝 Project Description

> [!NOTE]  
> This is an open-source project developed based on [Knight Omega](https://github.com/songquanpeng/one-api)

> [!IMPORTANT]  
> - This project is for personal learning purposes only, with no guarantee of stability or technical support.
> - Users must comply with OpenAI's [Terms of Use](https://openai.com/policies/terms-of-use) and **applicable laws and regulations**, and must not use it for illegal purposes.
> - According to the [《Interim Measures for the Management of Generative Artificial Intelligence Services》](http://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm), please do not provide any unregistered generative AI services to the public in China.

<h2>🤝 Trusted Partners</h2>
<p id="premium-sponsors">&nbsp;</p>
<p align="center"><strong>No particular order</strong></p>
<p align="center">
  <a href="https://www.cherry-ai.com/" target=_blank><img
    src="./docs/images/cherry-studio.png" alt="Cherry Studio" height="120"
  /></a>
  <a href="https://bda.pku.edu.cn/" target=_blank><img
    src="./docs/images/pku.png" alt="Peking University" height="120"
  /></a>
  <a href="https://www.compshare.cn/?ytag=GPU_yy_gh_Newapi" target=_blank><img
    src="./docs/images/ucloud.png" alt="UCloud" height="120"
  /></a>
  <a href="https://www.aliyun.com/" target=_blank><img
    src="./docs/images/aliyun.png" alt="Alibaba Cloud" height="120"
  /></a>
  <a href="https://io.net/" target=_blank><img
    src="./docs/images/io-net.png" alt="IO.NET" height="120"
  /></a>
</p>
<p>&nbsp;</p>

## 📚 Documentation

For detailed documentation, please visit our official Wiki: [http://localhost:5173/](http://localhost:5173/)

You can also access the AI-generated DeepWiki:
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/QuantumNous/new-api)

## ✨ Key Features

Knight Omega offers a wide range of features, please refer to [Features Introduction](http://localhost:5173/wiki/features-introduction) for details:

1. 🎨 Brand new UI interface
2. 🌍 Multi-language support
3. 💰 Online recharge functionality, currently supports EPay and Stripe
4. 🔍 Support for querying usage quotas with keys (works with [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool))
5. 🔄 Compatible with the original Knight Omega database
6. 💵 Support for pay-per-use model pricing
7. ⚖️ Support for weighted random channel selection
8. 📈 Data dashboard (console)
9. 🔒 Token grouping and model restrictions
10. 🤖 Support for more authorization login methods (LinuxDO, Telegram, OIDC)
<<<<<<< HEAD
11. 🔄 Support for Rerank models (Cohere and Jina), [API Documentation](http://localhost:5173/api/jinaai-rerank)
12. ⚡ Support for OpenAI Realtime API (including Azure channels), [API Documentation](http://localhost:5173/api/openai-realtime)
13. ⚡ Support for Claude Messages format, [API Documentation](http://localhost:5173/api/anthropic-chat)
14. Support for entering chat interface via /chat2link route
15. 🧠 Support for setting reasoning effort through model name suffixes:
=======
11. 🔄 Support for Rerank models (Cohere and Jina), [API Documentation](https://docs.newapi.pro/api/jinaai-rerank)
12. ⚡ Support for OpenAI Realtime API (including Azure channels), [API Documentation](https://docs.newapi.pro/api/openai-realtime)
13. ⚡ Support for **OpenAI Responses** format, [API Documentation](https://docs.newapi.pro/api/openai-responses)
14. ⚡ Support for **Claude Messages** format, [API Documentation](https://docs.newapi.pro/api/anthropic-chat)
15. ⚡ Support for **Google Gemini** format, [API Documentation](https://docs.newapi.pro/api/google-gemini-chat/)
16. 🧠 Support for setting reasoning effort through model name suffixes:
>>>>>>> 5fc91524991700032d12342dcfc10ceccf951d4c
    1. OpenAI o-series models
        - Add `-high` suffix for high reasoning effort (e.g.: `o3-mini-high`)
        - Add `-medium` suffix for medium reasoning effort (e.g.: `o3-mini-medium`)
        - Add `-low` suffix for low reasoning effort (e.g.: `o3-mini-low`)
    2. Claude thinking models
        - Add `-thinking` suffix to enable thinking mode (e.g.: `claude-3-7-sonnet-20250219-thinking`)
17. 🔄 Thinking-to-content functionality
18. 🔄 Model rate limiting for users
19. 🔄 Request format conversion functionality, supporting the following three format conversions:
    1. OpenAI Chat Completions => Claude Messages
    2. Claude Messages => OpenAI Chat Completions (can be used for Claude Code to call third-party models)
    3. OpenAI Chat Completions => Gemini Chat
20. 💰 Cache billing support, which allows billing at a set ratio when cache is hit:
    1. Set the `Prompt Cache Ratio` option in `System Settings-Operation Settings`
    2. Set `Prompt Cache Ratio` in the channel, range 0-1, e.g., setting to 0.5 means billing at 50% when cache is hit
    3. Supported channels:
        - [x] OpenAI
        - [x] Azure
        - [x] DeepSeek
        - [x] Claude

## Model Support

This version supports multiple models, please refer to [API Documentation-Relay Interface](http://localhost:5173/api) for details:

1. Third-party models **gpts** (gpt-4-gizmo-*)
2. Third-party channel [Midjourney-Proxy(Plus)](https://github.com/novicezk/midjourney-proxy) interface, [API Documentation](http://localhost:5173/api/midjourney-proxy-image)
3. Third-party channel [Suno API](https://github.com/Suno-API/Suno-API) interface, [API Documentation](http://localhost:5173/api/suno-music)
4. Custom channels, supporting full call address input
5. Rerank models ([Cohere](https://cohere.ai/) and [Jina](https://jina.ai/)), [API Documentation](https://docs.newapi.pro/api/jinaai-rerank)
6. Claude Messages format, [API Documentation](https://docs.newapi.pro/api/anthropic-chat)
7. Dify, currently only supports chatflow

## Environment Variable Configuration

For detailed configuration instructions, please refer to [Installation Guide-Environment Variables Configuration](http://localhost:5173/installation/environment-variables):

- `GENERATE_DEFAULT_TOKEN`: Whether to generate initial tokens for newly registered users, default is `false`
- `STREAMING_TIMEOUT`: Streaming response timeout, default is 300 seconds
- `DIFY_DEBUG`: Whether to output workflow and node information for Dify channels, default is `true`
- `GET_MEDIA_TOKEN`: Whether to count image tokens, default is `true`
- `GET_MEDIA_TOKEN_NOT_STREAM`: Whether to count image tokens in non-streaming cases, default is `true`
- `UPDATE_TASK`: Whether to update asynchronous tasks (Midjourney, Suno), default is `true`
- `GEMINI_VISION_MAX_IMAGE_NUM`: Maximum number of images for Gemini models, default is `16`
- `MAX_FILE_DOWNLOAD_MB`: Maximum file download size in MB, default is `20`
- `CRYPTO_SECRET`: Encryption key used for encrypting Redis database content
- `AZURE_DEFAULT_API_VERSION`: Azure channel default API version, default is `2025-04-01-preview`
- `NOTIFICATION_LIMIT_DURATION_MINUTE`: Notification limit duration, default is `10` minutes
- `NOTIFY_LIMIT_COUNT`: Maximum number of user notifications within the specified duration, default is `2`
- `ERROR_LOG_ENABLED=true`: Whether to record and display error logs, default is `false`

## Deployment

For detailed deployment guides, please refer to [Installation Guide-Deployment Methods](http://localhost:5173/installation):

> [!TIP]
> Latest Docker image: `calciumion/new-api:latest`

### Multi-machine Deployment Considerations
- Environment variable `SESSION_SECRET` must be set, otherwise login status will be inconsistent across multiple machines
- If sharing Redis, `CRYPTO_SECRET` must be set, otherwise Redis content cannot be accessed across multiple machines

### Deployment Requirements
- Local database (default): SQLite (Docker deployment must mount the `/data` directory)
- Remote database: MySQL version >= 5.7.8, PgSQL version >= 9.6

### Deployment Methods

#### Using BaoTa Panel Docker Feature
Install BaoTa Panel (version **9.2.0** or above), find **New-API** in the application store and install it.
[Tutorial with images](./docs/BT.md)

#### Using Docker Compose (Recommended)
```shell
# Download the project
git clone https://github.com/Calcium-Ion/new-api.git
cd new-api
# Edit docker-compose.yml as needed
# Start
docker-compose up -d
```

#### Using Docker Image Directly
```shell
# Using SQLite
docker run --name new-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -v /home/ubuntu/data/new-api:/data calciumion/new-api:latest

# Using MySQL
docker run --name new-api -d --restart always -p 3000:3000 -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" -e TZ=Asia/Shanghai -v /home/ubuntu/data/new-api:/data calciumion/new-api:latest
```

## Channel Retry and Cache
Channel retry functionality has been implemented, you can set the number of retries in `Settings->Operation Settings->General Settings->Failure Retry Count`, **recommended to enable caching** functionality.

### Cache Configuration Method
1. `REDIS_CONN_STRING`: Set Redis as cache
2. `MEMORY_CACHE_ENABLED`: Enable memory cache (no need to set manually if Redis is set)

## API Documentation

For detailed API documentation, please refer to [API Documentation](http://localhost:5173/api):

<<<<<<< HEAD
- [Chat API](https://docs.newapi.pro/api/openai-chat)
- [Image API](https://docs.newapi.pro/api/openai-image)
- [Rerank API](https://docs.newapi.pro/api/jinaai-rerank)
- [Realtime API](https://docs.newapi.pro/api/openai-realtime)
- [Claude Chat API (messages)](https://docs.newapi.pro/api/anthropic-chat)
=======
- [Chat API (Chat Completions)](https://docs.newapi.pro/api/openai-chat)
- [Response API (Responses)](https://docs.newapi.pro/api/openai-responses)
- [Image API (Image)](https://docs.newapi.pro/api/openai-image)
- [Rerank API (Rerank)](https://docs.newapi.pro/api/jinaai-rerank)
- [Realtime Chat API (Realtime)](https://docs.newapi.pro/api/openai-realtime)
- [Claude Chat API](https://docs.newapi.pro/api/anthropic-chat)
- [Google Gemini Chat API](https://docs.newapi.pro/api/google-gemini-chat)
>>>>>>> 5fc91524991700032d12342dcfc10ceccf951d4c

## Related Projects
- [Knight Omega](https://github.com/songquanpeng/one-api): Original project
- [Midjourney-Proxy](https://github.com/novicezk/midjourney-proxy): Midjourney interface support
- [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool): Query usage quota with key

Other projects based on Knight Omega:
- [new-api-horizon](https://github.com/Calcium-Ion/new-api-horizon): High-performance optimized version of Knight Omega
- [VoAPI](https://github.com/VoAPI/VoAPI): Frontend beautified version based on Knight Omega

## Help and Support

If you have any questions, please refer to [Help and Support](http://localhost:5173/support):
- [Community Interaction](http://localhost:5173/support/community-interaction)
- [Issue Feedback](http://localhost:5173/support/feedback-issues)
- [FAQ](http://localhost:5173/support/faq)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Calcium-Ion/new-api&type=Date)](https://star-history.com/#Calcium-Ion/new-api&Date)
