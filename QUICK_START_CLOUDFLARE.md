# ⚡ Démarrage Rapide - Cloudflare Pages (10 minutes)

## 🎯 Ce Qu'il Vous Faut

- ✅ Repository GitHub : `github.com/Jaokimben/AgentiOrg` (déjà prêt)
- ✅ Compte Cloudflare (gratuit)
- ✅ Base de données MySQL (PlanetScale gratuit)
- ✅ Credentials Manus OAuth

---

## 🚀 Déploiement en 5 Étapes

### 1️⃣ Créer Compte Cloudflare (2 min)

1. Allez sur [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2️⃣ Créer Base de Données PlanetScale (3 min)

1. Allez sur [planetscale.com](https://planetscale.com)
2. Créez un compte gratuit
3. Créez une database : **"agentiorg"**
4. Copiez la `DATABASE_URL`

**Format** :
```
mysql://xxx:pscale_pw_xxx@aws.connect.psdb.cloud/agentiorg?ssl={"rejectUnauthorized":true}
```

### 3️⃣ Générer JWT Secret (30 secondes)

```bash
# Méthode 1 : OpenSSL
openssl rand -base64 32

# Méthode 2 : Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Méthode 3 : Site web
# https://generate-secret.vercel.app/32
```

Copiez le résultat, vous en aurez besoin.

### 4️⃣ Déployer sur Cloudflare (3 min)

1. Allez dans **Cloudflare Dashboard** → **Workers & Pages**
2. Cliquez sur **"Create application"** → **"Pages"**
3. Cliquez sur **"Connect to Git"**
4. Autorisez GitHub et sélectionnez **`Jaokimben/AgentiOrg`**
5. Configuration du build :
   ```
   Build command: pnpm build
   Build output directory: dist/public
   ```
6. Cliquez sur **"Environment variables"** et ajoutez :

```env
DATABASE_URL = [coller votre URL PlanetScale]
JWT_SECRET = [coller votre secret généré]
VITE_APP_ID = [votre Manus app ID]
OAUTH_SERVER_URL = https://api.manus.im
VITE_OAUTH_PORTAL_URL = https://auth.manus.im
BUILT_IN_FORGE_API_URL = https://api.manus.im
BUILT_IN_FORGE_API_KEY = [votre clé backend]
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = [votre clé frontend]
OWNER_OPEN_ID = [votre open ID]
OWNER_NAME = [votre nom]
```

7. Cliquez sur **"Save and Deploy"**

### 5️⃣ Initialiser la Base de Données (2 min)

Une fois déployé :

```bash
# En local, avec votre DATABASE_URL de production
DATABASE_URL="mysql://..." npx pnpm@10.4.1 db:push
```

---

## ✅ C'est Terminé !

Votre app est maintenant en ligne sur :
```
https://agentiorg.pages.dev
```

---

## 🔗 Prochaines Étapes

### Ajouter un Domaine Personnalisé

1. Dans Cloudflare Pages → **"Custom domains"**
2. Ajoutez votre domaine : `agentiorg.com`
3. Suivez les instructions DNS
4. SSL automatique ✅

### Voir les Logs

1. Dans votre projet Pages
2. Onglet **"Deployments"**
3. Cliquez sur un déploiement
4. Consultez les logs de build

### Redéployer

**Automatique** : Chaque push sur `main` redéploie automatiquement

**Manuel** :
1. Dashboard → votre projet
2. **"Deployments"**
3. Cliquez sur **"Retry deployment"**

---

## 🆘 Problèmes Courants

### ❌ Build Failed

```bash
# Testez localement
npx pnpm@10.4.1 install
npx pnpm@10.4.1 build
```

### ❌ Variables manquantes

- Assurez-vous que **toutes** les variables sont définies
- Vérifiez qu'elles sont pour l'environnement **Production**
- Redéployez après avoir ajouté des variables

### ❌ Page blanche

- Ouvrez la console navigateur (F12)
- Vérifiez les erreurs
- Assurez-vous que toutes les variables `VITE_*` sont définies

---

## 💰 Coût

**GRATUIT À 100% ! 🎉**

- Builds illimités
- Bande passante illimitée
- Requêtes illimitées
- SSL inclus
- CDN global

---

## 📖 Documentation Complète

Pour plus de détails, voir :
- **Guide complet** : [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md)
- **Variables env** : [.env.example](./.env.example)

---

## 🎊 Félicitations !

Votre application AgentiOrg est maintenant **déployée gratuitement** sur Cloudflare Pages avec :

✅ CDN global (300+ villes)
✅ SSL automatique
✅ Déploiement automatique depuis GitHub
✅ Performances ultra-rapides
✅ 100% gratuit

**Profitez-en ! 🚀**
