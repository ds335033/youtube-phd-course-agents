"use client";

import Link from "next/link";
import { useState } from "react";

export default function ApiPlayground() {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("/api/v1/youtube/metrics");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = () => {
    setLoading(true);
    setTimeout(() => {
      setResponse(JSON.stringify({
        status: "success",
        data: {
          views: 1250000,
          subscribersGained: 4500,
          averageViewDuration: 195,
          retentionScore: 82.5
        },
        message: "Metrics retrieved successfully from YouTube Data API v3"
      }, null, 2));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <Link href="/developer-lab" className="text-muted-foreground hover:text-foreground">← Back to Developer Lab</Link>
      </div>

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-primary">API Playground</h1>
        <p className="text-muted-foreground mt-2 text-lg">Test endpoints and understand data structures before building your agents.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Request Configuration</h2>
            <div className="flex gap-2 mb-4">
              <select 
                value={method} 
                onChange={(e) => setMethod(e.target.value)}
                className="bg-background border rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary outline-none"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
              </select>
              <input 
                type="text" 
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="flex-1 bg-background border p-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                onClick={handleTest}
                disabled={loading}
                className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Headers</label>
              <textarea 
                className="w-full h-24 bg-background border p-3 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={'{\n  "Authorization": "Bearer sk_dev_..."\n}'}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#0d1117] border rounded-2xl flex flex-col shadow-xl overflow-hidden">
          <div className="bg-[#161b22] px-4 py-3 border-b flex justify-between items-center">
            <span className="font-mono text-sm font-bold text-gray-300">Response Console</span>
            <span className={\`text-xs font-bold \${response ? 'text-green-500' : 'text-gray-500'}\`}>
              {response ? "200 OK" : "Waiting for request..."}
            </span>
          </div>
          <div className="p-4 flex-1 overflow-auto min-h-[300px]">
            {response ? (
              <pre className="text-green-400 font-mono text-sm">{response}</pre>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600 font-mono text-sm">
                No response data yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
