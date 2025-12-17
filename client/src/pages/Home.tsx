import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Network, 
  Users, 
  Shield, 
  Layers, 
  Brain, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  Target,
  Lightbulb,
  Handshake,
  GraduationCap,
  ChevronRight
} from "lucide-react";

// Navigation Header Component
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-navy rounded-lg flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-primary">AgenticOrg</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#concepts" className="text-muted-foreground hover:text-primary transition-colors">Concepts</a>
          <a href="#governance" className="text-muted-foreground hover:text-primary transition-colors">Gouvernance</a>
          <a href="#implementation" className="text-muted-foreground hover:text-primary transition-colors">Implémentation</a>
          <a href="#collaboration" className="text-muted-foreground hover:text-primary transition-colors">Collaboration</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/evaluation">
            <Button variant="outline" className="hidden sm:flex">Évaluation</Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-gradient-navy hover:opacity-90">Contact</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-sm text-accent-foreground mb-6">
            <Lightbulb className="w-4 h-4" />
            <span>Transformation Organisationnelle par l'IA</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            Conception des{" "}
            <span className="text-gradient">Organisations Agentiques</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Un cadre complet pour transformer votre organisation grâce à la collaboration 
            Humain-IA, une gouvernance adaptative et des stratégies d'implémentation éprouvées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/evaluation">
              <Button size="lg" className="bg-gradient-navy hover:opacity-90 gap-2">
                Évaluer votre organisation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#concepts">
              <Button size="lg" variant="outline" className="gap-2">
                Découvrir le cadre
                <ChevronRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Six Core Concepts Section
const concepts = [
  {
    id: "AO",
    title: "Organisation Agentique (AO)",
    description: "Structure organisationnelle où les agents IA autonomes collaborent avec les humains pour atteindre des objectifs communs.",
    icon: Building2,
    level: "Stratégique"
  },
  {
    id: "AT",
    title: "Équipe Agentique (AT)",
    description: "Unité de travail combinant agents humains et IA avec des rôles complémentaires et une coordination fluide.",
    icon: Users,
    level: "Réseau"
  },
  {
    id: "AMO",
    title: "Mode Opératoire Agentique (AMO)",
    description: "Protocoles et processus standardisés pour la collaboration efficace entre humains et agents IA.",
    icon: Layers,
    level: "Agent"
  },
  {
    id: "SAIFE",
    title: "Cadre SAIFE",
    description: "Framework de gouvernance pour la Sécurité, l'Alignement, l'Interopérabilité, la Fiabilité et l'Éthique.",
    icon: Shield,
    level: "Stratégique"
  },
  {
    id: "HS",
    title: "Compétences Humaniques (HS)",
    description: "Compétences distinctement humaines essentielles dans un environnement de travail augmenté par l'IA.",
    icon: Brain,
    level: "Agent"
  },
  {
    id: "MAO",
    title: "Organisation Agentique Minimale (MAO)",
    description: "Unité autonome de type startup pour expérimenter les principes agentiques de manière contrôlée.",
    icon: Target,
    level: "Réseau"
  }
];

