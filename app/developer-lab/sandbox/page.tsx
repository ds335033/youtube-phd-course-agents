"use client";

import Link from "next/link";
import { useState } from "react";

export default function CodingSandbox() {
  const [code, setCode] = useState(
    "import { LlmAgent } from '@google/adk';\n\nconst myFirstAgent = new LlmAgent({\n  name: 'thumbnail_analyzer',\n  description: 'Analyzes thumbnails for CTR potential',\n  model: 'gemini-2.5-flash',\n  instruction: 'You are an expert...'\n});"
  );
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => {
      setOutput("Success: Agent 'thumbnail_analyzer' initialized.\\nLoading Gemini 2.5 Flash model...\\nAgent ready for execution.");
      setRunning(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <Link href="/developer-lab" className="text-muted-foreground hover:text-foreground">← Back to Developer Lab</Link>
      </div>

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Coding Sandbox</h1>
        <p className="text-muted-foreground mt-2 text-lg">Build your first Google ADK swarm directly in the browser.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1e1e1e] border rounded-2xl flex flex-col shadow-xl overflow-hidden min-h-[500px]">
          <div className="bg-[#2d2d2d] px-4 py-3 border-b border-[#3e3e3e] flex justify-between items-center">
            <span className="font-mono text-sm text-gray-300">agent.ts</span>
            <button 
              onClick={handleRun}
              disabled={running}
              className="px-4 py-1.5 bg-green-600 text-white text-sm font-bold rounded hover:bg-green-500 transition disabled:opacity-50"
            >
              {running ? "Running..." : "Run Code ▶"}
            </button>
          </div>
          <div className="p-4 flex-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>
          <div className="bg-[#0f0f0f] border-t border-[#3e3e3e] h-48 p-4 overflow-auto">
            <div className="text-xs font-bold text-gray-500 mb-2 uppercase">Terminal Output</div>
            <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
              {output || "> Ready."}
            </pre>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl h-full flex flex-col">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">✦</span> AI Coding Mentor
            </h3>
            <div className="flex-1 bg-background rounded-xl p-4 border text-sm flex flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                <div className="bg-muted p-3 rounded-lg rounded-tl-none w-[90%]">
                  I see you're building a thumbnail analyzer! Good start. To make this an effective ADK agent, you should provide a tool that lets it read image data. Try importing <code>analyzeImage</code> from our mock library.
                </div>
              </div>
              <div className="mt-auto relative">
                <input type="text" placeholder="Ask for help..." className="w-full bg-muted border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary outline-none" />
                <button className="absolute right-2 top-2 p-1 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
