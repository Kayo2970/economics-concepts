"use client";

import { useState } from "react";
import SupplyDemandSandbox from "@/modules/SupplyDemandSandbox";
import ElasticityRevenue from "@/modules/ElasticityRevenue";
import OpportunityCostPPF from "@/modules/OpportunityCostPPF";
import UtilityPizzaParty from "@/modules/UtilityPizzaParty";
import ForecastingLab from "@/modules/ForecastingLab";
import ConsumerEquilibrium from "@/modules/ConsumerEquilibrium";
import MarketMatrix from "@/modules/MarketMatrix";
import PolicyBalancer from "@/modules/PolicyBalancer";

export default function Home() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const renderModule = () => {
    switch (activeModule) {
      case 'supply-demand':
        return <SupplyDemandSandbox onBack={() => setActiveModule(null)} />;
      case 'elasticity':
        return <ElasticityRevenue onBack={() => setActiveModule(null)} />;
      case 'ppf':
        return <OpportunityCostPPF onBack={() => setActiveModule(null)} />;
      case 'pizza-utility':
        return <UtilityPizzaParty onBack={() => setActiveModule(null)} />;
      case 'forecasting':
        return <ForecastingLab onBack={() => setActiveModule(null)} />;
      case 'equilibrium':
        return <ConsumerEquilibrium onBack={() => setActiveModule(null)} />;
      case 'market-matrix':
        return <MarketMatrix onBack={() => setActiveModule(null)} />;
      case 'policy-balancer':
        return <PolicyBalancer onBack={() => setActiveModule(null)} />;
      default:
        return null;
    }
  };

  if (activeModule) {
    return (
      <div className="min-h-screen relative bg-[#0a0a0a] text-white flex flex-col font-sans overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid z-0 opacity-40" />
        {renderModule()}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#0a0a0a] text-white flex flex-col font-sans overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid z-0 opacity-40" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] -z-10 animate-pulse rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] -z-10 animate-pulse rounded-full" />

      {/* Navbar Container */}
      <nav className="z-10 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all group-hover:scale-110">
            E
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            EconExplorer
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
          <a href="#about" className="hover:text-white transition-colors">Theory</a>
          <a href="#modules" className="hover:text-white transition-colors">Simulations</a>
          <a href="#resources" className="hover:text-white transition-colors">Resources</a>
        </div>
        <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105 shadow-lg shadow-white/5">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 mb-8 uppercase tracking-widest animate-fade-in">
          Interactive Learning Platform
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1.1] bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent drop-shadow-2xl">
          Visualizing the Core Forces of Economics
        </h1>
        <p className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl leading-relaxed">
          Abstract theories transformed into tactile simulations. Drag, slide, and experiment with the invisible hands that shape our world.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#modules" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            Explore Simulations
          </a>
          <button className="px-8 py-4 glass text-white font-bold rounded-2xl transition-all hover:bg-white/10">
            View Design Spec
          </button>
        </div>
      </header>

      {/* Interactive Modules Section */}
      <section id="modules" className="z-10 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Focus Concepts</h2>
            <p className="text-white/40 text-lg">Eight foundational building blocks, each with a custom built simulation sandbox.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard 
            title="Supply & Demand"
            desc="The fundamental relationship that determines market clearing prices."
            color="emerald"
            icon="M13 17l5-5m0 0l-5-5m5 5H6"
            onClick={() => setActiveModule('supply-demand')}
          />
          <ModuleCard 
            title="Marginal Utility"
            desc="Visualizing why the first pizza slice hits harder than the fifth."
            color="amber"
            icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            onClick={() => setActiveModule('pizza-utility')}
          />
          <ModuleCard 
            title="Price Elasticity"
            desc="How sensitve consumers really are to sudden price changes."
            color="blue"
            icon="M7 11l5-5m0 0l5 5m-5-5v12"
            onClick={() => setActiveModule('elasticity')}
          />
          <ModuleCard 
            title="Opportunity Cost"
            desc="The choice made versus the value of what was left behind."
            color="rose"
            icon="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            onClick={() => setActiveModule('ppf')}
          />
          <ModuleCard 
            title="Forecasting Lab"
            desc="Predict future demand using linear regression and moving averages."
            color="violet"
            icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            onClick={() => setActiveModule('forecasting')}
          />
          <ModuleCard 
            title="Consumer Equilibrium"
            desc="Finding the optimal consumption bundle given a budget constraint."
            color="indigo"
            icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            onClick={() => setActiveModule('equilibrium')}
          />
          <ModuleCard 
            title="Market Matrix"
            desc="Explore different market structures from competition to monopoly."
            color="orange"
            icon="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            onClick={() => setActiveModule('market-matrix')}
          />
          <ModuleCard 
            title="Policy Balancer"
            desc="Simulate the impact of monetary and fiscal policy on macro indicators."
            color="cyan"
            icon="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            onClick={() => setActiveModule('policy-balancer')}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="z-10 mt-auto border-t border-white/5 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 text-xs font-medium">
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 bg-white/10 rounded-sm" />
             <span>© 2026 Interactive Economics Explorer</span>
          </div>
          <div className="flex items-center gap-8">
             <a href="#" className="hover:text-white transition-colors">Documentation</a>
             <a href="#" className="hover:text-white transition-colors">GitHub</a>
             <a href="#" className="hover:text-white transition-colors">Design Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ModuleCard({ title, desc, color, icon, onClick }: { title: string; desc: string; color: string; icon: string; onClick?: () => void }) {
  const colorMap: any = {
    emerald: 'bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black shadow-emerald-500/20',
    amber: 'bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-black shadow-amber-500/20',
    blue: 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-black shadow-blue-500/20',
    rose: 'bg-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-black shadow-rose-500/20',
    violet: 'bg-violet-500/20 text-violet-400 group-hover:bg-violet-500 group-hover:text-black shadow-violet-500/20',
    indigo: 'bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black shadow-indigo-500/20',
    orange: 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-black shadow-orange-500/20',
    cyan: 'bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black shadow-cyan-500/20',
  };

  return (
    <div className="glass-card p-8 rounded-[32px] flex flex-col items-start group relative">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-12 transition-all duration-500 shadow-2xl ${colorMap[color]}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors tracking-tight">{title}</h3>
      <p className="text-white/40 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
        {desc}
      </p>
      <button 
        onClick={onClick}
        className="mt-auto w-full py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all shadow-xl"
      >
        Launch Simulation
      </button>
    </div>
  );
}
