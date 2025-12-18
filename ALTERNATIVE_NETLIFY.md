# 🌐 Alternative : Déployer sur Netlify (100% GRATUIT)

**Si Cloudflare Pages pose problème**, Netlify est une excellente alternative gratuite.

---

## ✅ Avantages de Netlify

| Caractéristique | Netlify | Cloudflare Pages |
|----------------|---------|------------------|
| **Prix** | ✅ 100% GRATUIT | ✅ 100% GRATUIT |
| **Bande passante** | ✅ 100 GB/mois | ✅ Illimitée |
| **Builds/mois** | ✅ 300 builds | ✅ 500 builds |
| **Configuration** | ✅ Très simple | ⚠️ Pages vs Workers |
| **Support Git** | ✅ GitHub, GitLab, Bitbucket | ✅ GitHub, GitLab |
| **CDN** | ✅ Mondial | ✅ Mondial |
| **HTTPS** | ✅ Automatique | ✅ Automatique |
| **Déploiements instantanés** | ✅ Sur push main | ✅ Sur push main |

**Verdict** : Netlify est **plus simple** à configurer que Cloudflare Pages (pas de confusion Workers/Pages).

---

## 🚀 Guide de déploiement Netlify (10 minutes)

### Étape 1️⃣ : Créer un compte Netlify (2 min)

1. Allez sur : https://app.netlify.com/signup
2. Cliquez sur **"Sign up with GitHub"**
3. Autorisez Netlify à accéder à votre compte GitHub
4. Confirmez votre email

---

### Étape 2️⃣ : Créer un nouveau site (3 min)

#### A. Importer depuis GitHub

1. Dans le Dashboard Netlify, cliquez sur **"Add new site"** → **"Import an existing project"**
2. Cliquez sur **"Deploy with GitHub"**
3. Autorisez Netlify si nécessaire
4. Recherchez et sélectionnez : **`Jaokimben/AgentiOrg`**
5. Cliquez sur le dépôt pour continuer

#### B. Configurer le build

Remplissez les champs EXACTEMENT comme suit :

| Champ | Valeur | ⚠️ Important |
|-------|--------|--------------|
| **Branch to deploy** | `main` | ✅ Exact |
| **Base directory** | (laisser vide) | ✅ Vide |
| **Build command** | `pnpm install && pnpm run pages:build` | ✅ EXACT |
| **Publish directory** | `dist/public` | ✅ EXACT |

**Screenshot de référence** :
```
Branch to deploy:        main
Base directory:          [empty]
Build command:           pnpm install && pnpm run pages:build
Publish directory:       dist/public
```

#### C. Configurer les variables d'environnement

1. Cliquez sur **"Advanced build settings"** (en bas)
2. Cliquez sur **"New variable"** pour chaque variable ci-dessous :

**Variables OBLIGATOIRES** :

| Variable | Valeur |
|----------|--------|
| `NODE_VERSION` | `20` |
| `DATABASE_URL` | Votre URL PlanetScale/TiDB |
| `JWT_SECRET` | Votre secret JWT (32+ caractères) |
| `VITE_APP_ID` | ID application Manus |
| `OAUTH_SERVER_URL` | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | `https://auth.manus.im` |
| `BUILT_IN_FORGE_API_URL` | URL API backend |
| `BUILT_IN_FORGE_API_KEY` | Clé API backend |
| `VITE_FRONTEND_FORGE_API_URL` | URL API frontend |
| `VITE_FRONTEND_FORGE_API_KEY` | Clé API frontend |
| `OWNER_OPEN_ID` | Votre Open ID |
| `OWNER_NAME` | Votre nom |

**Variables OPTIONNELLES** (analytics) :
- `VITE_ANALYTICS_ENDPOINT` : URL Umami
- `VITE_ANALYTICS_WEBSITE_ID` : ID site Umami

#### D. Lancer le déploiement

1. Vérifiez que TOUTES les variables sont ajoutées
2. Cliquez sur **"Deploy [nom-du-site]"** (bouton vert en bas)
3. ⏳ Attendez 3-5 minutes
4. ✅ Le site sera disponible sur : `https://random-name-123456.netlify.app`

---

### Étape 3️⃣ : Personnaliser le nom de domaine (1 min)

Netlify génère un nom aléatoire. Pour le changer :

1. Dans le Dashboard du site, cliquez sur **"Site settings"**
2. Dans le menu gauche, cliquez sur **"Domain management"**
3. Sous "Custom domains", cliquez sur **"Options"** → **"Edit site name"**
4. Changez le nom en : `agentiorg` (si disponible)
5. Votre site sera alors : `https://agentiorg.netlify.app`

---

### Étape 4️⃣ : Initialiser la base de données (2 min)

Une fois le site déployé, exécutez en local :

```bash
# Avec votre DATABASE_URL PlanetScale
DATABASE_URL="mysql://user:pass@aws.connect.psdb.cloud/agentiorg?ssl={\"rejectUnauthorized\":true}" npx pnpm db:push
```

