"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ComposedChart,
  Line,
  Legend,
  Label
} from "recharts";
import { Point } from "@/utils/economicsMath";

interface Props {
  historicalData: Point[];
  movingAveragePoints: Point[];
  regressionPoints: Point[];
}

const ForecastChart: React.FC<Props> = ({ 
  historicalData, 
  movingAveragePoints, 
  regressionPoints 
}) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={{ top: 40, right: 40, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={[0, "auto"]}
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
          >
            <Label value="Time Period (t)" offset={-20} position="insideBottom" fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </XAxis>
          <YAxis 
            type="number" 
            domain={[0, "auto"]}
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
          >
            <Label value="Demand (Units)" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} offset={0} fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </YAxis>
          <Tooltip 
            contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff", padding: "12px", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)" }}
            itemStyle={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}
            labelStyle={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "10px", marginBottom: "4px", fontWeight: 800, textTransform: "uppercase" }}
          />
          <Legend verticalAlign="top" height={36} />
          
          <Scatter
            data={historicalData}
            name="Actual Sales"
            fill="#3b82f6"
            fillOpacity={0.6}
            isAnimationActive={true}
          />
          
          <Line
            data={movingAveragePoints}
            type="monotone"
            dataKey="y"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            name="Moving Avg (3-mo)"
            strokeDasharray="5 5"
            isAnimationActive={true}
          />
          
          <Line
            data={regressionPoints}
            type="linear"
            dataKey="y"
            stroke="#f43f5e"
            strokeWidth={4}
            dot={false}
            name="Linear Regression"
            isAnimationActive={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
