"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FounderBypassPage() {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleBypass = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Verifying...");

    try {
      const res = await fetch("/api/founder-bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (res.ok) {
        setStatus("Access Granted! Bypassing payments...");
        setTimeout(() => router.push("/student"), 1000);
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus("Network error.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl border shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Founder Access</h1>
        <p className="text-muted-foreground mb-6">Enter your secret API key to bypass all payment gateways and unlock the academy.</p>
        
        <form onSubmit={handleBypass} className="space-y-4">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk_founder_..."
            className="w-full p-4 bg-background border rounded-lg text-foreground focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <button type="submit" className="w-full p-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition">
            Unlock Academy
          </button>
        </form>
        {status && <p className="mt-4 text-sm font-medium text-center">{status}</p>}
      </div>
    </div>
  );
}
