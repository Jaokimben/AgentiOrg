# 🚀 COMMENCEZ ICI - Déploiement Rapide

## ⚡ Déploiement en 3 Étapes (10 minutes)

### 📋 Ce dont vous avez besoin

1. ✅ Un compte GitHub (vous l'avez ✓)
2. ⬜ Un compte Vercel (gratuit)
3. ⬜ Une base de données MySQL (gratuit avec PlanetScale)
4. ⬜ Credentials Manus OAuth

---

## 🎯 ÉTAPE 1 : Créer la Base de Données (2 minutes)

### PlanetScale (Recommandé - 100% Gratuit)

1. **Aller sur [planetscale.com](https://planetscale.com)**
2. **Cliquez sur "Get Started"** → Se connecter avec GitHub
3. **Créer une database** :
   - Nom : `agentiorg`
   - Région : `EU West` (ou proche de vous)
   - Plan : `Hobby` (gratuit)
4. **Récupérer la connection string** :
   - Allez dans "Connect"
   - Sélectionnez "Prisma" ou "General"
   - **Copiez la DATABASE_URL** → Vous en aurez besoin !
   
   Format : `mysql://user:password@host/database?sslaccept=strict`

✅ **DATABASE_URL obtenu !**

---

## 🔐 ÉTAPE 2 : Générer JWT Secret (30 secondes)

Ouvrez un terminal et exécutez :

```bash
openssl rand -base64 32
```

**Copiez le résultat** (exemple : `K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=`)

✅ **JWT_SECRET obtenu !**

---

## 🔑 ÉTAPE 3 : Obtenir Credentials Manus (3 minutes)

1. **Aller sur [manus.im](https://manus.im)**
2. **Créer/Configurer votre application OAuth**
3. **Récupérer ces informations** :
   - `VITE_APP_ID` (App ID)
   - `BUILT_IN_FORGE_API_KEY` (Backend API Key)
   - `VITE_FRONTEND_FORGE_API_KEY` (Frontend API Key)
   - `OWNER_OPEN_ID` (Your Open ID)

✅ **Credentials Manus obtenus !**

---

## 🌐 ÉTAPE 4 : Déployer sur Vercel (5 minutes)

### Méthode Simple (Interface Web)

1. **Aller sur [vercel.com](https://vercel.com)**
   
2. **Se connecter avec GitHub**
   
3. **Cliquer sur "Add New..." → "Project"**
   
4. **Importer le repository** :
   - Chercher `AgentiOrg`
   - Cliquer sur "Import"

5. **Ajouter les Variables d'Environnement** :
   
   Cliquez sur "Environment Variables" et ajoutez :

   ```env
   DATABASE_URL=mysql://... (votre URL de l'étape 1)
   JWT_SECRET=K7gNU3sdo+OL0... (votre secret de l'étape 2)
   VITE_APP_ID=votre-app-id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://auth.manus.im
   BUILT_IN_FORGE_API_URL=https://api.manus.im
   BUILT_IN_FORGE_API_KEY=votre-backend-key
   VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
   VITE_FRONTEND_FORGE_API_KEY=votre-frontend-key
   OWNER_OPEN_ID=votre-open-id
   OWNER_NAME=Votre Nom
   ```

   **Pour chaque variable** : Cochez Production, Preview, Development

6. **Cliquer sur "Deploy"** 🚀
   
7. **Attendre 2-3 minutes** ⏳

✅ **Application déployée !**

---

## 🎉 C'est Fait !

Votre application est maintenant en ligne sur `https://votre-projet.vercel.app`

### 📝 Dernière étape : Initialiser la Base de Données

```bash
# Depuis votre terminal local
DATABASE_URL="votre-url-planetscale" npx pnpm@10.4.1 db:push
```

---

## 📚 Guides Détaillés Disponibles

| Fichier | Utilisation |
|---------|-------------|
| **`DEPLOY_NOW.md`** | 📖 Guide complet avec toutes les options |
| **`QUICK_START_VERCEL.md`** | ⚡ Guide rapide 5 minutes |
| **`VERCEL_DEPLOY.md`** | 📚 Documentation détaillée |

---

## 🆘 Problèmes ?

### ❌ Build échoué
```bash
# Tester localement
cd /home/user/webapp
npx pnpm@10.4.1 build
```

### ❌ Database connection failed
- Vérifiez `DATABASE_URL`
- Testez la connexion depuis votre terminal
- Assurez-vous que PlanetScale autorise les connexions

### ❌ Page blanche
- Vérifiez que TOUTES les variables `VITE_*` sont définies
- Redéployez : Vercel Dashboard → Deployments → ... → Redeploy

---

## 🔗 Liens Utiles

- 🌐 **Vercel Dashboard** : [vercel.com/dashboard](https://vercel.com/dashboard)
- 💾 **PlanetScale** : [planetscale.com](https://planetscale.com)
- 🔐 **Manus** : [manus.im](https://manus.im)
- 📦 **GitHub Repo** : [github.com/Jaokimben/AgentiOrg](https://github.com/Jaokimben/AgentiOrg)

---

## ⚡ Alternative : Déploiement via CLI

Si vous préférez la ligne de commande :

```bash
# 1. Se positionner dans le projet
cd /home/user/webapp

# 2. Déployer (authentification automatique)
npx pnpm@10.4.1 deploy
# ou
bash scripts/deploy-to-vercel.sh --prod
```

Le script vous guidera pas à pas !

---

**Temps total estimé : 10 minutes** ⏱️

**Bon déploiement ! 🚀**
