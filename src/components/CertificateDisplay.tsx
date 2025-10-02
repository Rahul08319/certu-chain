import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, Shield, Calendar, User, GraduationCap, Award } from "lucide-react";

interface CertificateDisplayProps {
  certificateId: string;
}

const CertificateDisplay = ({ certificateId }: CertificateDisplayProps) => {
  // Demo data - in production, this would fetch from blockchain
  const certificate = {
    id: certificateId || "CERT-2024-A1B2C3",
    studentName: "Sarah Johnson",
    degree: "Bachelor of Science in Computer Science",
    institution: "Massachusetts Institute of Technology",
    dateIssued: "May 15, 2024",
    gpa: "3.92",
    honors: "Summa Cum Laude",
    blockchainHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
    transactionHash: "0x89ab4f9c8d3e2b1a56f7c8d9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    verified: true,
    timestamp: "2024-05-15T14:30:00Z",
    issuer: "MIT Registrar's Office",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Verification Status Banner */}
      <Card className="border-2 border-verified shadow-glow-primary bg-gradient-to-r from-verified/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-verified flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-verified-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-verified">Certificate Verified</h3>
              <p className="text-muted-foreground">This certificate is authentic and recorded on the Ethereum blockchain</p>
            </div>
            <Badge variant="outline" className="border-verified text-verified">
              <Shield className="h-3 w-3 mr-1" />
              Blockchain Verified
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Card */}
      <Card className="border-4 border-certificate-border shadow-glow-accent bg-gradient-to-br from-card via-card to-accent/5 overflow-hidden">
        <div className="bg-gradient-accent p-1">
          <div className="bg-card p-8 md:p-12">
            {/* Certificate Header */}
            <div className="text-center mb-8 border-b-2 border-certificate-border pb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full gradient-accent mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-accent bg-clip-text text-transparent">
                Academic Certificate
              </h2>
              <p className="text-muted-foreground">Official Blockchain-Verified Credential</p>
            </div>

            {/* Certificate Content */}
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-3">This is to certify that</p>
                <h3 className="text-4xl md:text-5xl font-bold mb-4">{certificate.studentName}</h3>
                <p className="text-lg text-muted-foreground mb-2">has successfully completed the requirements for</p>
                <h4 className="text-2xl md:text-3xl font-semibold text-primary mb-2">{certificate.degree}</h4>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Badge className="gradient-accent text-white border-0 px-4 py-1 text-sm">
                    <Award className="h-3 w-3 mr-1" />
                    {certificate.honors}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1 text-sm">
                    GPA: {certificate.gpa}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-1">Awarded by</p>
                  <p className="text-xl font-semibold">{certificate.institution}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-border">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date Issued</p>
                    <p className="font-semibold">{certificate.dateIssued}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Issued By</p>
                    <p className="font-semibold">{certificate.issuer}</p>
                  </div>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="text-center pt-6">
                <p className="text-sm text-muted-foreground mb-1">Certificate ID</p>
                <code className="text-sm font-mono bg-muted px-3 py-1 rounded">{certificate.id}</code>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Blockchain Details */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blockchain" />
            Blockchain Verification Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Smart Contract Address</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono bg-muted px-3 py-2 rounded flex-1 overflow-x-auto">
                  {certificate.blockchainHash}
                </code>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transaction Hash</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono bg-muted px-3 py-2 rounded flex-1 overflow-x-auto">
                  {certificate.transactionHash}
                </code>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Network</p>
                <Badge variant="outline" className="border-blockchain text-blockchain">
                  Ethereum Mainnet
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Block Timestamp</p>
                <p className="text-sm font-medium">{new Date(certificate.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" className="gradient-primary text-white border-0">
          Download Certificate
        </Button>
        <Button size="lg" variant="outline">
          Share Certificate
        </Button>
        <Button size="lg" variant="outline">
          View on Etherscan
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CertificateDisplay;
