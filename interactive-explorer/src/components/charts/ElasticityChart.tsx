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
  isElastic: boolean;
}

const ElasticityChart: React.FC<Props> = ({
  demandPoints,
  price,
  quantity,
  isElastic
}) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={demandPoints} margin={{ top: 40, right: 40, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={[0, 100]}
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
          >
            <Label value="Quantity (Q)" offset={-20} position="insideBottom" fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </XAxis>
          <YAxis 
            type="number" 
            domain={[0, 100]}
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
          >
            <Label value="Price (P)" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} offset={0} fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </YAxis>
          <Tooltip 
            contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff", padding: "12px", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)" }}
            itemStyle={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}
            labelStyle={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "10px", marginBottom: "4px", fontWeight: 800, textTransform: "uppercase" }}
            formatter={(value) => ["$" + value, "Price"]}
            labelFormatter={(label) => "Quantity: " + label}
            cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }}
          />

          <ReferenceArea 
            x1={0} x2={quantity} 
            y1={0} y2={price} 
            fill={isElastic ? "#10b981" : "#3b82f6"} 
            fillOpacity={0.05} 
          />
          
          <Line
            data={demandPoints}
            type="monotone"
            dataKey="y"
            stroke={isElastic ? "#10b981" : "#3b82f6"}
            strokeWidth={4}
            dot={false}
            name="Demand"
            activeDot={false}
            isAnimationActive={true}
            strokeLinecap="round"
          />

          <ReferenceDot
            x={quantity}
            y={price}
            r={8}
            fill="#fbbf24"
            stroke="#0f172a"
            strokeWidth={3}
          >
            <Label 
              value={`$${price}`}
              position="top"
              offset={15}
              fill="#fbbf24"
              fontSize={10}
              fontWeight="900"
              className="uppercase tracking-widest bg-black/50"
            />
          </ReferenceDot>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElasticityChart;
