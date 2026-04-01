"use client";

import React, { useState, useMemo } from "react";
import MarginalUtilityChart from "@/components/charts/MarginalUtilityChart";
import { calculateMarginalUtility } from "@/utils/economicsMath";

export default function UtilityPizzaParty({ onBack }: { onBack: () => void }) {
  const [slices, setSlices] = useState(0);

  const totalUtilitySchedule = [0, 12, 22, 30, 36, 40, 42, 42, 40, 36, 30];
  const marginalUtilitySchedule = useMemo(() => calculateMarginalUtility(totalUtilitySchedule), []);

  const data = useMemo(() => {
    return totalUtilitySchedule.map((tu, i) => ({
      slices: i,
      totalUtility: tu,
      marginalUtility: marginalUtilitySchedule[i]
    }));
  }, [marginalUtilitySchedule]);

  const currentMU = marginalUtilitySchedule[slices];

  const getEmoji = () => {
    if (slices === 0) return "🍕";
    if (currentMU > 0) return "😋";
    if (currentMU === 0) return "😐";
    return "🤢";
  };

  const getStatusText = () => {
    if (slices === 0) return "Ready for the first slice?";
    if (currentMU > 0) return "Delicious! Every bite is great.";
    if (currentMU === 0) return "I'm full. Any more won't help.";
    return "Oh no... too much pizza!" ;
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10 text-white font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg">Pizza Party: Utility Maximization</h1>
          <p className="text-white/40 max-w-2xl">Observe the Law of Diminishing Marginal Utility as you indulge in more slices.</p>
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
            <MarginalUtilityChart data={data} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 md:p-12 rounded-[32px] flex flex-col items-center gap-6 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
            <div className="text-8xl animate-bounce drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">{getEmoji()}</div>
            <p className="text-center font-bold text-white/80 h-12 leading-tight text-xl tracking-tight">{getStatusText()}</p>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              <h2 className="text-xl font-bold tracking-tight text-white/90 uppercase text-xs tracking-widest">Consumption Level</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-4 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Slices Eaten</label>
                  <span className="text-sm font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded shadow-inner">{slices} Slices</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="10" 
                  value={slices} 
                  onChange={(e) => setSlices(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500 shadow-[0_0_10px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>

          <div className="glass bg-white/5 p-8 rounded-[32px] border-white/10 shadow-2xl flex flex-col gap-4">
            <h3 className="font-bold text-white/20 uppercase text-xs tracking-widest text-center border-b border-white/5 pb-2">Utility Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span className="text-white/30 text-[10px] font-bold uppercase mb-1">Total (TU)</span>
                <span className="font-mono text-4xl font-bold text-blue-400 drop-shadow-lg">{totalUtilitySchedule[slices]}</span>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span className="text-white/30 text-[10px] font-bold uppercase mb-1">Marginal (MU)</span>
                <span className={`font-mono text-4xl font-bold drop-shadow-lg ${currentMU > 0 ? 'text-emerald-400' : currentMU === 0 ? 'text-white/40' : 'text-rose-400'}`}>{currentMU}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
