# 🔧 Render - Variables d'environnement complètes

## ⚠️ Erreur détectée : OAUTH_SERVER_URL manquante

Si vous voyez cette erreur dans les logs :
```
[OAuth] ERROR: OAUTH_SERVER_URL is not configured!
```

Cela signifie que la variable `OAUTH_SERVER_URL` n'est pas définie dans Render.

---

## ✅ Liste complète des variables requises

### **Variables OBLIGATOIRES** (12 variables)

Allez dans **Dashboard Render → Votre site → Environment** et vérifiez :

| # | Variable | Exemple de valeur | Type | Description |
|---|----------|-------------------|------|-------------|
| 1 | `NODE_VERSION` | `20` | Plain Text | Version Node.js |
| 2 | `DATABASE_URL` | `mysql://user:pass@host:3306/db` | **Secret** | Connexion MySQL/TiDB |
| 3 | `JWT_SECRET` | `xK3pL9mN8vQ2wR5tY7uI0oP...` | **Secret** | Secret JWT (32+ chars) |
| 4 | `VITE_APP_ID` | `app_123456` | Plain Text | ID app Manus |
| 5 | **`OAUTH_SERVER_URL`** ⚠️ | **`https://api.manus.im`** | Plain Text | **URL serveur OAuth** |
| 6 | `VITE_OAUTH_PORTAL_URL` | `https://auth.manus.im` | Plain Text | URL portail connexion |
| 7 | `BUILT_IN_FORGE_API_URL` | `https://api.manus.im` | Plain Text | URL API backend |
| 8 | `BUILT_IN_FORGE_API_KEY` | `key_backend_xxx` | **Secret** | Clé API backend |
| 9 | `VITE_FRONTEND_FORGE_API_URL` | `https://api.manus.im` | Plain Text | URL API frontend |
| 10 | `VITE_FRONTEND_FORGE_API_KEY` | `key_frontend_xxx` | **Secret** | Clé API frontend |
| 11 | `OWNER_OPEN_ID` | `openid_xxx` | Plain Text | Votre Open ID |
| 12 | `OWNER_NAME` | `Votre Nom` | Plain Text | Votre nom |

### **Variables OPTIONNELLES** (analytics)

| # | Variable | Exemple | Type | Description |
|---|----------|---------|------|-------------|
| 13 | `VITE_ANALYTICS_ENDPOINT` | `https://analytics.example.com` | Plain Text | Endpoint Umami |
| 14 | `VITE_ANALYTICS_WEBSITE_ID` | `site_123` | Plain Text | ID site Umami |

---

## 🚀 Procédure de correction

### **Option 1 : Via Dashboard Render (Recommandé)**

#### Étape 1 : Accéder aux variables
```
Dashboard Render
→ Votre site "agentiorg"
→ "Environment" (menu gauche)
```

#### Étape 2 : Vérifier les variables existantes

Parcourez la liste et vérifiez que **TOUTES** les 12 variables obligatoires sont présentes.

#### Étape 3 : Ajouter les variables manquantes

Pour chaque variable manquante :
1. Cliquez **"Add Environment Variable"**
2. **Key** : Nom de la variable (ex: `OAUTH_SERVER_URL`)
3. **Value** : Valeur correspondante (ex: `https://api.manus.im`)
4. **Type** : 
   - Cochez **"Secret"** pour : `DATABASE_URL`, `JWT_SECRET`, `BUILT_IN_FORGE_API_KEY`, `VITE_FRONTEND_FORGE_API_KEY`
   - Laissez **"Plain Text"** pour les autres

#### Étape 4 : Sauvegarder et redéployer

1. Cliquez **"Save Changes"**
2. Render redéploiera automatiquement
3. ⏳ Attendez 2-3 minutes
4. Vérifiez les logs : **Manual Deploy** → **Logs**

---

## 📋 Script de vérification des variables

Utilisez cette checklist pour vérifier que toutes les variables sont présentes :

```bash
# Variables OBLIGATOIRES
✅ NODE_VERSION=20
✅ DATABASE_URL=mysql://...
✅ JWT_SECRET=...
✅ VITE_APP_ID=...
⚠️ OAUTH_SERVER_URL=https://api.manus.im          # SOUVENT MANQUANTE
✅ VITE_OAUTH_PORTAL_URL=https://auth.manus.im
✅ BUILT_IN_FORGE_API_URL=https://api.manus.im
✅ BUILT_IN_FORGE_API_KEY=...
✅ VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
✅ VITE_FRONTEND_FORGE_API_KEY=...
✅ OWNER_OPEN_ID=...
✅ OWNER_NAME=...

# Variables OPTIONNELLES
⚪ VITE_ANALYTICS_ENDPOINT=...
⚪ VITE_ANALYTICS_WEBSITE_ID=...
```

