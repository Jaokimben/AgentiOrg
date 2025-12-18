# 🚀 Déploiement Rapide sur Vercel

## ⚡ Démarrage Ultra-Rapide (5 minutes)

### 1️⃣ Préparer la Base de Données

**Option Recommandée : PlanetScale (Gratuit)**

```bash
# 1. Créez un compte sur https://planetscale.com
# 2. Créez une database "agentiorg"
# 3. Copiez la DATABASE_URL
```

### 2️⃣ Déployer sur Vercel

**Méthode 1 : Interface Web (Plus Simple)**

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repo GitHub
4. Ajoutez les variables d'environnement (voir ci-dessous)
5. Cliquez sur "Deploy"

**Méthode 2 : CLI Vercel**

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Vérifier que tout est OK
pnpm vercel:check

# Déployer en preview
pnpm vercel:preview

# Déployer en production
pnpm vercel:deploy
```

### 3️⃣ Variables d'Environnement Minimales

Ajoutez ces variables dans Vercel (Settings → Environment Variables) :

```env
# Base de données (OBLIGATOIRE)
DATABASE_URL=mysql://user:password@host:3306/database

# Sécurité (OBLIGATOIRE)
JWT_SECRET=générez-un-secret-aléatoire-32-caractères

# Manus OAuth (OBLIGATOIRE)
VITE_APP_ID=votre-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=votre-backend-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=votre-frontend-key

# Owner Info (OBLIGATOIRE)
OWNER_OPEN_ID=votre-open-id
OWNER_NAME=Votre Nom

# Application (OPTIONNEL)
VITE_APP_TITLE=AgentiOrg
VITE_APP_LOGO=https://votre-logo.png
```

### 4️⃣ Générer un JWT Secret Sécurisé

```bash
# Méthode rapide
openssl rand -base64 32

# Ou en Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 5️⃣ Initialiser la Base de Données

Après le premier déploiement :

```bash
# Option 1 : En local (avec DATABASE_URL de production)
DATABASE_URL="mysql://..." pnpm db:push

# Option 2 : Via Vercel CLI
vercel env pull .env.vercel
DATABASE_URL=$(grep DATABASE_URL .env.vercel | cut -d '=' -f2) pnpm db:push
```

---

## ✅ Checklist Rapide

Avant de déployer, vérifiez :

- [ ] Code pushé sur GitHub
- [ ] Base de données créée (PlanetScale, TiDB, etc.)
- [ ] `DATABASE_URL` obtenu
- [ ] `JWT_SECRET` généré (32+ caractères)
- [ ] Credentials Manus OAuth obtenus
- [ ] Variables d'environnement ajoutées dans Vercel

---

## 🔗 Liens Utiles

- **Guide Complet** : [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)
- **Vérification Pré-déploiement** : `pnpm vercel:check`
- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Support PlanetScale** : [docs.planetscale.com](https://docs.planetscale.com)

---

## 🆘 Problèmes Courants

### ❌ "Build failed"
```bash
# Testez le build en local
pnpm install
pnpm build

# Vérifiez les erreurs TypeScript
pnpm check
```

### ❌ "Database connection failed"
- Vérifiez que `DATABASE_URL` est correct
- Assurez-vous que la base de données est accessible
- Vérifiez les credentials et le nom de la database

### ❌ "OAuth authentication failed"
- Vérifiez `VITE_APP_ID` et les clés API Manus
- Assurez-vous que l'URL Vercel est autorisée dans votre app Manus

### ❌ Page blanche
- Vérifiez que toutes les variables `VITE_*` sont définies
- Redéployez après avoir ajouté les variables manquantes

---

## 📞 Besoin d'Aide ?

- **Documentation Complète** : Voir [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)
- **GitHub Issues** : [github.com/Jaokimben/AgentiOrg/issues](https://github.com/Jaokimben/AgentiOrg/issues)
- **Email Support** : support@agentiorg.dev

---

**Bon déploiement ! 🎉**
