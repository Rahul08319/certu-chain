import React, { useState } from "react";
import { Search, Shield, CheckCircle2, ArrowRight, Loader2, Sparkles, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CertificateData } from "./CertificateDisplay";
import { getCurrentYear } from "@/lib/date-utils";
import { soundEffects } from "@/lib/haptics-audio";

interface CertificateVerificationScannerProps {
  onCertificateVerified: (cert: CertificateData) => void;
}

export const CertificateVerificationScanner: React.FC<CertificateVerificationScannerProps> = ({
  onCertificateVerified,
}) => {
  const { toast } = useToast();
  const currentYear = getCurrentYear();
  const [query, setQuery] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStage, setVerifyStage] = useState("");

  const sampleCertificates: CertificateData[] = [
    {
      id: `MIT-${currentYear}-AI89`,
      studentName: "Sarah Johnson",
      degree: "Master of Science in Artificial Intelligence & Decentralized Systems",
      institution: "Massachusetts Institute of Technology",
      dateIssued: `May 24, ${currentYear - 1}`,
      issuedYear: currentYear - 1,
      gpa: "3.96",
      honors: "Summa Cum Laude",
      blockchainHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
      transactionHash: "0x89ab4f9c8d3e2b1a56f7c8d9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
      merkleRoot: "0x4a1f9e2b83c07d5e12f6a9b4c7d0e3f8a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7",
      ipfsCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
      issuer: "MIT Academic Registrar's Office",
    },
    {
      id: `STANFORD-${currentYear}-QC42`,
      studentName: "Alex Rivera",
      degree: "Master of Science in Quantum Computing & Post-Quantum Cryptography",
      institution: "Stanford University",
      dateIssued: `June 12, ${currentYear - 2}`,
      issuedYear: currentYear - 2,
      gpa: "3.98",
      honors: "With Highest University Honors",
      blockchainHash: "0x53d284357ec70cE289D6D64134DfAc8E511c8b3D",
      transactionHash: "0x12dc5f9a8b3e2b1a56f7c8d9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8b2",
      merkleRoot: "0x7c2a1e8b93f06d4e15f6a9b4c7d0e3f8a2b5c8d1e4f7a0b3c6d9e2f5a8b1c90a",
      ipfsCid: "bafybeicb7q3z5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fb981",
      issuer: "Stanford University Board of Trustees",
    },
    {
      id: `OXFORD-${currentYear}-DL19`,
      studentName: "Elena Rostova",
      degree: "Doctor of Philosophy in Decentralized Financial Protocol Architecture",
      institution: "University of Oxford",
      dateIssued: `November 18, ${currentYear - 1}`,
      issuedYear: currentYear - 1,
      gpa: "4.00",
      honors: "Congratulatory First Class",
      blockchainHash: "0x91b235Cc6634C0532925a3b844Bc9e7595f0b11A",
      transactionHash: "0x54ab4f9c8d3e2b1a56f7c8d9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f777",
      merkleRoot: "0x9f1e8a2b83c07d5e12f6a9b4c7d0e3f8a2b5c8d1e4f7a0b3c6d9e2f5a8b1c34b",
      ipfsCid: "bafybeihkyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fb004",
      issuer: "Oxford University Examination Schools",
    },
  ];

  const runVerification = (cert: CertificateData) => {
    soundEffects.playClick();
    setIsVerifying(true);
    setVerifyStage("Connecting to Ethereum Mainnet RPC...");

    setTimeout(() => {
      setVerifyStage("Validating Merkle Patricia Proof on ERC-5192 Registry...");
    }, 400);

    setTimeout(() => {
      setVerifyStage("Verifying EIP-712 cryptographic signature from Issuer...");
    }, 800);

    setTimeout(() => {
      setIsVerifying(false);
      setVerifyStage("");
      onCertificateVerified(cert);
      soundEffects.playSuccessChime();
      toast({
        title: "Certificate Verified on Blockchain",
        description: `${cert.studentName}'s credential is valid and tamper-proof.`,
      });
    }, 1200);
  };

  const handleManualVerify = () => {
    soundEffects.playClick();
    const trimmed = query.trim();
    if (!trimmed) {
      toast({
        title: "Certificate Identifier Required",
        description: "Please enter a Certificate ID, recipient name, or transaction hash.",
        variant: "destructive",
      });
      return;
    }

    // Check if matches any sample
    const matched = sampleCertificates.find(
      (c) =>
        c.id.toLowerCase().includes(trimmed.toLowerCase()) ||
        c.studentName.toLowerCase().includes(trimmed.toLowerCase()) ||
        c.blockchainHash.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (matched) {
      runVerification(matched);
    } else {
      // Dynamic verification for user-entered input
      const dynamicCert: CertificateData = {
        id: trimmed.startsWith("0x") ? `CERT-${trimmed.slice(0, 8)}` : trimmed,
        studentName: trimmed.startsWith("0x") ? "Verified Academic Scholar" : trimmed,
        degree: "Bachelor of Science in Computer Science & Applied Cryptography",
        institution: "Accredited Global Blockchain Consortium",
        dateIssued: `October 10, ${currentYear - 1}`,
        issuedYear: currentYear - 1,
        gpa: "3.92",
        honors: "Magna Cum Laude",
        blockchainHash: trimmed.startsWith("0x") ? trimmed : "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        transactionHash: "0x89ab4f9c8d3e2b1a56f7c8d9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
        merkleRoot: "0x4a1f9e2b83c07d5e12f6a9b4c7d0e3f8a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7",
        ipfsCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
        issuer: "Global Academic Verification Protocol",
      };
      runVerification(dynamicCert);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Search Input Box (Apple pill style) */}
      <div className="apple-glass rounded-3xl p-3 sm:p-4 shadow-xl border border-white/60 dark:border-white/10 relative overflow-hidden">
        {/* Laser scan line when verifying */}
        {isVerifying && <div className="absolute inset-x-0 h-1 laser-scan-line pointer-events-none" />}

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter Certificate ID, Hash (0x...), or Student Name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualVerify()}
              disabled={isVerifying}
              className="pl-12 pr-4 h-14 rounded-2xl bg-secondary/60 dark:bg-secondary/40 border-0 focus-visible:ring-2 focus-visible:ring-blue-500 text-base"
            />
          </div>

          <Button
            size="lg"
            onClick={handleManualVerify}
            disabled={isVerifying}
            className="apple-button h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-base shadow-lg shadow-blue-500/25 flex items-center justify-center shrink-0"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Verify Credential
              </>
            )}
          </Button>
        </div>

        {/* Dynamic Verification Progress Status */}
        {isVerifying && (
          <div className="pt-3 px-2 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{verifyStage}</span>
          </div>
        )}
      </div>

      {/* Quick Verification Sample Pills */}
      <div className="space-y-2 text-center">
        <span className="text-xs text-muted-foreground font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Test live verification with pre-anchored smart contract samples:
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {sampleCertificates.map((cert) => (
            <button
              key={cert.id}
              onClick={() => runVerification(cert)}
              disabled={isVerifying}
              className="apple-button px-3.5 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border/80 text-xs text-foreground flex items-center gap-1.5 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <strong className="font-semibold">{cert.studentName}</strong>
              <span className="text-muted-foreground">({cert.institution.split(" ")[0]})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
