"use client";

import React, { useMemo } from "react";
import { useSimulationStore } from "@/store/useSimulationStore";
import { calculateEquilibrium, generateLinearPoints } from "@/utils/economicsMath";
import SupplyDemandChart from "@/components/charts/SupplyDemandChart";

export default function SupplyDemandSandbox({ onBack }: { onBack: () => void }) {
  const { demand, supply, setDemand, setSupply } = useSimulationStore();

  const maxPrice = 100;

  const demandPoints = useMemo(() => 
    generateLinearPoints(demand, true, maxPrice), 
  [demand]);

  const supplyPoints = useMemo(() => 
    generateLinearPoints(supply, false, maxPrice), 
  [supply]);

  const equilibrium = useMemo(() => 
    calculateEquilibrium(demand, supply), 
  [demand, supply]);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">Market Equilibrium Sandbox</h1>
          <p className="text-white/40 max-w-2xl">Interact with the supply and demand curves to observe real-time market shifts. Watch the equilibrium point react as you modify shifters.</p>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-3 glass hover:bg-white/10 rounded-2xl text-sm font-bold text-white transition-all shadow-xl"
        >
          ← Back Home
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass p-6 rounded-[32px] border-white/5 shadow-2xl relative overflow-hidden h-full min-h-[400px] md:min-h-[500px]">
            <SupplyDemandChart 
              demandPoints={demandPoints} 
              supplyPoints={supplyPoints} 
              equilibrium={equilibrium} 
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Demand Controls */}
          <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Demand Shifters</h2>
            </div>
            
            <div className="space-y-8">
              <Slider 
                label="Baseline Demand (Intercept)"
                min={50} max={200}
                value={demand.intercept}
                onChange={(val) => setDemand(val, demand.slope)}
                color="emerald"
              />
              <Slider 
                label="Responsiveness (Slope)"
                min={0.5} max={5} step={0.1}
                value={demand.slope}
                onChange={(val) => setDemand(demand.intercept, val)}
                color="emerald"
              />
            </div>
          </div>

          {/* Supply Controls */}
          <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Supply Shifters</h2>
            </div>
            
            <div className="space-y-8">
              <Slider 
                label="Production Cost (Intercept)"
                min={0} max={100}
                value={supply.intercept}
                onChange={(val) => setSupply(val, supply.slope)}
                color="blue"
              />
              <Slider 
                label="Tech Efficiency (Slope)"
                min={0.5} max={5} step={0.1}
                value={supply.slope}
                onChange={(val) => setSupply(supply.intercept, val)}
                color="blue"
              />
            </div>
          </div>

          {/* Analysis View */}
          <div className="glass bg-white/5 p-8 rounded-[32px] border-white/10 shadow-2xl">
            <h3 className="font-bold mb-6 text-white/20 uppercase text-xs tracking-widest text-center border-b border-white/5 pb-2">Market Analysis</h3>
            {equilibrium ? (
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase">Price (P*)</span>
                  <span className="text-3xl font-bold text-amber-400 drop-shadow-lg">${equilibrium.y}</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-white/5">
                  <span className="text-[10px] font-bold text-white/30 uppercase">Quantity (Q*)</span>
                  <span className="text-3xl font-bold text-blue-400 drop-shadow-lg">{equilibrium.x}</span>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="text-rose-400 text-sm font-medium italic animate-pulse">Extreme Market Inequality - No Equilibrium Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function Slider({ label, min, max, value, onChange, color, step = 1 }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void; color: string; step?: number }) {
  const accentMap: any = {
    emerald: 'accent-emerald-500',
    blue: 'accent-blue-500'
  };

  return (
    <div className="flex flex-col gap-3 group">
      <div className="flex justify-between items-center px-1">
        <label className="text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">{label}</label>
        <span className="text-sm font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded shadow-inner">{value}</span>
      </div>
      <input 
        type="range" 
        min={min} max={max} step={step}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className={`w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer ${accentMap[color]} shadow-[0_0_10px_rgba(0,0,0,0.4)]`}
      />
    </div>
  );
}
