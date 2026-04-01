"use client";

import React, { useState, useMemo, useEffect } from "react";
import PPFChart from "@/components/charts/PPFChart";
import { generatePPFPoints, Point } from "@/utils/economicsMath";
import { ArrowRightLeft, Book, Cpu, Info, TrendingDown } from "lucide-react";

interface Props {
  onBack: () => void;
}

const OpportunityCostPPF: React.FC<Props> = ({ onBack }) => {
  const totalResources = 10000; // R^2 = 10000, so max X = 100, max Y = 100
  const [books, setBooks] = useState(50);
  const [prevBooks, setPrevBooks] = useState(50);

  const gadgets = useMemo(() => {
    return Math.sqrt(Math.max(0, totalResources - books * books));
  }, [books]);

  const ppfPoints = useMemo(() => {
    return generatePPFPoints(totalResources, 60);
  }, []);

  const currentPoint: Point = { x: books, y: Math.round(gadgets * 100) / 100 };

  // Calculate opportunity cost of 1 more book at current level
  const gadgetsAtNextBook = Math.sqrt(Math.max(0, totalResources - (books + 1) * (books + 1)));
  const opportunityCost = Math.max(0, gadgets - gadgetsAtNextBook);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">Production Possibilities Frontier</h1>
          <p className="text-white/40 max-w-2xl">Discover the law of increasing opportunity costs. As you produce more of one good, you must give up increasing amounts of the other.</p>
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
          <div className="glass p-6 rounded-[32px] border-white/5 shadow-2xl relative overflow-hidden h-full min-h-[500px]">
            <PPFChart ppfPoints={ppfPoints} currentPoint={currentPoint} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Allocation Controls */}
          <div className="glass-card p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Resource Allocation</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col gap-3 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">Produce Books</label>
                  <span className="text-sm font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded shadow-inner">{books} Units</span>
                </div>
                <input 
                  type="range" 
                  min={0} max={100}
                  value={books} 
                  onChange={(e) => setBooks(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500 shadow-[0_0_10px_rgba(0,0,0,0.4)]"
                />
                <div className="flex justify-between text-[10px] text-white/20 font-bold uppercase tracking-tighter">
                  <span>Consumer Focus</span>
                  <span>Industrial Focus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Output Display */}
          <div className="glass bg-white/5 p-8 rounded-[32px] border-white/10 shadow-2xl flex flex-col gap-6">
            <h3 className="font-bold text-white/20 uppercase text-xs tracking-widest text-center border-b border-white/5 pb-2">Current Production</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Book className="w-5 h-5 text-rose-400" />
                <span className="text-[10px] font-bold text-white/30 uppercase">Books</span>
                <span className="text-2xl font-bold text-white">{books}</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Cpu className="w-5 h-5 text-blue-400" />
                <span className="text-[10px] font-bold text-white/30 uppercase">Gadgets</span>
                <span className="text-2xl font-bold text-white">{Math.round(gadgets)}</span>
              </div>
            </div>
          </div>

          {/* Opportunity Cost Analysis */}
          <div className="glass-card p-8 rounded-[32px] border-rose-500/20 bg-rose-500/5 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
            <div className="flex items-center gap-2 mb-6 text-rose-400">
              <ArrowRightLeft className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs tracking-widest">Opportunity Cost</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <p className="text-sm text-white/60 leading-relaxed">
                To produce <span className="text-white font-bold">1 more Book</span>, you must sacrifice:
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-rose-500 drop-shadow-lg">{opportunityCost.toFixed(2)}</span>
                <span className="text-sm font-bold text-rose-400/60 uppercase">Gadgets</span>
              </div>
              <div className="mt-4 p-4 bg-black/20 rounded-xl flex gap-3 items-start">
                <Info className="w-4 h-4 text-white/20 shrink-0 mt-1" />
                <p className="text-[11px] text-white/40 italic leading-snug">
                  {books > 80 
                    ? "Opportunity cost is very high now. Resources are better suited for Gadgets, but you are forcing them into Book production." 
                    : books < 20 
                    ? "Opportunity cost is low. You have plenty of resources that are easily switched to Books."
                    : "The curve shows that resources are not perfectly adaptable. Giving up more of one good is required for each additional unit of the other."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCostPPF;
