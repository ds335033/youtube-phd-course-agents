'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

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
      const { data, error } = await authClient.signIn.email({
        email,
        password
      });

      if (error) {
        setErrorMsg(error.message || 'Invalid credentials');
        setStatus('Enter Dashboard →');
        setIsLoading(false);
        return;
      }

      setStatus('Success!');
      // Route to the new onboarding experience
      router.push('/onboarding');
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

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900/70 px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => authClient.signIn.social({ provider: 'google' })}
            className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c5.05 0 9.14-4.09 9.14-9.14 0-.61-.06-1.2-.16-1.78H12v3.38h5.16c-.23 1.1-.9 2.03-1.8 2.65v2.2h2.91c1.7-1.57 2.68-3.88 2.68-6.63 0-1.07-.15-2.11-.42-3.1h-8.53v4.27h4.86c-.21 1.05-.8 1.94-1.63 2.51l2.6 2.01z"></path></svg>
            Google OAuth
          </button>
          
          <button
            onClick={() => router.push('/student/courses/youtube-phd')}
            className="w-full p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 text-amber-500 font-bold rounded-lg transition-all flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            Founders Access (Bypass)
          </button>
        </div>
        
        <p className="text-center text-slate-400 text-sm mt-6">
          Not a student? <Link href="/optin" className="text-indigo-400 hover:text-indigo-300 transition-colors">Unlock the Free Masterclass</Link>
        </p>
      </div>
    </div>
  );
}
