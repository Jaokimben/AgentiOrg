import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, TrendingUp, AlertTriangle } from "lucide-react";

interface StrengthWeakness {
  category: string;
  percentage: number;
  type: 'strength' | 'opportunity' | 'weakness';
  description: string;
}

interface StrengthsWeaknessesProps {
  data: StrengthWeakness[];
  language?: 'fr' | 'en';
}

export function StrengthsWeaknesses({ data, language = 'fr' }: StrengthsWeaknessesProps) {
  const labels = {
    fr: {
      strengths: 'Points Forts',
      opportunities: 'Opportunités',
      weaknesses: 'Points Faibles',
      strengthsDesc: 'Domaines où vous excellez',
      opportunitiesDesc: 'Domaines à développer',
      weaknessesDesc: 'Domaines nécessitant une attention immédiate'
    },
    en: {
      strengths: 'Strengths',
      opportunities: 'Opportunities',
      weaknesses: 'Weaknesses',
      strengthsDesc: 'Areas where you excel',
      opportunitiesDesc: 'Areas to develop',
      weaknessesDesc: 'Areas requiring immediate attention'
    }
  };

  const t = labels[language];

  const strengths = data.filter(d => d.type === 'strength').sort((a, b) => b.percentage - a.percentage);
  const opportunities = data.filter(d => d.type === 'opportunity').sort((a, b) => b.percentage - a.percentage);
  const weaknesses = data.filter(d => d.type === 'weakness').sort((a, b) => a.percentage - b.percentage);

  const renderItem = (item: StrengthWeakness, icon: React.ReactNode, bgColor: string) => (
    <div key={item.category} className={`p-4 rounded-lg border-l-4 ${bgColor}`}>
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-foreground">{item.category}</h4>
            <span className="text-sm font-bold text-primary">{item.percentage}%</span>
          </div>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Strengths */}
      {strengths.length > 0 && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              {t.strengths}
            </CardTitle>
            <CardDescription>{t.strengthsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {strengths.map(item => 
              renderItem(item, <CheckCircle2 className="w-5 h-5 text-green-600" />, 'border-green-200 bg-green-50')
            )}
          </CardContent>
        </Card>
      )}

      {/* Opportunities */}
      {opportunities.length > 0 && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
              <TrendingUp className="w-5 h-5" />
              {t.opportunities}
            </CardTitle>
            <CardDescription>{t.opportunitiesDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {opportunities.map(item => 
              renderItem(item, <TrendingUp className="w-5 h-5 text-blue-600" />, 'border-blue-200 bg-blue-50')
            )}
          </CardContent>
        </Card>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-red-700">
              <AlertTriangle className="w-5 h-5" />
              {t.weaknesses}
            </CardTitle>
            <CardDescription>{t.weaknessesDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {weaknesses.map(item => 
              renderItem(item, <AlertCircle className="w-5 h-5 text-red-600" />, 'border-red-200 bg-red-50')
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
