"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Label,
  Area,
  AreaChart
} from "recharts";
import { Point } from "@/utils/economicsMath";

interface Props {
  ppfPoints: Point[];
  currentPoint: Point;
}

const PPFChart: React.FC<Props> = ({ ppfPoints, currentPoint }) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={ppfPoints} margin={{ top: 40, right: 40, left: 20, bottom: 40 }}>
          <defs>
            <linearGradient id="ppfGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={[0, 100]}
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
          >
            <Label value="Books (Quantity)" offset={-20} position="insideBottom" fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </XAxis>
          <YAxis 
            type="number" 
            domain={[0, 100]}
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
          >
            <Label value="Gadgets (Quantity)" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} offset={0} fill="rgba(255, 255, 255, 0.2)" fontSize={10} fontWeight="800" className="uppercase tracking-[0.2em]" />
          </YAxis>
          <Tooltip 
            contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff", padding: "12px", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)" }}
            itemStyle={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}
            labelStyle={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "10px", marginBottom: "4px", fontWeight: 800, textTransform: "uppercase" }}
            formatter={(value: any, name: string) => [value, name === 'y' ? 'Gadgets' : 'Books']}
            labelFormatter={(label) => "Books: " + label}
          />
          <Area
            type="monotone"
            dataKey="y"
            stroke="#f43f5e"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#ppfGradient)"
            isAnimationActive={true}
          />
          <ReferenceDot
            x={currentPoint.x}
            y={currentPoint.y}
            r={10}
            fill="#f43f5e"
            stroke="#fff"
            strokeWidth={3}
            className="drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]"
          >
            <Label
              value={`CURRENT ALLOCATION`}
              position="top"
              offset={15}
              fill="#f43f5e"
              fontSize={10}
              fontWeight="900"
              className="uppercase tracking-widest"
            />
          </ReferenceDot>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PPFChart;
