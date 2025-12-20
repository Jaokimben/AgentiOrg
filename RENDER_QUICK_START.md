# 🚀 Déploiement Rapide sur Render

## ⚡ Guide Ultra-Rapide (10 minutes)

### Étape 1 : Créer le compte (2 min)
1. Allez sur : **https://render.com/signup**
2. Cliquez **"Sign up with GitHub"**
3. Autorisez Render

### Étape 2 : Créer le Static Site (3 min)
1. Dashboard Render → **"New +"** → **"Static Site"**
2. Connectez le dépôt : **`Jaokimben/AgentiOrg`**
3. Cliquez **"Connect"**

### Étape 3 : Configuration (détectée automatiquement)

Le fichier `render.yaml` configure automatiquement :

| Paramètre | Valeur |
|-----------|--------|
| **Name** | `agentiorg` |
| **Branch** | `main` |
| **Build Command** | `pnpm install && pnpm run pages:build` |
| **Publish Directory** | `dist/public` |

**✅ Vous n'avez rien à modifier !**

### Étape 4 : Ajouter les variables d'environnement (5 min)

Cliquez sur **"Add Environment Variable"** pour chaque variable :

**OBLIGATOIRES** (12 variables) :

```bash
NODE_VERSION=20
DATABASE_URL=mysql://user:pass@host/db    # Secret
JWT_SECRET=votre_secret_32_caracteres     # Secret
VITE_APP_ID=votre_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=votre_backend_key  # Secret
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=votre_key     # Secret
OWNER_OPEN_ID=votre_open_id
OWNER_NAME=Votre Nom
```

**OPTIONNELLES** (analytics) :
```bash
VITE_ANALYTICS_ENDPOINT=votre_endpoint
VITE_ANALYTICS_WEBSITE_ID=votre_site_id
```

**💡 Astuce** : Marquez comme **"Secret"** les variables sensibles (DATABASE_URL, JWT_SECRET, API_KEY).

### Étape 5 : Déployer (2 min)

1. Cliquez **"Create Static Site"**
2. ⏳ Attendez 3-5 minutes
3. ✅ Site disponible : **https://agentiorg.onrender.com**

### Étape 6 : Initialiser la base de données (2 min)

Une fois le déploiement réussi :

```bash
# En local
DATABASE_URL="mysql://..." npx pnpm db:push
```

---

## 📊 Ce qui est déjà configuré

Grâce au fichier `render.yaml` dans le dépôt :

- ✅ Build command : `pnpm install && pnpm run pages:build`
- ✅ Publish directory : `dist/public`
- ✅ Node version : 20
- ✅ Headers de sécurité (X-Frame-Options, etc.)
- ✅ Cache des assets (31536000s)
- ✅ SPA routing (toutes les routes → index.html)
- ✅ Pull Request Previews activés

**Vous n'avez qu'à ajouter les variables d'environnement !**

---

## 🎯 Scripts npm disponibles

Ajoutés dans `package.json` :

```bash
# Build pour Render (identique au build de Render)
npm run render:build

# Message d'aide pour le déploiement
npm run render:deploy

# Commande de build par défaut
npm run deploy
```

---

## ✅ Checklist

- [ ] Compte Render créé
- [ ] Base de données PlanetScale/TiDB créée
- [ ] `DATABASE_URL` obtenue
- [ ] `JWT_SECRET` généré (`openssl rand -base64 32`)
- [ ] Credentials Manus OAuth obtenus
- [ ] Static Site créé sur Render
- [ ] Dépôt `Jaokimben/AgentiOrg` connecté
- [ ] 12 variables d'environnement ajoutées
- [ ] Site créé et build lancé
- [ ] Site accessible : `https://agentiorg.onrender.com`
- [ ] Base de données initialisée
- [ ] Tests fonctionnels OK

---

## 🆘 Problèmes courants

### Build échoue

**Vérifier** :
1. Logs : Dashboard → Votre site → Events → [dernier deploy] → Logs
2. Variables : Settings → Environment → Vérifier les 12 variables
3. Redéployer : Manual Deploy → Clear build cache & deploy

### Page blanche

**Solutions** :
1. Initialiser DB : `DATABASE_URL="..." npx pnpm db:push`
2. Vérifier variables `VITE_*` : Settings → Environment
3. Console navigateur (F12) pour voir les erreurs

### OAuth ne fonctionne pas

**Solutions** :
1. Ajouter `https://agentiorg.onrender.com` aux domaines autorisés Manus OAuth
2. Vérifier `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`
3. Redéployer si besoin

---

## 📚 Documentation

- **Guide complet** : `GUIDE_DEPLOY_RENDER.md`
- **Configuration** : `render.yaml`
- **Variables** : `.env.example`
- **Alternatives** : `ALTERNATIVES_HEBERGEMENT_GRATUIT.md`

---

## 🎉 Résultat attendu

- ✅ Site en ligne : `https://agentiorg.onrender.com`
- ✅ CDN mondial
- ✅ HTTPS automatique
- ✅ Git auto-deploy (push → déploiement auto)
- ✅ 100 GB/mois
- ✅ 100% GRATUIT

**Temps total** : 10-15 minutes

**Bon déploiement ! 🚀**
