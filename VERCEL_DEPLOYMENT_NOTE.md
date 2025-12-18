# ⚠️ Note Importante sur le Déploiement Vercel

## 🔍 Situation Actuelle

L'application **AgentiOrg** est une **application full-stack** avec :
- **Frontend** : React + Vite
- **Backend** : Express + tRPC + Node.js

Vercel CLI 50+ a des restrictions sur le déploiement de serveurs Node.js complets en serverless.

## ✅ Solution Actuelle : Frontend Seulement

La configuration actuelle (`vercel.json`) déploie **uniquement le frontend React** comme site statique.

### Avantages
- ✅ Déploiement simple et rapide
- ✅ Compatible avec Vercel CLI 50+
- ✅ Pas d'erreurs de runtime

### Limitations
- ⚠️ Le backend Express n'est **pas déployé**
- ⚠️ Les routes API (`/api/*`) ne fonctionneront pas
- ⚠️ L'authentification OAuth ne fonctionnera pas
- ⚠️ La base de données ne sera pas accessible

---

## 🚀 Options de Déploiement

### Option 1 : Frontend Seulement sur Vercel (ACTUEL)

**Configuration actuelle** - Déploie uniquement le React frontend

```bash
# Sur Vercel, cela fonctionnera maintenant
vercel --prod
```

✅ **Avantages** : Simple, rapide, pas d'erreurs
❌ **Inconvénients** : Pas de backend, pas d'API

---

### Option 2 : Full-Stack sur Vercel (Recommandé)

Pour déployer le backend aussi, créez des fonctions serverless API :

#### Étape 1 : Créer `api/index.js` (JavaScript, pas TypeScript)

```javascript
// api/index.js
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

const app = express();

// Votre configuration Express + tRPC ici
// ...

export default app;
```

#### Étape 2 : Modifier `vercel.json`

```json
{
  "version": 2,
  "builds": [
    { "src": "api/index.js", "use": "@vercel/node" },
    { "src": "package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index.js" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

---

### Option 3 : Frontend sur Vercel + Backend ailleurs

**Recommandation** : Séparer frontend et backend

#### Frontend sur Vercel
- Déployer uniquement le React app (configuration actuelle)
- URL : `https://votre-app.vercel.app`

#### Backend sur Railway/Render/Fly.io
- Déployer le serveur Express séparément
- URL : `https://votre-api.railway.app`
- Configurer CORS pour permettre les requêtes depuis Vercel

#### Configuration
Dans votre frontend, pointer vers l'API externe :
```typescript
// client/src/lib/trpc.ts
const apiUrl = import.meta.env.VITE_API_URL || 'https://votre-api.railway.app';
```

---

### Option 4 : Tout sur Railway/Render (Plus Simple)

**Recommandation forte** : Pour une app full-stack, Railway ou Render sont plus adaptés

#### Railway (Recommandé)
```bash
# Installation Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialiser
railway init

# Déployer
railway up
```

Railway détectera automatiquement votre `package.json` et utilisera :
- Build : `pnpm build`
- Start : `pnpm start`

#### Render
1. Connectez votre repo GitHub
2. Configurez :
   - Build Command : `pnpm install && pnpm build`
   - Start Command : `pnpm start`
3. Ajoutez les variables d'environnement
4. Déployez

---

## 📋 Recommandation Finale

Pour **AgentiOrg** (application full-stack), je recommande :

### 🥇 Option Préférée : Railway ou Render

**Pourquoi ?**
- ✅ Supporte nativement Express + React
- ✅ Une seule commande pour tout déployer
- ✅ Gestion simplifiée
- ✅ Logs centralisés
- ✅ Base de données intégrée possible

### 🥈 Alternative : Vercel Frontend + Railway Backend

**Pourquoi ?**
- ✅ CDN global pour le frontend (Vercel)
- ✅ Serveur Node.js pour le backend (Railway)
- ⚠️ Configuration CORS nécessaire
- ⚠️ Deux déploiements à gérer

---

## 🎯 Action Immédiate

### Pour Déployer sur Vercel (Frontend seulement)

La configuration actuelle fonctionne maintenant :

```bash
# Redéployez depuis l'interface Vercel
# ou
vercel --prod
```

### Pour Déployer Full-Stack

Choisissez **Railway** ou **Render** et suivez le guide `DEPLOYMENT.md`

---

## 📖 Documentation

- **Railway** : [DEPLOYMENT.md](./DEPLOYMENT.md) - Section Railway
- **Render** : [DEPLOYMENT.md](./DEPLOYMENT.md) - Section Render
- **Vercel Frontend Only** : Configuration actuelle ✅
- **Vercel Full-Stack** : Nécessite refactoring API

---

## ⚡ Démarrage Rapide - Railway

```bash
# 1. Installer Railway CLI
npm i -g @railway/cli

# 2. Se connecter
railway login

# 3. Créer un nouveau projet
railway init

# 4. Ajouter les variables d'environnement
railway variables set DATABASE_URL="mysql://..."
railway variables set JWT_SECRET="..."
# ... etc

# 5. Déployer
railway up

# 6. Ouvrir l'app
railway open
```

---

**Note** : Le code est prêt pour Railway/Render sans modification ! 🎉
