import React, { useState } from "react";
import { Sparkles, Shield, X, Loader2, CheckCircle2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CertificateData } from "./CertificateDisplay";
import { getCurrentYear } from "@/lib/date-utils";
import { soundEffects } from "@/lib/haptics-audio";

interface IssueCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCertificateIssued: (cert: CertificateData) => void;
}

export const IssueCertificateModal: React.FC<IssueCertificateModalProps> = ({
  isOpen,
  onClose,
  onCertificateIssued,
}) => {
  const { toast } = useToast();
  const currentYear = getCurrentYear();

  const [studentName, setStudentName] = useState("");
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [honors, setHonors] = useState("Summa Cum Laude");
  const [gpa, setGpa] = useState("3.95");
  const [isMinting, setIsMinting] = useState(false);
  const [mintStage, setMintStage] = useState("");

  if (!isOpen) return null;

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    if (!studentName.trim() || !degree.trim() || !institution.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill out student name, degree, and institution.",
        variant: "destructive",
      });
      return;
    }

    setIsMinting(true);
    setMintStage("Generating Keccak-256 Digest & EIP-712 Signature...");

    setTimeout(() => {
      setMintStage("Broadcasting Transaction to Ethereum RPC Node...");
    }, 500);

    setTimeout(() => {
      setMintStage("Minting ERC-5192 Non-Transferable Soulbound Token...");
    }, 1000);

    setTimeout(() => {
      const randomHex = Math.random().toString(16).substring(2, 10);
      const newCert: CertificateData = {
        id: `CERT-${currentYear}-${randomHex.toUpperCase()}`,
        studentName: studentName.trim(),
        degree: degree.trim(),
        institution: institution.trim(),
        dateIssued: `October 10, ${currentYear}`,
        issuedYear: currentYear,
        gpa: gpa || "3.90",
        honors: honors || "Honors",
        blockchainHash: `0x742d35Cc6634C0532925a3b844Bc9e7595f0b${randomHex.slice(0, 3)}`,
        transactionHash: `0x${Math.random().toString(16).substring(2, 34)}${randomHex}`,
        merkleRoot: `0x4a1f9e2b83c07d5e12f6a9b4c7d0e3f8a2b5c8d1e4f7a0b3c6d9e2f5a8b1c${randomHex.slice(0, 4)}`,
        ipfsCid: `bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55${randomHex}`,
        issuer: `${institution.trim()} Academic Registrar`,
      };

      setIsMinting(false);
      setMintStage("");
      onCertificateIssued(newCert);
      onClose();

      soundEffects.playMintChime();
      toast({
        title: "Certificate Minted Successfully!",
        description: `Issued to ${newCert.studentName} with ID: ${newCert.id}`,
      });
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-opacity">
      <div className="apple-glass rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-white/40 dark:border-white/10 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">Issue Test Certificate</h3>
              <p className="text-xs text-muted-foreground">Simulate Smart Contract Minting (ERC-5192)</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            disabled={isMinting}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleMint} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label htmlFor="studentName" className="text-xs font-medium text-foreground">
              Recipient / Student Name
            </Label>
            <Input
              id="studentName"
              placeholder="e.g. Maya Lin"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              disabled={isMinting}
              required
              className="rounded-xl h-11 bg-secondary/50 border-border"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="degree" className="text-xs font-medium text-foreground">
              Degree & Major
            </Label>
            <Input
              id="degree"
              placeholder="e.g. Master of Science in Cybersecurity & Distributed Systems"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              disabled={isMinting}
              required
              className="rounded-xl h-11 bg-secondary/50 border-border"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="institution" className="text-xs font-medium text-foreground">
              Issuing Academic Institution
            </Label>
            <Input
              id="institution"
              placeholder="e.g. University of California, Berkeley"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              disabled={isMinting}
              required
              className="rounded-xl h-11 bg-secondary/50 border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="honors" className="text-xs font-medium text-foreground">
                Academic Honors
              </Label>
              <Input
                id="honors"
                placeholder="e.g. Summa Cum Laude"
                value={honors}
                onChange={(e) => setHonors(e.target.value)}
                disabled={isMinting}
                className="rounded-xl h-11 bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gpa" className="text-xs font-medium text-foreground">
                Cumulative GPA
              </Label>
              <Input
                id="gpa"
                placeholder="e.g. 3.96"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                disabled={isMinting}
                className="rounded-xl h-11 bg-secondary/50 border-border"
              />
            </div>
          </div>

          {/* Mint progress indicator */}
          {isMinting && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>{mintStage}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              disabled={isMinting}
              className="rounded-xl text-xs h-10 px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isMinting}
              className="apple-button rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium h-10 px-6 shadow-md"
            >
              {isMinting ? "Minting to Blockchain..." : "Mint Soulbound Certificate"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
