#!/bin/bash

# Script de vérification pré-déploiement Render
# Ce script vérifie que tout est prêt pour le déploiement sur Render

set -e

echo "🔍 Vérification pré-déploiement Render..."
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
ERRORS=0
WARNINGS=0

# Vérifier Node.js
echo "📦 Vérification de Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installé : $NODE_VERSION"
    
    # Vérifier version >= 18
    NODE_MAJOR=$(node -v | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 18 ]; then
        echo -e "${RED}✗${NC} Node.js $NODE_VERSION est trop ancien. Version 18+ requise."
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}✗${NC} Node.js n'est pas installé"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Vérifier pnpm
echo "📦 Vérification de pnpm..."
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm -v)
    echo -e "${GREEN}✓${NC} pnpm installé : $PNPM_VERSION"
else
    echo -e "${YELLOW}⚠${NC} pnpm n'est pas installé globalement"
    echo "  Render l'installera automatiquement via packageManager"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Vérifier package.json
echo "📄 Vérification de package.json..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json trouvé"
    
    # Vérifier les scripts requis
    if grep -q "\"pages:build\"" package.json; then
        echo -e "${GREEN}✓${NC} Script 'pages:build' présent"
    else
        echo -e "${RED}✗${NC} Script 'pages:build' manquant"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "\"render:build\"" package.json; then
        echo -e "${GREEN}✓${NC} Script 'render:build' présent"
    else
        echo -e "${YELLOW}⚠${NC} Script 'render:build' manquant (optionnel)"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${RED}✗${NC} package.json non trouvé"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Vérifier render.yaml
echo "📄 Vérification de render.yaml..."
if [ -f "render.yaml" ]; then
    echo -e "${GREEN}✓${NC} render.yaml trouvé"
    
    # Vérifier la configuration
    if grep -q "env: static" render.yaml; then
        echo -e "${GREEN}✓${NC} Type 'static' configuré"
    else
        echo -e "${YELLOW}⚠${NC} Type 'static' non trouvé"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    if grep -q "staticPublishPath: dist/public" render.yaml; then
        echo -e "${GREEN}✓${NC} Publish path 'dist/public' configuré"
    else
        echo -e "${RED}✗${NC} Publish path incorrect"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${YELLOW}⚠${NC} render.yaml non trouvé (configuration manuelle requise)"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Vérifier .env.example
echo "📄 Vérification de .env.example..."
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✓${NC} .env.example trouvé"
    
    # Compter les variables
    VAR_COUNT=$(grep -c "^[A-Z]" .env.example || true)
    echo "  → $VAR_COUNT variables d'environnement documentées"
else
    echo -e "${YELLOW}⚠${NC} .env.example non trouvé"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Test de build local (optionnel)
echo "🔨 Vérification du dossier de build..."
if [ -d "dist/public" ]; then
    echo -e "${GREEN}✓${NC} Dossier dist/public/ existe"
    
    # Vérifier index.html
    if [ -f "dist/public/index.html" ]; then
        echo -e "${GREEN}✓${NC} index.html trouvé dans dist/public/"
        FILE_SIZE=$(du -h dist/public/index.html | cut -f1)
        echo "  → Taille : $FILE_SIZE"
    else
        echo -e "${YELLOW}⚠${NC} index.html non trouvé (build non effectué)"
        echo "  Le build sera effectué par Render lors du déploiement"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠${NC} Dossier dist/public/ non trouvé (build non effectué)"
    echo "  Le build sera effectué par Render lors du déploiement"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Résumé
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSUMÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ Tout est prêt pour le déploiement Render !${NC}"
    echo ""
    echo "Prochaines étapes :"
    echo "1. Allez sur https://render.com/signup"
    echo "2. New + → Static Site"
    echo "3. Connectez Jaokimben/AgentiOrg"
    echo "4. Ajoutez les variables d'environnement"
    echo "5. Déployez !"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS avertissement(s) détecté(s)${NC}"
    echo ""
    echo "Le déploiement devrait fonctionner, mais vérifiez les avertissements ci-dessus."
    exit 0
else
    echo -e "${RED}✗ $ERRORS erreur(s) détectée(s)${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ $WARNINGS avertissement(s) détecté(s)${NC}"
    fi
    echo ""
    echo "Corrigez les erreurs ci-dessus avant de déployer."
    exit 1
fi
