"use client";

import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label
} from "recharts";

interface DataPoint {
  slices: number;
  totalUtility: number;
  marginalUtility: number;
}

interface Props {
  data: DataPoint[];
}

const MarginalUtilityChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[500px] bg-white rounded-xl p-6 shadow-xl border border-slate-200">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 40, right: 40, left: 20, bottom: 40 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="slices" 
            stroke="#64748b"
            tick={{ fill: "#64748b" }}
          >
            <Label value="Slices of Pizza" offset={-20} position="insideBottom" fill="#475569" fontWeight="600" />
          </XAxis>
          
          <YAxis 
            yAxisId="left"
            stroke="#3b82f6"
            tick={{ fill: "#3b82f6" }}
          >
            <Label value="Total Utility" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} offset={0} fill="#3b82f6" fontWeight="600" />
          </YAxis>
          
          <YAxis 
            yAxisId="right" 
            orientation="right"
            stroke="#f59e0b"
            tick={{ fill: "#f59e0b" }}
          >
            <Label value="Marginal Utility" angle={90} position="insideRight" style={{ textAnchor: "middle" }} offset={0} fill="#f59e0b" fontWeight="600" />
          </YAxis>

          <Tooltip 
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend verticalAlign="top" height={36}/>
          
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="totalUtility"
            fill="url(#colorTotal)"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Total Utility"
          />
          
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="marginalUtility"
            stroke="#f59e0b"
            strokeWidth={4}
            dot={{ r: 6, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 8, strokeWidth: 0 }}
            name="MarginalUtility"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarginalUtility-Chart;
