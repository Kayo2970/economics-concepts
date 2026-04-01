"use client";

import React, { useState, useMemo } from "react";
import { generateLinearPoints } from "@/utils/economicsMath";
import ElasticityChart from "@/components/charts/ElasticityChart";
import { TrendingUp, TrendingDown, Activity, Info } from "lucide-react";

interface Props {
  onBack: () => void;
}

const ElasticityRevenue: React.FC<Props> = ({ onBack }) => {
  const [price, setPrice] = useState(50);
  const [isElastic, setIsElastic] = useState(false);

  const a = 100;
  const b = isElastic ? 1.5 : 0.3;
  const demand = { intercept: a, slope: b };

  const demandPoints = useMemo(() => generateLinearPoints(demand, true, 100), [demand]);
  const quantity = Math.max(0, a - b * price);
  const revenue = price * quantity;

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10 text-white">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">Price Elasticity & Revenue</h1>
          <p className="text-white/40 max-w-2xl">Explore how price changes affect total revenue based on good type (Necessities vs. Luxuries).</p>
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
            <ElasticityChart 
              demandPoints={demandPoints} 
              price={price} 
              quantity={Math.round(quantity * 100) / 100} 
              isElastic={isElastic} 
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-8 rounded-[32px] flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white/90 flex items-center gap-2 tracking-tight">
              <Activity className="w-5 h-5 text-blue-500" /> Market Conditions
            </h2>
            
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 mb-2">
              <button 
                onClick={() => setIsElastic(false)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all tracking-widest ${!isElastic ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-[1.02]' : 'text-white/30 hover:text-white/50'}`}>
               NECESSITY
              </button>
              <button 
                onClick={() => setIsElastic(true)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all tracking-widest ${isElastic ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-[1.02]' : 'text-white/30 hover:text-white/50'}`}>
               LUXURY
              </button>
            </div>
            <p className="text-xs text-white/40 italic flex items-start gap-1 p-3 bg-white/5 rounded-xl">
              <Info className="w-3 h-3 mt-0.5 shrink-0 text-white/20" />
              {isElastic ? "Luxuries have high elasticity. Consumers are very sensitive to price drops." : "Necessities have low elasticity. Demand remains stable despite price hikes."}
            </p>
          </div>

          <div className="glass-card p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-white/90 tracking-tight">Price Setting</h2>
               <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-bold border border-amber-500/20">${price}</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))}
              className={`w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer ${isElastic ? 'accent-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'accent-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}
            />
          </div>

          <div className="glass bg-white/5 p-8 rounded-[32px] border-white/10 shadow-2xl flex flex-col gap-6">
            <h3 className="font-bold text-white/20 uppercase text-xs tracking-widest text-center border-b border-white/5 pb-2">Analysis Results</h3>
            <div className="flex flex-col items-center gap-1">
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Total Revenue</span>
                <span className={`text-4xl font-black drop-shadow-2xl ${isElastic ? 'text-emerald-400' : 'text-blue-400'}`}>${Math.round(revenue)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span className="text-white/20 text-[10px] font-bold uppercase mb-1">Sales</span>
                <span className="font-mono text-xl font-bold text-white text-center tracking-widest">{Math.round(quantity)}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span className="text-white/20 text-[10px] font-bold uppercase mb-1">Elasticity</span>
                <span className="font-mono text-xl font-bold text-white text-center tracking-widest">{isElastic ? '1.50' : '0.30'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElasticityRevenue;
