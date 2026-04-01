"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from "recharts";

interface Props {
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
}

const MacroDashboard: React.FC<Props> = ({ gdpGrowth, inflation, unemployment }) => {
  const data = [
    { name: "GDP Growth", value: gdpGrowth, color: gdpGrowth > 0 ? "#10b981" : "#f43f5e" },
    { name: "Inflation", value: inflation, color: inflation < 3 ? "#10b981" : inflation < 6 ? "#fbbf24" : "#f43f5e" },
    { name: "Unemployment", value: unemployment, color: unemployment < 5 ? "#10b981" : "#fbbf24" },
  ];

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col gap-8 p-4">
      <div className="grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.name} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">{item.name}</span>
            <span className="text-4xl font-black text-white" style={{ color: item.color }}>
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255, 255, 255, 0.2)"
              tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 700 }}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.2)"
              tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              unit="%"
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff" }}
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
            />
            <ReferenceLine y={0} stroke="rgba(255, 255, 255, 0.2)" />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MacroDashboard;
