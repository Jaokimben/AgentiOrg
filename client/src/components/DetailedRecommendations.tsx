import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Target, 
  Clock, 
  Users, 
  Lightbulb,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeline: string;
  impact: string;
  effort: string;
  category: string;
  actions: string[];
  successMetrics: string[];
}

interface DetailedRecommendationsProps {
  recommendations: Recommendation[];
  language?: 'fr' | 'en';
}

export function DetailedRecommendations({ 
  recommendations, 
  language = 'fr' 
}: DetailedRecommendationsProps) {
  const labels = {
    fr: {
      title: 'Recommandations Détaillées',
      description: 'Plan d\'action personnalisé pour votre transformation',
      priority: 'Priorité',
      timeline: 'Délai',
      impact: 'Impact',
      effort: 'Effort',
      actions: 'Actions',
      metrics: 'Métriques de Succès',
      high: 'Haute',
      medium: 'Moyenne',
      low: 'Basse',
      highImpact: 'Impact élevé',
      mediumImpact: 'Impact moyen',
      lowImpact: 'Impact faible'
    },
    en: {
      title: 'Detailed Recommendations',
      description: 'Personalized action plan for your transformation',
      priority: 'Priority',
      timeline: 'Timeline',
      impact: 'Impact',
      effort: 'Effort',
      actions: 'Actions',
      metrics: 'Success Metrics',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      highImpact: 'High impact',
      mediumImpact: 'Medium impact',
      lowImpact: 'Low impact'
    }
  };

  const t = labels[language];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority as keyof typeof priorityOrder] - 
           priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">{t.title}</h2>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      {sortedRecommendations.map((rec, index) => (
        <Card key={rec.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    #{index + 1}
                  </span>
                  <Badge className={`${getPriorityColor(rec.priority)} border`}>
                    {getPriorityIcon(rec.priority)}
                    <span className="ml-1">
                      {t[rec.priority as keyof typeof t]}
                    </span>
                  </Badge>
                </div>
                <CardTitle className="text-lg text-primary">{rec.title}</CardTitle>
              </div>
            </div>
            <CardDescription className="mt-2">{rec.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Key Information Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">{t.timeline}</p>
                <p className="font-semibold text-foreground">{rec.timeline}</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">{t.impact}</p>
                <p className="font-semibold text-foreground">{rec.impact}</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">{t.effort}</p>
                <p className="font-semibold text-foreground">{rec.effort}</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">{t.priority}</p>
                <p className="font-semibold text-foreground">{rec.category}</p>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                {t.actions}
              </h4>
              <ul className="space-y-2">
                {rec.actions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-foreground">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Success Metrics */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                {t.metrics}
              </h4>
              <ul className="space-y-2">
                {rec.successMetrics.map((metric, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-foreground">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
