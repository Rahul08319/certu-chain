import React from "react";
import { Lock, EyeOff, Zap, Network, Database, ShieldCheck, Check, Sparkles } from "lucide-react";

export const BentoGridFeatures: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Cryptographic Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Engineered with Cupertino precision.
          <br />
          <span className="text-muted-foreground">Secured by Ethereum consensus.</span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Every credential issued on CertuChain satisfies strict Web3 cryptographic standards while delivering an effortless, beautiful user experience.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Bento Tile 1: Large Span-2 Card */}
        <div className="md:col-span-2 apple-glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4 max-w-md">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                EIP-5192 Standard
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight mt-0.5">
                Soulbound Non-Transferable Credentials
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unlike ordinary NFTs that can be traded or bought, CertuChain tokens are cryptographically locked to the recipient's decentralized identifier (DID), preventing fraud, diploma mills, and black-market credential transfers.
            </p>
          </div>

          {/* Interactive visual element */}
          <div className="mt-8 p-4 rounded-2xl bg-secondary/60 border border-border/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-foreground font-medium">function locked(uint256 tokenId) view returns (bool)</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold font-mono">
              true (LOCKED)
            </span>
          </div>
        </div>

        {/* Bento Tile 2: Zero-Knowledge Privacy */}
        <div className="apple-glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                zk-SNARKs Protocol
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mt-0.5">
                Zero-Knowledge Selective Disclosure
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Recipients can prove degree conferral or minimum GPA to employers without revealing birthdates, addresses, or private student IDs.
            </p>
          </div>

          <div className="mt-6 space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 border border-border/60">
              <span className="text-muted-foreground">Degree Conferred</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Proven
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 border border-border/60">
              <span className="text-muted-foreground">Personal Address</span>
              <span className="text-muted-foreground italic font-mono">0x•••• (Hidden)</span>
            </div>
          </div>
        </div>

        {/* Bento Tile 3: Sub-Second Latency */}
        <div className="apple-glass-card rounded-3xl p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Instant Verification
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mt-0.5">
                &lt; 240ms Global Latency
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Global edge caching and Merkle Patricia root pruning ensure lightning-fast validation from any browser or smartphone camera worldwide.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-foreground">0.18s</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">99.99% Node Uptime</span>
          </div>
        </div>

        {/* Bento Tile 4: Multi-Chain Interoperability */}
        <div className="apple-glass-card rounded-3xl p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Multi-Chain Scaling
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mt-0.5">
                Layer-2 Anchored
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Issue high-volume certificates at minimal gas costs on Arbitrum, Polygon, and Optimism, with state root settlement on Ethereum L1.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-full bg-secondary text-foreground font-medium border border-border">Ethereum</span>
            <span className="px-2.5 py-1 rounded-full bg-secondary text-foreground font-medium border border-border">Arbitrum</span>
            <span className="px-2.5 py-1 rounded-full bg-secondary text-foreground font-medium border border-border">Polygon</span>
            <span className="px-2.5 py-1 rounded-full bg-secondary text-foreground font-medium border border-border">Optimism</span>
          </div>
        </div>

        {/* Bento Tile 5: Decentralized IPFS Storage */}
        <div className="apple-glass-card rounded-3xl p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Permanent Storage
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mt-0.5">
                IPFS Content Pinning
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Diploma artifacts, official seals, and transcript hashes are pinned to decentralized Filecoin/IPFS clusters, guaranteeing zero link-rot for decades.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">CID Immutability</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono font-medium">bafy...55fb</span>
          </div>
        </div>
      </div>
    </section>
  );
};
