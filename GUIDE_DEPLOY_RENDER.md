# 🚀 Guide Déploiement Render - AgentiOrg

## Option 1 : Static Site (Frontend React uniquement) - GRATUIT ⭐

**Temps estimé** : 10-15 minutes

---

### Étape 1️⃣ : Créer un compte Render (2 min)

1. Allez sur : **https://render.com/signup**
2. Cliquez sur **"Sign up with GitHub"**
3. Autorisez Render à accéder à votre compte GitHub
4. Confirmez votre email

---

### Étape 2️⃣ : Créer un nouveau Static Site (3 min)

1. Dans le Dashboard Render, cliquez sur **"New +"** (en haut à droite)
2. Sélectionnez **"Static Site"**
3. Connectez votre dépôt GitHub :
   - Cliquez sur **"Connect a repository"**
   - Recherchez et sélectionnez : **`Jaokimben/AgentiOrg`**
   - Cliquez sur **"Connect"**

---

### Étape 3️⃣ : Configurer le Static Site (5 min)

Remplissez les champs EXACTEMENT comme suit :

| Champ | Valeur | ⚠️ Important |
|-------|--------|--------------|
| **Name** | `agentiorg` | Peut être différent |
| **Branch** | `main` | ✅ EXACT |
| **Root Directory** | (laisser vide) | ✅ Vide |
| **Build Command** | `pnpm install && pnpm run pages:build` | ✅ EXACT |
| **Publish Directory** | `dist/public` | ✅ EXACT (pas "dist" !) |

**💡 Note** : Le fichier `render.yaml` dans votre dépôt peut pré-remplir ces valeurs automatiquement.

---

### Étape 4️⃣ : Ajouter les variables d'environnement (5 min)

1. Descendez jusqu'à la section **"Environment Variables"**
2. Cliquez sur **"Add Environment Variable"** pour chaque variable ci-dessous

**Variables OBLIGATOIRES** :

| Variable | Valeur | Type |
|----------|--------|------|
| `NODE_VERSION` | `20` | Plain Text |
| `DATABASE_URL` | Votre URL PlanetScale/TiDB | Secret |
| `JWT_SECRET` | Votre secret JWT (32+ caractères) | Secret |
| `VITE_APP_ID` | ID application Manus | Plain Text |
| `OAUTH_SERVER_URL` | `https://api.manus.im` | Plain Text |
| `VITE_OAUTH_PORTAL_URL` | `https://auth.manus.im` | Plain Text |
| `BUILT_IN_FORGE_API_URL` | URL API backend | Plain Text |
| `BUILT_IN_FORGE_API_KEY` | Clé API backend | Secret |
| `VITE_FRONTEND_FORGE_API_URL` | URL API frontend | Plain Text |
| `VITE_FRONTEND_FORGE_API_KEY` | Clé API frontend | Secret |
| `OWNER_OPEN_ID` | Votre Open ID | Plain Text |
| `OWNER_NAME` | Votre nom | Plain Text |

**Variables OPTIONNELLES** (analytics) :
- `VITE_ANALYTICS_ENDPOINT` : URL Umami (Plain Text)
- `VITE_ANALYTICS_WEBSITE_ID` : ID site Umami (Plain Text)

**💡 Astuce** : 
- **Secret** = Variable cachée dans l'interface (pour les clés API, DATABASE_URL)
- **Plain Text** = Variable visible

---

### Étape 5️⃣ : Options avancées (optionnel)

Descendez jusqu'à **"Advanced"** et vérifiez :

| Option | Valeur recommandée |
|--------|-------------------|
| **Auto-Deploy** | ✅ Yes (déploiement auto sur push main) |
| **Pull Request Previews** | ✅ Yes (preview pour les PRs) |

---

### Étape 6️⃣ : Créer le Static Site (2 min)

1. Vérifiez que toutes les variables sont ajoutées
2. Cliquez sur **"Create Static Site"** (bouton bleu en bas)
3. ⏳ Attendez que le déploiement commence

