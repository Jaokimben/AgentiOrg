import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SECTOR_BENCHMARKS } from "@/data/sectorBenchmarks";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, CheckCircle2, ArrowRight } from "lucide-react";

interface SectorSelectorProps {
  onSelect: (sectorId: string) => void;
  selectedSector?: string;
}

export function SectorSelector({ onSelect, selectedSector }: SectorSelectorProps) {
  const { language } = useLanguage();
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const getSectorName = (sector: typeof SECTOR_BENCHMARKS[0]) => {
    return language === 'fr' ? sector.name : sector.nameEn;
  };

  const getSectorDescription = (sector: typeof SECTOR_BENCHMARKS[0]) => {
    return language === 'fr' ? sector.description : sector.descriptionEn;
  };

  const getLevelLabel = (level: string) => {
    const labels = {
      fr: {
        beginner: 'Débutant',
        emerging: 'Émergent',
        progressing: 'En progression',
        advanced: 'Avancé'
      },
      en: {
        beginner: 'Beginner',
        emerging: 'Emerging',
        progressing: 'Progressing',
        advanced: 'Advanced'
      }
    };
    return labels[language][level as keyof typeof labels['fr']];
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-red-100 text-red-800';
      case 'emerging':
        return 'bg-orange-100 text-orange-800';
      case 'progressing':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">
          {language === 'fr' ? 'Sélectionnez votre secteur' : 'Select your sector'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'fr' 
            ? 'Comparez vos résultats avec les benchmarks de votre secteur d\'activité'
            : 'Compare your results with your industry benchmarks'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SECTOR_BENCHMARKS.map((sector) => (
          <Card
            key={sector.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedSector === sector.id
                ? 'border-accent border-2 bg-accent/5'
                : 'hover:border-accent/50'
            } ${hoveredSector === sector.id ? 'shadow-lg' : ''}`}
            onMouseEnter={() => setHoveredSector(sector.id)}
            onMouseLeave={() => setHoveredSector(null)}
            onClick={() => onSelect(sector.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{getSectorName(sector)}</CardTitle>
                    <CardDescription className="mt-1">
                      {getSectorDescription(sector)}
                    </CardDescription>
                  </div>
                </div>
                {selectedSector === sector.id && (
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {/* Maturity Level Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {language === 'fr' ? 'Niveau de maturité' : 'Maturity level'}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getLevelColor(sector.maturityLevel)}`}>
                    {getLevelLabel(sector.maturityLevel)}
                  </span>
                </div>

                {/* Sample Size */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'fr' ? 'Entreprises analysées' : 'Companies analyzed'}
                  </span>
                  <span className="font-semibold text-foreground">{sector.sampleSize}</span>
                </div>

                {/* Average Scores */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">
                    {language === 'fr' ? 'Scores moyens' : 'Average scores'}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(sector.categories).map(([category, score]) => (
                      <div key={category} className="text-center">
                        <div className="text-lg font-bold text-primary">{score}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {category.substring(0, 3)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                {selectedSector === sector.id && (
                  <Button className="w-full bg-accent hover:bg-accent/90 gap-2 mt-2">
                    {language === 'fr' ? 'Sélectionné' : 'Selected'}
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSector && (
        <div className="flex justify-center pt-4">
          <Button
            className="bg-gradient-navy hover:opacity-90 gap-2"
            onClick={() => {
              // This will be handled by parent component
            }}
          >
            {language === 'fr' ? 'Voir la comparaison' : 'View comparison'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
