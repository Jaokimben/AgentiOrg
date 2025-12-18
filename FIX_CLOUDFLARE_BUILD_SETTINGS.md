# 🔧 FIX URGENT : Corriger les Build Settings Cloudflare

## 🔴 Problème confirmé

Votre projet Cloudflare exécute automatiquement :
```
Executing user deploy command: npx wrangler deploy
```

**Cette commande est INCORRECTE pour Cloudflare Pages !**

Cloudflare Pages déploie automatiquement depuis `dist/public/` après le build.  
La commande `npx wrangler deploy` est uniquement pour **Workers**, pas **Pages**.

---

## ✅ SOLUTION : Supprimer la commande de déploiement

### Étape 1️⃣ : Aller dans les Settings du projet

1. Allez sur : https://dash.cloudflare.com
2. Cliquez sur **"Workers & Pages"** (menu gauche)
3. Trouvez et cliquez sur votre projet **"agentiorg"**
4. Cliquez sur **"Settings"** (en haut à droite)
5. Dans le menu gauche, cliquez sur **"Builds & deployments"**

---

### Étape 2️⃣ : Modifier la configuration de build

Vous devriez voir quelque chose comme :

```
Production branch: main

Build configuration:
  Build command:   pnpm run build
  Build output directory: dist/public
  
Build settings:
  Deploy command: npx wrangler deploy    ← À SUPPRIMER !
```

**⚠️ Le problème est le "Deploy command" !**

---

### Étape 3️⃣ : Corriger les valeurs (EXACTEMENT)

Cliquez sur **"Edit configuration"** ou **"Configure build"**, puis modifiez :

| Champ | Valeur EXACTE | ⚠️ Important |
|-------|---------------|--------------|
| **Framework preset** | `None` | ✅ Laisser sur None |
| **Build command** | `pnpm install && pnpm run pages:build` | ✅ EXACT |
| **Build output directory** | `dist/public` | ✅ EXACT (pas "dist" !) |
| **Root directory (path)** | (vide) | ✅ Laisser vide |

**🔥 CRUCIAL** : Cherchez s'il y a un champ **"Deploy command"** ou **"Post-build command"**.

Si vous voyez :
- `Deploy command: npx wrangler deploy`
- `Post-build: npx wrangler deploy`

**SUPPRIMEZ-LE** ou laissez-le **VIDE** !

---

### Étape 4️⃣ : Sauvegarder et redéployer

1. Cliquez sur **"Save"** ou **"Save and Deploy"**
2. Si la sauvegarde ne déclenche pas automatiquement un redéploiement :
   - Allez dans **"Deployments"** (onglet)
   - Cliquez sur **"Retry deployment"** sur le dernier déploiement échoué
   - OU cliquez sur **"Create deployment"** → Sélectionnez branch `main`

3. ⏳ Attendez 3-5 minutes
4. ✅ Vérifiez les logs : **NE DEVRAIT PLUS** voir `Executing user deploy command: npx wrangler deploy`

---

## 🎯 Ce que vous DEVRIEZ voir dans les logs

**AVANT (incorrect)** :
```
2025-12-18T21:32:47.665Z  Success: Build command completed
2025-12-18T21:32:47.802Z  Executing user deploy command: npx wrangler deploy    ← ERREUR
2025-12-18T21:33:07.883Z  ✘ [ERROR] Missing entry-point to Worker script
2025-12-18T21:33:08.080Z  Failed: error occurred while running deploy command
```

**APRÈS (correct)** :
```
2025-12-18T21:XX:XX.XXXZ  Success: Build command completed
2025-12-18T21:XX:XX.XXXZ  Validating asset output directory dist/public
2025-12-18T21:XX:XX.XXXZ  Deploying your site to Cloudflare's global network...
2025-12-18T21:XX:XX.XXXZ  Success: Uploaded 3 files
2025-12-18T21:XX:XX.XXXZ  Success: Assets published!
2025-12-18T21:XX:XX.XXXZ  🎉 Deployment complete!
```

**Aucune mention de `wrangler deploy` !**

---

## 🔍 Alternative : Vérifier le type de projet

Si après avoir supprimé le "Deploy command", ça ne fonctionne toujours pas, **le projet est peut-être de type Worker**.

### Comment vérifier le type de projet :

1. Dashboard Cloudflare → Workers & Pages → Votre projet
2. Regardez l'URL du projet :
   - **Pages** : `https://dash.cloudflare.com/.../pages/view/agentiorg`
   - **Worker** : `https://dash.cloudflare.com/.../workers/view/agentiorg`

3. Regardez les onglets disponibles :
   - **Pages** : Deployments, Settings, Custom domains, Functions
   - **Worker** : Triggers, Settings, Resources, Observability

