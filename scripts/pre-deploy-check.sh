#!/bin/bash

# AgentiOrg - Script de Vérification Pré-Déploiement Vercel
# Ce script vérifie que tout est prêt pour le déploiement

set -e

echo "🚀 AgentiOrg - Vérification Pré-Déploiement"
echo "=========================================="
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Compteurs
ERRORS=0
WARNINGS=0
SUCCESS=0

# Fonction pour afficher les résultats
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((SUCCESS++))
    else
        echo -e "${RED}✗${NC} $2"
        ((ERRORS++))
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

echo "1️⃣  Vérification de l'environnement"
echo "-----------------------------------"

# Vérifier Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    if [[ "${NODE_VERSION:1:2}" -ge 18 ]]; then
        print_result 0 "Node.js $NODE_VERSION installé"
    else
        print_result 1 "Node.js version trop ancienne ($NODE_VERSION). Version 18+ requise."
    fi
else
    print_result 1 "Node.js n'est pas installé"
fi

# Vérifier pnpm
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm -v)
    print_result 0 "pnpm $PNPM_VERSION installé"
else
    print_result 1 "pnpm n'est pas installé. Installez avec: npm install -g pnpm"
fi

echo ""
echo "2️⃣  Vérification des fichiers"
echo "----------------------------"

# Vérifier les fichiers essentiels
FILES=(
    "package.json"
    "vercel.json"
    ".env.example"
    "tsconfig.json"
    "vite.config.ts"
    "drizzle.config.ts"
)

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        print_result 0 "$FILE existe"
    else
        print_result 1 "$FILE est manquant"
    fi
done

# Vérifier .gitignore
if [ -f ".gitignore" ]; then
    if grep -q "\.env\.local" .gitignore && grep -q "node_modules" .gitignore; then
        print_result 0 ".gitignore est correctement configuré"
    else
        print_warning ".gitignore pourrait être incomplet (vérifiez .env.local et node_modules)"
    fi
else
    print_result 1 ".gitignore est manquant"
fi

echo ""
echo "3️⃣  Vérification des dépendances"
echo "-------------------------------"

# Vérifier node_modules
if [ -d "node_modules" ]; then
    print_result 0 "node_modules existe"
else
    print_warning "node_modules n'existe pas. Exécutez: pnpm install"
fi

# Vérifier pnpm-lock.yaml
if [ -f "pnpm-lock.yaml" ]; then
    print_result 0 "pnpm-lock.yaml existe (important pour Vercel)"
else
    print_result 1 "pnpm-lock.yaml est manquant"
fi

echo ""
echo "4️⃣  Vérification de TypeScript"
echo "-----------------------------"

# Type checking
if command -v pnpm &> /dev/null; then
    if pnpm check &> /dev/null; then
        print_result 0 "TypeScript: Aucune erreur de type"
    else
        print_result 1 "TypeScript: Erreurs de type détectées"
        echo ""
        print_info "Exécutez 'pnpm check' pour voir les détails"
    fi
else
    print_warning "Impossible de vérifier TypeScript (pnpm non installé)"
fi

echo ""
echo "5️⃣  Test de build"
echo "----------------"

# Tester le build
if command -v pnpm &> /dev/null; then
    print_info "Test de build en cours..."
    if pnpm build &> /tmp/build.log; then
        print_result 0 "Build réussi"
        
        # Vérifier que dist existe
        if [ -d "dist" ]; then
            print_result 0 "Répertoire dist/ créé"
            
            # Vérifier les fichiers essentiels dans dist
            if [ -f "dist/index.html" ]; then
                print_result 0 "dist/index.html existe"
            else
                print_result 1 "dist/index.html manquant"
            fi
            
            if [ -f "dist/index.js" ]; then
                print_result 0 "dist/index.js (serveur) existe"
            else
                print_result 1 "dist/index.js (serveur) manquant"
            fi
        else
            print_result 1 "Répertoire dist/ non créé"
        fi
    else
        print_result 1 "Build échoué"
        echo ""
        print_info "Voir les logs: cat /tmp/build.log"
    fi
