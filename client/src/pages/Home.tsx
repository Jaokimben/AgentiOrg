import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
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
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about">
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("nav.about")}</span>
          </Link>
          <a href="#concepts" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.concepts")}</a>
          <a href="#governance" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.governance")}</a>
          <a href="#implementation" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.implementation")}</a>
          <a href="#collaboration" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.collaboration")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link href="/evaluation">
            <Button variant="outline" className="hidden sm:flex">{t("nav.assessment")}</Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-gradient-navy hover:opacity-90">{t("nav.contact")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-sm text-accent-foreground mb-6">
            <Lightbulb className="w-4 h-4" />
            <span>{t("hero.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title2")}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/evaluation">
              <Button size="lg" className="bg-gradient-navy hover:opacity-90 gap-2">
                {t("hero.cta1")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#concepts">
              <Button size="lg" variant="outline" className="gap-2">
                {t("hero.cta2")}
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
function ConceptsSection() {
  const { t } = useLanguage();
  
  const concepts = [
    {
      id: "AO",
      titleKey: "concepts.ao.title",
      descriptionKey: "concepts.ao.description",
      icon: Building2,
      levelKey: "concepts.level.strategic"
    },
    {
      id: "AT",
      titleKey: "concepts.at.title",
      descriptionKey: "concepts.at.description",
      icon: Users,
      levelKey: "concepts.level.network"
    },
    {
      id: "AMO",
      titleKey: "concepts.amo.title",
      descriptionKey: "concepts.amo.description",
      icon: Layers,
      levelKey: "concepts.level.agent"
    },
    {
      id: "SAIFE",
      titleKey: "concepts.saife.title",
      descriptionKey: "concepts.saife.description",
      icon: Shield,
      levelKey: "concepts.level.strategic"
    },
    {
      id: "HS",
      titleKey: "concepts.hs.title",
      descriptionKey: "concepts.hs.description",
      icon: Brain,
      levelKey: "concepts.level.agent"
    },
    {
      id: "MAO",
      titleKey: "concepts.mao.title",
      descriptionKey: "concepts.mao.description",
      icon: Target,
      levelKey: "concepts.level.network"
    }
  ];

  return (
    <section id="concepts" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("concepts.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("concepts.description")}
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
                    {t(concept.levelKey)}
                  </span>
                </div>
                <CardTitle className="text-xl text-primary mt-4">
                  <span className="text-accent font-bold">{concept.id}</span> - {t(concept.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t(concept.descriptionKey)}
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
function GovernanceSection() {
  const { t } = useLanguage();
  
  const governanceLevels = [
    {
      level: t("concepts.level.strategic"),
      titleKey: "governance.strategic.title",
      descriptionKey: "governance.strategic.description",
      items: [
        "governance.strategic.item1",
        "governance.strategic.item2",
        "governance.strategic.item3",
        "governance.strategic.item4"
      ]
    },
    {
      level: t("concepts.level.network"),
      titleKey: "governance.network.title",
      descriptionKey: "governance.network.description",
      items: [
        "governance.network.item1",
        "governance.network.item2",
        "governance.network.item3",
        "governance.network.item4"
      ]
    },
    {
      level: t("concepts.level.agent"),
      titleKey: "governance.agent.title",
      descriptionKey: "governance.agent.description",
      items: [
        "governance.agent.item1",
        "governance.agent.item2",
        "governance.agent.item3",
        "governance.agent.item4"
      ]
    }
  ];

  return (
    <section id="governance" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("governance.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("governance.description")}
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
                    <h3 className="text-xl font-bold text-primary">{t(gov.titleKey)}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{t(gov.descriptionKey)}</p>
                <ul className="space-y-3">
                  {gov.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{t(item)}</span>
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
function ImplementationSection() {
  const { t } = useLanguage();
  
  const implementationPhases = [
    {
      phase: "Phase 1",
      titleKey: "implementation.phase1.title",
      durationKey: "implementation.phase1.duration",
      descriptionKey: "implementation.phase1.description",
      activities: [
        "implementation.phase1.item1",
        "implementation.phase1.item2",
        "implementation.phase1.item3",
        "implementation.phase1.item4"
      ]
    },
    {
      phase: "Phase 2",
      titleKey: "implementation.phase2.title",
      durationKey: "implementation.phase2.duration",
      descriptionKey: "implementation.phase2.description",
      activities: [
        "implementation.phase2.item1",
        "implementation.phase2.item2",
        "implementation.phase2.item3",
        "implementation.phase2.item4"
      ]
    },
    {
      phase: "Phase 3",
      titleKey: "implementation.phase3.title",
      durationKey: "implementation.phase3.duration",
      descriptionKey: "implementation.phase3.description",
      activities: [
        "implementation.phase3.item1",
        "implementation.phase3.item2",
        "implementation.phase3.item3",
        "implementation.phase3.item4"
      ]
    }
  ];

  return (
    <section id="implementation" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("implementation.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("implementation.description")}
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
                      <span className="text-sm text-muted-foreground">{t(phase.durationKey)}</span>
                    </div>
                    <CardTitle className="text-2xl text-primary">{t(phase.titleKey)}</CardTitle>
                    <CardDescription className="text-base">{t(phase.descriptionKey)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{t(activity)}</span>
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
  const { t } = useLanguage();
  
  return (
    <section id="mao" className="py-20 bg-secondary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-accent mb-2 block">{t("mao.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t("mao.title")}
            </h2>
            <div className="section-divider mb-6"></div>
            <p className="text-lg text-muted-foreground mb-6">
              {t("mao.description")}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t("mao.feature1.title")}</h4>
                  <p className="text-muted-foreground">{t("mao.feature1.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t("mao.feature2.title")}</h4>
                  <p className="text-muted-foreground">{t("mao.feature2.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t("mao.feature3.title")}</h4>
                  <p className="text-muted-foreground">{t("mao.feature3.description")}</p>
                </div>
              </div>
            </div>
            <Link href="/evaluation">
              <Button className="bg-gradient-navy hover:opacity-90 gap-2">
                {t("mao.cta")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold text-primary mb-6">{t("mao.benefits")}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">{t("mao.autonomy")}</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">Min</div>
                <div className="text-sm text-muted-foreground">{t("mao.risk")}</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">Max</div>
                <div className="text-sm text-muted-foreground">{t("mao.learning")}</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">3</div>
                <div className="text-sm text-muted-foreground">{t("mao.processes")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Collaboration Spectrum Section
function CollaborationSection() {
  const { t } = useLanguage();
  
  const collaborationPillars = [
    {
      titleKey: "collaboration.pillar1.title",
      descriptionKey: "collaboration.pillar1.description",
      icon: Target
    },
    {
      titleKey: "collaboration.pillar2.title",
      descriptionKey: "collaboration.pillar2.description",
      icon: Shield
    },
    {
      titleKey: "collaboration.pillar3.title",
      descriptionKey: "collaboration.pillar3.description",
      icon: Handshake
    },
    {
      titleKey: "collaboration.pillar4.title",
      descriptionKey: "collaboration.pillar4.description",
      icon: GraduationCap
    }
  ];

  return (
    <section id="collaboration" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("collaboration.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("collaboration.description")}
          </p>
        </div>
        
        {/* Collaboration Modes */}
        <div className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold text-primary mb-6 text-center">{t("collaboration.modes")}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                <div className="text-2xl font-bold text-primary mb-2">{t("collaboration.humanLed")}</div>
                <div className="text-4xl font-bold text-accent mb-2">40%</div>
                <p className="text-sm text-muted-foreground">{t("collaboration.humanLed.description")}</p>
              </div>
              <div className="text-center p-6 bg-accent/10 rounded-lg border-2 border-accent/30">
                <div className="text-2xl font-bold text-primary mb-2">{t("collaboration.peerToPeer")}</div>
                <div className="text-4xl font-bold text-accent mb-2">35%</div>
                <p className="text-sm text-muted-foreground">{t("collaboration.peerToPeer.description")}</p>
              </div>
              <div className="text-center p-6 bg-muted rounded-lg border-2 border-border">
                <div className="text-2xl font-bold text-primary mb-2">{t("collaboration.aiLed")}</div>
                <div className="text-4xl font-bold text-accent mb-2">25%</div>
                <p className="text-sm text-muted-foreground">{t("collaboration.aiLed.description")}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Four Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collaborationPillars.map((pillar) => (
            <Card key={pillar.titleKey} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-gradient-navy rounded-full flex items-center justify-center mb-4">
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-primary">{t(pillar.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t(pillar.descriptionKey)}</CardDescription>
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
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-navy">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/evaluation">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                {t("cta.button1")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                {t("cta.button2")}
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
  const { t } = useLanguage();
  
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
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.concepts")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#concepts" className="hover:text-primary transition-colors">{t("footer.sixConcepts")}</a></li>
              <li><a href="#governance" className="hover:text-primary transition-colors">{t("footer.multiLevelGovernance")}</a></li>
              <li><a href="#mao" className="hover:text-primary transition-colors">{t("footer.mao")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#implementation" className="hover:text-primary transition-colors">{t("footer.implementationStrategy")}</a></li>
              <li><a href="#collaboration" className="hover:text-primary transition-colors">{t("footer.humanAICollaboration")}</a></li>
              <li><Link href="/evaluation" className="hover:text-primary transition-colors">{t("footer.assessmentTool")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t("footer.requestConsultation")}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t("footer.contactUs")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
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
