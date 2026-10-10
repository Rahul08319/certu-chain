import React, { useState, useRef } from "react";
import { ShieldCheck, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppleNavbar } from "@/components/AppleNavbar";
import { AppleFooter } from "@/components/AppleFooter";
import { LiveNetworkStats } from "@/components/LiveNetworkStats";
import { BentoGridFeatures } from "@/components/BentoGridFeatures";
import CertificateDisplay, { CertificateData } from "@/components/CertificateDisplay";
import { CertificateVerificationScanner } from "@/components/CertificateVerificationScanner";
import { IssueCertificateModal } from "@/components/IssueCertificateModal";
import { BatchVerificationModal } from "@/components/BatchVerificationModal";
import { getCurrentYear } from "@/lib/date-utils";
import { soundEffects } from "@/lib/haptics-audio";

const Index: React.FC = () => {
  const currentYear = getCurrentYear();
  const [activeCertificate, setActiveCertificate] = useState<CertificateData | null>(null);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const verifySectionRef = useRef<HTMLDivElement>(null);

  const scrollToVerify = () => {
    verifySectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCertificateVerified = (cert: CertificateData) => {
    setActiveCertificate(cert);
    // Smooth scroll down to view certificate if not already in viewport
    setTimeout(() => {
      const displayElem = document.getElementById("certificate-display-section");
      if (displayElem) {
        displayElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500/20 selection:text-blue-600">
      {/* Cupertino Frosted Glass Navbar */}
      <AppleNavbar
        onIssueClick={() => setIsIssueModalOpen(true)}
        onBatchClick={() => setIsBatchModalOpen(true)}
        onVerifyScroll={scrollToVerify}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Apple Hero Section */}
        <section 
          ref={verifySectionRef}
          className="relative pt-16 sm:pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
        >
          {/* Subtle Ambient Apple Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40 dark:opacity-20 blur-3xl -z-10">
            <div className="w-full h-full bg-gradient-to-b from-blue-400 via-indigo-300 to-transparent dark:from-blue-600 dark:via-indigo-900 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Pill Capsule */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-border/80 text-xs font-medium text-foreground shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Decentralized Credential Ledger</span>
              <span className="text-border">|</span>
              <span className="text-muted-foreground">Ethereum Mainnet</span>
            </div>

            {/* Typography Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.08]">
              Academic credentials.
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Permanently authentic.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
              Immutable, zero-knowledge, and instantly verifiable diplomas anchored to Ethereum blocks via ERC-5192 Soulbound smart contracts.
            </p>

            {/* Interactive Scanner Box */}
            <div className="pt-4">
              <CertificateVerificationScanner
                onCertificateVerified={handleCertificateVerified}
              />
            </div>
          </div>
        </section>

        {/* Live Network Statistics */}
        <LiveNetworkStats />

        {/* Certificate Display Section (Shows when verified) */}
        <section id="certificate-display-section" className="py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {activeCertificate ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Active Verification Result
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      soundEffects.playClick();
                      setActiveCertificate(null);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Reset View
                  </Button>
                </div>
                <CertificateDisplay
                  certificateId={activeCertificate.id}
                  customData={activeCertificate}
                />
              </div>
            ) : (
              /* Default Featured Showcase Certificate */
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Live Demonstrator
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight mt-1">
                    Inspect a Live Verified Credential
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Try tilting the diploma with your mouse to inspect the optical 3D hologram foil seal, or toggle zk-Privacy mode.
                  </p>
                </div>
                <CertificateDisplay
                  certificateId={`MIT-${currentYear}-AI89`}
                />
              </div>
            )}
          </div>
        </section>

        {/* Bento Grid Feature Architecture */}
        <BentoGridFeatures />

        {/* Security & Verification Pipeline Accordion */}
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Protocol Specs
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              How CertuChain works under the hood
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              A 4-step cryptographic pipeline combining off-chain storage with on-chain Ethereum consensus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="apple-glass-card rounded-2xl p-6 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
              <h4 className="text-base font-semibold text-foreground">EIP-712 Structured Signing</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The university registrar signs student degree attributes (Name, Major, GPA, Year) using their verified hardware key, preventing forgery at issuance.
              </p>
            </div>

            <div className="apple-glass-card rounded-2xl p-6 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                02
              </div>
              <h4 className="text-base font-semibold text-foreground">Merkle Root Batching</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Thousands of student records are batched into a single cryptographic Merkle tree, anchoring whole graduating cohorts in a single high-efficiency Ethereum transaction.
              </p>
            </div>

            <div className="apple-glass-card rounded-2xl p-6 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono font-bold text-xs">
                03
              </div>
              <h4 className="text-base font-semibold text-foreground">ERC-5192 Soulbound Minting</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tokens emit a `Locked(tokenId)` event on-chain. Smart contracts prohibit transfer, preventing secondary sale or stolen diploma impersonation.
              </p>
            </div>

            <div className="apple-glass-card rounded-2xl p-6 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                04
              </div>
              <h4 className="text-base font-semibold text-foreground">Instant Edge Verification</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Employers and licensing boards can verify authenticity directly in 180 milliseconds without phone calls, paperwork, or third-party fees.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Sandbox Banner */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="max-w-xl mx-auto space-y-3 relative z-10">
              <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Experience Blockchain Minting
              </h3>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Test issuing your own Soulbound Academic Credential on our interactive simulator. See the cryptographic transaction generated in real-time.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 pt-2">
              <Button
                size="lg"
                onClick={() => {
                  soundEffects.playClick();
                  setIsIssueModalOpen(true);
                }}
                className="apple-button h-12 px-8 rounded-full bg-white text-blue-600 hover:bg-white/90 font-medium text-sm shadow-lg"
              >
                <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                Issue a Test Certificate
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  soundEffects.playClick();
                  setIsBatchModalOpen(true);
                }}
                className="apple-button h-12 px-6 rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20 text-sm"
              >
                <Layers className="w-4 h-4 mr-2" />
                Batch Verifier
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Apple-grade Footer */}
      <AppleFooter />

      {/* Interactive Minting Modal */}
      <IssueCertificateModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        onCertificateIssued={(newCert) => {
          setActiveCertificate(newCert);
          setTimeout(() => {
            const displayElem = document.getElementById("certificate-display-section");
            if (displayElem) {
              displayElem.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 150);
        }}
      />

      {/* Enterprise Batch Verifier Modal */}
      <BatchVerificationModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
      />
    </div>
  );
};

export default Index;