else
    print_warning "Impossible de tester le build (pnpm non installé)"
fi

echo ""
echo "6️⃣  Vérification de la structure"
echo "-------------------------------"

# Vérifier la structure des dossiers
DIRS=(
    "client"
    "client/src"
    "server"
    "server/_core"
    "drizzle"
    "shared"
    "api"
)

for DIR in "${DIRS[@]}"; do
    if [ -d "$DIR" ]; then
        print_result 0 "$DIR/ existe"
    else
        print_result 1 "$DIR/ est manquant"
    fi
done

echo ""
echo "7️⃣  Vérification Git"
echo "-------------------"

# Vérifier Git
if [ -d ".git" ]; then
    print_result 0 "Repository Git initialisé"
    
    # Vérifier les changements non commités
    if git diff-index --quiet HEAD --; then
        print_result 0 "Aucun changement non commité"
    else
        print_warning "Il y a des changements non commités"
        echo ""
        print_info "Fichiers modifiés:"
        git status --short
    fi
    
    # Vérifier la branche
    BRANCH=$(git branch --show-current)
    print_info "Branche actuelle: $BRANCH"
    
    # Vérifier remote
    if git remote -v | grep -q "origin"; then
        print_result 0 "Remote origin configuré"
        REMOTE_URL=$(git remote get-url origin)
        print_info "URL: $REMOTE_URL"
    else
        print_result 1 "Remote origin non configuré"
    fi
else
    print_result 1 "Repository Git non initialisé"
fi

echo ""
echo "8️⃣  Variables d'environnement"
echo "----------------------------"

# Vérifier .env.local
if [ -f ".env.local" ]; then
    print_result 0 ".env.local existe (pour tests locaux)"
    
    # Vérifier les variables essentielles
    REQUIRED_VARS=(
        "DATABASE_URL"
        "JWT_SECRET"
        "VITE_APP_ID"
        "OAUTH_SERVER_URL"
    )
    
    for VAR in "${REQUIRED_VARS[@]}"; do
        if grep -q "^$VAR=" .env.local; then
            if grep "^$VAR=your-" .env.local &> /dev/null || grep "^$VAR=$" .env.local &> /dev/null; then
                print_warning "$VAR est défini mais semble être une valeur par défaut"
            else
                print_result 0 "$VAR est défini"
            fi
        else
            print_warning "$VAR n'est pas défini dans .env.local"
        fi
    done
else
    print_warning ".env.local n'existe pas (normal pour déploiement)"
    print_info "Les variables d'environnement doivent être configurées dans Vercel"
fi

echo ""
echo "9️⃣  Recommandations Vercel"
echo "-------------------------"

print_info "N'oubliez pas de configurer ces variables dans Vercel:"
echo "   • DATABASE_URL"
echo "   • JWT_SECRET"
echo "   • VITE_APP_ID"
echo "   • OAUTH_SERVER_URL"
echo "   • VITE_OAUTH_PORTAL_URL"
echo "   • OWNER_OPEN_ID"
echo "   • OWNER_NAME"
echo "   • BUILT_IN_FORGE_API_URL"
echo "   • BUILT_IN_FORGE_API_KEY"
echo "   • VITE_FRONTEND_FORGE_API_URL"
echo "   • VITE_FRONTEND_FORGE_API_KEY"
echo ""
print_info "Documentation complète: voir VERCEL_DEPLOY.md"

echo ""
echo "=========================================="
echo "📊 RÉSUMÉ"
echo "=========================================="
echo -e "${GREEN}✓ Succès: $SUCCESS${NC}"
echo -e "${YELLOW}⚠ Avertissements: $WARNINGS${NC}"
echo -e "${RED}✗ Erreurs: $ERRORS${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 Tout est prêt pour le déploiement sur Vercel !${NC}"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Vous pouvez déployer, mais vérifiez les avertissements${NC}"
    exit 0
else
    echo -e "${RED}❌ Corrigez les erreurs avant de déployer${NC}"
    exit 1
fi
