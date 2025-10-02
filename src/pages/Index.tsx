import { useState } from "react";
import { Search, Shield, Award, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CertificateDisplay from "@/components/CertificateDisplay";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [certificateId, setCertificateId] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const { toast } = useToast();

  const handleVerify = () => {
    if (!certificateId.trim()) {
      toast({
        title: "Certificate ID Required",
        description: "Please enter a certificate ID to verify",
        variant: "destructive",
      });
      return;
    }

    // Demo verification
    setShowCertificate(true);
    toast({
      title: "Verification Complete",
      description: "Certificate verified on blockchain",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blockchain to-primary-foreground py-20 blockchain-pattern">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Powered by Ethereum Blockchain</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Blockchain Certificate
              <span className="block gradient-accent bg-clip-text text-transparent">Verification</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Secure, immutable, and instantly verifiable academic credentials stored on the Ethereum blockchain
            </p>

            {/* Search Box */}
            <Card className="shadow-glow-primary border-white/20 bg-white/95 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter Certificate ID or Transaction Hash"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleVerify}
                    className="h-12 px-8 gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
                  >
                    Verify Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certificate Display */}
      {showCertificate && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <CertificateDisplay certificateId={certificateId} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Blockchain Certificates?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leverage the power of blockchain technology for credential verification
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-colors shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Immutable Records</CardTitle>
                <CardDescription className="text-base">
                  Once issued, certificates cannot be altered or forged, ensuring permanent authenticity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-verified transition-colors shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-verified flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Instant Verification</CardTitle>
                <CardDescription className="text-base">
                  Verify credentials in seconds through our blockchain-powered verification system
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-accent flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Global Trust</CardTitle>
                <CardDescription className="text-base">
                  Certificates are recognized worldwide with transparent blockchain proof
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15,432</div>
              <div className="text-muted-foreground">Certificates Issued</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-verified mb-2">98.9%</div>
              <div className="text-muted-foreground">Verification Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">245</div>
              <div className="text-muted-foreground">Institutions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blockchain mb-2">24/7</div>
              <div className="text-muted-foreground">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Issue Certificates?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join leading institutions using blockchain technology for credential verification
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
              View Documentation
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
