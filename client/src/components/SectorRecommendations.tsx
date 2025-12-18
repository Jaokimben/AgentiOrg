import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSectorBenchmark, getGapAnalysis } from "@/data/sectorBenchmarks";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lightbulb, Target, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

interface SectorRecommendationsProps {
  userScores: Record<string, number>;
  sectorId: string;
}

export function SectorRecommendations({ userScores, sectorId }: SectorRecommendationsProps) {
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
        skills: 'Competences & Talents',
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

  const generateRecommendations = () => {
    const recommendations: Array<{
      category: string;
      title: string;
      description: string;
      actions: string[];
      priority: 'high' | 'medium' | 'low';
    }> = [];

    gapAnalysis.behindCategories.forEach(category => {
      const gap = gapAnalysis.gaps[category];
      const categoryLabel = getCategoryLabel(category);

      if (language === 'fr') {
        recommendations.push({
          category,
          title: `Rattraper le retard en ${categoryLabel.toLowerCase()}`,
          description: `Vous etes ${Math.abs(gap.gap).toFixed(0)} points en-dessous de la moyenne sectorielle dans ce domaine. C'est une opportunite majeure d'amelioration.`,
          priority: gap.gap < -20 ? 'high' : 'medium',
          actions: [
            `Analyser les meilleures pratiques du secteur en ${categoryLabel.toLowerCase()}`,
            `Mettre en place un plan d'action avec des jalons clairs`,
            `Allouer les ressources necessaires pour cette transformation`,
            `Mesurer les progres regulierement et ajuster la strategie`
          ]
        });
      } else {
        recommendations.push({
          category,
          title: `Close the gap in ${categoryLabel.toLowerCase()}`,
          description: `You are ${Math.abs(gap.gap).toFixed(0)} points below the sector average in this area. This is a major improvement opportunity.`,
          priority: gap.gap < -20 ? 'high' : 'medium',
          actions: [
            `Analyze industry best practices in ${categoryLabel.toLowerCase()}`,
            `Implement an action plan with clear milestones`,
            `Allocate necessary resources for this transformation`,
            `Measure progress regularly and adjust strategy`
          ]
        });
      }
    });

    gapAnalysis.aheadCategories.forEach(category => {
      const gap = gapAnalysis.gaps[category];
      const categoryLabel = getCategoryLabel(category);

      if (language === 'fr') {
        recommendations.push({
          category,
          title: `Consolider votre avantage en ${categoryLabel.toLowerCase()}`,
          description: `Vous excellez dans ce domaine avec ${gap.gap.toFixed(0)} points au-dessus de la moyenne. Maintenez cet avantage competitif.`,
          priority: 'low',
          actions: [
            `Documenter vos meilleures pratiques`,
            `Partager votre expertise avec les autres domaines`,
            `Continuer a innover dans ce domaine`,
            `Utiliser cet avantage comme levier de transformation globale`
          ]
        });
      } else {
        recommendations.push({
          category,
          title: `Strengthen your advantage in ${categoryLabel.toLowerCase()}`,
          description: `You excel in this area with ${gap.gap.toFixed(0)} points above average. Maintain this competitive advantage.`,
          priority: 'low',
          actions: [
            `Document your best practices`,
            `Share your expertise with other areas`,
            `Continue to innovate in this field`,
            `Use this advantage as a lever for overall transformation`
          ]
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const recommendations = generateRecommendations();

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Target className="w-4 h-4" />;
      case 'low':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          {language === 'fr' ? 'Recommandations sectorielles' : 'Sector-Specific Recommendations'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'fr'
            ? `Plan d'action personnalise pour rattraper et depasser les standards du secteur ${sectorName}`
            : `Personalized action plan to catch up with and exceed ${sectorName} standards`}
        </p>
      </div>

      {recommendations.map((rec, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getPriorityColor(rec.priority)} border`}>
                    {getPriorityIcon(rec.priority)}
                    <span className="ml-1">
                      {language === 'fr'
                        ? rec.priority === 'high' ? 'Haute priorite' : rec.priority === 'medium' ? 'Priorite moyenne' : 'Basse priorite'
                        : rec.priority === 'high' ? 'High priority' : rec.priority === 'medium' ? 'Medium priority' : 'Low priority'}
                    </span>
                  </Badge>
                </div>
                <CardTitle className="text-lg text-primary">{rec.title}</CardTitle>
              </div>
            </div>
            <CardDescription className="mt-2">{rec.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                {language === 'fr' ? 'Actions recommandees' : 'Recommended Actions'}
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

            {/* Timeline Estimate */}
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'fr' ? 'Delai estime' : 'Estimated Timeline'}
              </p>
              <p className="font-semibold text-foreground">
                {rec.priority === 'high'
                  ? language === 'fr' ? '3-6 mois' : '3-6 months'
                  : rec.priority === 'medium'
                  ? language === 'fr' ? '6-12 mois' : '6-12 months'
                  : language === 'fr' ? '12+ mois' : '12+ months'}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
