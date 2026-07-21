"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const { data: session } = authClient.useSession();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Your Academy Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {session?.user?.name || "Student"}. Here is your AI-curated learning path.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="/creator-lab" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition font-medium">
            Go to Creator Lab →
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl relative overflow-hidden">
             {/* Glow */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-primary/20 rounded-full blur-[50px] pointer-events-none" />
            
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">✦</span> Current Module
            </h2>
            <div className="bg-background rounded-xl p-6 border shadow-sm flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 z-0" />
                <span className="z-10 font-bold text-muted-foreground">Video Placeholder</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs font-bold text-primary tracking-wider uppercase mb-1">Module 1.2</span>
                <h3 className="text-xl font-bold mb-2">The Psychology of the Click</h3>
                <p className="text-sm text-muted-foreground mb-4">Learn why viewers click on thumbnails and how to hack the YouTube algorithm using human psychology.</p>
                <div className="mt-auto">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary" style={{ width: "35%" }} />
                  </div>
                  <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>35% Complete</span>
                    <span>12 mins left</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-transform hover:-translate-y-0.5">
                  Resume Lesson
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Your Learning Roadmap</h3>
            <div className="space-y-3">
              {[
                { title: "Module 1: YouTube First Principles", status: "In Progress", color: "text-primary" },
                { title: "Module 2: Advanced Hook Architecture", status: "Locked", color: "text-muted-foreground" },
                { title: "Module 3: The AI Editor Workflow", status: "Locked", color: "text-muted-foreground" },
                { title: "Module 4: Monetization & Business Entities", status: "Locked", color: "text-muted-foreground" },
              ].map((mod, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-xl bg-card hover:border-primary/50 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={\`w-8 h-8 rounded-full flex items-center justify-center bg-background border \${mod.status === 'In Progress' ? 'border-primary text-primary' : 'text-muted-foreground'}\`}>
                      {i + 1}
                    </div>
                    <span className="font-semibold">{mod.title}</span>
                  </div>
                  <span className={\`text-sm font-medium \${mod.color}\`}>{mod.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4">AI Tutor Assistant</h3>
            <div className="bg-background rounded-xl p-4 min-h-[300px] border flex flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                <div className="bg-muted p-3 rounded-lg rounded-tl-none w-[85%] text-sm">
                  Hello! I'm your Student Success Agent. Based on your goal to grow rapidly, I recommend finishing Module 1 today.
                </div>
              </div>
              <div className="mt-auto relative">
                <input type="text" placeholder="Ask a question..." className="w-full bg-muted border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary outline-none" />
                <button className="absolute right-2 top-2 p-1 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-xl border">
                <div className="text-3xl font-black text-primary">2,410</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold mt-1">XP Earned</div>
              </div>
              <div className="p-4 bg-background rounded-xl border">
                <div className="text-3xl font-black text-foreground">3</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold mt-1">Modules Done</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}