import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { 
  Network, 
  ArrowLeft,
  Target,
  Rocket,
  Users,
  Shield,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Zap,
  GitBranch,
  BarChart3,
  Clock,
  ArrowRight,
  Lightbulb,
  Settings,
  Building2
} from "lucide-react";

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
          <Link href="/">
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

// Hero Section
function HeroSection() {
  const { language } = useLanguage();
  
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-sm text-accent-foreground mb-6">
            <Rocket className="w-4 h-4" />
            <span>{language === 'fr' ? 'Approche Progressive' : 'Progressive Approach'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            {language === 'fr' 
              ? 'Organisation Agentique Minimale' 
              : 'Minimum Agentic Organization'}
            <span className="block text-3xl md:text-4xl text-accent mt-2">MAO</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Une unité autonome de type startup servant de laboratoire expérimental sûr pour tester les principes agentiques sans perturber les opérations principales.'
              : 'A self-contained startup-style unit serving as a safe experimental laboratory for testing agentic principles without disrupting core operations.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// Framework Overview Section
function FrameworkOverviewSection() {
  const { language } = useLanguage();
  
  const features = [
    {
      icon: Building2,
      title: language === 'fr' ? 'Fonctions Complètes' : 'Complete Functions',
      description: language === 'fr'
        ? 'Architecture organisationnelle complète : RH, Finance, Opérations, Marketing, Stratégie intégrés'
        : 'Complete organizational architecture: HR, Finance, Operations, Marketing, Strategy integrated'
    },
    {
      icon: Target,
      title: language === 'fr' ? 'Focus Stratégique' : 'Strategic Focus',
      description: language === 'fr'
        ? 'Trois processus commerciaux clés démontrant une création de valeur mesurable'
        : 'Three key business processes demonstrating measurable value creation'
    },
    {
      icon: Zap,
      title: language === 'fr' ? 'Approche Agile' : 'Agile Approach',
      description: language === 'fr'
        ? 'Non-disruptive, itérative et adaptative avec cycles de décision rapides'
        : 'Non-disruptive, iterative and adaptive with fast decision cycles'
    },
    {
      icon: Shield,
      title: language === 'fr' ? 'Risque Minimal' : 'Minimal Risk',
      description: language === 'fr'
        ? 'Opération parallèle garantissant la continuité opérationnelle tout en expérimentant'
        : 'Parallel operation ensuring business continuity while experimenting'
    }
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'fr' ? 'Le Cadre MAO' : 'The MAO Framework'}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Un conteneur agile pour la transformation agentique'
              : 'An agility container for agentic transformation'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-accent/20 hover:border-accent/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-navy rounded-xl flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="border-2 border-blue-500/30 bg-gradient-to-r from-blue-50/50 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {language === 'fr' ? 'Changement de Paradigme' : 'Paradigm Shift'}
                </h3>
                <p className="text-muted-foreground text-lg mb-4">
                  {language === 'fr'
                    ? 'La MAO représente un changement de paradigme par rapport aux méthodologies de transformation traditionnelles : elle établit une unité organisationnelle entièrement autonome reflétant l\'architecture fonctionnelle complète de l\'organisation mère.'
                    : 'The MAO represents a paradigm shift from traditional transformation methodologies: it establishes an entirely autonomous organizational unit reflecting the complete functional architecture of the parent organization.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      {language === 'fr' ? 'Risque Minimal' : 'Minimal Risk'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      {language === 'fr' ? 'Potentiel Maximal' : 'Maximum Potential'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">
                      {language === 'fr' ? 'Mesurable' : 'Measurable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// Three Business Processes Section
function BusinessProcessesSection() {
  const { language } = useLanguage();
  
  const processes = [
    {
      icon: Users,
      title: language === 'fr' ? 'Acquisition Client & Personnalisation' : 'Customer Acquisition & Personalization',
      description: language === 'fr'
        ? 'Système d\'IA pour scoring de leads autonome, tarification dynamique et optimisation prédictive de la valeur vie client'
        : 'AI-powered system for autonomous lead scoring, dynamic pricing, and predictive customer lifetime value optimization',
      metrics: language === 'fr'
        ? 'Augmentation du taux de conversion, réduction du coût d\'acquisition client, croissance du revenu moyen par utilisateur'
        : 'Increased conversion rate, reduced customer acquisition cost, growth in average revenue per user',
      impact: language === 'fr' ? 'Croissance des revenus de 15-25%' : '15-25% revenue growth',
      color: 'blue'
    },
    {
      icon: Settings,
      title: language === 'fr' ? 'Automatisation Opérationnelle' : 'Operational Automation',
      description: language === 'fr'
        ? 'Workflows automatisés avec allocation intelligente de ressources, maintenance prédictive et gestion autonome des fournisseurs'
        : 'Automated workflows with intelligent resource allocation, predictive maintenance, and autonomous vendor management',
      metrics: language === 'fr'
        ? 'Amélioration de l\'efficacité des processus, optimisation de l\'utilisation des ressources'
        : 'Improved process efficiency, optimized resource utilization',
      impact: language === 'fr' ? 'Réduction des coûts de 20-30%' : '20-30% cost reduction',
      color: 'orange'
    },
    {
      icon: Shield,
      title: language === 'fr' ? 'Gestion Prédictive des Risques' : 'Predictive Risk Management',
      description: language === 'fr'
        ? 'Système de détection automatique des menaces, surveillance de conformité et optimisation de la continuité opérationnelle'
        : 'System for automatic threat detection, compliance monitoring, and business continuity optimization',
      metrics: language === 'fr'
        ? 'Réduction des incidents de sécurité, amélioration du score de conformité, augmentation de la disponibilité'
        : 'Reduced security incidents, improved compliance score, increased systems uptime',
      impact: language === 'fr' ? '40-60% moins d\'incidents' : '40-60% fewer incidents',
      color: 'green'
    }
  ];
  
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' }
  };
  
  return (
    <section className="py-20 bg-secondary">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'fr' ? 'Trois Processus Métier Stratégiques' : 'Three Strategic Business Processes'}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr'
              ? 'La MAO concentre ses efforts de transformation sur trois processus sélectionnés représentant le spectre complet de la proposition de valeur de l\'IA agentique'
              : 'The MAO focuses its transformation efforts on three selected processes representing the full spectrum of the agentic AI value proposition'}
          </p>
        </div>
        
        <div className="space-y-6">
          {processes.map((process, index) => {
            const colors = colorMap[process.color];
            return (
              <Card key={index} className={`border-2 ${colors.border} ${colors.bg}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 border-2 ${colors.border}`}>
                      <process.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary mb-2">{process.title}</CardTitle>
                      <p className="text-muted-foreground">{process.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">
                        {language === 'fr' ? 'Métriques' : 'Metrics'}
                      </h4>
                      <p className="text-sm text-muted-foreground">{process.metrics}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">
                        {language === 'fr' ? 'Impact Attendu' : 'Expected Impact'}
                      </h4>
                      <p className={`text-sm font-bold ${colors.text}`}>{process.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Three Phase Implementation Section
function ThreePhaseSection() {
  const { language } = useLanguage();
  
  const phases = [
    {
      phase: 'Phase 1',
      duration: language === 'fr' ? 'Mois 0-6' : 'Months 0-6',
      title: language === 'fr' ? 'Preuve de Concept vers MVP' : 'Proof of Concept to MVP',
      description: language === 'fr'
        ? 'Création de l\'infrastructure MAO de base et validation des concepts agentiques via des implémentations de preuve de concept'
        : 'Creation of core MAO infrastructure and validation of agentic concepts through proof-of-concept implementations',
      activities: [
        language === 'fr' ? 'Configuration de la stack technologique' : 'Technology stack setup',
        language === 'fr' ? 'Développement des agents initiaux' : 'Initial agent development',
        language === 'fr' ? 'Établissement du cadre de gouvernance' : 'Governance framework establishment',
        language === 'fr' ? 'Constitution de l\'équipe' : 'Team assembly'
      ],
      success: language === 'fr'
        ? 'Agents fonctionnels déployés, métriques de base établies, approbation pour Phase 2'
        : 'Functional agents deployed, baseline metrics established, approval for Phase 2'
    },
    {
      phase: 'Phase 2',
      duration: language === 'fr' ? 'Mois 6-18' : 'Months 6-18',
      title: language === 'fr' ? 'Opérations Parallèles & Lancement' : 'Parallel Operations & Launch',
      description: language === 'fr'
        ? 'Lancement de la MAO comme organisation parallèle pleinement fonctionnelle servant des fonctions commerciales réelles'
        : 'Launch of MAO as a fully functional parallel organization serving real business functions',
      activities: [
        language === 'fr' ? 'Lancement des services réels' : 'Real service launch',
        language === 'fr' ? 'Comparaisons de performance' : 'Performance comparisons',
        language === 'fr' ? 'Surveillance continue' : 'Continuous monitoring',
        language === 'fr' ? 'Capture des apprentissages' : 'Learning capture'
      ],
      success: language === 'fr'
        ? 'Opérations autonomes stables, données comparatives générées, ROI démontré'
        : 'Stable autonomous operations, comparative data generated, ROI demonstrated'
    },
    {
      phase: 'Phase 3',
      duration: language === 'fr' ? 'Mois 18-24' : 'Months 18-24',
      title: language === 'fr' ? 'Intégration & Déploiement' : 'Integration & Scale',
      description: language === 'fr'
        ? 'Évaluation de la performance MAO et intégration sélective des processus agentiques supérieurs dans l\'organisation mère'
        : 'Assessment of MAO performance and selective integration of superior agentic processes into parent organization',
      activities: [
        language === 'fr' ? 'Analyse comparative des résultats' : 'Comparative results analysis',
        language === 'fr' ? 'Intégration des processus supérieurs' : 'Superior processes integration',
        language === 'fr' ? 'Transfert de connaissances' : 'Knowledge transfer',
        language === 'fr' ? 'Adaptation de la gouvernance' : 'Governance adaptation'
      ],
      success: language === 'fr'
        ? 'Processus validés intégrés, adoption organisationnelle, transformation pérenne'
        : 'Validated processes integrated, organizational adoption, sustainable transformation'
    }
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'fr' ? 'Feuille de Route d\'Implémentation en 3 Phases' : 'Three-Phase Implementation Roadmap'}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Un parcours structuré minimisant les risques tout en maximisant les opportunités d\'apprentissage'
              : 'A structured pathway minimizing risk while maximizing learning opportunities'}
          </p>
        </div>
        
        <div className="space-y-8">
          {phases.map((phase, index) => (
            <Card key={index} className="border-2 border-accent/30 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-navy rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-accent px-3 py-1 bg-accent/10 rounded-full">
                        {phase.phase}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {phase.duration}
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-primary mb-2">{phase.title}</CardTitle>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      {language === 'fr' ? 'Activités Clés' : 'Key Activities'}
                    </h4>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {language === 'fr' ? 'Critères de Succès' : 'Success Criteria'}
                    </h4>
                    <p className="text-sm text-muted-foreground">{phase.success}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Timeline Visualization */}
        <div className="mt-12 relative">
          <div className="absolute top-0 left-12 right-12 h-1 bg-gradient-to-r from-accent via-blue-500 to-green-500"></div>
          <div className="flex justify-between pt-8">
            {phases.map((phase, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gradient-navy rounded-full flex items-center justify-center text-white font-bold text-sm mb-2">
                  {index + 1}
                </div>
                <span className="text-xs text-center text-muted-foreground max-w-24">{phase.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Risk Mitigation Section
function RiskMitigationSection() {
  const { language } = useLanguage();
  
  const benefits = [
    {
      icon: Shield,
      title: language === 'fr' ? 'Continuité Opérationnelle' : 'Business Continuity',
      description: language === 'fr'
        ? 'Les opérations classiques continuent en parallèle, garantissant un fonctionnement ininterrompu'
        : 'Classical operations continue in parallel, ensuring uninterrupted business function'
    },
    {
      icon: BarChart3,
      title: language === 'fr' ? 'Preuves Empiriques' : 'Empirical Evidence',
      description: language === 'fr'
        ? 'Génère des données comparatives concrètes sur l\'efficacité agentique'
        : 'Generates concrete comparative data on agentic effectiveness'
    },
    {
      icon: Users,
      title: language === 'fr' ? 'Adaptation Progressive' : 'Gradual Adaptation',
      description: language === 'fr'
        ? 'Facilite l\'adaptation organisationnelle progressive et réduit la résistance au changement'
        : 'Facilitates gradual organizational adaptation and reduces change resistance'
    },
    {
      icon: TrendingUp,
      title: language === 'fr' ? 'Apprentissage Continu' : 'Continuous Learning',
      description: language === 'fr'
        ? 'Environnement d\'apprentissage sûr générant des insights actionnables'
        : 'Safe learning environment generating actionable insights'
    }
  ];
  
  return (
    <section className="py-20 bg-secondary">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'fr' ? 'Atténuation des Risques par Parallélisation' : 'Risk Mitigation through Parallelization'}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr'
              ? 'L\'approche d\'opération parallèle minimise les risques tout en maximisant l\'apprentissage'
              : 'The parallel operation approach minimizes risk while maximizing learning'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-2 border-green-500/20 bg-green-50/50 hover:border-green-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-primary">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="mt-12 border-2 border-orange-500/30 bg-gradient-to-r from-orange-50/50 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {language === 'fr' ? 'Éviter le Piège "Tout ou Rien"' : 'Avoiding the "All-or-Nothing" Trap'}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {language === 'fr'
                    ? 'Cette approche évite le risque "tout ou rien" associé aux initiatives de transformation complètes. La continuité opérationnelle reste assurée via les processus existants, tandis que la MAO sert d\'expérimentation contrôlée générant des insights basés sur des preuves.'
                    : 'This approach avoids the "all-or-nothing" risk associated with comprehensive transformation initiatives. Business continuity remains assured via existing processes, while the MAO serves as a controlled experiment generating evidence-based insights.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const { language } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-r from-accent/10 to-transparent">
      <div className="container max-w-4xl">
        <Card className="border-2 border-accent/50 shadow-xl">
          <CardContent className="p-8 md:p-12 text-center">
            <Rocket className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {language === 'fr' 
                ? 'Prêt à Lancer Votre MAO ?' 
                : 'Ready to Launch Your MAO?'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Évaluez la préparation de votre organisation et découvrez comment l\'approche MAO peut transformer votre entreprise de manière contrôlée et mesurable.'
                : 'Assess your organization\'s readiness and discover how the MAO approach can transform your business in a controlled and measurable way.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/evaluation">
                <Button size="lg" className="bg-gradient-navy hover:opacity-90 gap-2">
                  {language === 'fr' ? 'Évaluer la Préparation' : 'Assess Readiness'}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2">
                  {language === 'fr' ? 'Demander une Consultation' : 'Request Consultation'}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// Main MAO Page
export default function MAOPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FrameworkOverviewSection />
        <BusinessProcessesSection />
        <ThreePhaseSection />
        <RiskMitigationSection />
        <CTASection />
      </main>
    </div>
  );
}
