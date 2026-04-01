"use client";

import React, { useState, useMemo } from "react";
import MarketStructureChart from "@/components/charts/MarketStructureChart";
import { Point } from "@/utils/economicsMath";
import { LayoutGrid, Percent, DollarSign, Info } from "lucide-react";

export default function MarketMatrix({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<"perfect" | "monopoly">("perfect");
  const [intercept, setIntercept] = useState(100);
  const [cost, setCost] = useState(20);

  const slope = 1;

  const demandPoints = useMemo(() => {
    const points: Point[] = [];
    for (let q = 0; q <= 100; q += 5) {
      const y = intercept - slope * q;
      if (y >= 0) points.push({ x: q, y });
    }
    return points;
  }, [intercept]);

  const mrPoints = useMemo(() => {
    const points: Point[] = [];
    for (let q = 0; q <= 100; q += 5) {
      const y = intercept - 2 * slope * q;
      if (y >= -20) points.push({ x: q, y });
    }
    return points;
  }, [intercept]);

  const mcPoints = useMemo(() => {
    const points: Point[] = [];
    for (let q = 0; q <= 100; q += 5) {
      points.push({ x: q, y: cost });
    }
    return points;
  }, [cost]);

  const equilibrium = useMemo(() => {
    if (mode === "perfect") {
      const q = Math.max(0, (intercept - cost) / slope);
      return { x: Math.round(q * 100) / 100, y: cost };
    } else {
      const q = Math.max(0, (intercept - cost) / (2 * slope));
      return { x: Math.round(q * 100) / 100, y: cost };
    }
  }, [mode, intercept, cost]);

  const price = Math.round((mode === "perfect" ? cost : intercept - slope * equilibrium.x) * 100) / 100;
  const deadweightLoss = mode === "monopoly" ? 0.5 * (price - cost) * ((intercept - cost) / slope - equilibrium.x) : 0;

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10 text-white font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg leading-tight">Market Structure Matrix</h1>
          <p className="text-white/40 max-w-2xl">Compare market outcomes under different structures. Observe how monopolies restrict output and raise prices compared to competitive markets.</p>
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
          <div className="glass p-6 rounded-[32px] border-white/5 shadow-2xl relative overflow-hidden h-full min-h-[400px] md:min-h-[500px]">
            <MarketStructureChart 
              demandPoints={demandPoints}
              mrPoints={mrPoints}
              mcPoints={mcPoints}
              equilibrium={equilibrium}
              mode={mode}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white/90 flex items-center gap-2 tracking-tight">
              <LayoutGrid className="w-5 h-5 text-blue-500" /> Structure Toggle
            </h2>
            
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 mb-2">
              <button 
                onClick={() => setMode("perfect")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all tracking-widest ${mode === "perfect" ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'text-white/30 hover:text-white/50'}`}>
               PERFECT COMP.
              </button>
              <button 
                onClick={() => setMode("monopoly")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all tracking-widest ${mode === "monopoly" ? 'bg-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 'text-white/30 hover:text-white/50'}`}>
               MONOPOLY
              </button>
            </div>
            <p className="text-[10px] text-white/40 italic flex items-start gap-1 p-3 bg-white/5 rounded-xl leading-tight">
              <Info className="w-3 h-3 mt-0.5 shrink-0 text-white/20" />
              {mode === "monopoly" ? "In a monopoly, the firm is the price maker and faces the entire market demand. MR is below Price." : "In perfect competition, firms are price takers. Price equals Marginal Cost."}
            </p>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Market Parameters</h2>
            </div>
            
            <div className="space-y-6">
              <Slider 
                label="Demand Intercept"
                min={50} max={150}
                value={intercept}
                onChange={setIntercept}
                color="blue"
              />
              <Slider 
                label="Marginal Cost (Flat)"
                min={10} max={50}
                value={cost}
                onChange={setCost}
                color="emerald"
              />
            </div>
          </div>

          <div className="glass bg-white/5 p-8 rounded-[32px] border-white/10 shadow-2xl flex flex-col gap-4">
            <h3 className="font-bold text-white/20 uppercase text-xs tracking-widest text-center border-b border-white/5 pb-2">Outcome Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-white/30 text-[10px] font-bold uppercase mb-1">Market Price</span>
                <span className="text-2xl font-black text-amber-400">${price}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-white/30 text-[10px] font-bold uppercase mb-1">Quantity</span>
                <span className="text-2xl font-black text-blue-400">{equilibrium.x}</span>
              </div>
            </div>
            {mode === "monopoly" && (
              <div className="flex flex-col items-center p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 mt-2">
                <Percent className="w-4 h-4 text-rose-400 mb-1" />
                <span className="text-rose-400/50 text-[10px] font-bold uppercase">Deadweight Loss</span>
                <span className="text-3xl font-black text-rose-400">{deadweightLoss.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, min, max, value, onChange, color, step = 1 }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void; color: string; step?: number }) {
  const accentMap: any = {
    emerald: 'accent-emerald-500',
    blue: 'accent-blue-500',
    rose: 'accent-rose-500'
  };

  return (
    <div className="flex flex-col gap-3 group">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</label>
        <span className="text-xs font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded">{value}</span>
      </div>
      <input 
        type="range" 
        min={min} max={max} step={step}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer ${accentMap[color]}`}
      />
    </div>
  );
}
