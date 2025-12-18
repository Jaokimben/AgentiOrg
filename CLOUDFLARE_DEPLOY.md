# 🚀 Déploiement sur Cloudflare Pages - AgentiOrg

## ✨ Pourquoi Cloudflare Pages ?

- ✅ **100% GRATUIT** (pas comme Railway)
- ✅ Supporte les applications full-stack
- ✅ CDN global ultra-rapide
- ✅ SSL automatique
- ✅ Déploiements automatiques depuis GitHub
- ✅ Illimité en bande passante
- ✅ Support Vite/React natif

---

## 📋 Prérequis

1. **Compte Cloudflare** (gratuit) - [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Repository GitHub** : `github.com/Jaokimben/AgentiOrg` ✅
3. **Base de données MySQL/TiDB** (PlanetScale gratuit recommandé)
4. **Credentials Manus OAuth**

---

## 🎯 Méthode 1 : Déploiement via Interface Web (Recommandé)

### Étape 1 : Créer un Compte Cloudflare

1. Allez sur [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Créez un compte gratuit
3. Vérifiez votre email

### Étape 2 : Créer un Projet Pages

1. Dans le dashboard Cloudflare, allez à **"Workers & Pages"**
2. Cliquez sur **"Create application"**
3. Sélectionnez **"Pages"**
4. Cliquez sur **"Connect to Git"**

### Étape 3 : Connecter GitHub

1. Autorisez Cloudflare à accéder à votre GitHub
2. Sélectionnez le repository **`Jaokimben/AgentiOrg`**
3. Cliquez sur **"Begin setup"**

### Étape 4 : Configurer le Build

**Configuration de build détectée automatiquement** :

```
Project name: agentiorg
Production branch: main
Build command: pnpm build
Build output directory: dist/public
```

Si pas détecté, entrez manuellement :
- **Framework preset** : `Vite`
- **Build command** : `pnpm build`
- **Build output directory** : `dist/public`
- **Root directory** : `/` (laisser vide)

### Étape 5 : Variables d'Environnement

Cliquez sur **"Environment variables"** et ajoutez :

#### Variables Obligatoires

```env
DATABASE_URL = mysql://user:password@host:3306/database
JWT_SECRET = votre-secret-aleatoire-32-caracteres
VITE_APP_ID = votre-manus-app-id
OAUTH_SERVER_URL = https://api.manus.im
VITE_OAUTH_PORTAL_URL = https://auth.manus.im
BUILT_IN_FORGE_API_URL = https://api.manus.im
BUILT_IN_FORGE_API_KEY = votre-backend-api-key
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = votre-frontend-api-key
OWNER_OPEN_ID = votre-open-id
OWNER_NAME = Votre Nom
```

#### Variables Optionnelles

```env
VITE_APP_TITLE = AgentiOrg
VITE_APP_LOGO = https://votre-logo.png
VITE_ANALYTICS_ENDPOINT = https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID = votre-website-id
NODE_VERSION = 20
```

**Important** : Sélectionnez **"Production"** pour chaque variable.

### Étape 6 : Déployer

1. Cliquez sur **"Save and Deploy"**
2. Cloudflare va :
   - Cloner votre repository
   - Installer les dépendances avec `pnpm`
   - Builder avec `pnpm build`
   - Déployer sur le CDN global
3. Attendez 3-5 minutes ⏳

### Étape 7 : Obtenir l'URL

Une fois déployé :
- URL de production : `https://agentiorg.pages.dev`
- Vous pouvez ajouter un domaine personnalisé plus tard

---

## 🎯 Méthode 2 : Déploiement via CLI Wrangler

### Installation

```bash
# Installer Wrangler CLI
npm install -g wrangler

# Se connecter à Cloudflare
wrangler login
```

### Configuration

Le fichier `wrangler.toml` est déjà créé ✅

### Déploiement

```bash
# Dans le répertoire du projet
cd /home/user/webapp

# Build du projet
npx pnpm@10.4.1 build

# Déployer sur Cloudflare Pages
wrangler pages deploy dist/public --project-name=agentiorg

# Ou créer un nouveau projet
wrangler pages project create agentiorg
```

### Configurer les Variables

```bash
# Ajouter les variables d'environnement via CLI
wrangler pages secret put DATABASE_URL
wrangler pages secret put JWT_SECRET
wrangler pages secret put VITE_APP_ID
# etc...
```

---

## 🗄️ Configuration Base de Données

### Option 1 : PlanetScale (Gratuit - Recommandé)

1. Allez sur [planetscale.com](https://planetscale.com)
2. Créez un compte gratuit
3. Créez une database **"agentiorg"**
4. Obtenez la connection string
5. Copiez-la comme `DATABASE_URL`

**Format** :
```
mysql://username:password@host.us-east-2.psdb.cloud/agentiorg?ssl={"rejectUnauthorized":true}
```

### Option 2 : TiDB Cloud (Gratuit)

1. Allez sur [tidbcloud.com](https://tidbcloud.com)
2. Créez un compte
3. Créez un cluster "Serverless Tier"
4. Obtenez la connection string
5. Utilisez-la comme `DATABASE_URL`

### Option 3 : Cloudflare D1 (SQL natif Cloudflare)

Cloudflare propose sa propre base de données SQL gratuite :

```bash
# Créer une database D1
wrangler d1 create agentiorg-db

# Migrer le schéma
wrangler d1 execute agentiorg-db --file=./drizzle/schema.sql
```

**Note** : Nécessite adaptation du code pour utiliser D1 au lieu de MySQL.

---

## 🔐 Générer JWT_SECRET

```bash
# Méthode 1 : OpenSSL
openssl rand -base64 32

# Méthode 2 : Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Méthode 3 : En ligne
# https://generate-secret.vercel.app/32
```

---

## 🎨 Domaine Personnalisé (Optionnel)

### Ajouter votre Domaine

1. Dans Cloudflare Pages, allez dans **"Custom domains"**
2. Cliquez sur **"Set up a custom domain"**
3. Entrez votre domaine : `agentiorg.com`
4. Suivez les instructions DNS
5. SSL sera automatiquement configuré ✅

---

## 🔄 Déploiements Automatiques

### Configuration Automatique

Cloudflare détecte automatiquement les pushs GitHub :

```bash
# Faire un changement
git add .
git commit -m "Update feature"
git push origin main

# → Cloudflare déploie automatiquement ! 🚀
```

### Déploiements Preview

Chaque **Pull Request** crée automatiquement :
- Une URL de preview : `https://pr-123-agentiorg.pages.dev`
- Tests en isolation
- Review avant merge

---

## 🛠️ Backend API avec Cloudflare Workers

Pour les routes API (`/api/*`), Cloudflare Pages supporte **Functions** :

### Créer `functions/api/[[path]].ts`

```typescript
// functions/api/[[path]].ts
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../../server/routers';
import { createContext } from '../../server/_core/context';

export async function onRequest(context) {
  const { request, env } = context;
  
  // Votre logique API ici
  // Compatible avec Express/tRPC
  
  return new Response('API endpoint', {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

**Note** : Cette approche nécessite une adaptation du code Express vers Cloudflare Workers.

---

## 📊 Monitoring & Analytics

### Cloudflare Web Analytics (Gratuit)

1. Activez dans **"Web Analytics"**
2. Ajoutez le script dans votre `index.html`
3. Consultez les stats en temps réel

### Logs

```bash
# Voir les logs en temps réel
wrangler pages deployment tail
```

---

## ⚙️ Configuration Avancée

### Headers de Sécurité

Créez `_headers` dans `dist/public/` :

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

### Redirections

Créez `_redirects` dans `dist/public/` :

```
/old-page  /new-page  301
/api/*     https://api.agentiorg.com/:splat  200
```

---

## 🆘 Dépannage

### Erreur : "Build failed"

```bash
# Tester le build localement
npx pnpm@10.4.1 install
npx pnpm@10.4.1 build

# Vérifier les erreurs TypeScript
npx pnpm@10.4.1 check
```

### Erreur : "Environment variables not found"

- Assurez-vous que toutes les variables `VITE_*` sont définies
- Vérifiez qu'elles sont pour l'environnement **Production**
- Redéployez après avoir ajouté des variables

### Erreur : "Database connection failed"

- Vérifiez `DATABASE_URL`
- Assurez-vous que la base de données accepte les connexions externes
- Testez la connexion localement

### Page blanche

1. Vérifiez la console du navigateur (F12)
2. Vérifiez les variables `VITE_*`
3. Vérifiez que `dist/public/index.html` existe après build

---

## 📈 Limites du Plan Gratuit

| Ressource | Limite Gratuite |
|-----------|-----------------|
| **Builds** | 500/mois |
| **Requêtes** | Illimité ✅ |
| **Bande passante** | Illimité ✅ |
| **Sites** | Illimité ✅ |
| **Builds simultanés** | 1 |
| **Build timeout** | 20 minutes |

**Plus que suffisant pour AgentiOrg !** 🎉

---

## ✅ Checklist de Déploiement

- [ ] Compte Cloudflare créé
- [ ] Repository GitHub connecté
- [ ] Base de données créée (PlanetScale/TiDB)
- [ ] `DATABASE_URL` obtenu
- [ ] `JWT_SECRET` généré
- [ ] Credentials Manus OAuth obtenus
- [ ] Variables d'environnement configurées
- [ ] Projet déployé
- [ ] URL testée

---

## 🔗 Ressources

- **Dashboard Cloudflare** : [dash.cloudflare.com](https://dash.cloudflare.com)
- **Documentation Pages** : [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)
- **PlanetScale** : [planetscale.com](https://planetscale.com)
- **Support Cloudflare** : [community.cloudflare.com](https://community.cloudflare.com)

---

## 💡 Avantages Cloudflare vs Autres

| Fonctionnalité | Cloudflare | Vercel | Railway |
|----------------|-----------|--------|---------|
| **Prix** | ✅ Gratuit | ✅ Gratuit | ❌ Payant |
| **Full-Stack** | ✅ Oui | ⚠️ Limité | ✅ Oui |
| **CDN Global** | ✅ 300+ villes | ✅ Oui | ❌ Non |
| **Bande passante** | ✅ Illimitée | ⚠️ 100GB | ⚠️ Limitée |
| **SSL** | ✅ Gratuit | ✅ Gratuit | ✅ Gratuit |
| **DDoS Protection** | ✅ Inclus | ⚠️ Basique | ❌ Non |

---

## 🎉 Résumé

1. **Créer compte** sur Cloudflare (gratuit)
2. **Connecter GitHub** repository
3. **Configurer** build (automatique)
4. **Ajouter** variables d'environnement
5. **Déployer** en un clic
6. **C'est en ligne !** 🚀

---

**Cloudflare Pages = Solution Gratuite et Performante pour AgentiOrg ! 🌟**

Temps estimé : **10 minutes** ⏱️
