"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreatorAnalytics() {
  const [analyzing, setAnalyzing] = useState(false);

  const triggerAiAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Creator Intelligence</h1>
          <p className="text-muted-foreground mt-2 text-lg">Live API data and AI-driven growth metrics.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="/creator-lab/experiments" className="px-4 py-2 border text-foreground rounded-lg hover:bg-muted transition font-medium">
            Experiment Lab
          </Link>
          <button 
            onClick={triggerAiAnalysis}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition font-medium shadow-[0_0_15px_rgba(255,0,0,0.5)]"
          >
            {analyzing ? "Synthesizing..." : "Run AI Audit"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total Subscribers</div>
          <div className="text-3xl font-black">12,504</div>
          <div className="text-xs font-bold text-green-500 mt-2">↑ 4% this week</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full" />
          <div className="text-sm font-medium text-muted-foreground mb-2">Avg. CTR</div>
          <div className="text-3xl font-black text-red-500">3.2%</div>
          <div className="text-xs font-bold text-red-500 mt-2">↓ Below 5% threshold</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full" />
          <div className="text-sm font-medium text-muted-foreground mb-2">Avg. View Duration (AVD)</div>
          <div className="text-3xl font-black text-red-500">03:12</div>
          <div className="text-xs font-bold text-red-500 mt-2">28% Retention - Critical</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground mb-2">Estimated Revenue</div>
          <div className="text-3xl font-black">$42.50</div>
          <div className="text-xs font-bold text-muted-foreground mt-2">Based on $3.50 RPM</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Audience Retention Curve</h2>
            <div className="h-64 bg-background border rounded-xl flex items-end p-4 gap-2 relative">
              {/* Mock Chart */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-muted-foreground/30 font-bold text-xl uppercase tracking-widest">Chart Visualization</span>
              </div>
              {[100, 80, 50, 45, 40, 35, 32, 28, 25, 20].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-primary/80 to-primary/20 rounded-t-sm transition-all" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm">
              <span className="font-bold text-red-500">Agent Alert:</span> You are losing 50% of your audience in the first 15 seconds. Your hook architecture is failing. Recommend reviewing <Link href="/student" className="underline font-bold">Module 2: Advanced Hook Architecture</Link>.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl h-full flex flex-col">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">✦</span> YouTube Intelligence Agent
            </h3>
            <div className="flex-1 bg-background rounded-xl p-4 border text-sm space-y-4">
              <p>Analyzing recent uploads via YouTube Data API...</p>
              <div className="pl-4 border-l-2 border-primary space-y-2">
                <p><strong>Diagnosis:</strong> Your titles are too passive.</p>
                <p><strong>Action:</strong> Utilize curiosity gaps. Instead of "How to code", use "I coded a virus in 5 minutes".</p>
              </div>
              <p>Sending A/B test data to Experiment Lab...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
