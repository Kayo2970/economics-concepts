"use client";

import React, { useState, useMemo } from "react";
import IndifferenceChart from "@/components/charts/IndifferenceChart";
import { generateIndifferenceCurve, generateBudgetLine, Point } from "@/utils/economicsMath";
import { Wallet, ShoppingBag, Target, Info } from "lucide-react";

export default function ConsumerEquilibrium({ onBack }: { onBack: () => void }) {
  const [income, setIncome] = useState(100);
  const [priceX, setPriceX] = useState(2);
  const [priceY, setPriceY] = useState(2);
  const [alpha, setAlpha] = useState(0.5);

  const budgetPoints = useMemo(() => generateBudgetLine(income, priceX, priceY), [income, priceX, priceY]);

  // Optimal Choice for Cobb-Douglas: x* = alpha * I / Px, y* = (1-alpha) * I / Py
  const equilibrium: Point = useMemo(() => ({
    x: Math.round((alpha * income) / priceX * 100) / 100,
    y: Math.round(((1 - alpha) * income) / priceY * 100) / 100
  }), [income, priceX, priceY, alpha]);

  const maxUtility = Math.pow(equilibrium.x, alpha) * Math.pow(equilibrium.y, 1 - alpha);

  const indifferencePoints = useMemo(() => {
    return [
      generateIndifferenceCurve(maxUtility * 0.7, alpha),
      generateIndifferenceCurve(maxUtility, alpha),
      generateIndifferenceCurve(maxUtility * 1.3, alpha)
    ];
  }, [maxUtility, alpha]);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10 text-white font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg leading-tight">Consumer Equilibrium</h1>
          <p className="text-white/40 max-w-2xl">Find the utility-maximizing combination of goods given your budget constraint. Where the budget line meets the highest indifference curve.</p>
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
            <IndifferenceChart 
              indifferencePoints={indifferencePoints}
              budgetPoints={budgetPoints}
              equilibrium={equilibrium}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Budget & Prices</h2>
            </div>
            
            <div className="space-y-6">
              <Slider 
                label="Total Income ($)"
                min={50} max={200}
                value={income}
                onChange={setIncome}
                color="emerald"
              />
              <Slider 
                label="Price of Good X"
                min={1} max={10} step={0.5}
                value={priceX}
                onChange={setPriceX}
                color="blue"
              />
              <Slider 
                label="Price of Good Y"
                min={1} max={10} step={0.5}
                value={priceY}
                onChange={setPriceY}
                color="rose"
              />
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Preferences (Alpha)</h2>
            </div>
            <Slider 
              label="Weight on Good X"
              min={0.1} max={0.9} step={0.05}
              value={alpha}
              onChange={setAlpha}
              color="amber"
            />
            <p className="text-[10px] text-white/30 italic">Higher alpha means a stronger preference for Good X over Good Y.</p>
          </div>

          <div className="glass bg-white/5 p-8 rounded-[32px] border-white/10 shadow-2xl flex flex-col gap-4">
            <h3 className="font-bold text-white/20 uppercase text-xs tracking-widest text-center border-b border-white/5 pb-2">Optimization Result</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-white/30 text-[10px] font-bold uppercase mb-1">Optimal X</span>
                <span className="text-2xl font-black text-white">{equilibrium.x}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-white/30 text-[10px] font-bold uppercase mb-1">Optimal Y</span>
                <span className="text-2xl font-black text-white">{equilibrium.y}</span>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 mt-2">
                <Target className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-amber-400/50 text-[10px] font-bold uppercase">Max Utility (U*)</span>
                <span className="text-3xl font-black text-amber-400">{maxUtility.toFixed(2)}</span>
            </div>
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
    rose: 'accent-rose-500',
    amber: 'accent-amber-500'
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
