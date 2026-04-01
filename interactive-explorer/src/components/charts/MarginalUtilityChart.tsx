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
  Label,
  AreaChart,
  Area
} from "recharts";

interface Props {
  data: any[];
}

const MarginalUtilityChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 40, right: 40, left: 20, bottom: 40 }}>
          <defs>
            <linearGradient id="colorTu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis 
            dataKey="slices" 
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
          >
            <Label value="Slices of Pizza" offset={-20} position="insideBottom" fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </XAxis>
          <YAxis 
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
          >
            <Label value="Utility Units" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} offset={0} fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </YAxis>
          <Tooltip 
            contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff", padding: "12px", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)" }}
            itemStyle={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}
            labelStyle={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "10px", marginBottom: "4px", fontWeight: 800, textTransform: "uppercase" }}
            cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="totalUtility"
            stroke="#3b82f6"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorTu)"
            name="Total Utility (TU)"
          />

          <Area
            type="monotone"
            dataKey="marginalUtility"
            stroke="#10b981"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorMu)"
            name="Marginal Utility (MU)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarginalUtilityChart;
