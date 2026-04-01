"use client";

import React, { useState, useMemo } from "react";
import MacroDashboard from "@/components/charts/MacroDashboard";
import { TrendingUp, Landmark, ShieldCheck, Info } from "lucide-react";

export default function MacroPolicyBalancer({ onBack }: { onBack: () => void }) {
  const [repoRate, setRepoRate] = useState(4.5);
  const [govSpending, setGovSpending] = useState(100);
  const [taxRate, setTaxRate] = useState(20);

  // Simple macroeconomic model
  // Repo Rate ^ -> Investment down -> GDP down, Inflation down
  // Gov Spending ^ -> Demand ^ -> GDP ^, Inflation ^
  // Tax Rate ^ -> Demand down -> GDP down, Inflation down

  const macroStats = useMemo(() => {
    const baseGdp = 2.5;
    const baseInflation = 2.0;
    const baseUnemployment = 5.0;

    const repoImpact = (4.5 - repoRate) * 0.8;
    const fiscalImpact = (govSpending - 100) * 0.05 - (taxRate - 20) * 0.15;

    const gdpGrowth = baseGdp + repoImpact + fiscalImpact;
    const inflation = Math.max(0.2, baseInflation + repoImpact * 0.3 + fiscalImpact * 0.6);
    const unemployment = Math.max(2.5, baseUnemployment - (gdpGrowth - 2.5) * 0.4);

    return {
      gdpGrowth,
      inflation,
      unemployment
    };
  }, [repoRate, govSpending, taxRate]);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10 text-white font-sans">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg leading-tight">Macro Policy Balancer</h1>
          <p className="text-white/40 max-w-2xl">Act as both the Central Bank and Government. Balance interest rates and fiscal spending to achieve stable growth without runaway inflation.</p>
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
          <div className="glass p-6 rounded-[32px] border-white/5 shadow-2xl relative overflow-hidden h-full min-h-[500px]">
            <MacroDashboard 
              gdpGrowth={macroStats.gdpGrowth}
              inflation={macroStats.inflation}
              unemployment={macroStats.unemployment}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-8 rounded-[32px] flex flex-col gap-6 border-blue-500/10">
            <div className="flex items-center gap-3">
              <Landmark className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Monetary Policy</h2>
            </div>
            
            <Slider 
              label="Repo Rate (%)"
              min={1} max={10} step={0.25}
              value={repoRate}
              onChange={setRepoRate}
              color="blue"
            />
            <p className="text-[10px] text-white/30 italic">Lowering rates stimulates borrowing but can heat up inflation.</p>
          </div>

          <div className="glass-card p-8 rounded-[32px] flex flex-col gap-6 border-emerald-500/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Fiscal Policy</h2>
            </div>
            
            <div className="space-y-6">
              <Slider 
                label="Public Spending Index"
                min={50} max={150}
                value={govSpending}
                onChange={setGovSpending}
                color="emerald"
              />
              <Slider 
                label="Direct Tax Rate (%)"
                min={10} max={40}
                value={taxRate}
                onChange={setTaxRate}
                color="rose"
              />
            </div>
          </div>

          <div className="glass-card p-6 rounded-[32px] bg-amber-500/5 border-amber-500/20">
            <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Policy Note</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed leading-tight">
              A 2% inflation target with 2.5-3% GDP growth is generally considered the "Goldilocks" zone for a stable economy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, min, max, value, onChange, color, step = 1 }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void; color: string; step?: number }) {
  const accentMap: any = {
    emerald: 'accent-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    blue: 'accent-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    rose: 'accent-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
    amber: 'accent-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
  };

  return (
    <div className="flex flex-col gap-3 group">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</label>
        <span className="text-xs font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded border border-white/5">{value}{label.includes('%') ? '' : ''}</span>
      </div>
      <input 
        type="range" 
        min={min} max={max} step={step}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer transition-all ${accentMap[color]}`}
      />
    </div>
  );
}
