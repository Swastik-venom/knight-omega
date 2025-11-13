<div align="center">

![new-api](/web/public/logo.png)

# Knight Omega

🍥 **Passerelle de modèles étendus de nouvelle génération et système de gestion d'actifs d'IA**

<p align="center">
  <a href="./README.md">中文</a> | 
  <a href="./README.en.md">English</a> | 
  <strong>Français</strong> | 
  <a href="./README.ja.md">日本語</a>
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/Calcium-Ion/new-api/main/LICENSE">
    <img src="https://img.shields.io/github/license/Calcium-Ion/new-api?color=brightgreen" alt="licence">
  </a>
  <a href="https://github.com/Calcium-Ion/new-api/releases/latest">
    <img src="https://img.shields.io/github/v/release/Calcium-Ion/new-api?color=brightgreen&include_prereleases" alt="version">
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
  <a href="#-démarrage-rapide">Démarrage rapide</a> •
  <a href="#-fonctionnalités-clés">Fonctionnalités clés</a> •
  <a href="#-déploiement">Déploiement</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-aide-support">Aide</a>
</p>

</div>

## 📝 Description du projet

> [!NOTE]  
> Il s'agit d'un projet open-source développé sur la base de [One API](https://github.com/songquanpeng/one-api)

> [!IMPORTANT]  
> - Ce projet est uniquement destiné à des fins d'apprentissage personnel, sans garantie de stabilité ni de support technique.
> - Les utilisateurs doivent se conformer aux [Conditions d'utilisation](https://openai.com/policies/terms-of-use) d'OpenAI et aux **lois et réglementations applicables**, et ne doivent pas l'utiliser à des fins illégales.
> - Conformément aux [《Mesures provisoires pour la gestion des services d'intelligence artificielle générative》](http://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm), veuillez ne fournir aucun service d'IA générative non enregistré au public en Chine.

---

## 🤝 Partenaires de confiance

<p align="center">
  <em>Sans ordre particulier</em>
</p>

<p align="center">
  <a href="https://www.cherry-ai.com/" target="_blank">
    <img src="./docs/images/cherry-studio.png" alt="Cherry Studio" height="80" />
  </a>
  <a href="https://bda.pku.edu.cn/" target="_blank">
    <img src="./docs/images/pku.png" alt="Université de Pékin" height="80" />
  </a>
  <a href="https://www.compshare.cn/?ytag=GPU_yy_gh_newapi" target="_blank">
    <img src="./docs/images/ucloud.png" alt="UCloud" height="80" />
  </a>
  <a href="https://www.aliyun.com/" target="_blank">
    <img src="./docs/images/aliyun.png" alt="Alibaba Cloud" height="80" />
  </a>
  <a href="https://io.net/" target="_blank">
    <img src="./docs/images/io-net.png" alt="IO.NET" height="80" />
  </a>
</p>

---

## 🙏 Remerciements spéciaux

<p align="center">
  <a href="https://www.jetbrains.com/?from=new-api" target="_blank">
    <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo" width="120" />
  </a>
</p>

<p align="center">
  <strong>Merci à <a href="https://www.jetbrains.com/?from=new-api">JetBrains</a> pour avoir fourni une licence de développement open-source gratuite pour ce projet</strong>
</p>

---

## 🚀 Démarrage rapide

### Utilisation de Docker Compose (recommandé)

```bash
# Cloner le projet
git clone https://github.com/QuantumNous/new-api.git
cd new-api

# Modifier la configuration docker-compose.yml
nano docker-compose.yml

# Démarrer le service
docker-compose up -d
```

<details>
<summary><strong>Utilisation des commandes Docker</strong></summary>

```bash
# Tirer la dernière image
docker pull calciumion/new-api:latest

# Utilisation de SQLite (par défaut)
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest

# Utilisation de MySQL
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest
```

> **💡 Astuce:** `-v ./data:/data` sauvegardera les données dans le dossier `data` du répertoire actuel, vous pouvez également le changer en chemin absolu comme `-v /your/custom/path:/data`

</details>

---

🎉 Après le déploiement, visitez `http://localhost:3000` pour commencer à utiliser!

📖 Pour plus de méthodes de déploiement, veuillez vous référer à [Guide de déploiement](https://docs.newapi.pro/installation)

---

## 📚 Documentation

<div align="center">

### 📖 [Documentation officielle](https://docs.newapi.pro/) | [![Demander à DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/QuantumNous/new-api)

</div>

**Navigation rapide:**

| Catégorie | Lien |
|------|------|
| 🚀 Guide de déploiement | [Documentation d'installation](https://docs.newapi.pro/installation) |
| ⚙️ Configuration de l'environnement | [Variables d'environnement](https://docs.newapi.pro/installation/environment-variables) |
| 📡 Documentation de l'API | [Documentation de l'API](https://docs.newapi.pro/api) |
| ❓ FAQ | [FAQ](https://docs.newapi.pro/support/faq) |
| 💬 Interaction avec la communauté | [Canaux de communication](https://docs.newapi.pro/support/community-interaction) |

---

## ✨ Fonctionnalités clés

Knight Omega offre un large éventail de fonctionnalités, veuillez vous référer à [Présentation des fonctionnalités](https://docs.newapi.pro/wiki/features-introduction) pour plus de détails :

1. 🎨 Nouvelle interface utilisateur
2. 🌍 Prise en charge multilingue
3. 💰 Fonctionnalité de recharge en ligne, prend actuellement en charge EPay et Stripe
4. 🔍 Prise en charge de la recherche de quotas d'utilisation avec des clés (fonctionne avec [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool))
5. 🔄 Compatible avec la base de données originale de One API
6. 💵 Prise en charge de la tarification des modèles de paiement à l'utilisation
7. ⚖️ Prise en charge de la sélection aléatoire pondérée des canaux
8. 📈 Tableau de bord des données (console)
9. 🔒 Regroupement de jetons et restrictions de modèles
10. 🤖 Prise en charge de plus de méthodes de connexion par autorisation (LinuxDO, Telegram, OIDC)
11. 🔄 Prise en charge des modèles Rerank (Cohere et Jina), [Documentation de l'API](https://docs.newapi.pro/api/jinaai-rerank)
12. ⚡ Prise en charge de l'API OpenAI Realtime (y compris les canaux Azure), [Documentation de l'API](https://docs.newapi.pro/api/openai-realtime)
13. ⚡ Prise en charge du format **OpenAI Responses**, [Documentation de l'API](https://docs.newapi.pro/api/openai-responses)
14. ⚡ Prise en charge du format **Claude Messages**, [Documentation de l'API](https://docs.newapi.pro/api/anthropic-chat)
15. ⚡ Prise en charge du format **Google Gemini**, [Documentation de l'API](https://docs.newapi.pro/api/google-gemini-chat/)
16. 🧠 Prise en charge de la définition de l'effort de raisonnement via les suffixes de nom de modèle :
    1. Modèles de la série o d'OpenAI
        - Ajouter le suffixe `-high` pour un effort de raisonnement élevé (par exemple : `o3-mini-high`)
        - Ajouter le suffixe `-medium` pour un effort de raisonnement moyen (par exemple : `o3-mini-medium`)
        - Ajouter le suffixe `-low` pour un effort de raisonnement faible (par exemple : `o3-mini-low`)
    2. Modèles de pensée de Claude
        - Ajouter le suffixe `-thinking` pour activer le mode de pensée (par exemple : `claude-3-7-sonnet-20250219-thinking`)
17. 🔄 Fonctionnalité de la pensée au contenu
18. 🔄 Limitation du débit du modèle pour les utilisateurs
19. 🔄 Fonctionnalité de conversion de format de requête, prenant en charge les trois conversions de format suivantes :
    1. OpenAI Chat Completions => Claude Messages
    2. Claude Messages => OpenAI Chat Completions (peut être utilisé pour Claude Code pour appeler des modèles tiers)
    3. OpenAI Chat Completions => Gemini Chat
20. 💰 Prise en charge de la facturation du cache, qui permet de facturer à un ratio défini lorsque le cache est atteint :
    1. Définir l'option `Ratio de cache d'invite` dans `Paramètres système->Paramètres de fonctionnement`
    2. Définir le `Ratio de cache d'invite` dans le canal, plage de 0 à 1, par exemple, le définir sur 0,5 signifie facturer à 50 % lorsque le cache est atteint
    3. Canaux pris en charge :
        - [x] OpenAI
        - [x] Azure
        - [x] DeepSeek
        - [x] Claude

## Prise en charge des modèles

> Pour les détails, veuillez vous référer à [Documentation de l'API - Interface de relais](https://docs.newapi.pro/api)

| Type de modèle | Description | Documentation |
|---------|------|------|
| 🤖 OpenAI GPTs | série gpt-4-gizmo-* | - |
| 🎨 Midjourney-Proxy | [Midjourney-Proxy(Plus)](https://github.com/novicezk/midjourney-proxy) | [Documentation](https://docs.newapi.pro/api/midjourney-proxy-image) |
| 🎵 Suno-API | [Suno API](https://github.com/Suno-API/Suno-API) | [Documentation](https://docs.newapi.pro/api/suno-music) |
| 🔄 Rerank | Cohere, Jina | [Documentation](https://docs.newapi.pro/api/jinaai-rerank) |
| 💬 Claude | Format Messages | [Documentation](https://docs.newapi.pro/api/anthropic-chat) |
| 🌐 Gemini | Format Google Gemini | [Documentation](https://docs.newapi.pro/api/google-gemini-chat/) |
| 🔧 Dify | Mode ChatFlow | - |
| 🎯 Personnalisé | Prise en charge de l'adresse d'appel complète | - |

### 📡 Interfaces prises en charge

<details>
<summary>Voir la liste complète des interfaces</summary>

- [Interface de discussion (Chat Completions)](https://docs.newapi.pro/api/openai-chat)
- [Interface de réponse (Responses)](https://docs.newapi.pro/api/openai-responses)
- [Interface d'image (Image)](https://docs.newapi.pro/api/openai-image)
- [Interface audio (Audio)](https://docs.newapi.pro/api/openai-audio)
- [Interface vidéo (Video)](https://docs.newapi.pro/api/openai-video)
- [Interface d'incorporation (Embeddings)](https://docs.newapi.pro/api/openai-embeddings)
- [Interface de rerank (Rerank)](https://docs.newapi.pro/api/jinaai-rerank)
- [Conversation en temps réel (Realtime)](https://docs.newapi.pro/api/openai-realtime)
- [Discussion Claude](https://docs.newapi.pro/api/anthropic-chat)
- [Discussion Google Gemini](https://docs.newapi.pro/api/google-gemini-chat/)

</details>

---

## 🚢 Déploiement

> [!TIP]
> **Dernière image Docker:** `calciumion/new-api:latest`

### 📋 Exigences de déploiement

| Composant | Exigence |
|------|------|
| **Base de données locale** | SQLite (Docker doit monter le répertoire `/data`)|
| **Base de données distante | MySQL ≥ 5.7.8 ou PostgreSQL ≥ 9.6 |
| **Moteur de conteneur** | Docker / Docker Compose |

### ⚙️ Configuration des variables d'environnement

<details>
<summary>Configuration courante des variables d'environnement</summary>

| Nom de variable | Description | Valeur par défaut |
|--------|------|--------|
| `SESSION_SECRET` | Secret de session (requis pour le déploiement multi-machines) |
| `CRYPTO_SECRET` | Secret de chiffrement (requis pour Redis) | - |
| `SQL_DSN` | Chaine de connexion à la base de données | - |
| `REDIS_CONN_STRING` | Chaine de connexion Redis | - |
| `STREAMING_TIMEOUT` | Délai d'expiration du streaming (secondes) | `300` |
| `AZURE_DEFAULT_API_VERSION` | Version de l'API Azure | `2025-04-01-preview` |
| `ERROR_LOG_ENABLED` | Interrupteur du journal d'erreurs | `false` |

📖 **Configuration complète:** [Documentation des variables d'environnement](https://docs.newapi.pro/installation/environment-variables)

</details>

### 🔧 Méthodes de déploiement

<details>
<summary><strong>Méthode 1: Docker Compose (recommandé)</strong></summary>

```bash
# Cloner le projet
git clone https://github.com/QuantumNous/new-api.git
cd new-api

# Modifier la configuration
nano docker-compose.yml

# Démarrer le service
docker-compose up -d
```

</details>

<details>
<summary><strong>Méthode 2: Commandes Docker</strong></summary>

**Utilisation de SQLite:**
```bash
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest
```

**Utilisation de MySQL:**
```bash
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest
```

## Nouvelle tentative de canal et cache
La fonctionnalité de nouvelle tentative de canal a été implémentée, vous pouvez définir le nombre de tentatives dans `Paramètres->Paramètres de fonctionnement->Paramètres généraux->Nombre de tentatives en cas d'échec`, **recommandé d'activer la fonctionnalité de mise en cache**.

### Méthode de configuration du cache
1. `REDIS_CONN_STRING` : Définir Redis comme cache
2. `MEMORY_CACHE_ENABLED` : Activer le cache mémoire (pas besoin de le définir manuellement si Redis est défini)

## Documentation de l'API

Pour une documentation détaillée de l'API, veuillez vous référer à [Documentation de l'API](https://docs.newapi.pro/api) :

- [API de discussion (Chat Completions)](https://docs.newapi.pro/api/openai-chat)
- [API de réponse (Responses)](https://docs.newapi.pro/api/openai-responses)
- [API d'image (Image)](https://docs.newapi.pro/api/openai-image)
- [API de rerank (Rerank)](https://docs.newapi.pro/api/jinaai-rerank)
- [API de discussion en temps réel (Realtime)](https://docs.newapi.pro/api/openai-realtime)
- [API de discussion Claude](https://docs.newapi.pro/api/anthropic-chat)
- [API de discussion Google Gemini](https://docs.newapi.pro/api/google-gemini-chat)

## Projets connexes
- [One API](https://github.com/songquanpeng/one-api) : Projet original
- [Midjourney-Proxy](https://github.com/novicezk/midjourney-proxy) : Prise en charge de l'interface Midjourney
- [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool) : Interroger le quota d'utilisation avec une clé

Autres projets basés sur Knight Omega :
- [new-api-horizon](https://github.com/Calcium-Ion/new-api-horizon) : Version optimisée hautes performances de Knight Omega

## Aide et support

Si vous avez des questions, veuillez vous référer à [Aide et support](https://docs.newapi.pro/support) :
- [Interaction avec la communauté](https://docs.newapi.pro/support/community-interaction)
- [Commentaires sur les problèmes](https://docs.newapi.pro/support/feedback-issues)
- [FAQ](https://docs.newapi.pro/support/faq)

## 🌟 Historique des étoiles

<div align="center">

[![Graphique de l'historique des étoiles](https://api.star-history.com/svg?repos=Calcium-Ion/new-api&type=Date)](https://star-history.com/#Calcium-Ion/new-api&Date)

</div>

---

<div align="center">

### 💖 Merci d'utiliser Knight Omega

Si ce projet vous est utile, bienvenue à nous donner une ⭐️ Étoile！

**[Documentation officielle](https://docs.newapi.pro/)** • **[Commentaires sur les problèmes](https://github.com/Calcium-Ion/new-api/issues)** • **[Dernière version](https://github.com/Calcium-Ion/new-api/releases)**

<sub>Construit avec ❤️ par QuantumNous</sub>

</div>