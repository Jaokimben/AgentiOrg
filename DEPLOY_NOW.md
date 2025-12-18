# 🚀 Déployer Maintenant sur Vercel

## ⚡ Méthode 1 : Interface Web Vercel (La Plus Simple - 5 minutes)

### Étapes Rapides

#### 1. Créer un compte Vercel
- Allez sur **[vercel.com/signup](https://vercel.com/signup)**
- Cliquez sur **"Continue with GitHub"**
- Autorisez Vercel à accéder à votre compte GitHub

#### 2. Importer le Projet
- Une fois connecté, cliquez sur **"Add New..."** → **"Project"**
- Cherchez le repository **`AgentiOrg`**
- Cliquez sur **"Import"**

#### 3. Configurer le Projet
Vercel détectera automatiquement la configuration depuis `vercel.json`.

**Vérifiez ces paramètres** :
- ✅ Framework Preset : `Vite` ou `Other`
- ✅ Build Command : `pnpm build`
- ✅ Output Directory : `dist`
- ✅ Install Command : `pnpm install`

#### 4. Ajouter les Variables d'Environnement

**⚠️ IMPORTANT : Vous devez ajouter TOUTES ces variables avant de déployer**

Cliquez sur **"Environment Variables"** et ajoutez :

```env
# Base de données (OBLIGATOIRE)
DATABASE_URL=mysql://user:password@host:3306/database

# Sécurité (OBLIGATOIRE)
JWT_SECRET=votre-secret-aleatoire-32-caracteres-minimum

# Manus OAuth Backend (OBLIGATOIRE)
OAUTH_SERVER_URL=https://api.manus.im
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=votre-cle-api-backend

# Manus OAuth Frontend (OBLIGATOIRE)
VITE_APP_ID=votre-app-id-manus
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=votre-cle-api-frontend

# Owner Info (OBLIGATOIRE)
OWNER_OPEN_ID=votre-open-id
OWNER_NAME=Votre Nom ou Organisation

# Application (OPTIONNEL)
VITE_APP_TITLE=AgentiOrg
VITE_APP_LOGO=https://votre-domaine.com/logo.png

# Analytics (OPTIONNEL)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=votre-website-id
```

**💡 Astuce** : Pour chaque variable, cochez les trois environnements :
- ✅ Production
- ✅ Preview
- ✅ Development

#### 5. Déployer !
- Cliquez sur **"Deploy"**
- Attendez 2-3 minutes ⏳
- Votre site sera disponible sur `votre-projet.vercel.app` 🎉

---

## 🖥️ Méthode 2 : Ligne de Commande (CLI)

### Prérequis
Vous devez avoir un token d'authentification Vercel.

### Étapes

#### 1. Authentification Interactive

```bash
# Lancer l'authentification
npx vercel login
```

Cela ouvrira votre navigateur pour vous authentifier.

#### 2. Configuration du Projet

```bash
cd /home/user/webapp

# Premier déploiement (preview)
npx vercel
```

Vercel vous posera quelques questions :
- **Set up and deploy?** → `Y` (Yes)
- **Which scope?** → Sélectionnez votre compte/équipe
- **Link to existing project?** → `N` (No, créer un nouveau)
- **What's your project's name?** → `agentiorg` (ou autre nom)
- **In which directory is your code located?** → `./` (Enter)

#### 3. Ajouter les Variables d'Environnement

**Option A : Via l'interface Vercel** (recommandé)
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `agentiorg`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez toutes les variables (voir liste ci-dessus)

**Option B : Via CLI** (pour chaque variable)
```bash
npx vercel env add DATABASE_URL production
npx vercel env add JWT_SECRET production
npx vercel env add VITE_APP_ID production
# ... répétez pour toutes les variables
```

#### 4. Déployer en Production

```bash
# Après avoir ajouté les variables d'environnement
npx vercel --prod
```

---

## 🗄️ Étape Préliminaire : Créer la Base de Données

### Option A : PlanetScale (Recommandé - Gratuit)

1. **Créer un compte**
   - Allez sur [planetscale.com](https://planetscale.com)
   - Cliquez sur **"Get Started"**
   - Connectez-vous avec GitHub

2. **Créer une Database**
   - Cliquez sur **"New database"**
   - Nom : `agentiorg-prod`
   - Région : Choisissez la plus proche (ex: `EU West`)
   - Plan : **"Hobby"** (gratuit)
   - Cliquez sur **"Create database"**

3. **Obtenir la Connection String**
   - Une fois créée, allez dans **"Connect"**
   - Sélectionnez **"Prisma"** ou **"General"**
   - Copiez la `DATABASE_URL`
   - Format : `mysql://user:password@host/database?sslaccept=strict`

4. **Initialiser les Tables** (après le premier déploiement)
   ```bash
   DATABASE_URL="votre-url-planetscale" npx pnpm@10.4.1 db:push
   ```

### Option B : TiDB Cloud (Gratuit)

1. Allez sur [tidbcloud.com](https://tidbcloud.com)
2. Créez un compte
3. Créez un cluster **"Serverless Tier"** (gratuit)
4. Obtenez la connection string
5. Utilisez-la comme `DATABASE_URL`

---

## 🔐 Générer JWT_SECRET Sécurisé

Vous DEVEZ générer un secret aléatoire unique :

```bash
# Méthode 1 : OpenSSL (recommandé)
openssl rand -base64 32

# Méthode 2 : Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Méthode 3 : En ligne
# Visitez : https://generate-secret.vercel.app/32
```

**Exemple de résultat** : `K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=`

Utilisez ce résultat comme valeur de `JWT_SECRET`.

---

## 🔑 Obtenir les Credentials Manus OAuth

1. **Créer une Application Manus**
   - Allez sur [manus.im](https://manus.im)
   - Accédez à votre dashboard
   - Créez une nouvelle application OAuth

2. **Configurer l'Application**
   - Nom : `AgentiOrg`
   - Redirect URL : `https://votre-projet.vercel.app/api/oauth/callback`
   - Scopes : Sélectionnez les permissions nécessaires

3. **Récupérer les Credentials**
   - **App ID** → `VITE_APP_ID`
   - **Backend API Key** → `BUILT_IN_FORGE_API_KEY`
   - **Frontend API Key** → `VITE_FRONTEND_FORGE_API_KEY`
   - **Your Open ID** → `OWNER_OPEN_ID`

---

## ✅ Checklist Avant Déploiement

Cochez chaque étape :

- [ ] **Base de données créée** (PlanetScale/TiDB)
- [ ] **DATABASE_URL** obtenu et testé
- [ ] **JWT_SECRET** généré (32+ caractères)
- [ ] **Application Manus OAuth créée**
- [ ] **VITE_APP_ID** obtenu
- [ ] **Clés API Manus** obtenues (backend et frontend)
- [ ] **OWNER_OPEN_ID** et **OWNER_NAME** définis
- [ ] Compte Vercel créé
- [ ] Repository GitHub accessible
- [ ] **Toutes les variables d'environnement** prêtes

---

## 🚀 Ordre Recommandé

1. **Créer la base de données** → Obtenir `DATABASE_URL`
2. **Générer JWT_SECRET** → Noter le secret
3. **Configurer Manus OAuth** → Obtenir les clés
4. **Aller sur Vercel** → Importer le projet
5. **Ajouter TOUTES les variables** → Copier-coller
6. **Cliquer sur Deploy** → Attendre 2-3 min
7. **Initialiser la DB** → Exécuter `pnpm db:push`
8. **Tester l'application** → Visiter l'URL Vercel

---

## 🆘 Dépannage Rapide

### ❌ "Build failed"
```bash
# Testez en local d'abord
cd /home/user/webapp
npx pnpm@10.4.1 install
npx pnpm@10.4.1 build
```

### ❌ "Database connection failed"
- Vérifiez que `DATABASE_URL` est correct
- Testez la connexion depuis votre terminal
- Assurez-vous que la DB accepte les connexions externes

### ❌ "OAuth authentication failed"
- Vérifiez `VITE_APP_ID` et les clés API
- Assurez-vous que l'URL Vercel est dans les redirects autorisés
- Vérifiez que toutes les variables `VITE_*` sont définies

### ❌ Page blanche après déploiement
- Les variables `VITE_*` ne sont utilisées qu'au moment du build
- Vous devez **redéployer** après avoir ajouté des variables `VITE_*`
- Dans Vercel : **Deployments** → **...** → **Redeploy**

---

## 📞 Besoin d'Aide ?

- 📖 **Guide détaillé** : Voir `VERCEL_DEPLOY.md`
- 💬 **Support Vercel** : [vercel.com/support](https://vercel.com/support)
- 🐛 **Issues GitHub** : [github.com/Jaokimben/AgentiOrg/issues](https://github.com/Jaokimben/AgentiOrg/issues)

---

## 🎯 Résumé Ultra-Rapide

```bash
# 1. Créer DB sur PlanetScale → Copier DATABASE_URL
# 2. Générer secret
openssl rand -base64 32  # → Copier comme JWT_SECRET

# 3. Aller sur vercel.com
# 4. Importer github.com/Jaokimben/AgentiOrg
# 5. Ajouter TOUTES les variables d'environnement
# 6. Cliquer sur "Deploy"
# 7. Attendre 2-3 minutes
# 8. Visiter votre-projet.vercel.app 🎉
```

---

**Bon déploiement ! 🚀**

*Temps estimé : 5-10 minutes avec la méthode interface web*
