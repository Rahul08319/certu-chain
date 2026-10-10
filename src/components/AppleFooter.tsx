import React from "react";
import { ShieldCheck, Github, ExternalLink, Heart } from "lucide-react";
import { getDynamicCopyrightRange, getDynamicRoadmapHorizon, getCurrentYear } from "@/lib/date-utils";

export const AppleFooter: React.FC = () => {
  const currentYear = getCurrentYear();
  const copyrightRange = getDynamicCopyrightRange(2024);
  const roadmap = getDynamicRoadmapHorizon();

  return (
    <footer className="w-full border-t border-border/80 bg-secondary/30 dark:bg-black/20 text-muted-foreground text-xs py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Dynamic Protocol Roadmap & Coming Years Architecture */}
        <div className="apple-glass-card rounded-2xl p-6 border border-border/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Future-Proof Roadmap & Coming Years
              </span>
              <h4 className="text-base font-semibold text-foreground tracking-tight">
                Self-Updating Governance & Protocol Epochs ({currentYear}–{currentYear + 2})
              </h4>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
              EIP-5192 / ERC-712 Aligned
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="space-y-1">
              <span className="text-foreground font-semibold block">Active Milestone ({currentYear})</span>
              <p className="text-muted-foreground">{roadmap.currentCycle}</p>
            </div>
            <div className="space-y-1">
              <span className="text-foreground font-semibold block">Upcoming Epoch ({currentYear + 1})</span>
              <p className="text-muted-foreground">{roadmap.nextCycle}</p>
            </div>
            <div className="space-y-1">
              <span className="text-foreground font-semibold block">Long-Term Target ({currentYear + 2}+)</span>
              <p className="text-muted-foreground">{roadmap.futureTarget}</p>
            </div>
          </div>
        </div>

        {/* Footer Links & Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <span className="font-semibold text-foreground">CertuChain Protocol</span>
              <p className="text-[11px] text-muted-foreground">
                © {copyrightRange} Rahul Kumar (Rahul08319). Designed with Apple HIG aesthetics.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a
              href="https://github.com/Rahul08319/certu-chain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub Repository
            </a>
            <a
              href="https://eips.ethereum.org/EIPS/eip-5192"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              ERC-5192 Specification
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-border">|</span>
            <span className="text-muted-foreground flex items-center gap-1">
              Auto-calibrated for <strong className="text-foreground font-mono">{currentYear}</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