function ConceptsSection() {
  return (
    <section id="concepts" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Six Concepts Fondateurs
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un cadre conceptuel complet pour comprendre et implémenter 
            la transformation vers une Organisation Agentique.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <Card key={concept.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-accent">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <concept.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {concept.level}
                  </span>
                </div>
                <CardTitle className="text-xl text-primary mt-4">
                  <span className="text-accent font-bold">{concept.id}</span> - {concept.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {concept.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Governance Architecture Section
const governanceLevels = [
  {
    level: "Stratégique",
    title: "Gouvernance Stratégique",
    description: "Définition de la vision, des politiques globales et de l'alignement avec les objectifs organisationnels.",
    items: ["Vision et mission agentique", "Politiques d'IA responsable", "Allocation des ressources", "Gestion des risques stratégiques"]
  },
  {
    level: "Réseau",
    title: "Gouvernance de Réseau",
    description: "Coordination des interactions entre équipes agentiques et gestion des flux d'information.",
    items: ["Protocoles d'interopérabilité", "Standards de communication", "Mécanismes de coordination", "Résolution des conflits"]
  },
  {
    level: "Agent",
    title: "Gouvernance d'Agent",
    description: "Règles et contraintes pour le comportement individuel des agents IA et humains.",
    items: ["Limites d'autonomie", "Critères de décision", "Mécanismes de supervision", "Protocoles d'escalade"]
  }
];

function GovernanceSection() {
  return (
    <section id="governance" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Architecture de Gouvernance Multi-Niveaux
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une structure de gouvernance intégrée assurant cohérence, 
            responsabilité et adaptabilité à tous les niveaux.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {governanceLevels.map((gov, index) => (
            <div key={gov.level} className="relative">
              <div className="bg-card rounded-xl p-8 h-full border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-navy flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <span className="text-sm text-accent font-semibold">{gov.level}</span>
                    <h3 className="text-xl font-bold text-primary">{gov.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{gov.description}</p>
                <ul className="space-y-3">
                  {gov.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {index < governanceLevels.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Implementation Strategy Section
const implementationPhases = [
  {
    phase: "Phase 1",
    title: "Fondations",
    duration: "1-3 ans",
    description: "Établir l'infrastructure technologique et culturelle nécessaire à la transformation.",
    activities: [
      "Évaluation de la préparation organisationnelle",
      "Développement des cadres de gouvernance",
      "Formation et sensibilisation des équipes",
      "Sélection des projets pilotes"
    ]
  },
  {
    phase: "Phase 2",
    title: "Pilote",
    duration: "3-7 ans",
    description: "Implémenter des systèmes agentiques à portée limitée et itérer basé sur les retours.",
    activities: [
      "Déploiement de la MAO",
      "Formation d'équipes interfonctionnelles",
      "Mise en place de systèmes de suivi",
      "Collecte et analyse des retours"
    ]
  },
  {
    phase: "Phase 3",
    title: "Déploiement",
    duration: "7-10 ans",
    description: "Étendre les capacités agentiques à l'ensemble de l'organisation.",
    activities: [
      "Expansion organisationnelle",
      "Durcissement de la gouvernance",
      "Optimisation continue",
      "Adaptation et évolution"
    ]
  }
];

function ImplementationSection() {
  return (
    <section id="implementation" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Stratégie d'Implémentation en Trois Phases
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une feuille de route structurée pour transformer progressivement 
            votre organisation vers un modèle agentique.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/50"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {implementationPhases.map((phase, index) => (
              <div key={phase.phase} className="relative">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-navy text-white font-bold text-lg relative z-10">
                    {index + 1}
                  </div>
                </div>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-accent">{phase.phase}</span>
                      <span className="text-sm text-muted-foreground">{phase.duration}</span>
                    </div>
                    <CardTitle className="text-2xl text-primary">{phase.title}</CardTitle>
                    <CardDescription className="text-base">{phase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// MAO Section
function MAOSection() {
  return (
    <section id="mao" className="py-20 bg-secondary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-accent mb-2 block">Approche Progressive</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              L'Organisation Agentique Minimale (MAO)
            </h2>
            <div className="section-divider mb-6"></div>
            <p className="text-lg text-muted-foreground mb-6">
              La MAO est une unité autonome de type startup opérant comme un laboratoire 
              expérimental au sein de l'organisation mère. Elle permet de tester les principes 
              agentiques contre des contraintes organisationnelles réalistes.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Fonctions Complètes</h4>
                  <p className="text-muted-foreground">RH, Finance, Opérations, Marketing, Stratégie intégrés</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Focus Stratégique</h4>
                  <p className="text-muted-foreground">Trois processus commerciaux clés à valeur mesurable</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Approche Agile</h4>
                  <p className="text-muted-foreground">Non-disruptive, itérative et adaptative</p>
                </div>
              </div>
            </div>
            <Link href="/evaluation">
              <Button className="bg-gradient-navy hover:opacity-90 gap-2">
                Évaluer votre préparation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold text-primary mb-6">Avantages de la MAO</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Autonomie opérationnelle</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">Min</div>
                <div className="text-sm text-muted-foreground">Risque organisationnel</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">Max</div>
                <div className="text-sm text-muted-foreground">Potentiel d'apprentissage</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">3</div>
                <div className="text-sm text-muted-foreground">Processus clés ciblés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Collaboration Spectrum Section
const collaborationPillars = [
  {
    title: "Prise de Décision Distribuée",
    description: "Pouvoir décisionnel basé sur la compétence et le contexte, non sur la hiérarchie.",
    icon: Target
  },
  {
    title: "Gouvernance Adaptative",
    description: "Modes de gouvernance flexibles qui évoluent avec les besoins organisationnels.",
    icon: Shield
  },
  {
    title: "Collaboration Fluide",
    description: "Interaction transparente entre humains et IA avec des protocoles standardisés.",
    icon: Handshake
  },
  {
    title: "Apprentissage Continu",
    description: "Adaptation et évolution organisationnelle permanentes basées sur les retours.",
    icon: GraduationCap
  }
];

function CollaborationSection() {
  return (
    <section id="collaboration" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Spectre de Collaboration Humain-IA
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les quatre piliers de l'intelligence collaborative pour une 
            synergie optimale entre humains et agents IA.
          </p>
        </div>
        
        {/* Collaboration Modes */}
        <div className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold text-primary mb-6 text-center">Modes de Collaboration</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                <div className="text-2xl font-bold text-primary mb-2">Humain-Led</div>
                <div className="text-4xl font-bold text-accent mb-2">40%</div>
                <p className="text-sm text-muted-foreground">L'humain dirige, l'IA assiste et amplifie</p>
              </div>
              <div className="text-center p-6 bg-accent/10 rounded-lg border-2 border-accent/30">
                <div className="text-2xl font-bold text-primary mb-2">Pair-à-Pair</div>
                <div className="text-4xl font-bold text-accent mb-2">35%</div>
                <p className="text-sm text-muted-foreground">Collaboration équilibrée et complémentaire</p>
              </div>
              <div className="text-center p-6 bg-muted rounded-lg border-2 border-border">
                <div className="text-2xl font-bold text-primary mb-2">IA-Led</div>
                <div className="text-4xl font-bold text-accent mb-2">25%</div>
                <p className="text-sm text-muted-foreground">L'IA dirige, l'humain supervise et valide</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Four Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collaborationPillars.map((pillar) => (
            <Card key={pillar.title} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-gradient-navy rounded-full flex items-center justify-center mb-4">
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-primary">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{pillar.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-gradient-navy">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Transformer Votre Organisation ?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Évaluez la maturité agentique de votre organisation et obtenez 
            des recommandations personnalisées pour votre transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/evaluation">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                Commencer l'évaluation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                Demander une consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-navy rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-primary">AgenticOrg</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Transformation organisationnelle par l'intelligence agentique.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Concepts</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#concepts" className="hover:text-primary transition-colors">Six Concepts Fondateurs</a></li>
              <li><a href="#governance" className="hover:text-primary transition-colors">Gouvernance Multi-Niveaux</a></li>
              <li><a href="#mao" className="hover:text-primary transition-colors">Organisation Agentique Minimale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#implementation" className="hover:text-primary transition-colors">Stratégie d'Implémentation</a></li>
              <li><a href="#collaboration" className="hover:text-primary transition-colors">Collaboration Humain-IA</a></li>
              <li><Link href="/evaluation" className="hover:text-primary transition-colors">Outil d'Évaluation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Demander une consultation</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Nous contacter</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 AgenticOrg. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Home Page
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ConceptsSection />
        <GovernanceSection />
        <ImplementationSection />
        <MAOSection />
        <CollaborationSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
