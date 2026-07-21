"use client";

import Link from "next/link";
import { useState } from "react";

export default function ExperimentLab() {
  const [idea, setIdea] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!idea) return;
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <Link href="/creator-lab/analytics" className="text-muted-foreground hover:text-foreground">← Back to Analytics</Link>
      </div>

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight">Experiment Lab</h1>
        <p className="text-muted-foreground mt-2 text-lg">AI-powered A/B testing for titles and thumbnails.</p>
      </header>

      <div className="bg-card border rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Generate Variations</h2>
        <p className="text-muted-foreground mb-6">Describe your video idea. The Master Orchestrator will generate high-CTR titles and thumbnail concepts based on human psychology.</p>
        
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="e.g. A video about building an AI agent from scratch" 
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="flex-1 bg-background border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button 
            onClick={handleGenerate}
            disabled={!idea || generating}
            className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Concepts"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Title Variations</h3>
          <div className="space-y-4">
            {[
              { text: "I Built an Autonomous AI (And It Scared Me)", score: 92, type: "Curiosity / Fear" },
              { text: "How to Build an AI Agent in 10 Minutes", score: 85, type: "Utility / Speed" },
              { text: "The Only AI Tutorial You Will Ever Need", score: 88, type: "Absolute / Utility" },
            ].map((title, i) => (
              <div key={i} className="p-4 bg-card border rounded-xl hover:border-primary transition group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{title.text}</h4>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-bold">{title.score} CTR Score</span>
                </div>
                <p className="text-sm text-muted-foreground">Psychology: {title.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold">Thumbnail Concepts</h3>
          <div className="space-y-4">
             {[
              { desc: "You looking terrified at a computer screen. Red glowing code reflecting on your face.", element: "Fear / Emotion" },
              { desc: "A simple timer showing '09:59' next to a glowing brain icon. You pointing excitedly.", element: "Utility / Time" },
            ].map((thumb, i) => (
              <div key={i} className="p-4 bg-card border rounded-xl flex gap-4">
                <div className="w-24 h-24 bg-muted rounded-lg shrink-0 flex items-center justify-center border border-dashed border-muted-foreground/50">
                  <span className="text-xs text-muted-foreground">Sketch</span>
                </div>
                <div>
                  <p className="font-medium mb-2">{thumb.desc}</p>
                  <p className="text-sm text-primary font-bold">{thumb.element}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
