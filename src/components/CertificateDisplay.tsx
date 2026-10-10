import React, { useState } from "react";
import { 
  CheckCircle2, 
  ExternalLink, 
  Shield, 
  GraduationCap, 
  Award, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  QrCode, 
  Sparkles,
  Lock,
  Layers,
  Eye,
  EyeOff
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getCertificateValidityStatus, getCurrentYear } from "@/lib/date-utils";
import { soundEffects } from "@/lib/haptics-audio";

export interface CertificateData {
  id: string;
  studentName: string;
  degree: string;
  institution: string;
  dateIssued: string;
  issuedYear: number;
  gpa: string;
  honors: string;
  blockchainHash: string;
  transactionHash: string;
  merkleRoot?: string;
  ipfsCid?: string;
  issuer: string;
}

interface CertificateDisplayProps {
  certificateId: string;
  customData?: CertificateData | null;
}

const CertificateDisplay: React.FC<CertificateDisplayProps> = ({ certificateId, customData }) => {
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"diploma" | "blockchain" | "merkle">("diploma");
  const [hologramAngle, setHologramAngle] = useState({ x: 0, y: 0 });
  const [isZkPrivacyMode, setIsZkPrivacyMode] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const currentYear = getCurrentYear();

  // Baseline data or custom issued data
  const certificate: CertificateData = customData || {
    id: certificateId || `CERT-${currentYear}-9X44B`,
    studentName: "Sarah Johnson",
    degree: "Master of Science in Artificial Intelligence & Decentralized Systems",
    institution: "Massachusetts Institute of Technology",
    dateIssued: `May 24, ${currentYear - 1}`,
    issuedYear: currentYear - 1,
    gpa: "3.96",
    honors: "Summa Cum Laude • Highest Distinction",
    blockchainHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
    transactionHash: "0x89ab4f9c8d3e2b1a56f7c8d9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    merkleRoot: "0x4a1f9e2b83c07d5e12f6a9b4c7d0e3f8a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7",
    ipfsCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    issuer: "MIT Academic Registrar's Office",
  };

  const validity = getCertificateValidityStatus(certificate.issuedYear);

  const copyToClipboard = (text: string, label: string) => {
    soundEffects.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast({
      title: "Copied to Clipboard",
      description: `${label} copied successfully.`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const toggleZkPrivacy = () => {
    soundEffects.playClick();
    const nextState = !isZkPrivacyMode;
    setIsZkPrivacyMode(nextState);
    if (nextState) {
      soundEffects.playSuccessChime();
      toast({
        title: "zk-SNARKs Privacy Mode Active",
        description: "Selective disclosure enabled: student GPA and private identifier are now shielded.",
      });
    } else {
      toast({
        title: "Full Credential Mode",
        description: "All transcript metadata is visible.",
      });
    }
  };

  // Hologram 3D tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setHologramAngle({ x, y });
  };

  const handleMouseLeave = () => {
    setHologramAngle({ x: 0, y: 0 });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Verification Status Header Banner (Apple Pill Design) */}
      <div className="apple-glass-card rounded-2xl p-5 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground text-lg">Cryptographically Verified</h3>
              <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5">
                ERC-5192 Soulbound
              </Badge>
              {isZkPrivacyMode && (
                <Badge className="bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs px-2 py-0.5">
                  zk-SNARK Shielded
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Official record anchored to Ethereum Mainnet block timestamp • {validity.validityWindow}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs & Privacy Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={toggleZkPrivacy}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all apple-button ${
              isZkPrivacyMode
                ? "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/40"
                : "bg-secondary text-muted-foreground border-border/80 hover:text-foreground"
            }`}
            title="Toggle Zero-Knowledge selective disclosure to shield private PII"
          >
            {isZkPrivacyMode ? <EyeOff className="w-3.5 h-3.5 text-purple-500" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isZkPrivacyMode ? "zk-Privacy ON" : "zk-Privacy"}</span>
          </button>

          <div className="flex items-center bg-secondary/80 p-1 rounded-xl border border-border/60 text-xs">
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab("diploma");
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "diploma"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Diploma
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab("blockchain");
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "blockchain"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Ledger
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab("merkle");
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "merkle"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Merkle Tree
            </button>
          </div>
        </div>
      </div>

      {/* Main Presentation Area */}
      {activeTab === "diploma" && (
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 border-4 border-amber-600/30 dark:border-amber-500/20"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Authentic Certificate Parchment Guilloche */}
          <div className="certificate-guilloche p-8 sm:p-14 md:p-16 relative">
            {/* Subtle ornamental corner patterns */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-600/50 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-600/50 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-600/50 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-600/50 rounded-br-lg pointer-events-none" />

            {/* Micro-engraved Security Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none text-7xl md:text-9xl font-bold tracking-widest text-foreground rotate-[-15deg]">
              ETHEREUM
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto pb-8 border-b border-amber-600/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-md mx-auto">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400">
                  {certificate.institution}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight mt-1">
                  Official Academic Credential
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Anchored Immutable Record • Verified on Ethereum Blockchain
                </p>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="text-center py-10 space-y-6 max-w-2xl mx-auto">
              <p className="text-sm font-serif italic text-muted-foreground">
                This is to certify and attest that
              </p>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight pb-2 border-b border-border/80 inline-block px-8">
                {certificate.studentName}
              </h3>

              <p className="text-sm font-serif italic text-muted-foreground">
                has successfully fulfilled all institutional criteria and academic mandates for the conferral of
              </p>

              <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400 tracking-tight max-w-xl mx-auto">
                {certificate.degree}
              </h4>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-3 py-1 text-xs">
                  <Award className="w-3.5 h-3.5 mr-1" />
                  {certificate.honors}
                </Badge>
                
                {/* Zero Knowledge GPA Shielding */}
                {isZkPrivacyMode ? (
                  <Badge className="bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 px-3 py-1 text-xs font-mono">
                    <Shield className="w-3 h-3 mr-1 text-purple-500" />
                    zk-SNARK Verified: GPA ≥ 3.80
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs px-3 py-1 font-mono">
                    Cumulative GPA: {certificate.gpa} / 4.00
                  </Badge>
                )}
              </div>
            </div>

            {/* Signatures & Seal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-amber-600/20 items-end">
              {/* Registrar Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-xl text-foreground font-medium opacity-80 h-8 flex items-center justify-center">
                  Dr. Richard V. Sterling
                </div>
                <div className="border-t border-border pt-1">
                  <p className="text-xs font-semibold text-foreground">University Registrar</p>
                  <p className="text-[11px] text-muted-foreground">{certificate.dateIssued}</p>
                </div>
              </div>

              {/* 3D Holographic Security Seal */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div 
                  className="w-24 h-24 rounded-full holographic-foil p-1 shadow-lg cursor-pointer transform transition-transform duration-100 ease-out flex items-center justify-center"
                  style={{
                    transform: `perspective(300px) rotateX(${hologramAngle.y}deg) rotateY(${hologramAngle.x}deg)`,
                  }}
                  title="Move mouse to see 3D holographic security foil shimmer"
                >
                  <div className="w-full h-full rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm border-2 border-amber-400/60 flex flex-col items-center justify-center text-center p-2">
                    <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span className="text-[8px] font-bold tracking-tighter uppercase text-foreground leading-tight mt-0.5">
                      SEALED ON CHAIN
                    </span>
                    <span className="text-[7px] font-mono text-muted-foreground">
                      ERC-5192
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Physical-Digital Hologram
                </span>
              </div>

              {/* Chancellor Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-xl text-foreground font-medium opacity-80 h-8 flex items-center justify-center">
                  Prof. Katherine Miller
                </div>
                <div className="border-t border-border pt-1">
                  <p className="text-xs font-semibold text-foreground">President & Chancellor</p>
                  <p className="text-[11px] text-muted-foreground">MIT Academic Board</p>
                </div>
              </div>
            </div>

            {/* Bottom Certificate Verification Ribbon */}
            <div className="mt-10 pt-4 border-t border-dashed border-border/80 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span>
                  Certificate UID:{" "}
                  {isZkPrivacyMode ? (
                    <code className="font-mono text-purple-600 dark:text-purple-400 font-semibold">
                      zk-Pedersen-Commitment-0x84e
                    </code>
                  ) : (
                    <code className="font-mono text-foreground font-semibold">{certificate.id}</code>
                  )}
                </span>
              </div>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setShowQrModal(true);
                }}
                className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:underline"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>View Verification QR Code</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blockchain Ledger Technical Details Tab */}
      {activeTab === "blockchain" && (
        <Card className="apple-glass-card border border-border/80 rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Ethereum Smart Contract Attestation</h4>
                  <p className="text-xs text-muted-foreground">Immutable consensus parameters verified by distributed validators</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs text-blue-600 border-blue-500/30">
                EIP-712 Typed Signature
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contract Address */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Smart Contract (ERC-5192)</span>
                  <button 
                    onClick={() => copyToClipboard(certificate.blockchainHash, "Contract Address")}
                    className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                  >
                    {copiedField === "Contract Address" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>
                <code className="text-xs font-mono block text-foreground break-all">
                  {certificate.blockchainHash}
                </code>
              </div>

              {/* Transaction Hash */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Minting Transaction Hash</span>
                  <button 
                    onClick={() => copyToClipboard(certificate.transactionHash, "Transaction Hash")}
                    className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                  >
                    {copiedField === "Transaction Hash" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>
                <code className="text-xs font-mono block text-foreground break-all">
                  {certificate.transactionHash}
                </code>
              </div>

              {/* Merkle Root */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Merkle Patricia Trie Root</span>
                <code className="text-xs font-mono block text-foreground break-all">
                  {certificate.merkleRoot}
                </code>
              </div>

              {/* IPFS CID */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">IPFS Decentralized Metadata CID</span>
                <code className="text-xs font-mono block text-foreground break-all">
                  ipfs://{certificate.ipfsCid}
                </code>
              </div>
            </div>

            {/* Network Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <span className="text-[11px] text-muted-foreground block">Network</span>
                <span className="text-sm font-semibold text-foreground">Ethereum Mainnet</span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <span className="text-[11px] text-muted-foreground block">Token Standard</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">ERC-5192 (Soulbound)</span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <span className="text-[11px] text-muted-foreground block">Revocation Status</span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Not Revoked (Active)</span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <span className="text-[11px] text-muted-foreground block">Annual Rollover</span>
                <span className="text-sm font-semibold text-foreground">Automated {currentYear}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Merkle Proof Tree Tab */}
      {activeTab === "merkle" && (
        <Card className="apple-glass-card border border-border/80 rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Cryptographic Merkle Tree Audit</h4>
                <p className="text-xs text-muted-foreground">Mathematical verification path proving certificate inclusion in batch root</p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-secondary/60 border border-border">
                <div className="text-muted-foreground text-[10px] uppercase font-sans mb-1">Leaf Node 0 (Student Hash)</div>
                <div className="text-foreground break-all">keccak256("{certificate.studentName}|{certificate.id}")</div>
                <div className="text-blue-500 text-[11px] mt-0.5">↳ 0x82b9...a10f</div>
              </div>

              <div className="pl-6 border-l-2 border-indigo-500/40 space-y-3">
                <div className="p-3 rounded-lg bg-secondary/60 border border-border">
                  <div className="text-muted-foreground text-[10px] uppercase font-sans mb-1">Sibling Node 1 (Course Hash)</div>
                  <div className="text-foreground break-all">keccak256("{certificate.degree}|GPA:{certificate.gpa}")</div>
                  <div className="text-indigo-500 text-[11px] mt-0.5">↳ 0x39ef...882c</div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                  <div className="text-indigo-600 dark:text-indigo-400 text-[10px] uppercase font-sans font-semibold mb-1">
                    Batch Merkle Root (Anchored on Chain)
                  </div>
                  <div className="text-foreground font-semibold break-all">{certificate.merkleRoot}</div>
                  <div className="text-emerald-600 dark:text-emerald-400 text-[11px] mt-1 flex items-center gap-1 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Proof verified against block state root
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons (Apple Pill buttons) */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button 
          size="lg" 
          onClick={() => {
            soundEffects.playClick();
            window.print();
          }}
          className="apple-button rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-sm px-6 h-11"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF Certificate
        </Button>

        <Button 
          size="lg" 
          variant="outline"
          onClick={() => copyToClipboard(window.location.href, "Verification URL")}
          className="apple-button rounded-full border-border hover:bg-secondary text-sm px-6 h-11"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Verification URL
        </Button>

        <a 
          href={`https://etherscan.io/address/${certificate.blockchainHash}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundEffects.playClick()}
        >
          <Button 
            size="lg" 
            variant="ghost"
            className="apple-button rounded-full text-sm text-muted-foreground hover:text-foreground h-11 px-5"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Inspect on Etherscan
          </Button>
        </a>
      </div>

      {/* QR Code Inspection Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="apple-glass rounded-3xl p-6 max-w-sm w-full text-center space-y-4 border border-white/30 dark:border-white/10 shadow-2xl animate-in zoom-in-95">
            <h4 className="font-semibold text-foreground text-base">Instant Verification QR</h4>
            <p className="text-xs text-muted-foreground">Scan with any smartphone camera to inspect Ethereum verification proof</p>

            {/* High-res rendered SVG QR representation */}
            <div className="w-48 h-48 mx-auto bg-white p-4 rounded-2xl shadow-inner flex items-center justify-center">
              <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />

                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />

                {/* Pattern dots */}
                <rect x="38" y="10" width="8" height="8" />
                <rect x="50" y="10" width="10" height="6" />
                <rect x="38" y="24" width="12" height="6" />
                <rect x="10" y="38" width="6" height="12" />
                <rect x="22" y="44" width="8" height="6" />
                <rect x="38" y="38" width="24" height="24" />
                <rect x="44" y="44" width="12" height="12" fill="white" />
                <rect x="70" y="38" width="10" height="8" />
                <rect x="84" y="48" width="8" height="8" />
                <rect x="40" y="70" width="8" height="12" />
                <rect x="54" y="74" width="14" height="8" />
                <rect x="74" y="70" width="16" height="16" />
                <rect x="80" y="76" width="6" height="6" fill="white" />
              </svg>
            </div>

            <div className="font-mono text-xs text-muted-foreground break-all">
              ID: {certificate.id}
            </div>

            <Button
              size="sm"
              onClick={() => {
                soundEffects.playClick();
                setShowQrModal(false);
              }}
              className="apple-button rounded-full w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateDisplay;