**Si c'est un Worker**, vous devez **SUPPRIMER** le projet et le **RECRÉER** comme **Pages** :

1. Settings → Scroll en bas → **"Delete"** ou **"Remove Worker"**
2. Créer nouveau projet → Onglet **"Pages"** (PAS Workers !)
3. Connect to Git → `Jaokimben/AgentiOrg`
4. Configurer comme indiqué ci-dessus

---

## 📝 Configuration correcte pour Pages

Voici la configuration **COMPLÈTE** qui devrait fonctionner :

### Build Configuration

```
Project name:              agentiorg
Production branch:         main
Framework preset:          None
Build command:             pnpm install && pnpm run pages:build
Build output directory:    dist/public
Root directory:            (empty)
Deploy command:            (empty) ← DOIT ÊTRE VIDE !
```

### Environment Variables (12 variables)

Toutes avec **"Production"** coché :

| Variable | Exemple |
|----------|---------|
| `NODE_VERSION` | `20` |
| `DATABASE_URL` | `mysql://user:pass@host/db` |
| `JWT_SECRET` | `xK3pL9mN8vQ2wR5tY7uI0oP...` |
| `VITE_APP_ID` | `app_xxx` |
| `OAUTH_SERVER_URL` | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | `https://auth.manus.im` |
| `BUILT_IN_FORGE_API_URL` | `https://api.manus.im` |
| `BUILT_IN_FORGE_API_KEY` | `key_xxx` |
| `VITE_FRONTEND_FORGE_API_URL` | `https://api.manus.im` |
| `VITE_FRONTEND_FORGE_API_KEY` | `key_xxx` |
| `OWNER_OPEN_ID` | `openid_xxx` |
| `OWNER_NAME` | `Your Name` |

**Optionnelles** (analytics) :
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`

---

## 🆘 Si ça ne fonctionne toujours pas

### Option 1 : Supprimer et recréer le projet en mode Pages

**Pourquoi ?** Votre projet actuel est peut-être un **Worker** déguisé en Pages.

**Comment ?**
1. Supprimer projet actuel : Settings → Delete
2. Créer NOUVEAU projet : Workers & Pages → Create → **PAGES** (onglet)
3. Connecter GitHub : `Jaokimben/AgentiOrg`
4. Configurer correctement (voir ci-dessus)

**Temps** : 5 minutes

---

### Option 2 : Utiliser Netlify (recommandé si Cloudflare pose problème)

**Pourquoi ?** Netlify est **beaucoup plus simple** (pas de confusion Pages/Workers).

**Comment ?**
1. Créer compte : https://app.netlify.com/signup (avec GitHub)
2. New site from Git → GitHub → `Jaokimben/AgentiOrg`
3. Configurer :
   ```
   Build command:      pnpm install && pnpm run pages:build
   Publish directory:  dist/public
   ```
4. Ajouter variables d'environnement (même liste)
5. Deploy

**Temps** : 10 minutes  
**Guide complet** : Voir `ALTERNATIVE_NETLIFY.md`

---

## ✅ Checklist de correction

- [ ] Aller dans Settings → Builds & deployments
- [ ] Vérifier "Deploy command" ou "Post-build command"
- [ ] **Supprimer** toute mention de `wrangler deploy`
- [ ] Vérifier Build command : `pnpm install && pnpm run pages:build`
- [ ] Vérifier Output directory : `dist/public`
- [ ] Vérifier Framework preset : `None`
- [ ] Sauvegarder la configuration
- [ ] Créer nouveau déploiement ou Retry
- [ ] Vérifier logs : **AUCUN** `npx wrangler deploy`
- [ ] Vérifier résultat : `Success: Assets published!`
- [ ] Tester site : `https://agentiorg.pages.dev`

---

## 📊 Récapitulatif

| Symptôme | Cause | Solution |
|----------|-------|----------|
| `Executing user deploy command: npx wrangler deploy` | Deploy command configuré | Supprimer/vider le champ |
| `Missing entry-point to Worker script` | Projet de type Worker | Recréer comme Pages |
| Build réussit mais déploiement échoue | Configuration incorrecte | Modifier Build Settings |

---

## 🎯 Action immédiate

1. **Aller sur** : https://dash.cloudflare.com
2. **Naviguer** : Workers & Pages → agentiorg → Settings → Builds & deployments
3. **Chercher** : "Deploy command" ou "Post-build command"
4. **Supprimer** : Toute mention de `wrangler deploy`
5. **Sauvegarder** et redéployer
6. **Vérifier** : Les logs ne doivent plus contenir `npx wrangler deploy`

**Temps estimé** : 5 minutes

---

**Si le problème persiste après cette correction, utilisez Netlify (voir `ALTERNATIVE_NETLIFY.md`).**

**Bonne chance ! 🚀**
