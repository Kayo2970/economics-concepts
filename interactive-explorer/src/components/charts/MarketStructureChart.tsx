"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceDot,
  Legend,
  Line,
  ComposedChart
} from "recharts";
import { Point } from "@/utils/economicsMath";

interface Props {
  demandPoints: Point[];
  mrPoints: Point[];
  mcPoints: Point[];
  equilibrium: Point | null;
  mode: "perfect" | "monopoly" | "oligopoly";
}

const MarketStructureChart: React.FC<Props> = ({ 
  demandPoints, 
  mrPoints, 
  mcPoints, 
  equilibrium,
  mode
}) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={{ top: 40, right: 40, left: 20, bottom: 40 }}>
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
            <Label value="Price (P) / Cost (C)" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} offset={0} fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </YAxis>
          <Tooltip 
            contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff", padding: "12px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)" }}
            itemStyle={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}
            labelStyle={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "10px", marginBottom: "4px", fontWeight: 800, textTransform: "uppercase" }}
          />
          <Legend verticalAlign="top" height={36} />
          
          <Line
            data={demandPoints}
            type="monotone"
            dataKey="y"
            stroke="#10b981"
            strokeWidth={4}
            dot={false}
            name="Demand (AR=P)"
            isAnimationActive={true}
          />
          
          {(mode === "monopoly" || mode === "oligopoly") && (
            <Line
              data={mrPoints}
              type="monotone"
              dataKey="y"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={false}
              name={mode === "monopoly" ? "Marginal Revenue (MR)" : "Industry MR"}
              strokeDasharray="5 5"
              isAnimationActive={true}
            />
          )}
          
          <Line
            data={mcPoints}
            type="monotone"
            dataKey="y"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={false}
            name="Marginal Cost (MC)"
            isAnimationActive={true}
          />
          
          {equilibrium && (
            <ReferenceDot
              x={equilibrium.x}
              y={equilibrium.y}
              r={8}
              fill="#fbbf24"
              stroke="#0f172a"
              strokeWidth={3}
            >
              <Label
                value={mode === "monopoly" ? "MONOPOLY" : mode === "oligopoly" ? "OLIGOPOLY" : "PERFECT COMP."}
                position="top"
                offset={15}
                fill="#fbbf24"
                fontSize={10}
                fontWeight="900"
                className="uppercase tracking-widest"
              />
            </ReferenceDot>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketStructureChart;