---

## 🔍 Vérifier les logs après correction

### **Logs corrects (sans erreur)** :

```
==> Starting service with 'npm start'
> agentic_org_service_site@1.0.0 start
> NODE_ENV=production node dist/index.js

[OAuth] Initialized with baseURL: https://api.manus.im  ✅
Server running on http://localhost:10000/
==> Your service is live 🎉
```

### **Logs avec erreur** :

```
[OAuth] Initialized with baseURL:                       ❌ (vide)
[OAuth] ERROR: OAUTH_SERVER_URL is not configured!     ❌
```

---

## 🛠️ Générer les valeurs manquantes

Si vous n'avez pas certaines valeurs :

### **JWT_SECRET**

Générez un secret aléatoire :

```bash
# Option 1 : OpenSSL
openssl rand -base64 32

# Option 2 : Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Exemple de résultat :
# xK3pL9mN8vQ2wR5tY7uI0oP4aS6dF1gH8jK2lM3nB5vC9xZ1qW4eR6tY8uI0pL2aS
```

### **DATABASE_URL**

Si vous n'avez pas encore de base de données :

1. **PlanetScale (Recommandé, GRATUIT)** :
   - https://planetscale.com
   - Créer base `agentiorg`
   - Copier la connexion URL
   - Format : `mysql://user:pass@aws.connect.psdb.cloud/agentiorg?ssl={"rejectUnauthorized":true}`

2. **TiDB Cloud (Alternative GRATUITE)** :
   - https://tidbcloud.com
   - Créer cluster gratuit
   - Format : `mysql://user:pass@gateway01.region.prod.aws.tidbcloud.com:4000/agentiorg?ssl=true`

### **Credentials Manus OAuth**

Obtenez depuis votre console Manus :
- `VITE_APP_ID` : ID de l'application
- `OAUTH_SERVER_URL` : URL serveur OAuth (ex: `https://api.manus.im`)
- `VITE_OAUTH_PORTAL_URL` : URL portail (ex: `https://auth.manus.im`)
- `BUILT_IN_FORGE_API_KEY` : Clé API backend
- `VITE_FRONTEND_FORGE_API_KEY` : Clé API frontend
- `OWNER_OPEN_ID` : Votre Open ID
- `OWNER_NAME` : Votre nom

---

## ✅ Après correction

Une fois toutes les variables ajoutées :

### **1. Vérifier le déploiement**

```
Dashboard → Votre site → Deployments
→ Vérifier status : "Live" ✅
```

### **2. Tester le site**

```
https://agentiorg.onrender.com
→ Devrait se charger sans erreur
```

### **3. Initialiser la base de données** (si pas encore fait)

```bash
# En local
DATABASE_URL="mysql://..." npx pnpm db:push
```

### **4. Tester les fonctionnalités**

- Connexion OAuth
- Outil d'évaluation
- Analytics (si configuré)

---

## 🆘 Si le problème persiste

### **Consulter les logs complets**

```
Dashboard Render → Votre site
→ "Logs" (onglet en haut)
→ Vérifier les erreurs runtime
```

### **Erreurs communes**

| Erreur | Cause | Solution |
|--------|-------|----------|
| `OAUTH_SERVER_URL is not configured` | Variable manquante | Ajouter `OAUTH_SERVER_URL` |
| `DATABASE_URL is not defined` | Variable manquante | Ajouter `DATABASE_URL` |
| `JWT_SECRET is not defined` | Variable manquante | Ajouter `JWT_SECRET` |
| `Page blanche` | DB non initialisée | Exécuter `db:push` |
| `OAuth ne fonctionne pas` | Domaine non autorisé | Ajouter URL Render dans Manus OAuth |

---

## 📚 Documentation

- **Guide complet Render** : `GUIDE_DEPLOY_RENDER.md`
- **Guide rapide** : `RENDER_QUICK_START.md`
- **Variables d'env** : `.env.example`
- **Statut config** : `RENDER_STATUS.md`

---

## 🎯 Résumé

✅ **Déploiement réussi** : Site en ligne  
⚠️ **Erreur détectée** : `OAUTH_SERVER_URL` manquante  
🔧 **Solution** : Ajouter variable dans Environment  
⏱️ **Temps de correction** : 2-3 minutes  
🔄 **Redéploiement** : Automatique après sauvegarde  

**Prochaine étape** : Ajouter `OAUTH_SERVER_URL` et vérifier les autres variables !

**Bon déploiement ! 🚀**
