"use client";

import React, { useState, useMemo } from "react";
import PPFChart from "@/components/charts/PPFChart";
import { generatePPFPoints, Point } from "@/utils/economicsMath";
import { ArrowRightLeft, Book, Cpu, Info } from "lucide-react";

interface Props {
  onBack: () => void;
}

const OpportunityCostPPF: React.FC<Props> = ({ onBack }) => {
  const totalResources = 10000;
  const [books, setBooks] = useState(50);

  const gadgets = useMemo(() => {
    return Math.sqrt(Math.max(0, totalResources - books * books));
  }, [books]);

  const ppfPoints = useMemo(() => {
    return generatePPFPoints(totalResources, 60);
  }, []);

  const currentPoint: Point = { x: books, y: Math.round(gadgets * 100) / 100 };

  const gadgetsAtNextBook = Math.sqrt(Math.max(0, totalResources - (books + 1) * (books + 1)));
  const opportunityCost = Math.max(0, gadgets - gadgetsAtNextBook);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10 text-white font-sans">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg leading-tight">Production Possibilities Frontier</h1>
          <p className="text-white/40 max-w-2xl">Discover the law of increasing opportunity costs. As you produce more of one good, you must give up increasing amounts of the other.</p>
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
            <PPFChart ppfPoints={ppfPoints} currentPoint={currentPoint} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-10 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.6)]" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Resource Allocation</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col gap-5 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">Produce Books</label>
                  <span className="text-sm font-mono font-bold text-white/90 bg-white/10 px-3 py-1 rounded-lg border border-white/5 shadow-inner">{books} Units</span>
                </div>
                <input 
                  type="range" 
                  min={0} max={100}
                  value={books} 
                  onChange={(e) => setBooks(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                />
                <div className="flex justify-between text-[10px] text-white/20 font-bold uppercase tracking-widest opacity-60">
                  <span>Consumer Focus</span>
                  <span>Industrial Focus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass bg-white/5 p-8 rounded-[32px] border-white/10 shadow-2xl flex flex-col gap-6">
            <h3 className="font-bold text-white/20 uppercase text-xs tracking-widest text-center border-b border-white/5 pb-2">Current Output</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2 p-6 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <Book className="w-6 h-6 text-rose-400" />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Books</span>
                <span className="text-3xl font-bold text-white tracking-widest">{books}</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-6 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <Cpu className="w-6 h-6 text-blue-400" />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Gadgets</span>
                <span className="text-3xl font-bold text-white tracking-widest">{Math.round(gadgets)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[32px] border-rose-500/20 bg-rose-500/5 shadow-[0_0_80px_rgba(244,63,94,0.05)]">
            <div className="flex items-center gap-3 mb-6 text-rose-400">
              <ArrowRightLeft className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs tracking-[0.2em]">Opportunity Cost</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <p className="text-sm text-white/50 leading-relaxed text-center italic">
                To produce <span className="text-white font-bold not-italic font-mono">1 more Unit</span> of Books, you must sacrifice:
              </p>
              <div className="flex flex-col items-center gap-1 py-6 bg-black/30 rounded-3xl border border-rose-500/20 shadow-inner">
                <span className="text-5xl font-black text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]">{opportunityCost.toFixed(2)}</span>
                <span className="text-[10px] font-bold text-rose-400/60 uppercase tracking-[0.3em]">Units of Gadgets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCostPPF;
