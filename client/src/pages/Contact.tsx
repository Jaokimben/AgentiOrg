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
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
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

// Contact Form
export default function Contact() {
  const { t } = useLanguage();
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
      toast.error(t("contact.error.required"));
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
      toast.success(t("contact.success.toast"));
    } catch (error) {
      toast.error(t("contact.error.generic"));
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
                <CardTitle className="text-2xl text-primary">{t("contact.success.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("contact.success.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t("contact.success.cta")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      {t("nav.backHome")}
                    </Button>
                  </Link>
                  <Link href="/evaluation">
                    <Button className="bg-gradient-navy hover:opacity-90">
                      {t("contact.success.assessment")}
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
              {t("contact.title")}
            </h1>
            <div className="section-divider mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{t("contact.whyTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t("contact.reason1.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("contact.reason1.description")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t("contact.reason2.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("contact.reason2.description")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t("contact.reason3.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("contact.reason3.description")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-navy text-white">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">{t("contact.guarantee.title")}</h3>
                  <p className="text-white/80 text-sm">
                    {t("contact.guarantee.description")}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{t("contact.form.title")}</CardTitle>
                <CardDescription>
                  {t("contact.form.required")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {t("contact.form.name")} *
                      </Label>
                      <Input
                        id="name"
                        placeholder={t("contact.form.namePlaceholder")}
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t("contact.form.email")} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("contact.form.emailPlaceholder")}
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
                        {t("contact.form.company")} *
                      </Label>
                      <Input
                        id="company"
                        placeholder={t("contact.form.companyPlaceholder")}
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">{t("contact.form.role")}</Label>
                      <Input
                        id="role"
                        placeholder={t("contact.form.rolePlaceholder")}
                        value={formData.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interest">{t("contact.form.interest")} *</Label>
                    <Select
                      value={formData.interest}
                      onValueChange={(value) => handleChange("interest", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("contact.form.selectSubject")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diagnostic">{t("contact.form.interest.diagnostic")}</SelectItem>
                        <SelectItem value="strategy">{t("contact.form.interest.strategy")}</SelectItem>
                        <SelectItem value="mao">{t("contact.form.interest.mao")}</SelectItem>
                        <SelectItem value="governance">{t("contact.form.interest.governance")}</SelectItem>
                        <SelectItem value="training">{t("contact.form.interest.training")}</SelectItem>
                        <SelectItem value="other">{t("contact.form.interest.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {t("contact.form.message")}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={t("contact.form.messagePlaceholder")}
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
                        {t("contact.form.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t("contact.form.submit")}
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
