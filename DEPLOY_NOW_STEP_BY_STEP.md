# 🚀 Déployer AgentiOrg sur Cloudflare Pages MAINTENANT

## ⚡ Méthode la Plus Rapide : Interface Web (5 minutes)

### Étape 1 : Ouvrir Cloudflare Dashboard
👉 **Allez sur** : https://dash.cloudflare.com

- Si pas de compte : Cliquez sur **"Sign Up"** (gratuit)
- Si déjà un compte : Cliquez sur **"Log In"**

### Étape 2 : Créer un Projet Pages
1. Dans le menu de gauche, cliquez sur **"Workers & Pages"**
2. Cliquez sur le bouton bleu **"Create application"**
3. Sélectionnez l'onglet **"Pages"**
4. Cliquez sur **"Connect to Git"**

### Étape 3 : Connecter GitHub
1. Cliquez sur **"Connect GitHub"**
2. Autorisez Cloudflare à accéder à GitHub
3. Sélectionnez **"Jaokimben/AgentiOrg"** dans la liste
4. Cliquez sur **"Begin setup"**

### Étape 4 : Configuration du Build

Cloudflare devrait détecter automatiquement, sinon entrez :

```
Project name: agentiorg
Production branch: main
Framework preset: None (or Vite)
Build command: pnpm build
Build output directory: dist/public
Root directory: /
```

**Important** : Assurez-vous que **Build output directory** est bien `dist/public`

### Étape 5 : Variables d'Environnement (IMPORTANT)

Cliquez sur **"Environment variables (advanced)"** et ajoutez **UNE PAR UNE** :

#### Variables Obligatoires

```plaintext
DATABASE_URL
Valeur: [Votre URL MySQL de PlanetScale ou TiDB]
Environnement: Production ✓

JWT_SECRET
Valeur: [Générer avec: openssl rand -base64 32]
Environnement: Production ✓

VITE_APP_ID
Valeur: [Votre Manus App ID]
Environnement: Production ✓

OAUTH_SERVER_URL
Valeur: https://api.manus.im
Environnement: Production ✓

VITE_OAUTH_PORTAL_URL
Valeur: https://auth.manus.im
Environnement: Production ✓

BUILT_IN_FORGE_API_URL
Valeur: https://api.manus.im
Environnement: Production ✓

BUILT_IN_FORGE_API_KEY
Valeur: [Votre clé API backend Manus]
Environnement: Production ✓

VITE_FRONTEND_FORGE_API_URL
Valeur: https://api.manus.im
Environnement: Production ✓

VITE_FRONTEND_FORGE_API_KEY
Valeur: [Votre clé API frontend Manus]
Environnement: Production ✓

OWNER_OPEN_ID
Valeur: [Votre Manus Open ID]
Environnement: Production ✓

OWNER_NAME
Valeur: [Votre nom]
Environnement: Production ✓
```

#### Variables Optionnelles (si vous les avez)

```plaintext
VITE_APP_TITLE
Valeur: AgentiOrg
Environnement: Production ✓

VITE_APP_LOGO
Valeur: [URL de votre logo]
Environnement: Production ✓

VITE_ANALYTICS_ENDPOINT
Valeur: [URL analytics]
Environnement: Production ✓

VITE_ANALYTICS_WEBSITE_ID
Valeur: [ID website]
Environnement: Production ✓

NODE_VERSION
Valeur: 20
Environnement: Production ✓
```

### Étape 6 : Déployer !

1. Vérifiez que toutes les variables obligatoires sont ajoutées
2. Cliquez sur le gros bouton bleu **"Save and Deploy"**
3. **Attendez 3-5 minutes** pendant que Cloudflare :
   - Clone le repository
   - Installe les dépendances (pnpm)
   - Build le projet (Vite)
   - Déploie sur le CDN global

### Étape 7 : Vérifier le Déploiement

Une fois terminé, vous verrez :
- ✅ **Status** : "Success"
- 🌐 **URL** : `https://agentiorg-xxx.pages.dev`

**Cliquez sur l'URL** pour voir votre site en ligne !

---

## 📋 Si Vous N'avez Pas les Prérequis

### 1. Base de Données (PlanetScale - Gratuit)

**Si vous n'avez pas encore de database** :

1. Allez sur https://planetscale.com
2. Créez un compte gratuit
3. Cliquez sur **"Create database"**
4. Nom : `agentiorg`
5. Région : Choisissez la plus proche
6. Plan : **"Hobby"** (gratuit)
7. Cliquez sur **"Create database"**
8. Allez dans **"Connect"** → Copiez la **Connection string**
9. Format : `mysql://user:pass@aws.connect.psdb.cloud/agentiorg?ssl={"rejectUnauthorized":true}`

