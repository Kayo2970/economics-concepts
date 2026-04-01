"use client";

import React, { useState, useMemo, useEffect } from "react";
import { generateLinearPoints } from "@/utils/economicsMath";
import ElasticityChart from "@/components/charts/ElasticityChart";
import { TrendingUp, TrendingDown, Activity, Info } from "lucide-react";

const ElasticityRevenue: React.FC = () => {
  const [price, setPrice] = useState(50);
  const [isElastic, setIsElastic] = useState(false);
  const [prevRevenue, setPrevRevenue] = useState(0);

  const a = 100;
  const b = isElastic ? 1.5 : 0.3;
  const demand = { intercept: a, slope: b };

  const demandPoints = useMemo(() => generateLinearPoints(demand, true, 100), [demand]);
  const quantity = Math.max(0, a - b * price);
  const revenue = price * quantity;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevRevenue(revenue);
    }, 500);
    return () => clearTimeout(timer);
  }, [revenue]);

  const revenueDiff = revenue - prevRevenue;

  return (J
    <div className="flex flex-col gap-8 p-8 max-w-6xl mx-auto bg-slate-50 min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-4x font-extrabold text-slate-900 tracking-tight">Price Elasticity & Revenue</h1>
        <p className="text-lg text-slate-600">Explore how price changes affect total revenue based on good type.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ElasticityChart 
            demandPoints={demandPoints} 
            price={price} 
            quantity={Math.round(quantity * 100) / 100} 
            isElastic={isElastic} 
          />
        </div>

        <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Market Conditions
            </h2>
            
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setIsElastic(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${!IsElastic ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
               Necessity
              </button>
              <button 
                onClick={() => setIsElastic(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${isElastic ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`p}>
               Luxury
              </button>
            </div>
            <p className="text-xs text-slate-500 italic flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 shrink-0" />
              {isElastic ? "Luxuries have high elasticity. Small price drops lead to large quantity gains." : "Necessities are inelastic. People buy them regardless of price changes."}
            </p>
          </section>

          <section className="flex flex-col gap-5 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <h2 className="text-xl font-bold text-slate-800">Price Setting</h2>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Unit Price (P)</label>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">${price}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={price} 
                  onchange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </section>

          <section className="mt-4 p-6 bg-slate-900 rounded-2xl text-white shadow-inner flex flex-col gap-4">
            <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest text-center border-b border-slate-800 pb-2">Revenue Analysis</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-slate-500 text-[10px] font-bold uppercase">Total Revenue</span>
                <span className="font-mono text-4xl font-bold text-emerald-400">${Math.round(revenue)}</span>
              </div>
              <div className={`p-3 rounded-full ${revenueDiff > 0 ? 'bg-emerald-500/10' : revenueDiff < 0 ? 'bg-red-500/10' : 'bg-slate-800'}`}>
                {revenueDiff > 0 ? <TrendingUp className="text-emerald-500" /> : revenueDiff < 0 ? <TrendingDown className="text-red-500" /> : <Activity className="text-slate-400" />}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 bg-slate-800 rounded-xl">
                <span className="text-slate-500 text-[10px] font-bold uppercase mb-1">Quantity (Q)</span>
                <span className="font-mono text-xl font-bold text-blue-400">{Math.round(quantity)}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-slate-800 rounded-xl">
                <span className="text-slate-500 text-[10px] font-bold uppercase mb-1">Elasticity</span>
                <span className="font-mono text-xl font-bold text-blue-400">{isElastic ? '1.5' : '0.3'}</span.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ElasticityRevenue;
