# ⚡ Guide de Déploiement Cloudflare Pages (Interface Web)

## 🚨 IMPORTANT : Pourquoi l'interface Web ?

**Le déploiement CLI via `wrangler` est IMPOSSIBLE dans cet environnement** car :
- Nécessite authentification OAuth avec navigateur
- Nécessite interaction humaine pour `wrangler login`
- Le sandbox n'a pas accès au navigateur

**✅ SOLUTION : Interface Web Cloudflare (100% GRATUIT)**

---

## 📋 Guide en 3 Étapes (10 minutes)

### Étape 1️⃣ : Créer un compte Cloudflare (2 minutes)

1. Allez sur : **https://dash.cloudflare.com/sign-up**
2. Créez un compte gratuit
3. Connectez-vous au Dashboard

---

### Étape 2️⃣ : Préparer les variables d'environnement (5 minutes)

#### A. Base de données (PlanetScale - GRATUIT)

1. Allez sur : **https://planetscale.com**
2. Créez un compte gratuit
3. Créez une base de données nommée `agentiorg`
4. Obtenez l'URL de connexion :
   ```
   DATABASE_URL=mysql://user:pass@aws.connect.psdb.cloud/agentiorg?ssl={"rejectUnauthorized":true}
   ```

#### B. Générer JWT Secret (30 secondes)

Exécutez dans votre terminal :
```bash
openssl rand -base64 32
```

Ou :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Résultat exemple : `xK3pL9mN8vQ2wR5tY7uI0oP4aS6dF1gH8jK2lM3nB5vC9xZ1qW4eR6tY8uI0pL2aS`

#### C. Credentials Manus OAuth

Obtenez depuis votre application Manus :
- `VITE_APP_ID` : ID de l'application
- `OAUTH_SERVER_URL` : URL du serveur OAuth (ex: `https://api.manus.im`)
- `VITE_OAUTH_PORTAL_URL` : URL du portail de connexion (ex: `https://auth.manus.im`)
- `BUILT_IN_FORGE_API_URL` : URL API backend
- `BUILT_IN_FORGE_API_KEY` : Clé API backend
- `VITE_FRONTEND_FORGE_API_URL` : URL API frontend
- `VITE_FRONTEND_FORGE_API_KEY` : Clé API frontend
- `OWNER_OPEN_ID` : Votre Open ID
- `OWNER_NAME` : Votre nom

---

### Étape 3️⃣ : Déployer sur Cloudflare Pages (3 minutes)

#### A. Créer un nouveau projet Pages

1. Dans le Dashboard Cloudflare, cliquez sur **"Workers & Pages"** (menu gauche)
2. Cliquez sur **"Create application"**
3. Sélectionnez l'onglet **"Pages"**
4. Cliquez sur **"Connect to Git"**

#### B. Connecter votre dépôt GitHub

1. Autorisez Cloudflare à accéder à GitHub
2. Sélectionnez le dépôt : **`Jaokimben/AgentiOrg`**
3. Cliquez sur **"Begin setup"**

#### C. Configurer le build

Remplissez les champs EXACTEMENT comme suit :

| Champ | Valeur |
|-------|--------|
| **Project name** | `agentiorg` |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | `pnpm install && pnpm run pages:build` |
| **Build output directory** | `dist/public` |
| **Root directory (path)** | (laisser vide) |

#### D. Ajouter les variables d'environnement

Cliquez sur **"Environment variables"** puis ajoutez **TOUTES** les variables suivantes :

> ⚠️ **IMPORTANT** : Cochez **"Production"** pour CHAQUE variable !

| Variable | Valeur | Obligatoire |
|----------|--------|-------------|
| `NODE_VERSION` | `20` | ✅ OUI |
| `DATABASE_URL` | Votre URL PlanetScale | ✅ OUI |
| `JWT_SECRET` | Votre secret généré | ✅ OUI |
| `VITE_APP_ID` | ID Manus | ✅ OUI |
| `OAUTH_SERVER_URL` | URL serveur OAuth | ✅ OUI |
| `VITE_OAUTH_PORTAL_URL` | URL portail connexion | ✅ OUI |
| `BUILT_IN_FORGE_API_URL` | URL API backend | ✅ OUI |
| `BUILT_IN_FORGE_API_KEY` | Clé API backend | ✅ OUI |
| `VITE_FRONTEND_FORGE_API_URL` | URL API frontend | ✅ OUI |
| `VITE_FRONTEND_FORGE_API_KEY` | Clé API frontend | ✅ OUI |
| `OWNER_OPEN_ID` | Votre Open ID | ✅ OUI |
| `OWNER_NAME` | Votre nom | ✅ OUI |

