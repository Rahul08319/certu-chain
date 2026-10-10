import React, { useState } from "react";
import { Layers, X, CheckCircle2, Loader2, Download, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { soundEffects } from "@/lib/haptics-audio";
import { getCurrentYear } from "@/lib/date-utils";

interface BatchVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BatchItem {
  id: string;
  student: string;
  degree: string;
  institution: string;
  status: "verified" | "pending" | "processing";
  latencyMs: number;
}

export const BatchVerificationModal: React.FC<BatchVerificationModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const currentYear = getCurrentYear();
  const [isProcessing, setIsProcessing] = useState(false);

  const initialItems: BatchItem[] = [
    {
      id: `MIT-${currentYear}-AI89`,
      student: "Sarah Johnson",
      degree: "MS Artificial Intelligence",
      institution: "MIT",
      status: "verified",
      latencyMs: 142,
    },
    {
      id: `STANFORD-${currentYear}-QC42`,
      student: "Alex Rivera",
      degree: "MS Quantum Cryptography",
      institution: "Stanford University",
      status: "verified",
      latencyMs: 168,
    },
    {
      id: `OXFORD-${currentYear}-DL19`,
      student: "Elena Rostova",
      degree: "PhD Decentralized Ledger",
      institution: "University of Oxford",
      status: "verified",
      latencyMs: 155,
    },
    {
      id: `BERKELEY-${currentYear}-ZK07`,
      student: "Marcus Chen",
      degree: "Fellowship Zero-Knowledge",
      institution: "UC Berkeley",
      status: "verified",
      latencyMs: 139,
    },
    {
      id: `CAMBRIDGE-${currentYear}-CS91`,
      student: "Hannah Schmidt",
      degree: "MA Computer Science",
      institution: "University of Cambridge",
      status: "verified",
      latencyMs: 162,
    },
  ];

  const [items, setItems] = useState<BatchItem[]>(initialItems);

  if (!isOpen) return null;

  const handleRunBatch = () => {
    soundEffects.playClick();
    setIsProcessing(true);

    // Set all to processing
    setItems((prev) => prev.map((item) => ({ ...item, status: "processing" })));

    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          status: "verified",
          latencyMs: 120 + Math.floor(Math.random() * 60),
        }))
      );
      setIsProcessing(false);
      soundEffects.playSuccessChime();
      toast({
        title: "Batch Verification Complete",
        description: `Successfully validated ${items.length} credentials in parallel.`,
      });
    }, 1200);
  };

  const handleExportCSV = () => {
    soundEffects.playClick();
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Certificate ID,Student Name,Degree,Institution,Status,Latency (ms)"]
        .concat(
          items.map(
            (i) => `${i.id},"${i.student}","${i.degree}","${i.institution}",${i.status},${i.latencyMs}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CertuChain_Batch_Audit_${currentYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Audit Report Downloaded",
      description: "Batch CSV audit summary saved to your computer.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-opacity">
      <div className="apple-glass rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-white/40 dark:border-white/10 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">Enterprise Batch Verifier</h3>
              <p className="text-xs text-muted-foreground">Parallel multi-proof validation over Ethereum state roots</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
            <span className="text-[11px] text-muted-foreground block">Total Records</span>
            <span className="text-lg font-bold font-mono text-foreground">{items.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[11px] text-emerald-700 dark:text-emerald-300 block">Verified Valid</span>
            <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">{items.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <span className="text-[11px] text-blue-700 dark:text-blue-300 block">Avg Response</span>
            <span className="text-lg font-bold font-mono text-blue-600 dark:text-blue-400">153 ms</span>
          </div>
        </div>

        {/* Batch Table */}
        <div className="rounded-2xl border border-border/80 overflow-hidden bg-background/50 max-h-60 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-secondary/60 text-muted-foreground font-medium uppercase text-[10px] tracking-wider border-b border-border/80">
              <tr>
                <th className="p-3">ID / Recipient</th>
                <th className="p-3">Degree & Major</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-3">
                    <span className="font-semibold text-foreground block">{item.student}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{item.id}</span>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    <span className="text-foreground">{item.degree}</span>
                    <span className="block text-[11px] text-muted-foreground">{item.institution}</span>
                  </td>
                  <td className="p-3">
                    {item.status === "verified" ? (
                      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Valid
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5 text-blue-500">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Checking
                      </Badge>
                    )}
                  </td>
                  <td className="p-3 text-right font-mono text-muted-foreground">
                    {item.latencyMs}ms
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportCSV}
            className="apple-button rounded-xl text-xs h-10 px-4"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" />
            Export Audit CSV
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="rounded-xl text-xs h-10 px-4"
            >
              Close
            </Button>
            <Button
              size="sm"
              onClick={handleRunBatch}
              disabled={isProcessing}
              className="apple-button rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium h-10 px-5"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Verifying Batch...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                  Re-Verify All Batch
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
