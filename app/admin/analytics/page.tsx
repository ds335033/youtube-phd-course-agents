"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminAnalytics() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24">
      <header className="border-b pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary">Global Swarm Intelligence</h1>
          <p className="text-muted-foreground mt-2 text-lg">Master Orchestrator View: Monitor all students, agents, and system health.</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-6 py-2 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/80 transition disabled:opacity-50"
        >
          {refreshing ? "Syncing..." : "Sync Node Data"}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border rounded-2xl p-6 shadow-xl">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total Active Students</div>
          <div className="text-4xl font-black">1,248</div>
          <div className="text-xs font-bold text-green-500 mt-2">↑ 12% MRR Growth</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-xl">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total Swarm Invocations</div>
          <div className="text-4xl font-black text-primary">45,210</div>
          <div className="text-xs font-bold text-muted-foreground mt-2">Past 30 Days</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full" />
          <div className="text-sm font-medium text-muted-foreground mb-2">Avg. Socratic Pass Rate</div>
          <div className="text-4xl font-black text-red-500">42%</div>
          <div className="text-xs font-bold text-red-500 mt-2">AI Tutor is being too strict.</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-xl">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total System Revenue</div>
          <div className="text-4xl font-black">$62,400</div>
          <div className="text-xs font-bold text-muted-foreground mt-2">MRR Estimated</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border rounded-2xl p-6 shadow-xl h-[400px] flex flex-col">
          <h2 className="text-xl font-bold mb-6">Active Agents Map</h2>
          <div className="flex-1 bg-background rounded-xl border relative overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
            
            <div className="w-full max-w-sm space-y-4 relative z-10">
              <div className="p-3 bg-primary/20 border border-primary/50 text-primary font-bold rounded-lg text-center shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                Master Orchestrator
              </div>
              <div className="flex justify-around">
                <div className="w-px h-6 bg-primary/50"></div>
                <div className="w-px h-6 bg-primary/50"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted border text-sm font-bold rounded-lg text-center">AI Tutor</div>
                <div className="p-3 bg-muted border text-sm font-bold rounded-lg text-center">Creator Analytics</div>
                <div className="p-3 bg-muted border text-sm font-bold rounded-lg text-center">Coding Mentor</div>
                <div className="p-3 bg-muted border text-sm font-bold rounded-lg text-center">UX Architect</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-xl h-[400px] flex flex-col">
          <h2 className="text-xl font-bold mb-6">Recent System Logs</h2>
          <div className="flex-1 bg-[#0d1117] rounded-xl border border-[#30363d] p-4 overflow-y-auto font-mono text-sm space-y-2">
            <div className="text-gray-400"><span className="text-green-400">[2026-07-21 13:12]</span> USER_SIGNUP: new student enrolled via Stripe.</div>
            <div className="text-gray-400"><span className="text-blue-400">[2026-07-21 13:13]</span> AGENT_INVOKE (Academic Architecture): Curriculum generated for user_123.</div>
            <div className="text-gray-400"><span className="text-blue-400">[2026-07-21 13:15]</span> AGENT_INVOKE (AI Tutor): Socratic question failed by user_123.</div>
            <div className="text-gray-400"><span className="text-red-400">[2026-07-21 13:18]</span> WARN: High latency on YouTube Data API.</div>
            <div className="text-gray-400"><span className="text-green-400">[2026-07-21 13:20]</span> API_BYPASS: founder key detected, granting VIP access.</div>
            <div className="text-gray-400"><span className="text-blue-400">[2026-07-21 13:22]</span> AGENT_INVOKE (Coding Mentor): Assisting with Next.js middleware.</div>
            <div className="animate-pulse text-gray-500">Awaiting new events...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