Cela créera les tables nécessaires.

---

## 🔧 Configuration automatique via fichier netlify.toml

Vous pouvez aussi créer un fichier `netlify.toml` dans votre dépôt pour automatiser la configuration :

```toml
[build]
  command = "pnpm install && pnpm run pages:build"
  publish = "dist/public"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Avantage** : Pas besoin de reconfigurer à chaque nouveau déploiement.

---

## 📊 Comparaison : Netlify vs Cloudflare Pages

| Critère | Netlify | Cloudflare Pages |
|---------|---------|------------------|
| **Facilité setup** | ⭐⭐⭐⭐⭐ Très simple | ⭐⭐⭐ Pages vs Workers confus |
| **Bande passante** | ⭐⭐⭐⭐ 100 GB/mois | ⭐⭐⭐⭐⭐ Illimitée |
| **Vitesse déploiement** | ⭐⭐⭐⭐ ~3 min | ⭐⭐⭐⭐ ~4 min |
| **CDN** | ⭐⭐⭐⭐ Mondial | ⭐⭐⭐⭐⭐ 150+ villes |
| **Support** | ⭐⭐⭐⭐⭐ Excellent docs | ⭐⭐⭐⭐ Bonne docs |
| **Analytics** | ⭐⭐⭐⭐⭐ Intégré | ⭐⭐⭐ Web Analytics payant |
| **Formulaires** | ⭐⭐⭐⭐⭐ Gratuit | ❌ Non disponible |

**Verdict** : 
- **Netlify** : Plus simple, excellent pour démarrer rapidement
- **Cloudflare Pages** : Plus performant (CDN), mais configuration plus complexe

---

## ✅ Checklist Netlify

- [ ] Compte Netlify créé
- [ ] Base de données PlanetScale créée
- [ ] `DATABASE_URL` obtenue
- [ ] `JWT_SECRET` généré (`openssl rand -base64 32`)
- [ ] Credentials Manus OAuth obtenus
- [ ] Nouveau site Netlify créé depuis GitHub
- [ ] Dépôt `Jaokimben/AgentiOrg` connecté
- [ ] Build command : `pnpm install && pnpm run pages:build`
- [ ] Publish directory : `dist/public`
- [ ] 12 variables d'environnement ajoutées
- [ ] Déploiement lancé
- [ ] Build réussi (vérifier les logs)
- [ ] Site accessible (URL `.netlify.app`)
- [ ] Nom de domaine personnalisé (optionnel)
- [ ] Base de données initialisée (`db:push`)
- [ ] Tests fonctionnels (connexion, évaluation)

---

## 🆘 Résolution d'erreurs Netlify

### Erreur : "Build failed"

**Solution** :
1. Vérifier les logs de build : Site → Deploys → [dernier deploy] → Deploy log
2. Vérifier que toutes les variables d'environnement sont présentes
3. Vérifier que `NODE_VERSION = 20`
4. Re-déployer : Deploys → Trigger deploy

---

### Erreur : "Page blanche après déploiement"

**Solution** :
1. Initialiser la base de données : `DATABASE_URL="..." npx pnpm db:push`
2. Vérifier les logs du navigateur (F12 → Console)
3. Vérifier que les variables `VITE_*` sont bien définies

---

### Erreur : "OAuth ne fonctionne pas"

**Solution** :
1. Vérifier que le domaine Netlify est autorisé dans Manus OAuth :
   - Ajouter `https://votre-site.netlify.app` aux domaines autorisés
2. Vérifier `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`
3. Re-déployer après correction

---

## 📚 Ressources Netlify

- **Documentation** : https://docs.netlify.com
- **Dashboard** : https://app.netlify.com
- **Support** : https://answers.netlify.com
- **Status** : https://www.netlifystatus.com

---

## 🎯 Temps estimé total : 15 minutes

- ⏱️ Créer compte : 2 min
- ⏱️ Préparer variables : 5 min
- ⏱️ Configurer site : 3 min
- ⏱️ Attente build : 3 min
- ⏱️ Initialiser DB : 2 min

**Total** : ~15 minutes pour un site en production !

---

## 🚀 Déploiement via CLI Netlify (Alternative)

Si vous préférez la ligne de commande :

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Authentifier
netlify login

# Déployer
pnpm build
netlify deploy --prod --dir=dist/public
```

---

## 🎉 Résumé

**✅ Netlify est recommandé si** :
- Vous voulez une configuration simple sans confusion
- Vous démarrez rapidement sans problèmes techniques
- Vous voulez des analytics intégrés gratuitement
- 100 GB/mois de bande passante vous suffit

**⚠️ Cloudflare Pages est recommandé si** :
- Vous avez besoin de bande passante illimitée
- Vous voulez le CDN le plus performant (0ms cold start)
- Vous êtes à l'aise avec la distinction Pages/Workers

**Pour démarrer rapidement et sans erreurs** : **Utilisez Netlify** ✅

---

**Bonne chance avec votre déploiement ! 🎉**
