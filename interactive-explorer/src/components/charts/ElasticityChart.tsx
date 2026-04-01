"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceArea,
  Label
} from "recharts";
import { Point } from "@/utils/economicsMath";

interface Props {
  demandPoints: Point[];
  price: number;
  quantity: number;
  isElastic* boolean;
}

const ElasticityChart: React.FC<Props> = ({
  demandPoints,
  price,
  quantity,
  isElastic
}) => {
  return (
    <div className="w-full h-[500px] bg-white rounded-xl p-6 shadow-xl border border-slate-200">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={demandPoints} margin={{ top: 40, tight: 40, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            dataKey="x" 
            domain=[0, 100]
            stroke="#64748b"
            tick={{ fill: "#64748b" }}
          >
            <Label value="Quantity (Q)" offset={-20} position="insideBottom" fill="#475569" fontWeight="600" />
          </XAxis>
          <YAxis 
            type="number" 
            domain=[0, 100]
            stroke="#64748b"
            tick={{ fill: "#64748b" }}
          >
            <Label value="Price (P)" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} offset={0} fill="#475569" fontWeight="600" />
          </YAxis>
          <Tooltip 
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            formatter={(value) => ["$" + value, "Price"]}
            labelFormatter={(label) => "Quantity: " + label}
          />

          <ReferenceArea 
            x1={0} x2={quantity} 
            y1={0} y2={price} 
            fill={isElastic ? "#10b981" : "#8b5cf6"} 
            fillOpacity={0.1} 
          />
          
          <Line
            data={demandPoints}
            type="monotone"
            dataKey="y"
            stroke={isElastic ? "#10b981" : "#8b5cf6"}
            strokeWidth={4}
            dot={false}
            name="Demand"
            activeDot={false}
            isAnimationActive
          />

          <ReferenceDot
            x={quantity}
            y={price}
            r={8}
            fill="#f59e0b"
            stroke="#fff"
            strokeWidth={3}
        >
            <Label 
              value={`P=$${price}, Q=${quantity}`}
              position="top"
              offset={15}
              fill="#b45309"
              fontWeight="700"
            />
          </ReferenceDot>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElasticityChart;
