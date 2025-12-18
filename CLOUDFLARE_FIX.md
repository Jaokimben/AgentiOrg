# 🔧 Correction de l'Erreur de Déploiement Cloudflare

## ❌ Erreur Rencontrée

```
Failed: error occurred while running deploy command
Logs were written to /opt/buildhome/.config/.wrangler/logs/...
```

## 🔍 Cause du Problème

Cette erreur se produit quand Cloudflare Pages essaie de déployer le projet mais rencontre des problèmes avec :
1. La configuration du build
2. Les variables d'environnement manquantes
3. La structure du projet

## ✅ Solution : Déploiement via Interface Web

Le déploiement via l'interface web Cloudflare est **plus fiable** et **évite les erreurs de CLI**.

---

## 🚀 MÉTHODE RECOMMANDÉE : Interface Web

### Étape 1 : Aller sur Cloudflare Dashboard

👉 https://dash.cloudflare.com

### Étape 2 : Créer un Nouveau Projet Pages

1. Menu de gauche : **Workers & Pages**
2. Bouton : **Create application**
3. Onglet : **Pages**
4. **Connect to Git**

### Étape 3 : Configuration EXACTE

Utilisez **EXACTEMENT** ces paramètres :

```
Project name: agentiorg
Production branch: main

Build settings:
  Framework preset: None
  Build command: pnpm build
  Build output directory: dist/public
  Root directory: (leave empty)
  
Environment variables:
  NODE_VERSION = 20
```

### Étape 4 : Variables d'Environnement (CRITIQUE)

**AVANT de déployer**, ajoutez ces variables en cliquant sur "Environment variables (advanced)" :

#### Variables Obligatoires

Ajoutez chaque variable **une par une** :

```bash
# Database
DATABASE_URL = mysql://user:password@host:3306/database

# Security
JWT_SECRET = [généré avec: openssl rand -base64 32]

# Manus OAuth - Backend
OAUTH_SERVER_URL = https://api.manus.im
BUILT_IN_FORGE_API_URL = https://api.manus.im
BUILT_IN_FORGE_API_KEY = [votre-clé-backend]

# Manus OAuth - Frontend
VITE_APP_ID = [votre-app-id]
VITE_OAUTH_PORTAL_URL = https://auth.manus.im
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = [votre-clé-frontend]

# Owner
OWNER_OPEN_ID = [votre-open-id]
OWNER_NAME = [votre-nom]
```

**Important** : Cochez **"Production"** pour chaque variable !

#### Variables Optionnelles

```bash
VITE_APP_TITLE = AgentiOrg
VITE_APP_LOGO = https://votre-logo.png
VITE_ANALYTICS_ENDPOINT = https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID = votre-website-id
```

### Étape 5 : Déployer

1. **Vérifiez** que toutes les variables obligatoires sont ajoutées
2. Cliquez sur **"Save and Deploy"**
3. **Attendez** 3-5 minutes

---

## 🔧 Si le Build Échoue Encore

### Erreur : "Build command failed"

**Cause** : Variables d'environnement manquantes

**Solution** :
1. Allez dans **Settings** → **Environment variables**
2. Vérifiez que **toutes** les variables sont présentes
3. Particulièrement les variables `VITE_*`
4. Retournez dans **Deployments** → **Retry deployment**

### Erreur : "Node version mismatch"

**Cause** : Version Node.js incorrecte

**Solution** :
1. Ajoutez la variable `NODE_VERSION = 20`
2. Redéployez

### Erreur : "pnpm not found"

**Cause** : Cloudflare n'a pas détecté pnpm

**Solution** :
1. Vérifiez que `pnpm-lock.yaml` est dans le repository
2. Ou changez le build command en : `npm install -g pnpm && pnpm build`

---

## 📋 Checklist de Vérification

Avant de déployer, assurez-vous que :

- [ ] Repository GitHub est accessible
- [ ] Branche `main` contient le code récent
- [ ] Build command = `pnpm build`
- [ ] Output directory = `dist/public`
- [ ] `NODE_VERSION = 20` est ajouté
- [ ] **DATABASE_URL** est ajoutée
- [ ] **JWT_SECRET** est ajouté (32+ caractères)
- [ ] **VITE_APP_ID** est ajouté
- [ ] **OAUTH_SERVER_URL** est ajouté
- [ ] **VITE_OAUTH_PORTAL_URL** est ajouté
- [ ] **BUILT_IN_FORGE_API_URL** est ajouté
- [ ] **BUILT_IN_FORGE_API_KEY** est ajouté
- [ ] **VITE_FRONTEND_FORGE_API_URL** est ajouté
- [ ] **VITE_FRONTEND_FORGE_API_KEY** est ajouté
- [ ] **OWNER_OPEN_ID** est ajouté
- [ ] **OWNER_NAME** est ajouté
- [ ] Toutes les variables cochent **"Production"**

---

## 🎯 Alternative : Build Local + Deploy

Si l'interface web ne fonctionne toujours pas, vous pouvez :

### 1. Build Localement

```bash
# Sur votre machine
git clone https://github.com/Jaokimben/AgentiOrg.git
cd AgentiOrg
pnpm install
pnpm build
```

### 2. Deploy via Wrangler CLI

```bash
# Installer Wrangler
npm install -g wrangler

# Se connecter
wrangler login

# Créer le projet
wrangler pages project create agentiorg

# Déployer
wrangler pages deploy dist/public --project-name=agentiorg

# Ajouter les variables
wrangler pages secret put DATABASE_URL --project-name=agentiorg
wrangler pages secret put JWT_SECRET --project-name=agentiorg
# ... etc pour toutes les variables
```

---

## 📊 Structure Attendue par Cloudflare

Cloudflare Pages attend cette structure après build :

```
dist/
└── public/
    ├── index.html
    ├── assets/
    │   ├── index-xxx.js
    │   └── index-xxx.css
    └── ...
```

Vérifiez que votre build produit bien cette structure :

```bash
pnpm build
ls -la dist/public/
```

---

## 🆘 Support

Si le problème persiste :

1. **Logs Cloudflare** :
   - Allez dans Deployments
   - Cliquez sur le déploiement échoué
   - Consultez les logs complets

2. **Build Local** :
   ```bash
   pnpm install
   pnpm build
   pnpm check  # Vérifier TypeScript
   ```

3. **Community Cloudflare** :
   - https://community.cloudflare.com
   - Postez vos logs d'erreur

4. **GitHub Issues** :
   - https://github.com/Jaokimben/AgentiOrg/issues

---

## ✅ Configuration Correcte

Le repository GitHub contient maintenant :
- ✅ `.cloudflare-pages.json` - Configuration de référence
- ✅ `package.json` - Scripts npm corrects
- ✅ `dist/public/` - Structure de build correcte
- ✅ Documentation complète

---

## 🎉 Après le Déploiement Réussi

Une fois déployé avec succès :

1. **URL** : `https://agentiorg-xxx.pages.dev`
2. **Initialiser la DB** :
   ```bash
   DATABASE_URL="..." pnpm db:push
   ```
3. **Tester** votre application
4. **Ajouter un domaine personnalisé** (optionnel)

---

**La méthode la plus fiable est l'interface web Cloudflare ! 🌟**
