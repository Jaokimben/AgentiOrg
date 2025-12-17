import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { toast } from "sonner";
import { 
  Network, 
  ArrowLeft, 
  Send, 
  Mail,
  Building2,
  User,
  MessageSquare,
  CheckCircle2,
  Loader2
} from "lucide-react";

// Header Component
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
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </header>
  );
}

// Contact Form
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    interest: "",
    message: ""
  });
  
  const submitContact = trpc.contact.submit.useMutation();
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.company || !formData.interest) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitContact.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role || undefined,
        interest: formData.interest,
        message: formData.message || undefined
      });
      setIsSubmitted(true);
      toast.success("Votre demande a été envoyée avec succès !");
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container max-w-2xl">
            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-primary">Demande Envoyée !</CardTitle>
                <CardDescription className="text-base">
                  Merci pour votre intérêt. Notre équipe vous contactera dans les 24-48 heures.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  En attendant, vous pouvez explorer notre outil d'évaluation pour 
                  mieux comprendre la maturité agentique de votre organisation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Retour à l'accueil
                    </Button>
                  </Link>
                  <Link href="/evaluation">
                    <Button className="bg-gradient-navy hover:opacity-90">
                      Faire l'évaluation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Demander une Consultation
            </h1>
            <div className="section-divider mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos experts vous accompagnent dans votre transformation vers une Organisation Agentique.
              Remplissez le formulaire ci-dessous pour être contacté.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Pourquoi nous contacter ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Diagnostic personnalisé</h4>
                      <p className="text-sm text-muted-foreground">Analyse approfondie de votre organisation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Feuille de route</h4>
                      <p className="text-sm text-muted-foreground">Plan d'action adapté à vos objectifs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Accompagnement expert</h4>
                      <p className="text-sm text-muted-foreground">Support continu dans votre transformation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-navy text-white">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Réponse rapide garantie</h3>
                  <p className="text-white/80 text-sm">
                    Notre équipe s'engage à vous répondre dans les 24-48 heures ouvrées 
                    pour planifier un premier échange.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Formulaire de Contact</CardTitle>
                <CardDescription>
                  Tous les champs marqués d'un * sont obligatoires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nom complet *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email professionnel *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jean.dupont@entreprise.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Entreprise *
                      </Label>
                      <Input
                        id="company"
                        placeholder="Nom de votre entreprise"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Fonction</Label>
                      <Input
                        id="role"
                        placeholder="Directeur / Manager / etc."
                        value={formData.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interest">Sujet d'intérêt *</Label>
                    <Select
                      value={formData.interest}
                      onValueChange={(value) => handleChange("interest", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diagnostic">Diagnostic de maturité agentique</SelectItem>
                        <SelectItem value="strategy">Stratégie de transformation</SelectItem>
                        <SelectItem value="mao">Mise en place d'une MAO</SelectItem>
                        <SelectItem value="governance">Gouvernance IA</SelectItem>
                        <SelectItem value="training">Formation des équipes</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez brièvement votre projet ou vos questions..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-navy hover:opacity-90 gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
