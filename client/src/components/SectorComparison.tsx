import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSectorBenchmark, getGapAnalysis } from "@/data/sectorBenchmarks";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, TrendingDown, Minus, Award, Target } from "lucide-react";

interface SectorComparisonProps {
  userScores: Record<string, number>;
  sectorId: string;
}

export function SectorComparison({ userScores, sectorId }: SectorComparisonProps) {
  const { language } = useLanguage();
  const sector = getSectorBenchmark(sectorId);

  if (!sector) {
    return null;
  }

  const sectorName = language === 'fr' ? sector.name : sector.nameEn;
  const gapAnalysis = getGapAnalysis(userScores, sector, language as 'fr' | 'en');

  const getCategoryLabel = (category: string) => {
    const labels = {
      fr: {
        culture: 'Culture Organisationnelle',
        technology: 'Infrastructure Technologique',
        governance: 'Gouvernance',
        skills: 'Compétences & Talents',
        collaboration: 'Collaboration Humain-IA'
      },
      en: {
        culture: 'Organizational Culture',
        technology: 'Technology Infrastructure',
        governance: 'Governance',
        skills: 'Skills & Talents',
        collaboration: 'Human-AI Collaboration'
      }
    };
    return labels[language][category as keyof typeof labels['fr']];
  };

  const getStatusIcon = (status: 'ahead' | 'behind') => {
    if (status === 'ahead') {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    }
    return <TrendingDown className="w-4 h-4 text-orange-600" />;
  };

  const getStatusColor = (status: 'ahead' | 'behind') => {
    if (status === 'ahead') {
      return 'bg-green-100 text-green-800 border-green-300';
    }
    return 'bg-orange-100 text-orange-800 border-orange-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-accent bg-gradient-to-r from-accent/10 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {language === 'fr' ? 'Comparaison sectorielle' : 'Sector Comparison'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'fr' 
                  ? `Votre organisation vs. ${sectorName}`
                  : `Your organization vs. ${sectorName}`}
              </p>
            </div>
            <Award className="w-12 h-12 text-accent opacity-20" />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {language === 'fr' ? 'Résumé de l\'analyse' : 'Analysis Summary'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              {language === 'fr' ? 'Position globale' : 'Overall Position'}
            </p>
            <p className="text-lg font-semibold text-foreground">
              {gapAnalysis.labels.summary}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-semibold text-green-800 mb-2">
                {language === 'fr' ? 'Points forts' : 'Strengths'}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {gapAnalysis.aheadCategories.length}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {language === 'fr' ? 'domaines en avance' : 'areas ahead'}
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm font-semibold text-orange-800 mb-2">
                {language === 'fr' ? 'Opportunités' : 'Opportunities'}
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {gapAnalysis.behindCategories.length}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {language === 'fr' ? 'domaines à améliorer' : 'areas to improve'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {language === 'fr' ? 'Comparaison détaillée par catégorie' : 'Detailed Comparison by Category'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' 
              ? 'Votre score vs. moyenne sectorielle'
              : 'Your score vs. sector average'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(gapAnalysis.gaps).map(([category, data]) => {
            const userScore = userScores[category] || 0;
            const benchmarkScore = sector.categories[category as keyof typeof sector.categories];
            const maxScore = 100;

            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">
                    {getCategoryLabel(category)}
                  </h4>
                  <Badge className={`${getStatusColor(data.status)} border`}>
                    {getStatusIcon(data.status)}
                    <span className="ml-1">
                      {data.status === 'ahead' 
                        ? `+${Math.abs(data.gap).toFixed(0)}` 
                        : `-${Math.abs(data.gap).toFixed(0)}`}
                    </span>
                  </Badge>
                </div>

                {/* Score Bars */}
                <div className="space-y-2 mb-3">
                  {/* Your Score */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        {language === 'fr' ? 'Votre score' : 'Your score'}
                      </span>
                      <span className="font-semibold text-primary">{userScore}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${userScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Benchmark Score */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        {language === 'fr' ? 'Moyenne sectorielle' : 'Sector average'}
                      </span>
                      <span className="font-semibold text-gray-600">{benchmarkScore}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-400 transition-all duration-500"
                        style={{ width: `${benchmarkScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Gap Analysis */}
                <div className="flex items-center gap-2 text-sm">
                  {data.gap === 0 ? (
                    <>
                      <Minus className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {language === 'fr' ? 'Au niveau du secteur' : 'At sector level'}
                      </span>
                    </>
                  ) : data.gap > 0 ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">
                        {language === 'fr' 
                          ? `${data.gap.toFixed(0)} points au-dessus de la moyenne`
                          : `${data.gap.toFixed(0)} points above average`}
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 text-orange-600" />
                      <span className="text-orange-600">
                        {language === 'fr' 
                          ? `${Math.abs(data.gap).toFixed(0)} points en-dessous de la moyenne`
                          : `${Math.abs(data.gap).toFixed(0)} points below average`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-accent" />
            {language === 'fr' ? 'Insights clés' : 'Key Insights'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {gapAnalysis.aheadCategories.length > 0 && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">
                {language === 'fr' ? '✓ Avantages compétitifs' : '✓ Competitive Advantages'}
              </h4>
              <p className="text-sm text-green-800">
                {language === 'fr'
                  ? `Vous excellez dans ${gapAnalysis.aheadCategories.map(c => getCategoryLabel(c).toLowerCase()).join(', ')}. Continuez à investir dans ces domaines.`
                  : `You excel in ${gapAnalysis.aheadCategories.map(c => getCategoryLabel(c).toLowerCase()).join(', ')}. Continue investing in these areas.`}
              </p>
            </div>
          )}

          {gapAnalysis.behindCategories.length > 0 && (
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">
                {language === 'fr' ? '⚡ Priorités d\'amélioration' : '⚡ Improvement Priorities'}
              </h4>
              <p className="text-sm text-orange-800">
                {language === 'fr'
                  ? `Concentrez-vous sur ${gapAnalysis.behindCategories.map(c => getCategoryLabel(c).toLowerCase()).join(', ')} pour rattraper les standards du secteur.`
                  : `Focus on ${gapAnalysis.behindCategories.map(c => getCategoryLabel(c).toLowerCase()).join(', ')} to catch up with industry standards.`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
