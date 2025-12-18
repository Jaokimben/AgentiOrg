#!/bin/bash

# Script de Déploiement Automatique sur Vercel
# Usage: ./scripts/deploy-to-vercel.sh [--prod]

set -e

echo "🚀 AgentiOrg - Déploiement sur Vercel"
echo "======================================"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Vérifier si Vercel est installé
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI n'est pas installé globalement${NC}"
    echo -e "${BLUE}ℹ️  Utilisation de npx vercel...${NC}"
    VERCEL_CMD="npx vercel"
else
    VERCEL_CMD="vercel"
fi

# Vérifier si l'authentification est nécessaire
echo -e "${BLUE}ℹ️  Vérification de l'authentification Vercel...${NC}"
if ! $VERCEL_CMD whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vous n'êtes pas authentifié sur Vercel${NC}"
    echo -e "${BLUE}ℹ️  Lancement de l'authentification...${NC}"
    echo ""
    $VERCEL_CMD login
    echo ""
fi

# Afficher l'utilisateur connecté
VERCEL_USER=$($VERCEL_CMD whoami 2>/dev/null || echo "Non connecté")
echo -e "${GREEN}✓${NC} Connecté en tant que: ${VERCEL_USER}"
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}✗${NC} Erreur: vercel.json non trouvé"
    echo -e "${RED}✗${NC} Assurez-vous d'être dans le répertoire du projet"
    exit 1
fi

# Exécuter les vérifications pré-déploiement
echo -e "${BLUE}ℹ️  Exécution des vérifications pré-déploiement...${NC}"
echo ""

if [ -f "scripts/pre-deploy-check.sh" ]; then
    # Exécuter seulement quelques vérifications essentielles
    echo "Vérification des fichiers essentiels..."
    
    REQUIRED_FILES=("package.json" "vercel.json" ".env.example" "tsconfig.json")
    ALL_OK=true
    
    for FILE in "${REQUIRED_FILES[@]}"; do
        if [ -f "$FILE" ]; then
            echo -e "${GREEN}✓${NC} $FILE présent"
        else
            echo -e "${RED}✗${NC} $FILE manquant"
            ALL_OK=false
        fi
    done
    
    if [ "$ALL_OK" = false ]; then
        echo -e "${RED}✗${NC} Certains fichiers essentiels sont manquants"
        exit 1
    fi
    
    echo ""
else
    echo -e "${YELLOW}⚠️  Script de vérification non trouvé, on continue...${NC}"
    echo ""
fi

# Vérifier les variables d'environnement
echo -e "${BLUE}ℹ️  Vérification des variables d'environnement...${NC}"
echo ""

echo -e "${YELLOW}⚠️  IMPORTANT: Assurez-vous d'avoir configuré ces variables dans Vercel:${NC}"
echo ""
echo "   • DATABASE_URL"
echo "   • JWT_SECRET"
echo "   • VITE_APP_ID"
echo "   • OAUTH_SERVER_URL"
echo "   • VITE_OAUTH_PORTAL_URL"
echo "   • BUILT_IN_FORGE_API_URL"
echo "   • BUILT_IN_FORGE_API_KEY"
echo "   • VITE_FRONTEND_FORGE_API_URL"
echo "   • VITE_FRONTEND_FORGE_API_KEY"
echo "   • OWNER_OPEN_ID"
echo "   • OWNER_NAME"
echo ""

read -p "Avez-vous configuré toutes les variables d'environnement dans Vercel? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}⚠️  Configuration des variables requise${NC}"
    echo ""
    echo "Pour configurer les variables:"
    echo "1. Allez sur https://vercel.com/dashboard"
    echo "2. Sélectionnez votre projet"
    echo "3. Allez dans Settings → Environment Variables"
    echo "4. Ajoutez toutes les variables listées ci-dessus"
    echo ""
    echo "Ou consultez: DEPLOY_NOW.md"
    exit 1
fi

echo ""

# Déterminer le type de déploiement
if [ "$1" = "--prod" ] || [ "$1" = "-p" ]; then
    DEPLOY_ENV="production"
    echo -e "${BLUE}ℹ️  Déploiement en PRODUCTION${NC}"
else
    DEPLOY_ENV="preview"
    echo -e "${BLUE}ℹ️  Déploiement en PREVIEW${NC}"
fi

echo ""
echo -e "${GREEN}✓${NC} Toutes les vérifications passées"
echo ""

# Confirmation finale pour production
if [ "$DEPLOY_ENV" = "production" ]; then
    echo -e "${YELLOW}⚠️  Vous êtes sur le point de déployer en PRODUCTION${NC}"
    read -p "Êtes-vous sûr de vouloir continuer? (y/N) " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}⚠️  Déploiement annulé${NC}"
        exit 0
    fi
    echo ""
fi

# Déploiement
echo -e "${BLUE}ℹ️  Lancement du déploiement...${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$DEPLOY_ENV" = "production" ]; then
    $VERCEL_CMD --prod
else
    $VERCEL_CMD
fi

DEPLOY_STATUS=$?

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $DEPLOY_STATUS -eq 0 ]; then
    echo -e "${GREEN}✅ Déploiement réussi !${NC}"
    echo ""
    echo "🎉 Votre application est maintenant en ligne !"
    echo ""
    
    if [ "$DEPLOY_ENV" = "production" ]; then
        echo "🌐 URL de production: Voir le lien ci-dessus"
    else
        echo "🌐 URL de preview: Voir le lien ci-dessus"
    fi
    
    echo ""
    echo "📝 Prochaines étapes:"
    echo "   1. Visitez l'URL pour tester l'application"
    echo "   2. Vérifiez que l'authentification fonctionne"
    echo "   3. Testez les fonctionnalités principales"
    
    if [ "$DEPLOY_ENV" = "preview" ]; then
        echo ""
        echo "💡 Pour déployer en production:"
        echo "   ./scripts/deploy-to-vercel.sh --prod"
    fi
    
    echo ""
else
    echo -e "${RED}✗ Déploiement échoué${NC}"
    echo ""
    echo "🔍 Vérifiez les erreurs ci-dessus"
    echo ""
    echo "💡 Conseils:"
    echo "   • Vérifiez que toutes les variables d'environnement sont définies"
    echo "   • Testez le build localement: npx pnpm@10.4.1 build"
    echo "   • Consultez les logs sur https://vercel.com/dashboard"
    echo ""
    exit 1
fi

echo ""