#### E. Lancer le déploiement

1. Vérifiez que TOUTES les variables sont cochées "Production"
2. Cliquez sur **"Save and Deploy"**
3. ⏳ Attendez 3-5 minutes (build + déploiement)
4. ✅ Votre site sera disponible sur : `https://agentiorg-xxx.pages.dev`

---

## 🔧 Post-Déploiement : Initialiser la base de données

Une fois le déploiement réussi, exécutez en local :

```bash
# Avec votre DATABASE_URL PlanetScale
DATABASE_URL="mysql://user:pass@aws.connect.psdb.cloud/agentiorg?ssl={\"rejectUnauthorized\":true}" npx pnpm@10.4.1 db:push
```

Cela créera les tables nécessaires dans votre base de données.

---

## 🎯 Résultat attendu

Après le déploiement, vous obtiendrez :
- ✅ URL de production : `https://agentiorg.pages.dev` (ou custom domain)
- ✅ CDN mondial (150+ villes)
- ✅ HTTPS automatique
- ✅ Déploiements automatiques sur chaque push `main`
- ✅ Bande passante illimitée
- ✅ 100% GRATUIT

---

## ❌ Résolution des erreurs communes

### Erreur : "Build failed"

**Cause** : Variables d'environnement manquantes

**Solution** :
1. Allez dans **Settings** → **Environment variables**
2. Vérifiez que TOUTES les 12 variables sont présentes
3. Vérifiez que "Production" est coché pour chaque variable
4. Cliquez sur **"Retry deployment"**

---

### Erreur : "Page blanche après déploiement"

**Cause** : Base de données non initialisée

**Solution** :
```bash
DATABASE_URL="votre_url" npx pnpm@10.4.1 db:push
```

---

### Erreur : "OAuth ne fonctionne pas"

**Cause** : Variables OAuth incorrectes

**Solution** :
1. Vérifiez `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`
2. Assurez-vous que le domaine Cloudflare est autorisé dans Manus OAuth
3. Re-déployez après correction des variables

---

## 📚 Fichiers de référence

- `.env.example` : Liste complète des variables
- `DEPLOYMENT_FINAL_SOLUTION.md` : Guide détaillé
- `CLOUDFLARE_DEPLOY.md` : Documentation complète
- `.pages.toml` : Configuration Cloudflare Pages
- `.cfignore` : Fichiers ignorés lors du déploiement

---

## 🆘 Besoin d'aide ?

1. **Logs de build** : Dashboard Cloudflare → Deployments → View build logs
2. **Logs runtime** : Dashboard → Functions → Real-time Logs
3. **Documentation** : https://developers.cloudflare.com/pages/

---

## ✅ Checklist finale

- [ ] Compte Cloudflare créé
- [ ] Base de données PlanetScale créée
- [ ] DATABASE_URL obtenue
- [ ] JWT_SECRET généré
- [ ] Credentials Manus OAuth obtenus
- [ ] Projet Cloudflare Pages créé
- [ ] Dépôt GitHub connecté
- [ ] Build command : `pnpm install && pnpm run pages:build`
- [ ] Output directory : `dist/public`
- [ ] 12 variables d'environnement ajoutées avec "Production" coché
- [ ] Déploiement lancé
- [ ] Build réussi (vérifier les logs)
- [ ] Site accessible sur `https://agentiorg-xxx.pages.dev`
- [ ] Base de données initialisée avec `db:push`
- [ ] Tests fonctionnels (connexion, évaluation, etc.)

---

**🎉 Bonne chance avec votre déploiement !**

**Temps total estimé : 15-20 minutes**
