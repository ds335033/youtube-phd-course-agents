'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OptinPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Unlock The Architecture →');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Unlocking...');

    try {
      // For now, we'll just mock the success redirect.
      // We will wire up Drizzle next.
      setTimeout(() => {
        setStatus('Success! Redirecting...');
        router.push('/login');
      }, 1000);
    } catch (error) {
      console.error(error);
      setStatus('Error. Try Again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-50 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] -top-[200px] -left-[200px] -z-10 mix-blend-screen" />
      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] top-[20%] -right-[200px] -z-10 mix-blend-screen" />

      <div className="max-w-[1200px] mx-auto px-6">
        <header className="py-8">
          <div className="font-black text-2xl tracking-tight">
            UDE UI <span className="font-light text-slate-400">Academy</span>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
          <div className="text-content">
            <span className="inline-block bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6 border border-indigo-500/20">
              FREE DEVELOPER PLAYBOOK
            </span>
            <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
              The YouTube Retention <span className="bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent">Architecture</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Discover the 5 engineered blueprints for viral hooks and massive AVD (Average View Duration) that elite creators use to manipulate the algorithm.
            </p>
            
            <ul className="space-y-4 mb-12 text-lg">
              <li className="flex items-center gap-3">
                <span>⚡️</span> <strong>The 5-Second Protocol:</strong> Hook viewers before they scroll.
              </li>
              <li className="flex items-center gap-3">
                <span>🧠</span> <strong>Psychological Pacing:</strong> Keep them engaged until the end.
              </li>
              <li className="flex items-center gap-3">
                <span>📈</span> <strong>CTR Manipulation:</strong> Titles and thumbnails that force clicks.
              </li>
              <li className="flex items-center gap-3">
                <span>🤖</span> <strong>Algorithm Exploits:</strong> What the AI actually cares about.
              </li>
            </ul>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-center mb-6">Get Instant Access + Unlock Course Dashboard</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full p-4 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Address"
                    required
                    className="w-full p-4 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 hover:to-indigo-500 text-white font-bold text-lg rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(99,102,241,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {status}
                </button>
              </form>
              <p className="text-center text-slate-400 text-sm mt-4">We respect your privacy. No spam, ever.</p>
            </div>
          </div>

          <div className="flex flex-col items-center lg:order-last order-first">
            <div className="perspective-1000 mb-10">
              <div className="w-[300px] h-[420px] bg-gradient-to-br from-indigo-950 to-indigo-900 rounded-r-2xl rounded-l-md p-10 shadow-[-20px_20px_40px_rgba(0,0,0,0.8)] border-l-[12px] border-l-[#110e2d] transform -rotate-y-15 rotate-x-5 hover:-rotate-y-5 hover:rotate-x-2 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 shadow-[inset_4px_0_10px_rgba(255,255,255,0.1)] pointer-events-none" />
                <h3 className="text-3xl font-black leading-[1.1] mb-3">THE YOUTUBE RETENTION ARCHITECTURE</h3>
                <p className="text-indigo-300">5 Blueprints for Viral Hooks & AVD</p>
                <div className="mt-16">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-500 mb-6" />
                  <div className="h-1 bg-indigo-500 w-full mb-3" />
                  <div className="h-1 bg-indigo-500 w-[60%]" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-full border border-white/10">
              <div className="flex -space-x-3">
                <img src="https://ui-avatars.com/api/?name=Alex&background=1f2937&color=fff" alt="User" className="w-10 h-10 rounded-full border-2 border-[#09090b]" />
                <img src="https://ui-avatars.com/api/?name=Sarah&background=374151&color=fff" alt="User" className="w-10 h-10 rounded-full border-2 border-[#09090b]" />
                <img src="https://ui-avatars.com/api/?name=Mike&background=4b5563&color=fff" alt="User" className="w-10 h-10 rounded-full border-2 border-[#09090b]" />
              </div>
              <p className="text-sm text-slate-400">Join <strong className="text-white">14,203+</strong> creators who have scaled their channels.</p>
            </div>
          </div>
        </main>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .-rotate-y-15 { transform: rotateY(-15deg); }
        .rotate-x-5 { transform: rotateX(5deg); }
        .-rotate-y-5 { transform: rotateY(-5deg); }
        .rotate-x-2 { transform: rotateX(2deg); }
      `}} />
    </div>
  );
}
