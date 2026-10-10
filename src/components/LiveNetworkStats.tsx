import React, { useState, useEffect } from "react";
import { ShieldCheck, Flame, Building2, Clock, Globe } from "lucide-react";
import { getCurrentYear } from "@/lib/date-utils";

export const LiveNetworkStats: React.FC = () => {
  const currentYear = getCurrentYear();
  const [certsIssued, setCertsIssued] = useState(154820);
  const [gasPrice, setGasPrice] = useState(14);

  useEffect(() => {
    // Subtle realistic increments
    const timer = setInterval(() => {
      setCertsIssued((prev) => prev + Math.floor(Math.random() * 2) + 1);
      setGasPrice(12 + Math.floor(Math.random() * 5));
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="apple-glass-card rounded-2xl p-5 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
            {certsIssued.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground font-medium">Certificates Issued</p>
        </div>

        {/* Stat 2 */}
        <div className="apple-glass-card rounded-2xl p-5 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400 mb-2">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
            {gasPrice} <span className="text-sm font-sans font-normal text-muted-foreground">Gwei</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">Optimal Gas Baseline</p>
        </div>

        {/* Stat 3 */}
        <div className="apple-glass-card rounded-2xl p-5 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto text-purple-600 dark:text-purple-400 mb-2">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
            280+
          </div>
          <p className="text-xs text-muted-foreground font-medium">Accredited Universities</p>
        </div>

        {/* Stat 4 */}
        <div className="apple-glass-card rounded-2xl p-5 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 mb-2">
            <Globe className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
            100%
          </div>
          <p className="text-xs text-muted-foreground font-medium">Consensus Authenticity</p>
        </div>
      </div>
    </div>
  );
};
