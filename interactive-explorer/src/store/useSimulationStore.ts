import { create } from 'zustand';

interface SimulationState {
  demand: { intercept: number; slope: number };
  supply: { intercept: number; slope: number };
  setDemand: (intercept: number, slope: number) => void;
  setSupply: (intercept: number, slope: number) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  demand: { intercept: 100, slope: 2 },
  supply: { intercept: 20, slope: 2 },
  setDemand: (intercept, slope) => set({ demand: { intercept, slope } }),
  setSupply: (intercept, slope) => set({ supply: { intercept, slope } }),
}));
