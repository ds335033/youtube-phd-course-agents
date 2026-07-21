"use client";

import Link from "next/link";
import { useState } from "react";

export default function FinancialModeler() {
  const [views, setViews] = useState(1000000);
  const [rpm, setRpm] = useState(4.50);
  const [sponsorship, setSponsorship] = useState(5000);
  const [costs, setCosts] = useState(1500);

  const adsenseRevenue = (views / 1000) * rpm;
  const totalRevenue = adsenseRevenue + sponsorship;
  const profit = totalRevenue - costs;
  const margin = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="flex items-center space-x-4">
        <Link href="/monetisation" className="text-muted-foreground hover:text-foreground">← Back to Monetisation Academy</Link>
      </div>

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Financial Modeler</h1>
        <p className="text-muted-foreground mt-2 text-lg">Project your channel's revenue, calculate video ROI, and build your business entity.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-xl font-bold">Video Inputs</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Projected Views</label>
                <input 
                  type="number" 
                  value={views}
                  onChange={(e) => setViews(Number(e.target.value))}
                  className="w-full bg-background border p-3 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Estimated RPM ($)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  className="w-full bg-background border p-3 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Sponsorship / Integrations ($)</label>
                <input 
                  type="number" 
                  value={sponsorship}
                  onChange={(e) => setSponsorship(Number(e.target.value))}
                  className="w-full bg-background border p-3 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Production Costs ($)</label>
                <input 
                  type="number" 
                  value={costs}
                  onChange={(e) => setCosts(Number(e.target.value))}
                  className="w-full bg-background border p-3 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full pointer-events-none" />
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Total Revenue</h3>
              <div className="text-5xl font-black">${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <p className="text-sm text-muted-foreground mt-4 font-medium">AdSense: ${adsenseRevenue.toLocaleString()} | Sponsor: ${sponsorship.toLocaleString()}</p>
            </div>
            
            <div className="bg-card border rounded-2xl p-6 shadow-xl relative overflow-hidden">
               <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none ${profit >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`} />
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Net Profit</h3>
              <div className={`text-5xl font-black ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${profit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-medium">Profit Margin: {margin}%</p>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-xl h-64 flex flex-col justify-center items-center relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="font-bold text-2xl uppercase tracking-widest text-primary">Chart Visualization</span>
              </div>
              <p className="text-muted-foreground text-center z-10 font-medium">Break-even Point: <span className="text-foreground font-bold">{Math.ceil((costs * 1000) / rpm).toLocaleString()} views</span> (excluding sponsorships)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