**Temps** : 3 minutes

### 2. JWT Secret

**Générer un secret aléatoire** :

**Option A - En ligne** :
- Allez sur https://generate-secret.vercel.app/32
- Copiez le secret généré

**Option B - Terminal** :
```bash
openssl rand -base64 32
```

**Option C - Node.js** :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Temps** : 30 secondes

### 3. Credentials Manus OAuth

**Si vous n'avez pas encore vos credentials** :

1. Allez sur https://manus.im
2. Connectez-vous à votre compte
3. Allez dans **Paramètres** → **API** ou **Applications**
4. Créez une nouvelle application si nécessaire
5. Notez :
   - `VITE_APP_ID`
   - `BUILT_IN_FORGE_API_KEY` (backend)
   - `VITE_FRONTEND_FORGE_API_KEY` (frontend)
   - `OWNER_OPEN_ID`

**Temps** : 5 minutes

---

## ✅ Checklist Complète

Avant de cliquer sur "Save and Deploy", vérifiez :

- [ ] Compte Cloudflare créé
- [ ] Repository GitHub connecté
- [ ] Projet nommé : `agentiorg`
- [ ] Build command : `pnpm build`
- [ ] Output directory : `dist/public`
- [ ] ✅ `DATABASE_URL` ajoutée
- [ ] ✅ `JWT_SECRET` ajouté
- [ ] ✅ `VITE_APP_ID` ajouté
- [ ] ✅ `OAUTH_SERVER_URL` ajouté
- [ ] ✅ `VITE_OAUTH_PORTAL_URL` ajouté
- [ ] ✅ `BUILT_IN_FORGE_API_URL` ajouté
- [ ] ✅ `BUILT_IN_FORGE_API_KEY` ajouté
- [ ] ✅ `VITE_FRONTEND_FORGE_API_URL` ajouté
- [ ] ✅ `VITE_FRONTEND_FORGE_API_KEY` ajouté
- [ ] ✅ `OWNER_OPEN_ID` ajouté
- [ ] ✅ `OWNER_NAME` ajouté

---

## 🎉 Après le Déploiement

### Initialiser la Base de Données

Une fois que votre site est déployé, **initialisez la base de données** :

```bash
# Sur votre machine locale, avec votre DATABASE_URL de production
DATABASE_URL="mysql://..." pnpm db:push
```

Cela créera toutes les tables nécessaires.

### Tester votre Site

1. Allez sur l'URL fournie par Cloudflare
2. Testez la page d'accueil
3. Testez l'évaluation
4. Testez le formulaire de contact

---

## 🔧 Dépannage Rapide

### ❌ Build Failed

**Erreur** : "Build failed with exit code 1"

**Solution** :
1. Vérifiez les logs de build dans Cloudflare
2. Assurez-vous que toutes les variables `VITE_*` sont définies
3. Vérifiez que `NODE_VERSION=20` est ajouté

### ❌ Page Blanche

**Cause** : Variables d'environnement manquantes

**Solution** :
1. F12 → Console navigateur
2. Regardez les erreurs
3. Ajoutez les variables manquantes
4. Redéployez (Settings → Deployments → Retry)

### ❌ API Errors

**Cause** : Backend non déployé

**Note** : La configuration actuelle déploie uniquement le frontend React.
Le backend Express nécessite une configuration supplémentaire.

**Options** :
1. Adapter pour Cloudflare Workers (gratuit)
2. Déployer backend séparément (Render free tier)
3. Voir `CLOUDFLARE_DEPLOY.md` pour plus de détails

---

## 📞 Besoin d'Aide ?

- **Documentation** : Voir `CLOUDFLARE_DEPLOY.md`
- **Support Cloudflare** : https://community.cloudflare.com
- **GitHub Issues** : https://github.com/Jaokimben/AgentiOrg/issues

---

## 🎁 Bonus : Domaine Personnalisé

Une fois déployé, ajoutez votre propre domaine :

1. Dans Cloudflare Pages → votre projet
2. Cliquez sur **"Custom domains"**
3. Cliquez sur **"Set up a custom domain"**
4. Entrez : `agentiorg.com` (ou votre domaine)
5. Suivez les instructions DNS
6. SSL sera automatiquement configuré ✅

---

**Tout est prêt ! Suivez ces étapes et votre site sera en ligne en 10 minutes ! 🚀**