---

### Étape 7️⃣ : Surveiller le build (3-5 min)

1. Vous serez redirigé vers la page de déploiement
2. Cliquez sur **"Logs"** pour voir le build en temps réel
3. ✅ Attendez le message : **"Your site is live at https://agentiorg.onrender.com"**

**Ce que vous devriez voir dans les logs** :
```
==> Cloning from https://github.com/Jaokimben/AgentiOrg...
==> Checking out commit 6ae3ab2...
==> Running build command 'pnpm install && pnpm run pages:build'...
==> Installing dependencies...
Packages: +752
==> Building...
vite v7.1.9 building for production...
✓ 1780 modules transformed.
✓ built in 4.XXs
==> Build complete!
==> Deploying...
==> Your site is live at https://agentiorg.onrender.com
```

---

### Étape 8️⃣ : Initialiser la base de données (2 min)

Une fois le déploiement réussi, exécutez en local :

```bash
# Avec votre DATABASE_URL de PlanetScale/TiDB
DATABASE_URL="mysql://user:pass@host/db" npx pnpm db:push
```

Cela créera les tables nécessaires dans votre base de données.

---

### Étape 9️⃣ : Tester le site (2 min)

1. Ouvrez l'URL : **https://agentiorg.onrender.com** (ou votre nom personnalisé)
2. Vérifiez que le site se charge
3. Testez la connexion OAuth
4. Testez l'outil d'évaluation

---

## 📊 Résultat attendu

- ✅ Site en ligne : `https://agentiorg.onrender.com`
- ✅ CDN mondial
- ✅ HTTPS automatique
- ✅ Déploiement automatique sur chaque push `main`
- ✅ 100 GB/mois de bande passante
- ✅ 100% GRATUIT

---

## 🔧 Personnaliser le nom de domaine (optionnel)

Par défaut, Render génère : `agentiorg.onrender.com`

Pour personnaliser :
1. Dashboard → Votre site → **"Settings"**
2. Sous **"Custom Domain"**, ajoutez votre domaine
3. OU renommez le sous-domaine Render dans **"Name"**

---

## 🆘 Résolution des erreurs courantes

### Erreur : "Build failed"

**Cause** : Variables d'environnement manquantes ou build command incorrecte

**Solution** :
1. Vérifier les logs : Dashboard → Votre site → Events → [dernier deploy] → Logs
2. Vérifier que toutes les 12 variables sont présentes : Settings → Environment
3. Vérifier Build Command : `pnpm install && pnpm run pages:build`
4. Vérifier Publish Directory : `dist/public`
5. Cliquer sur **"Manual Deploy"** → **"Clear build cache & deploy"**

---

### Erreur : "Page blanche après déploiement"

**Cause** : Base de données non initialisée ou variables `VITE_*` manquantes

**Solution** :
1. Initialiser la base de données : `DATABASE_URL="..." npx pnpm db:push`
2. Vérifier que toutes les variables `VITE_*` sont définies
3. Ouvrir la console du navigateur (F12) pour voir les erreurs
4. Vérifier Settings → Environment → Toutes les variables sont présentes

---

### Erreur : "OAuth ne fonctionne pas"

**Cause** : Domaine Render non autorisé dans Manus OAuth

**Solution** :
1. Aller dans votre console Manus OAuth
2. Ajouter `https://agentiorg.onrender.com` aux domaines autorisés
3. Vérifier `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`
4. Redéployer si besoin : Manual Deploy → Deploy latest commit

---

### Avertissement : "Some chunks are larger than 500 kB"

**C'est normal** : Avertissement Vite sur la taille des chunks.

**Pas d'action nécessaire** : Le site fonctionnera correctement.

---

## 🔄 Déploiements automatiques

Une fois configuré, chaque push sur `main` déclenchera automatiquement un nouveau déploiement :

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render détectera le push et déploiera automatiquement. Vous recevrez un email de confirmation.

---

## 📈 Monitoring et logs

