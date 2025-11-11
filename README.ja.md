<div align="center">

![new-api](/web/public/logo.png)

# Knight Omega

🍥 **次世代大規模モデルゲートウェイとAI資産管理システム**

<p align="center">
  <a href="./README.md">中文</a> | 
  <a href="./README.en.md">English</a> | 
  <a href="./README.fr.md">Français</a> | 
  <strong>日本語</strong>
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
  <a href="#-クイックスタート">クイックスタート</a> •
  <a href="#-主な機能">主な機能</a> •
  <a href="#-デプロイ">デプロイ</a> •
  <a href="#-ドキュメント">ドキュメント</a> •
  <a href="#-ヘルプサポート">ヘルプ</a>
</p>

</div>

## 📝 プロジェクト説明

> [!NOTE]  
> 本プロジェクトは、[One API](https://github.com/songquanpeng/one-api)をベースに二次開発されたオープンソースプロジェクトです

> [!IMPORTANT]  
> - 本プロジェクトは個人学習用のみであり、安定性の保証や技術サポートは提供しません。
> - ユーザーは、OpenAIの[利用規約](https://openai.com/policies/terms-of-use)および**法律法規**を遵守する必要があり、違法な目的で使用してはいけません。
> - [《生成式人工智能服务管理暂行办法》](http://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm)の要求に従い、中国地域の公衆に未登録の生成式AI サービスを提供しないでください。

---

## 🤝 信頼できるパートナー

<p align="center">
  <em>順不同</em>
</p>

<p align="center">
  <a href="https://www.cherry-ai.com/" target="_blank">
    <img src="./docs/images/cherry-studio.png" alt="Cherry Studio" height="80" />
  </a>
  <a href="https://bda.pku.edu.cn/" target="_blank">
    <img src="./docs/images/pku.png" alt="北京大学" height="80" />
  </a>
  <a href="https://www.compshare.cn/?ytag=GPU_yy_gh_newapi" target="_blank">
    <img src="./docs/images/ucloud.png" alt="UCloud 優刻得" height="80" />
  </a>
  <a href="https://www.aliyun.com/" target="_blank">
    <img src="./docs/images/aliyun.png" alt="Alibaba Cloud" height="80" />
  </a>
  <a href="https://io.net/" target="_blank">
    <img src="./docs/images/io-net.png" alt="IO.NET" height="80" />
  </a>
</p>

---

## 🙏 特別な感謝

<p align="center">
  <a href="https://www.jetbrains.com/?from=new-api" target="_blank">
    <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo" width="120" />
  </a>
</p>

<p align="center">
  <strong>感謝 <a href="https://www.jetbrains.com/?from=new-api">JetBrains</a> が本プロジェクトに無料のオープンソース開発ライセンスを提供してくれたことに感謝します</strong>
</p>

---

## 🚀 クイックスタート

### Docker Composeを使用（推奨）

```bash
# プロジェクトをクローン
git clone https://github.com/QuantumNous/new-api.git
cd new-api

# docker-compose.yml 設定を編集
nano docker-compose.yml

# サービスを起動
docker-compose up -d
```

<details>
<summary><strong>Dockerコマンドを使用</strong></summary>

```bash
# 最新のイメージをプル
docker pull calciumion/new-api:latest

# SQLiteを使用（デフォルト）
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest

# MySQLを使用
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest
```

> **💡 ヒント:** `-v ./data:/data` は現在のディレクトリの `data` フォルダにデータを保存します。絶対パスに変更することもできます：`-v /your/custom/path:/data`

</details>

---

🎉 デプロイが完了したら、`http://localhost:3000` にアクセスして使用を開始してください！

📖 その他のデプロイ方法については[デプロイガイド](https://docs.newapi.pro/installation)を参照してください。

---

## 📚 ドキュメント

<div align="center">

### 📖 [公式ドキュメント](https://docs.newapi.pro/) | [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/QuantumNous/new-api)

</div>

**クイックナビゲーション:**

| カテゴリ | リンク |
|------|------|
| 🚀 デプロイガイド | [インストールドキュメント](https://docs.newapi.pro/installation) |
| ⚙️ 環境設定 | [環境変数](https://docs.newapi.pro/installation/environment-variables) |
| 📡 APIドキュメント | [APIドキュメント](https://docs.newapi.pro/api) |
| ❓ よくある質問 | [FAQ](https://docs.newapi.pro/support/faq) |
| 💬 コミュニティ交流 | [交流チャネル](https://docs.newapi.pro/support/community-interaction) |

---

## ✨ 主な機能

New APIは豊富な機能を提供しています。詳細な機能については[機能説明](https://docs.newapi.pro/wiki/features-introduction)を参照してください：

1. 🎨 全く新しいUIインターフェース
2. 🌍 多言語サポート
3. 💰 オンラインチャージ機能をサポート、現在EPayとStripeをサポート
4. 🔍 キーによる使用量クォータの照会をサポート（[neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool)と連携）
5. 🔄 オリジナルのOne APIデータベースと互換性あり
6. 💵 モデルの従量課金をサポート
7. ⚖️ チャネルの重み付けランダムをサポート
8. 📈 データダッシュボード（コンソール）
9. 🔒 トークングループ化、モデル制限
10. 🤖 より多くの認証ログイン方法をサポート（LinuxDO、Telegram、OIDC）
11. 🔄 Rerankモデルをサポート（CohereとJina）、[API ドキュメント](https://docs.newapi.pro/api/jinaai-rerank)
12. ⚡ OpenAI Realtime APIをサポート（Azureチャネルを含む）、[APIドキュメント](https://docs.newapi.pro/api/openai-realtime)
13. ⚡ **OpenAI Responses**形式をサポート、[APIドキュメント](https://docs.newapi.pro/api/openai-responses)
14. ⚡ **Claude Messages**形式をサポート、[APIドキュメント](https://docs.newapi.pro/api/anthropic-chat)
15. ⚡ **Google Gemini**形式をサポート、[APIドキュメント](https://docs.newapi.pro/api/google-gemini-chat/)
16. 🧠 モデル名のサフィックスを通じてreasoning effortを設定することをサポート：
    1. OpenAI oシリーズモデル
        - `-high`サフィックスを追加してhigh reasoning effortに設定（例：`o3-mini-high`）
        - `-medium`サフィックスを追加してmedium reasoning effortに設定（例：`o3-mini-medium`）
        - `-low`サフィックスを追加してlow reasoning effortに設定（例：`o3-mini-low`）
    2. Claude思考モデル
        - `-thinking`サフィックスを追加して思考モードを有効にする（例：`claude-3-7-sonnet-20250219-thinking`）
17. 🔄 思考からコンテンツへの機能
18. 🔄 ユーザーに対するモデルレート制限機能
19. 🔄 リクエストフォーマット変換機能、以下の3つのフォーマット変換をサポート：
    1. OpenAI Chat Completions => Claude Messages
    2. Claude Messages => OpenAI Chat Completions（Claude Codeがサードパーティモデルを呼び出す際に使用可能）
    3. OpenAI Chat Completions => Gemini Chat
20. 💰 キャッシュ課金サポート、有効にするとキャッシュがヒットした際に設定された比率で課金できます：
    1. `システム設定-運営設定`で`プロンプトキャッシュ倍率`オプションを設定
    2. チャネルで`プロンプトキャッシュ倍率`を設定、範囲は0-1、例えば0.5に設定するとキャッシュがヒットした際に50%で課金
    3. サポートされているチャネル：
        - [x] OpenAI
        - [x] Azure
        - [x] DeepSeek
        - [x] Claude

## モデルサポート

このバージョンは複数のモデルをサポートしています。詳細は[APIドキュメント-中継インターフェース](https://docs.newapi.pro/api)を参照してください：

1. サードパーティモデル **gpts**（gpt-4-gizmo-*）
2. サードパーティチャネル[Midjourney-Proxy(Plus)](https://github.com/novicezk/midjourney-proxy)インターフェース、[APIドキュメント](https://docs.newapi.pro/api/midjourney-proxy-image)
3. サードパーティチャネル[Suno API](https://github.com/Suno-API/Suno-API)インターフェース、[APIドキュメント](https://docs.newapi.pro/api/suno-music)
4. カスタムチャネル、完全な呼び出しアドレスの入力をサポート
5. Rerankモデル（[Cohere](https://cohere.ai/)と[Jina](https://jina.ai/)）、[APIドキュメント](https://docs.newapi.pro/api/jinaai-rerank)
6. Claude Messages形式、[APIドキュメント](https://docs.newapi.pro/api/anthropic-chat)
7. Google Gemini形式、[APIドキュメント](https://docs.newapi.pro/api/google-gemini-chat/)
8. Dify、現在はchatflowのみをサポート
9. その他のインターフェースについては[APIドキュメント](https://docs.newapi.pro/api)を参照してください

## 環境変数設定

詳細な設定説明については[インストールガイド-環境変数設定](https://docs.newapi.pro/installation/environment-variables)を参照してください：

- `GENERATE_DEFAULT_TOKEN`：新規登録ユーザーに初期トークンを生成するかどうか、デフォルトは`false`
- `STREAMING_TIMEOUT`：ストリーミング応答のタイムアウト時間、デフォルトは300秒
- `DIFY_DEBUG`：Difyチャネルがワークフローとノード情報を出力するかどうか、デフォルトは`true`
- `GET_MEDIA_TOKEN`：画像トークンを統計するかどうか、デフォルトは`true`
- `GET_MEDIA_TOKEN_NOT_STREAM`：非ストリーミングの場合に画像トークンを統計するかどうか、デフォルトは`true`
- `UPDATE_TASK`：非同期タスク（Midjourney、Suno）を更新するかどうか、デフォルトは`true`
- `GEMINI_VISION_MAX_IMAGE_NUM`：Geminiモデルの最大画像数、デフォルトは`16`
- `MAX_FILE_DOWNLOAD_MB`: 最大ファイルダウンロードサイズ、単位MB、デフォルトは`20`
- `CRYPTO_SECRET`：暗号化キー、Redisデータベースの内容を暗号化するために使用
- `AZURE_DEFAULT_API_VERSION`：Azureチャネルのデフォルトのバージョン、デフォルトは`2025-04-01-preview`
- `NOTIFICATION_LIMIT_DURATION_MINUTE`：メールなどの通知制限の継続時間、デフォルトは`10`分
- `NOTIFY_LIMIT_COUNT`：指定された継続時間内のユーザー通知の最大数、デフォルトは`2`
- `ERROR_LOG_ENABLED=true`: エラーログを記録して表示するかどうか、デフォルトは`false`

## デプロイ

詳細なデプロイガイドについては[インストールガイド-デプロイ方法](https://docs.newapi.pro/installation)を参照してください：

> [!TIP]
> **最新のDockerイメージ:** `calciumion/new-api:latest`

### 📋 デプロイ要件

| コンポーネント | 要件 |
|------|------|
| **ローカルデータベース** | SQLite（Dockerは `/data` ディレクトリをマウントする必要があります）|
| **リモートデータベース** | MySQL ≥ 5.7.8 または PostgreSQL ≥ 9.6 |
| **コンテナエンジン** | Docker / Docker Compose |

### ⚙️ 環境変数設定

<details>
<summary>一般的な環境変数設定</summary>

| 変数名 | 説明 | デフォルト値 |
|--------|------|--------|
| `SESSION_SECRET` | セッションシークレット（マルチマシンデプロイに必須） | - |
| `CRYPTO_SECRET` | 暗号化シークレット（Redisに必須） | - |
| `SQL_DSN** | データベース接続文字列 | - |
| `REDIS_CONN_STRING` | Redis接続文字列 | - |
| `STREAMING_TIMEOUT` | ストリーミング応答のタイムアウト時間（秒） | `300` |
| `AZURE_DEFAULT_API_VERSION` | Azure APIバージョン | `2025-04-01-preview` |
| `ERROR_LOG_ENABLED` | エラーログスイッチ | `false` |

📖 **完全な設定:** [環境変数ドキュメント](https://docs.newapi.pro/installation/environment-variables)

</details>

### 🔧 デプロイ方法

<details>
<summary><strong>方法 1: Docker Compose（推奨）</strong></summary>

```bash
# プロジェクトをクローン
git clone https://github.com/QuantumNous/new-api.git
cd new-api

# 設定を編集
nano docker-compose.yml

# サービスを起動
docker-compose up -d
```

#### Dockerイメージを直接使用
```shell
# SQLiteを使用
docker run --name new-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -v /home/ubuntu/data/new-api:/data calciumion/new-api:latest

# MySQLを使用
docker run --name new-api -d --restart always -p 3000:3000 -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" -e TZ=Asia/Shanghai -v /home/ubuntu/data/new-api:/data calciumion/new-api:latest
```

## チャネルリトライとキャッシュ
チャネルリトライ機能はすでに実装されており、`設定->運営設定->一般設定->失敗リトライ回数`でリトライ回数を設定できます。**キャッシュ機能を有効にすることを推奨します**。

### キャッシュ設定方法
1. `REDIS_CONN_STRING`：Redisをキャッシュとして設定
2. `MEMORY_CACHE_ENABLED`：メモリキャッシュを有効にする（Redisを設定した場合は手動設定不要）

## APIドキュメント

詳細なAPIドキュメントについては[APIドキュメント](https://docs.newapi.pro/api)を参照してください：

- [チャットインターフェース（Chat Completions）](https://docs.newapi.pro/api/openai-chat)
- [レスポンスインターフェース（Responses）](https://docs.newapi.pro/api/openai-responses)
- [画像インターフェース（Image）](https://docs.newapi.pro/api/openai-image)
- [再ランク付けインターフェース（Rerank）](https://docs.newapi.pro/api/jinaai-rerank)
- [リアルタイム対話インターフェース（Realtime）](https://docs.newapi.pro/api/openai-realtime)
- [Claudeチャットインターフェース](https://docs.newapi.pro/api/anthropic-chat)
- [Google Geminiチャットインターフェース](https://docs.newapi.pro/api/google-gemini-chat)

## 関連プロジェクト
- [One API](https://github.com/songquanpeng/one-api)：オリジナルプロジェクト
- [Midjourney-Proxy](https://github.com/novicezk/midjourney-proxy)：Midjourneyインターフェースサポート
- [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool)：キーを使用して使用量クォータを照会

New APIベースのその他のプロジェクト：
- [new-api-horizon](https://github.com/Calcium-Ion/new-api-horizon)：New API高性能最適化版

## 💬 ヘルプサポート

### 📖 ドキュメントリソース

| リソース | リンク |
|------|------|
| 📘 よくある質問 | [FAQ](https://docs.newapi.pro/support/faq) |
| 💬 コミュニティ交流 | [交流チャネル](https://docs.newapi.pro/support/community-interaction) |
| 🐛 問題のフィードバック | [問題フィードバック](https://docs.newapi.pro/support/feedback-issues) |
| 📚 完全なドキュメント | [公式ドキュメント](https://docs.newapi.pro/support) |

### 🤝 貢献ガイド

あらゆる形の貢献を歓迎します！

- 🐛 バグを報告する
- 💡 新しい機能を提案する
- 📝 ドキュメントを改善する
- 🔧 コードを提出する

---

## 🌟 スター履歴

<div align="center">

[![スター履歴チャート](https://api.star-history.com/svg?repos=Calcium-Ion/new-api&type=Date)](https://star-history.com/#Calcium-Ion/new-api&Date)

</div>

---

<div align="center">

### 💖 New APIをご利用いただきありがとうございます

このプロジェクトがあなたのお役に立てたなら、ぜひ ⭐️ スターをください！

**[公式ドキュメント](https://docs.newapi.pro/)** • **[問題フィードバック](https://github.com/Calcium-Ion/new-api/issues)** • **[最新リリース](https://github.com/Calcium-Ion/new-api/releases)**

<sub>❤️ で構築された QuantumNous</sub>

</div>
