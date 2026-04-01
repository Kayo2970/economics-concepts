"use client";

import React, { useState, useMemo } from "react";
import MacroDashboard from "@/components/charts/MacroDashboard";
import { Landmark, TrendingUp, Users, Zap } from "lucide-react";

export default function PolicyBalancer({ onBack }: { onBack: () => void }) {
  const [repoRate, setRepoRate] = useState(4.5);
  const [spending, setSpending] = useState(50);

  const stats = useMemo(() => {
    const gdpGrowth = (spending / 10) - (repoRate / 2) + 2;
    const inflation = (spending / 20) + (repoRate / 5) + 1.5;
    const unemployment = 8 - (gdpGrowth / 2);
    
    return {
      gdpGrowth,
      inflation,
      unemployment
    };
  }, [repoRate, spending]);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10 text-white font-sans">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg leading-tight">Policy Balancer</h1>
          <p className="text-white/40 max-w-2xl">Manage the delicate balance between Monetary Policy (Repo Rate) and Fiscal Policy (Gov Spending) to stabilize the economy.</p>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-3 glass hover:bg-white/10 rounded-2xl text-sm font-bold transition-all shadow-xl"
        >
          ← Back Home
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass p-6 rounded-[32px] border-white/5 shadow-2xl relative overflow-hidden h-full min-h-[500px] flex flex-col justify-center">
            <MacroDashboard 
              gdpGrowth={stats.gdpGrowth}
              inflation={stats.inflation}
              unemployment={stats.unemployment}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-8 rounded-[32px] flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Landmark className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Policy Controls</h2>
            </div>
            
            <div className="space-y-10">
              <div className="flex flex-col gap-4 group">
                <div className="flex justify-between items-center px-1">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Repo Rate (Monetary)</label>
                    <span className="text-[10px] text-blue-400/60 font-medium">Higher rates curb inflation but slow growth</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded shadow-inner">{repoRate.toFixed(1)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="10" step="0.1"
                  value={repoRate} 
                  onChange={(e) => setRepoRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="flex flex-col gap-4 group">
                <div className="flex justify-between items-center px-1">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Gov Spending (Fiscal)</label>
                    <span className="text-[10px] text-emerald-400/60 font-medium">Stimulates growth but risks inflation</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded shadow-inner">{spending}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={spending} 
                  onChange={(e) => setSpending(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <div className="glass p-6 rounded-[24px] border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Economy State</p>
                    <p className="text-sm font-bold text-white/80">
                        {stats.gdpGrowth > 3 ? "Rapid Expansion" : stats.gdpGrowth > 0 ? "Steady Growth" : "Recessionary Risk"}
                    </p>
                </div>
             </div>

             <div className="glass p-6 rounded-[24px] border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Inflation Heat</p>
                    <p className="text-sm font-bold text-white/80">
                        {stats.inflation > 5 ? "Hyper-inflationary" : stats.inflation > 2 ? "Moderate" : "Low/Stable"}
                    </p>
                </div>
             </div>

             <div className="glass p-6 rounded-[24px] border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Labor Market</p>
                    <p className="text-sm font-bold text-white/80">
                        {stats.unemployment < 4 ? "Full Employment" : stats.unemployment < 7 ? "Balanced" : "High Unemployment"}
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