### Voir les logs en temps réel

1. Dashboard → Votre site
2. Cliquez sur **"Logs"** (onglet)
3. Logs en streaming en temps réel

### Voir l'historique des déploiements

1. Dashboard → Votre site
2. Cliquez sur **"Events"** (onglet)
3. Liste de tous les déploiements avec statut

### Métriques

Render affiche automatiquement :
- ✅ Temps de build
- ✅ Taille du site
- ✅ Bande passante utilisée
- ✅ Requêtes par mois

---

## 💡 Avantages du Static Site Render

| Avantage | Description |
|----------|-------------|
| **Gratuit à 100%** | Pas de carte de crédit requise |
| **100 GB/mois** | Bande passante incluse |
| **CDN mondial** | Déploiement instantané |
| **HTTPS auto** | Certificat SSL gratuit |
| **Git auto-deploy** | Déploiement sur chaque push |
| **Pull Request Previews** | Tester avant merge |
| **Cache CDN** | Performance optimale |
| **DDoS protection** | Sécurité incluse |

---

## 🚀 Option 2 : Web Service (Full-Stack) - GRATUIT avec limitations

Si vous voulez déployer **Frontend + Backend Express** ensemble :

### Différences avec Static Site

| Critère | Static Site | Web Service |
|---------|-------------|-------------|
| **Usage** | Frontend uniquement | Frontend + Backend |
| **Sleeping** | ❌ Jamais | ✅ Après 15 min inactivité |
| **Cold start** | ❌ Aucun | ⚠️ ~30s après sleep |
| **Build time** | ✅ ~5 min | ✅ ~5 min |
| **Prix** | ✅ Gratuit | ✅ Gratuit (750h/mois) |

### Configuration Web Service

Si vous choisissez Web Service :

1. **New +** → **"Web Service"**
2. Connecter `Jaokimben/AgentiOrg`
3. Configuration :
   ```
   Name: agentiorg
   Environment: Node
   Build Command: pnpm install && pnpm build
   Start Command: pnpm start
   ```
4. Ajouter toutes les variables (mêmes que Static Site)
5. **Plan** : Sélectionner **"Free"** (750 heures/mois)

**⚠️ Note** : Le backend **dormira après 15 min** d'inactivité (plan gratuit). Pour un service toujours actif, il faudrait un plan payant ($7/mois).

---

## 📋 Checklist de déploiement

- [ ] Compte Render créé
- [ ] Base de données PlanetScale/TiDB créée
- [ ] `DATABASE_URL` obtenue
- [ ] `JWT_SECRET` généré (`openssl rand -base64 32`)
- [ ] Credentials Manus OAuth obtenus
- [ ] Nouveau Static Site créé sur Render
- [ ] Dépôt `Jaokimben/AgentiOrg` connecté
- [ ] Build command : `pnpm install && pnpm run pages:build`
- [ ] Publish directory : `dist/public`
- [ ] 12 variables d'environnement ajoutées
- [ ] Static Site créé
- [ ] Build réussi (vérifier les logs)
- [ ] Site accessible : `https://agentiorg.onrender.com`
- [ ] Base de données initialisée (`db:push`)
- [ ] Tests fonctionnels (connexion, évaluation)

---

## ✅ Temps total estimé : 15-20 minutes

- ⏱️ Créer compte : 2 min
- ⏱️ Créer Static Site : 3 min
- ⏱️ Configurer : 5 min
- ⏱️ Attendre build : 5 min
- ⏱️ Initialiser DB : 2 min
- ⏱️ Tester : 2 min

**Total** : ~20 minutes pour un site en production !

---

## 🎉 Félicitations !

Votre site AgentiOrg est maintenant déployé sur Render avec :
- ✅ CDN mondial
- ✅ HTTPS automatique
- ✅ Déploiements automatiques
- ✅ 100 GB/mois de bande passante
- ✅ 100% GRATUIT

**URL du site** : https://agentiorg.onrender.com

**Bon déploiement ! 🚀**
