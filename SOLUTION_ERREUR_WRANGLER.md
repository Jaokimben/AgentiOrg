# 🔴 Erreur Cloudflare : "Missing entry-point to Worker script"

**Date** : 2025-12-18  
**Erreur du log** : Ligne 153-183

---

## ❌ Problème identifié

Le build fonctionne **PARFAITEMENT** ✅ :
```
2025-12-18T21:20:18.954Z  Success: Build command completed
dist/public/index.html                 367.89 kB
dist/public/assets/index-Dz4z9F1H.css  129.91 kB
dist/public/assets/index-B9csRBz4.js   634.65 kB
```

Mais le déploiement échoue car :
```
Executing user deploy command: npx wrangler deploy

✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

### 🎯 Cause racine :

**Le projet Cloudflare a été créé comme WORKER au lieu de PAGES**

Cloudflare Workers et Cloudflare Pages sont deux services différents :
- **Workers** : Pour exécuter du code JavaScript (fonctions serverless)
- **Pages** : Pour héberger des sites statiques (HTML/CSS/JS)

Notre projet est un **site statique React** → il faut utiliser **Pages**, pas Workers.

---

## ✅ Solution : Supprimer le projet Worker et créer un projet Pages

### Étape 1️⃣ : Supprimer le projet Worker actuel

1. Allez sur : https://dash.cloudflare.com
2. Dans le menu gauche, cliquez sur **"Workers & Pages"**
3. Trouvez le projet **"agentiorg"** dans la liste
4. Cliquez sur le projet
5. Cliquez sur **"Settings"** (en haut à droite)
6. En bas de la page, cliquez sur **"Delete"** ou **"Remove"**
7. Confirmez la suppression

---

### Étape 2️⃣ : Créer un nouveau projet PAGES (pas Worker)

#### A. Créer le projet Pages

1. Retournez sur : https://dash.cloudflare.com
2. Cliquez sur **"Workers & Pages"** (menu gauche)
3. Cliquez sur **"Create application"**
4. **IMPORTANT** : Sélectionnez l'onglet **"Pages"** (PAS "Workers" !)
5. Cliquez sur **"Connect to Git"**

#### B. Connecter GitHub

1. Cliquez sur **"Connect GitHub"** (ou "Connect Git provider")
2. Autorisez Cloudflare à accéder à votre compte GitHub
3. Dans la liste des dépôts, sélectionnez : **`Jaokimben/AgentiOrg`**
4. Cliquez sur **"Begin setup"**

#### C. Configurer le build (EXACTEMENT comme ci-dessous)

| Champ | Valeur | ⚠️ Important |
|-------|--------|--------------|
| **Project name** | `agentiorg` | Peut être différent |
| **Production branch** | `main` | ✅ Exact |
| **Framework preset** | `None` | ✅ Laisser sur "None" |
| **Build command** | `pnpm install && pnpm run pages:build` | ✅ EXACT |
| **Build output directory** | `dist/public` | ✅ EXACT (pas "dist" !) |
| **Root directory (path)** | (laisser vide) | ✅ Vide |

**⚠️ ATTENTION** : Le "Build output directory" doit être **`dist/public`** et **PAS** `dist` !

#### D. Ajouter les variables d'environnement

Cliquez sur **"Environment variables"**, puis ajoutez les variables suivantes :

**⚠️ IMPORTANT** : Cochez **"Production"** pour CHAQUE variable !

| Variable | Valeur | Obligatoire |
|----------|--------|-------------|
| `NODE_VERSION` | `20` | ✅ OUI |
| `DATABASE_URL` | Votre URL PlanetScale/TiDB | ✅ OUI |
| `JWT_SECRET` | Votre secret JWT (32+ caractères) | ✅ OUI |
| `VITE_APP_ID` | ID application Manus | ✅ OUI |
| `OAUTH_SERVER_URL` | `https://api.manus.im` | ✅ OUI |
| `VITE_OAUTH_PORTAL_URL` | `https://auth.manus.im` | ✅ OUI |
| `BUILT_IN_FORGE_API_URL` | URL API backend | ✅ OUI |
| `BUILT_IN_FORGE_API_KEY` | Clé API backend | ✅ OUI |
| `VITE_FRONTEND_FORGE_API_URL` | URL API frontend | ✅ OUI |
| `VITE_FRONTEND_FORGE_API_KEY` | Clé API frontend | ✅ OUI |
| `OWNER_OPEN_ID` | Votre Open ID | ✅ OUI |
| `OWNER_NAME` | Votre nom | ✅ OUI |

**Variables optionnelles (analytics)** :
- `VITE_ANALYTICS_ENDPOINT` : URL Umami (si vous utilisez analytics)
- `VITE_ANALYTICS_WEBSITE_ID` : ID site Umami

#### E. Lancer le déploiement

1. Vérifiez que toutes les variables sont cochées **"Production"**
2. Cliquez sur **"Save and Deploy"**
3. ⏳ Attendez 3-5 minutes
4. ✅ Le site sera disponible sur : `https://agentiorg.pages.dev`

