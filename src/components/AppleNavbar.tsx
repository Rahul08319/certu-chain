import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, Moon, Sun, Github, Cpu, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppleNavbarProps {
  onIssueClick: () => void;
  onVerifyScroll: () => void;
}

export const AppleNavbar: React.FC<AppleNavbarProps> = ({ onIssueClick, onVerifyScroll }) => {
  const [isDark, setIsDark] = useState(false);
  const [blockHeight, setBlockHeight] = useState(21489240);

  useEffect(() => {
    // Check initial dark mode from DOM
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }

    // Simulate real-time Ethereum block updates every 12 seconds
    const interval = setInterval(() => {
      setBlockHeight((prev) => prev + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full apple-glass transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-white dark:bg-[#151922] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg tracking-tight text-foreground">CertuChain</span>
              <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Mainnet
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Verifiable Academic Credentials
            </p>
          </div>
        </div>

        {/* Live Block Pill (Apple-style status capsule) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/60 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Cpu className="w-3.5 h-3.5 text-blue-500" />
          <span>Block <strong className="text-foreground font-mono font-medium">#{blockHeight.toLocaleString()}</strong></span>
          <span className="text-border">|</span>
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle className="w-3 h-3" /> 100% Finalized
          </span>
        </div>

        {/* Nav actions */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onVerifyScroll}
            className="text-xs font-medium text-muted-foreground hover:text-foreground hidden sm:inline-flex"
          >
            Verify Credential
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onIssueClick}
            className="text-xs font-medium apple-button rounded-full border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Issue Demo
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full text-muted-foreground hover:text-foreground"
            title={isDark ? "Switch to Apple Light mode" : "Switch to Dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </Button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/Rahul08319/certu-chain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-foreground hover:bg-secondary/80 apple-button"
            title="View on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
