"use client";

import React, { useState, useMemo } from "react";
import ForecastChart from "@/components/charts/ForecastChart";
import { calculateRegression, calculateMovingAverage, Point } from "@/utils/economicsMath";
import { TrendingUp, BarChart3, Settings2 } from "lucide-react";

const INITIAL_DATA: Point[] = [
  { x: 1, y: 45 }, { x: 2, y: 52 }, { x: 3, y: 48 }, { x: 4, y: 60 },
  { x: 5, y: 55 }, { x: 6, y: 72 }, { x: 7, y: 68 }, { x: 8, y: 85 },
  { x: 9, y: 80 }, { x: 10, y: 95 }, { x: 11, y: 92 }, { x: 12, y: 110 }
];

export default function ForecastingLab({ onBack }: { onBack: () => void }) {
  const [dataVolatility, setDataVolatility] = useState(15);
  
  const historicalData = useMemo(() => {
    return INITIAL_DATA.map(p => ({
      x: p.x,
      y: Math.round(Math.max(0, p.y + (Math.sin(p.x) * dataVolatility)) * 100) / 100
    }));
  }, [dataVolatility]);

  const regression = useMemo(() => calculateRegression(historicalData), [historicalData]);
  
  const regressionPoints = useMemo(() => {
    const points: Point[] = [];
    for (let x = 1; x <= 15; x++) {
      points.push({ x, y: Math.round((regression.intercept + regression.slope * x) * 100) / 100 });
    }
    return points;
  }, [regression]);

  const movingAveragePoints = useMemo(() => calculateMovingAverage(historicalData, 3), [historicalData]);

  const nextMonthForecast = Math.round((regression.intercept + regression.slope * 13) * 100) / 100;

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen relative z-10 text-white font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg leading-tight">Demand Forecasting Lab</h1>
          <p className="text-white/40 max-w-2xl">Apply quantitative methods to historical sales data. Compare Linear Regression trends against Moving Average fluctuations.</p>
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
            <ForecastChart 
              historicalData={historicalData}
              movingAveragePoints={movingAveragePoints}
              regressionPoints={regressionPoints}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold tracking-tight text-white/90">Lab Controls</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col gap-4 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Data Volatility</label>
                  <span className="text-sm font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded shadow-inner">{dataVolatility}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="50" 
                  value={dataVolatility} 
                  onChange={(e) => setDataVolatility(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="glass bg-white/5 p-8 rounded-[32px] border-white/10 shadow-2xl flex flex-col gap-6">
            <h3 className="font-bold text-white/20 uppercase text-xs tracking-widest text-center border-b border-white/5 pb-2">Analysis Panel</h3>
            <div className="flex flex-col items-center gap-1">
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Next Month Forecast (t=13)</span>
                <span className="text-5xl font-black text-emerald-400 drop-shadow-2xl">{nextMonthForecast}</span>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Units Demanded</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <BarChart3 className="w-4 h-4 text-blue-400 mb-2" />
                <span className="text-white/20 text-[10px] font-bold uppercase mb-1">Trend Slope</span>
                <span className="font-mono text-xl font-bold text-white">{regression.slope.toFixed(2)}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <Settings2 className="w-4 h-4 text-rose-400 mb-2" />
                <span className="text-white/20 text-[10px] font-bold uppercase mb-1">Intercept</span>
                <span className="font-mono text-xl font-bold text-white">{regression.intercept.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-[32px] bg-blue-500/5 border-blue-500/20">
            <p className="text-xs text-white/40 leading-relaxed italic">
              "The linear regression model minimizes the sum of squared errors between the predicted line and historical points, providing the most statistically sound trend forecast."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
