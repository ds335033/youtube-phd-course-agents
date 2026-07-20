'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Enter Dashboard →');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Authenticating...');
    setErrorMsg('');

    try {
      // Mock login for now. We will integrate Better Auth later.
      setTimeout(() => {
        setStatus('Success!');
        router.push('/academy');
      }, 500);
    } catch (error) {
      console.error(error);
      setErrorMsg('Server error. Try again.');
      setStatus('Enter Dashboard →');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-50 font-sans relative overflow-hidden flex flex-col items-center pt-24">
      {/* Background Glows */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] -top-[200px] -left-[200px] -z-10 mix-blend-screen" />
      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] top-[20%] -right-[200px] -z-10 mix-blend-screen" />

      <header className="mb-16">
        <div className="font-black text-2xl tracking-tight">
          UDE UI <span className="font-light text-slate-400">Academy</span>
        </div>
      </header>

      <div className="w-full max-w-[400px] bg-slate-900/70 p-10 rounded-2xl border border-white/10 backdrop-blur-xl text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">Student Login</h2>
        
        {errorMsg && (
          <div className="text-red-500 mb-4 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full p-4 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
        
        <p className="text-center text-slate-400 text-sm mt-6">
          Not a student? <Link href="/optin" className="text-indigo-400 hover:text-indigo-300 transition-colors">Unlock the Free Masterclass</Link>
        </p>
      </div>
    </div>
  );
}