---

## 🔍 Vérifier que c'est bien Pages et pas Workers

Après avoir créé le projet, vérifiez :

1. Dans le Dashboard Cloudflare → **Workers & Pages**
2. Votre projet doit avoir un onglet **"Deployments"** (pas "Triggers")
3. L'URL doit être : `https://nom-projet.pages.dev` (pas `.workers.dev`)
4. Le type de projet doit afficher **"Pages"** (pas "Worker")

---

## 📊 Différence entre Workers et Pages

| Caractéristique | Cloudflare Workers | Cloudflare Pages |
|-----------------|-------------------|------------------|
| **Usage** | Fonctions serverless (code JS) | Sites statiques (HTML/CSS/JS) |
| **Déploiement** | `wrangler deploy` avec entry point | Git auto-deploy ou `wrangler pages deploy` |
| **Configuration** | `wrangler.toml` avec `main` | `.pages.toml` avec `output_directory` |
| **Build** | Pas de build automatique | Build automatique sur Git push |
| **URL** | `.workers.dev` | `.pages.dev` |
| **Notre projet** | ❌ NON compatible | ✅ OUI compatible |

**Notre projet AgentiOrg est un site React statique** → utilisez **Pages** !

---

## 🎯 Pourquoi l'erreur "Missing entry-point" ?

Quand vous créez un projet **Worker**, Cloudflare cherche :
- Un fichier `wrangler.toml` avec `main = "src/index.ts"`
- OU un argument CLI : `wrangler deploy src/index.ts`

Notre projet n'a pas d'entry point Worker (pas de `src/index.ts` pour Workers), car c'est un **site statique**, donc Cloudflare affiche :
```
Missing entry-point to Worker script or to assets directory
```

**Solution** : Créer le projet comme **Pages** (pas Worker) pour que Cloudflare comprenne que c'est un site statique dans `dist/public/`.

---

## ✅ Checklist de déploiement Pages

- [ ] Supprimer le projet Worker existant
- [ ] Créer un nouveau projet **PAGES** (onglet "Pages")
- [ ] Connecter à GitHub : `Jaokimben/AgentiOrg`
- [ ] Framework preset : **None**
- [ ] Build command : `pnpm install && pnpm run pages:build`
- [ ] Output directory : **`dist/public`** (PAS "dist" !)
- [ ] Ajouter 12 variables d'environnement avec "Production" coché
- [ ] Cliquer "Save and Deploy"
- [ ] Vérifier le type : doit être "Pages" (pas "Worker")
- [ ] Attendre fin du build (3-5 min)
- [ ] Vérifier URL : `https://agentiorg.pages.dev`
- [ ] Initialiser DB : `DATABASE_URL="..." npx pnpm db:push`
- [ ] Tester le site

---

## 🆘 Si le problème persiste

### Option 1 : Déployer manuellement via CLI (sans Dashboard)

1. **Authentifier Wrangler localement** (sur votre machine, pas dans le sandbox) :
   ```bash
   npx wrangler login
   ```

2. **Déployer manuellement** :
   ```bash
   cd /path/to/AgentiOrg
   pnpm build
   npx wrangler pages deploy dist/public --project-name=agentiorg
   ```

### Option 2 : Utiliser un autre hébergeur gratuit

Si Cloudflare pose toujours problème, voici des alternatives gratuites :

| Hébergeur | Prix | Déploiement | Avantages |
|-----------|------|-------------|-----------|
| **Netlify** | ✅ Gratuit | Git auto-deploy | Très simple, 100 GB/mois |
| **Vercel** | ✅ Gratuit (limité) | Git auto-deploy | Frontend uniquement |
| **GitHub Pages** | ✅ Gratuit | GitHub Actions | Illimité |
| **Render (Static)** | ✅ Gratuit | Git auto-deploy | 100 GB/mois |

Pour déployer sur **Netlify** (recommandé si Cloudflare échoue) :

1. Créer compte : https://app.netlify.com/signup
2. **New site from Git** → GitHub → `Jaokimben/AgentiOrg`
3. Build command : `pnpm install && pnpm run pages:build`
4. Publish directory : `dist/public`
5. Ajouter les 12 variables d'environnement
6. Deploy

---

## 📚 Fichiers de référence

- `CLOUDFLARE_WEB_DEPLOY_GUIDE.md` - Guide complet Pages
- `SITUATION_ACTUELLE_CLOUDFLARE.md` - Situation actuelle
- `.env.example` - Liste variables d'environnement
- `.pages.toml` - Configuration Pages (ignoré par Workers)

---

## 📝 Résumé

**❌ Problème** : Projet créé comme Worker au lieu de Pages  
**✅ Solution** : Supprimer projet Worker → Créer projet **Pages**  
**⚠️ Clé** : Sélectionner onglet **"Pages"** lors de la création  
**⏱️ Temps** : 15-20 minutes  

**🎉 Après déploiement réussi** : Site disponible sur `https://agentiorg.pages.dev`

---

**Bonne chance ! 🚀**
