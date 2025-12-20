import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { 
  Network, 
  ArrowLeft,
  BookOpen,
  Users,
  Shield,
  Layers,
  Brain,
  Target,
  Building2,
  TrendingUp,
  GitBranch,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Globe
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
            <BookOpen className="w-4 h-4" />
            <span>{language === 'fr' ? 'Cadre Conceptuel' : 'Conceptual Framework'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            {language === 'fr' 
              ? 'Conception des Organisations Agentiques' 
              : 'Designing Agentic Organizations'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Human-AI Collaboration, Gouvernance, et l\'Avenir du Travail'
              : 'Human-AI Collaboration, Governance, and the Future of Work'}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{language === 'fr' ? 'Par Jalil Halim' : 'By Jalil Halim'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{language === 'fr' ? 'Paris, France' : 'Paris, France'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Abstract Section
function AbstractSection() {
  const { language } = useLanguage();
  
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-5xl">
        <Card className="border-2 border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              {language === 'fr' ? 'Résumé' : 'Abstract'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">{language === 'fr' ? 'Contexte :' : 'Background:'}</strong>{' '}
              {language === 'fr'
                ? 'Le développement de l\'intelligence artificielle agentique, capable d\'effectuer des tâches de manière autonome, de définir de nouveaux objectifs et d\'apprendre de manière adaptative, implique un changement de paradigme dans la conception organisationnelle.'
                : 'The development of agentic artificial intelligence, capable of performing tasks autonomously, self-setting new goals and learning adaptively, implies a paradigm shift in organizational design.'}
            </p>
            <p>
              <strong className="text-foreground">{language === 'fr' ? 'Objectif :' : 'Objective:'}</strong>{' '}
              {language === 'fr'
                ? 'Ce cadre présente une approche globale pour la conception et la mise en œuvre d\'Organisations Agentiques, où les humains et les agents IA agissent comme des participants organisationnels plutôt que de simples outils.'
                : 'The paper presents an overall framework for the design and implementation of Agentic Organizations, where humans and AI agents act as organizational participants rather than mere tools.'}
            </p>
            <p>
              <strong className="text-foreground">{language === 'fr' ? 'Résultats :' : 'Results:'}</strong>{' '}
              {language === 'fr'
                ? 'Les cadres proposés - incluant l\'approche d\'Organisation Agentique Minimale, l\'architecture de gouvernance multi-niveaux avec Agentic Twin, Overlay Agentic Mesh et le cadre SAIFE - offrent des lignes directrices actionnables pour la transformation organisationnelle.'
                : 'The proposed frameworks—including the Minimum Agentic Organization approach, multi-level governance architecture featuring Agentic Twin, Overlay Agentic Mesh, and SAIFE framework—offer actionable guidelines for organizational transformation.'}
            </p>
            <p>
              <strong className="text-foreground">{language === 'fr' ? 'Conclusion :' : 'Conclusion:'}</strong>{' '}
              {language === 'fr'
                ? 'Les organisations agentiques réussies nécessitent une prise de décision distribuée, des modes de gouvernance adaptatifs et des mécanismes de collaboration Humain-IA fluides qui amplifient l\'intelligence collective tout en préservant l\'autonomie humaine.'
                : 'Successful agentic organizations need to have distributed decision-making, adaptive governance modes, and fluid human-AI collaboration mechanisms that amplify collective intelligence while preserving human agency.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// Key Concepts Section
function KeyConceptsSection() {
  const { language } = useLanguage();
  
  const concepts = [
    {
      icon: Building2,
      id: 'AO',
      title: language === 'fr' ? 'Organisation Agentique' : 'Agentic Organization',
      description: language === 'fr'
        ? 'Structure organisationnelle où les agents IA autonomes collaborent avec les humains comme des participants à part entière, non de simples outils.'
        : 'Organizational structure where autonomous AI agents collaborate with humans as full participants, not mere tools.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      id: 'AT',
      title: language === 'fr' ? 'Jumeau Agentique' : 'Agentic Twin',
      description: language === 'fr'
        ? 'Contrepartie numérique intelligente de chaque rôle humain maintenant une représentation synchronisée des compétences, décisions et contexte de l\'agent.'
        : 'Digital intelligent counterpart to each human role maintaining a synchronized representation of the agent\'s skills, decisions, and context.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Layers,
      id: 'AMO',
      title: language === 'fr' ? 'Maillage Agentique' : 'Agentic Mesh Overlay',
      description: language === 'fr'
        ? 'Réseau d\'agents IA interconnectés formant une couche de coordination sous les équipes humaines décentralisées.'
        : 'Lattice of interconnected AI agents forming a coordination layer beneath decentralized human teams.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Shield,
      id: 'SAIFE',
      title: language === 'fr' ? 'Cadre SAIFE' : 'SAIFE Framework',
      description: language === 'fr'
        ? 'Framework modulaire d\'orchestration intégrant la gestion des agents, la gouvernance des données, les protocoles de collaboration et les moteurs de conformité.'
        : 'Modular orchestration layer integrating agent management, data governance, collaboration protocols, and compliance engines.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Brain,
      id: 'HS',
      title: language === 'fr' ? 'Compétences Humaniques' : 'Humanic Skills',
      description: language === 'fr'
        ? 'Capacités distinctement humaines qui résistent à l\'automation et deviennent exponentiellement plus précieuses dans un environnement agentique.'
        : 'Uniquely human capabilities that resist automation and become exponentially more valuable in an agentic environment.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Target,
      id: 'MAO',
      title: language === 'fr' ? 'Organisation Agentique Minimale' : 'Minimum Agentic Organization',
      description: language === 'fr'
        ? 'Unité autonome de type startup servant de laboratoire expérimental sûr pour tester les principes agentiques sans perturber les opérations principales.'
        : 'Self-contained startup-style unit serving as a safe experimental laboratory for testing agentic principles without disrupting core operations.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    }
  ];
  
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'fr' ? 'Six Nouveaux Concepts' : 'Six New Concepts'}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Fondements théoriques pour la conception d\'organisations agentiques'
              : 'Theoretical foundations for agentic organization design'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <Card key={concept.id} className="group hover:shadow-xl transition-all duration-300 border-border hover:border-accent">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${concept.bgColor} rounded-xl flex items-center justify-center`}>
                    <concept.icon className={`w-7 h-7 ${concept.color}`} />
                  </div>
                  <span className={`text-xl font-bold ${concept.color}`}>{concept.id}</span>
                </div>
                <CardTitle className="text-xl text-primary">{concept.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{concept.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Problem Statement Section
function ProblemStatementSection() {
  const { language } = useLanguage();
  
  const limitations = [
    {
      icon: AlertTriangle,
      title: language === 'fr' ? 'Goulets d\'étranglement informationnels' : 'Information bottlenecks',
      description: language === 'fr'
        ? 'Les décideurs humains deviennent des points de contrainte incapables de traiter le volume et la vélocité des insights générés par les agents IA.'
        : 'Human decision-makers become constraint points that cannot process the volume and velocity of insights generated by AI agents.'
    },
    {
      icon: AlertTriangle,
      title: language === 'fr' ? 'Latence décisionnelle' : 'Decision latency',
      description: language === 'fr'
        ? 'Les chaînes d\'approbation multi-niveaux introduisent des délais incompatibles avec les systèmes adaptatifs en temps réel.'
        : 'Multilayer approval chains introduce delays incompatible with real-time adaptive systems.'
    },
    {
      icon: AlertTriangle,
      title: language === 'fr' ? 'Surcharge cognitive' : 'Cognitive overload',
      description: language === 'fr'
        ? 'Les managers doivent superviser simultanément des équipes humaines et des agents IA.'
        : 'Managers have to supervise both human teams and AI agents simultaneously.'
    },
    {
      icon: AlertTriangle,
      title: language === 'fr' ? 'Lacunes de gouvernance' : 'Governance gaps',
      description: language === 'fr'
        ? 'Les cadres de responsabilité actuels ne traitent pas la prise de décision distribuée entre agents humains et artificiels.'
        : 'Present accountability frameworks do not address distributed decision-making between human and artificial agents.'
    }
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'fr' ? 'Limitations des Structures Traditionnelles' : 'Limitations of Traditional Structures'}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Les structures organisationnelles hiérarchiques traditionnelles présentent des faiblesses critiques lors de l\'intégration d\'IA agentique'
              : 'Traditional hierarchical organizational structures have critical limitations when integrating agentic AI'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {limitations.map((limitation, index) => (
            <Card key={index} className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                    <limitation.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-primary">{limitation.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{limitation.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Evolution Section
function EvolutionSection() {
  const { language } = useLanguage();
  
  return (
    <section className="py-20 bg-secondary">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'fr' 
              ? 'Évolution vers l\'Enterprise 5.0' 
              : 'Evolution toward Enterprise 5.0'}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Des hiérarchies traditionnelles aux réseaux agentiques : un bond évolutif au-delà de l\'Industrie 4.0'
              : 'From traditional hierarchies to agentic networks: an evolutionary leap beyond Industry 4.0'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <Card className="border-2 border-accent/30">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-navy rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-primary">
                {language === 'fr' ? 'Orientation Humaine' : 'Human Orientation'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'fr'
                  ? 'L\'IA augmente les capacités humaines au lieu de les remplacer, créant une synergie entre intelligence humaine et artificielle.'
                  : 'AI augments human capabilities rather than replacing them, creating synergy between human and artificial intelligence.'}
              </p>
            </CardContent>
          </Card>
          
          {/* Pillar 2 */}
          <Card className="border-2 border-accent/30">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-navy rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-primary">
                {language === 'fr' ? 'Résilience & Flexibilité' : 'Resilience & Flexibility'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'fr'
                  ? 'Modèles opérationnels auto-optimisants et résistants aux perturbations, capables de s\'adapter rapidement aux changements.'
                  : 'Self-optimizing and disruption-resilient operating models, capable of rapidly adapting to changes.'}
              </p>
            </CardContent>
          </Card>
          
          {/* Pillar 3 */}
          <Card className="border-2 border-accent/30">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-navy rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-primary">
                {language === 'fr' ? 'Durabilité & Éthique' : 'Sustainability & Ethics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'fr'
                  ? 'Contribution à des objectifs sociétaux plus larges tout en créant de la valeur organisationnelle durable.'
                  : 'Contributing to broader societal goals while creating sustainable organizational value.'}
              </p>
            </CardContent>
          </Card>
        </div>
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
            <Lightbulb className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {language === 'fr' 
                ? 'Prêt à Transformer Votre Organisation ?' 
                : 'Ready to Transform Your Organization?'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Évaluez la maturité agentique de votre organisation et découvrez votre chemin vers la transformation.'
                : 'Assess your organization\'s agentic maturity and discover your pathway to transformation.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/evaluation">
                <Button size="lg" className="bg-gradient-navy hover:opacity-90 gap-2">
                  {language === 'fr' ? 'Commencer l\'Évaluation' : 'Start Assessment'}
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

// Main About Page
export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AbstractSection />
        <KeyConceptsSection />
        <ProblemStatementSection />
        <EvolutionSection />
        <CTASection />
      </main>
    </div>
  );
}
