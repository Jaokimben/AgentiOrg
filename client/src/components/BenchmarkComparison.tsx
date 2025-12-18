import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Award, Target } from "lucide-react";

interface BenchmarkData {
  yourScore: number;
  industryAverage: number;
  bestInClass: number;
  category: string;
}

interface BenchmarkComparisonProps {
  data: BenchmarkData[];
  language?: 'fr' | 'en';
}

export function BenchmarkComparison({ data, language = 'fr' }: BenchmarkComparisonProps) {
  const maxScore = 100;
  const labels = {
    fr: {
      yourScore: 'Votre Score',
      industryAverage: 'Moyenne Secteur',
      bestInClass: 'Meilleure Pratique',
      gap: 'Écart à combler',
      potential: 'Potentiel de croissance'
    },
    en: {
      yourScore: 'Your Score',
      industryAverage: 'Industry Average',
      bestInClass: 'Best in Class',
      gap: 'Gap to close',
      potential: 'Growth potential'
    }
  };

  const t = labels[language];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <Award className="w-6 h-6 text-accent" />
          {language === 'fr' ? 'Analyse Comparative' : 'Benchmark Analysis'}
        </CardTitle>
        <CardDescription>
          {language === 'fr' 
            ? 'Comparez votre maturité avec les standards du secteur'
            : 'Compare your maturity with industry standards'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {data.map((item, index) => {
            const gapToIndustry = item.industryAverage - item.yourScore;
            const gapToBestInClass = item.bestInClass - item.yourScore;
            
            return (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-4">{item.category}</h4>
                
                {/* Your Score */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{t.yourScore}</span>
                    <span className="text-sm font-semibold text-primary">{item.yourScore}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${item.yourScore}%` }}
                    />
                  </div>
                </div>

                {/* Industry Average */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{t.industryAverage}</span>
                    <span className="text-sm font-semibold text-gray-600">{item.industryAverage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-400 transition-all duration-500"
                      style={{ width: `${item.industryAverage}%` }}
                    />
                  </div>
                </div>

                {/* Best in Class */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{t.bestInClass}</span>
                    <span className="text-sm font-semibold text-green-600">{item.bestInClass}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{ width: `${item.bestInClass}%` }}
                    />
                  </div>
                </div>

                {/* Gap Analysis */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t.gap}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {gapToIndustry > 0 ? '+' : ''}{gapToIndustry}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t.potential}</p>
                      <p className="text-sm font-semibold text-foreground">
                        +{gapToBestInClass}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
