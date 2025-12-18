# 🚀 Guide de Déploiement Vercel - AgentiOrg

Ce guide vous accompagne pas à pas pour déployer AgentiOrg sur Vercel.

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir :

1. **Un compte Vercel** - Inscrivez-vous sur [vercel.com](https://vercel.com)
2. **Un compte GitHub** - Le code doit être sur GitHub
3. **Une base de données MySQL/TiDB** - Options recommandées :
   - [PlanetScale](https://planetscale.com) - Gratuit pour commencer
   - [TiDB Cloud](https://tidbcloud.com) - Compatible MySQL
   - [AWS RDS](https://aws.amazon.com/rds/) - Pour production
   - [DigitalOcean Managed Databases](https://www.digitalocean.com/products/managed-databases)

4. **Credentials Manus OAuth** - Obtenez vos clés API sur [manus.im](https://manus.im)

---

## 📝 Étape 1 : Préparer la Base de Données

### Option A : PlanetScale (Recommandé pour débuter)

1. Créez un compte sur [planetscale.com](https://planetscale.com)
2. Créez une nouvelle base de données :
   - Cliquez sur "New database"
   - Nom : `agentiorg-prod`
   - Région : Choisissez la plus proche de vos utilisateurs
3. Obtenez la chaîne de connexion :
   - Allez dans "Connect"
   - Sélectionnez "Prisma" ou "General"
   - Copiez la `DATABASE_URL`
   - Format : `mysql://user:password@host/database?sslaccept=strict`

### Option B : TiDB Cloud

1. Créez un compte sur [tidbcloud.com](https://tidbcloud.com)
2. Créez un cluster :
   - Choisissez "Serverless Tier" (gratuit)
   - Sélectionnez votre région
3. Obtenez la connexion string depuis le dashboard

### Configurer les Tables

Les migrations seront automatiquement exécutées au premier déploiement grâce au script `db:push`.

---

## 🔑 Étape 2 : Préparer les Variables d'Environnement

Créez un fichier local `.env.local` (non committé) avec toutes vos variables :

```bash
# Copiez depuis .env.example
cp .env.example .env.local
```

Puis éditez `.env.local` avec vos vraies valeurs :

### Variables Obligatoires

```env
# Database
DATABASE_URL=mysql://user:password@host:3306/database

# Security
JWT_SECRET=générez-un-secret-aléatoire-très-long

# Manus OAuth - Backend
OAUTH_SERVER_URL=https://api.manus.im
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=votre-clé-api-backend

# Manus OAuth - Frontend
VITE_APP_ID=votre-app-id
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=votre-clé-api-frontend

# Owner
OWNER_OPEN_ID=votre-open-id
OWNER_NAME=Votre Nom
```

### Variables Optionnelles

```env
# Application
VITE_APP_TITLE=AgentiOrg
VITE_APP_LOGO=https://votre-domaine.com/logo.png

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=votre-website-id
```

### 💡 Générer un JWT_SECRET Sécurisé

```bash
# Méthode 1 : OpenSSL
openssl rand -base64 32

# Méthode 2 : Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Méthode 3 : En ligne
# Visitez : https://generate-secret.vercel.app/32
```

---

## 🔗 Étape 3 : Connecter GitHub à Vercel

### 3.1 Pousser le Code sur GitHub

Si ce n'est pas déjà fait :

```bash
# Initialisez Git (si nécessaire)
git init
git add .
git commit -m "Prêt pour déploiement Vercel"

# Créez un repo sur GitHub, puis :
git remote add origin https://github.com/VotreUsername/AgentiOrg.git
git branch -M main
git push -u origin main
```

### 3.2 Importer dans Vercel

1. Connectez-vous sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Add New..."** → **"Project"**
3. Sélectionnez votre dépôt GitHub `AgentiOrg`
4. Cliquez sur **"Import"**

---

## ⚙️ Étape 4 : Configuration du Projet Vercel

### 4.1 Paramètres de Build

Vercel détectera automatiquement la configuration depuis `vercel.json`, mais vérifiez :

- **Framework Preset** : `Vite`
- **Build Command** : `pnpm build`
- **Output Directory** : `dist`
- **Install Command** : `pnpm install`

### 4.2 Ajouter les Variables d'Environnement

1. Dans votre projet Vercel, allez dans **Settings** → **Environment Variables**
2. Ajoutez **TOUTES** les variables une par une :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `DATABASE_URL` | `mysql://...` | Production, Preview, Development |
| `JWT_SECRET` | `votre-secret` | Production, Preview, Development |
| `VITE_APP_ID` | `votre-app-id` | Production, Preview, Development |
| `OAUTH_SERVER_URL` | `https://api.manus.im` | Production, Preview, Development |
| `VITE_OAUTH_PORTAL_URL` | `https://auth.manus.im` | Production, Preview, Development |
| ... | ... | ... |

**💡 Astuce** : Cliquez sur les trois environnements (Production, Preview, Development) pour chaque variable.

### 4.3 Méthode Rapide : Import Bulk

Au lieu d'ajouter une par une, utilisez l'import en masse :

1. Dans **Environment Variables**, cliquez sur **"..."** → **"Import"**
2. Collez tout le contenu de votre `.env.local`
3. Sélectionnez les environnements
4. Cliquez sur **"Import"**

---

## 🚀 Étape 5 : Déployer !

### Première Déploiement

1. Après avoir configuré les variables, cliquez sur **"Deploy"**
2. Vercel va :
   - Cloner le repository
   - Installer les dépendances avec `pnpm install`
   - Builder le projet avec `pnpm build`
   - Créer les fichiers de production
   - Déployer l'application

3. Attendez quelques minutes ⏳

### Vérifier le Déploiement

Une fois terminé :
- ✅ Status : "Ready"
- 🌐 URL : `https://votre-projet.vercel.app`

---

## ✅ Étape 6 : Post-Déploiement

### 6.1 Tester l'Application

1. Visitez votre URL Vercel
2. Testez l'authentification Manus
3. Créez un assessment test
4. Vérifiez les fonctionnalités principales :
   - ✅ Formulaire d'évaluation
   - ✅ Visualisations (radar chart, heatmap)
   - ✅ Benchmarks sectoriels
   - ✅ Recommandations
   - ✅ Formulaire de contact

### 6.2 Configurer un Domaine Personnalisé (Optionnel)

1. Dans Vercel, allez dans **Settings** → **Domains**
2. Ajoutez votre domaine : `agentiorg.com`
3. Suivez les instructions DNS
4. Vercel génèrera automatiquement le certificat SSL

### 6.3 Initialiser la Base de Données

Si les migrations n'ont pas été appliquées automatiquement :

```bash
# En local, avec votre DATABASE_URL de production
pnpm db:push
```

Ou utilisez le terminal Vercel :
1. Allez dans votre projet → **Settings** → **Functions**
2. Ou utilisez Vercel CLI :

```bash
npm i -g vercel
vercel login
vercel env pull .env.production
pnpm db:push
```

---

## 🔄 Déploiements Automatiques

### Branches et Environnements

Vercel configure automatiquement :

| Branch | Environnement | URL |
|--------|---------------|-----|
| `main` | Production | `votre-projet.vercel.app` |
| Autres branches | Preview | `branch-name-votre-projet.vercel.app` |

### Workflow Git

```bash
# Développement
git checkout -b feature/nouvelle-fonctionnalité
# ... faites vos modifications ...
git add .
git commit -m "Ajoute nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalité

# → Vercel crée automatiquement un déploiement de preview !

# Merge en production
git checkout main
git merge feature/nouvelle-fonctionnalité
git push origin main

# → Vercel déploie automatiquement en production !
```

---

## 🛠️ Dépannage

### ❌ Erreur : "Database connection failed"

**Cause** : Variables d'environnement mal configurées

**Solution** :
1. Vérifiez `DATABASE_URL` dans Vercel
2. Testez la connexion depuis votre terminal local :
   ```bash
   mysql -h hostname -u user -p -D database
   ```
3. Assurez-vous que l'IP de Vercel est autorisée (pour certaines DB)

### ❌ Erreur : "Build failed"

**Cause** : Dépendances manquantes ou erreurs TypeScript

**Solution** :
1. Testez le build localement :
   ```bash
   pnpm install
   pnpm build
   ```
2. Vérifiez les logs dans Vercel
3. Assurez-vous que `pnpm-lock.yaml` est committé

### ❌ Erreur : "OAuth authentication failed"

**Cause** : Credentials Manus incorrectes

**Solution** :
1. Vérifiez `VITE_APP_ID`, `OAUTH_SERVER_URL`, etc.
2. Assurez-vous que votre app Manus autorise l'URL Vercel
3. Testez en local d'abord

### ❌ Page blanche après déploiement

**Cause** : Variables `VITE_*` manquantes

**Solution** :
- Toutes les variables commençant par `VITE_` doivent être dans Vercel
- Redéployez après avoir ajouté les variables
- Vercel ne rebuild pas automatiquement quand vous changez les variables d'environnement

---

## 📊 Monitoring & Logs

### Voir les Logs

1. Dans Vercel → **Deployments**
2. Cliquez sur un déploiement
3. Allez dans **Function Logs**

### Analytics

Vercel fournit automatiquement :
- **Speed Insights** : Performance de votre site
- **Web Analytics** : Trafic et utilisateurs

Activez-les dans **Settings** → **Analytics**

---

## 🔒 Sécurité & Bonnes Pratiques

### ✅ Checklist de Sécurité

- [ ] `JWT_SECRET` est unique et aléatoire (32+ caractères)
- [ ] `DATABASE_URL` contient un mot de passe fort
- [ ] Toutes les variables sensibles sont dans Vercel (pas dans le code)
- [ ] `.env.local` est dans `.gitignore`
- [ ] HTTPS est activé (automatique avec Vercel)
- [ ] CORS est correctement configuré
- [ ] Backups de la base de données sont configurés

### 🔐 Rotation des Secrets

Changez régulièrement :
1. `JWT_SECRET` (invalide les sessions)
2. Clés API Manus
3. Mot de passe de la base de données

---

## 🎉 Félicitations !

Votre application AgentiOrg est maintenant déployée sur Vercel !

### 🔗 Ressources Utiles

- [Documentation Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Support Vercel](https://vercel.com/support)
- [AgentiOrg GitHub](https://github.com/Jaokimben/AgentiOrg)

### 📧 Support

Pour toute question :
- **GitHub Issues** : [github.com/Jaokimben/AgentiOrg/issues](https://github.com/Jaokimben/AgentiOrg/issues)
- **Email** : support@agentiorg.dev

---

**Bon déploiement ! 🚀**
