import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectorSelector } from "@/components/SectorSelector";
import { SectorComparison } from "@/components/SectorComparison";
import { SectorRecommendations } from "@/components/SectorRecommendations";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { Network, ArrowLeft, TrendingUp } from "lucide-react";

interface SectorComparisonPageProps {
  // Allow passing user scores from assessment or use demo data
  userScores?: Record<string, number>;
}

// Header Component
function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-navy rounded-lg flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-primary">AgenticOrg</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link href="/evaluation">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("nav.backHome")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function SectorComparisonPage({ userScores: propUserScores }: SectorComparisonPageProps) {
  const { language } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  
  // Use provided scores or default demo scores
  const userScores = propUserScores || {
    culture: 65,
    technology: 72,
    governance: 58,
    skills: 68,
    collaboration: 75
  };

  const handleSectorSelect = (sectorId: string) => {
    setSelectedSector(sectorId);
    // Scroll to top when sector is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSelection = () => {
    setSelectedSector(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">
                {language === 'fr' ? 'Analyse Sectorielle' : 'Sector Analysis'}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {language === 'fr' 
                ? 'Comparez votre Maturité par Secteur' 
                : 'Compare Your Maturity by Sector'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Découvrez comment votre organisation se positionne par rapport aux standards et meilleures pratiques de votre industrie'
                : 'Discover how your organization compares to industry standards and best practices'}
            </p>
          </div>

          {/* Conditional Content: Sector Selection or Comparison */}
          {!selectedSector ? (
            <div className="space-y-8">
              <Card className="border-2 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    {language === 'fr' 
                      ? 'Sélectionnez votre secteur d\'activité' 
                      : 'Select your industry sector'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'fr'
                      ? 'Choisissez le secteur qui correspond le mieux à votre organisation pour obtenir une analyse comparative précise'
                      : 'Choose the sector that best matches your organization for an accurate comparative analysis'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SectorSelector 
                    onSelect={handleSectorSelect}
                    selectedSector={selectedSector || undefined}
                  />
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="bg-gradient-to-r from-accent/5 to-transparent border border-accent/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary mb-2">
                        {language === 'fr' 
                          ? 'Pourquoi comparer avec votre secteur ?' 
                          : 'Why compare with your sector?'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'fr'
                          ? 'La comparaison sectorielle vous permet d\'identifier vos forces et faiblesses relatives, de découvrir les meilleures pratiques de votre industrie, et de prioriser vos investissements en IA et transformation numérique.'
                          : 'Sector comparison allows you to identify your relative strengths and weaknesses, discover best practices in your industry, and prioritize your AI and digital transformation investments.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Back Button */}
              <Button
                variant="outline"
                onClick={handleBackToSelection}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'fr' ? 'Retour à la sélection' : 'Back to selection'}
              </Button>

              {/* Sector Comparison */}
              <SectorComparison 
                userScores={userScores} 
                sectorId={selectedSector} 
              />

              {/* Sector Recommendations */}
              <SectorRecommendations 
                userScores={userScores} 
                sectorId={selectedSector} 
              />

              {/* Action Buttons */}
              <Card className="border-2 border-accent/30 bg-gradient-to-r from-accent/5 to-transparent">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={handleBackToSelection}
                      className="gap-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      {language === 'fr' 
                        ? 'Comparer avec un autre secteur' 
                        : 'Compare with another sector'}
                    </Button>
                    <Link href="/contact">
                      <Button className="bg-gradient-navy hover:opacity-90 w-full sm:w-auto">
                        {language === 'fr' 
                          ? 'Obtenir une consultation personnalisée' 
                          : 'Get personalized consultation'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
