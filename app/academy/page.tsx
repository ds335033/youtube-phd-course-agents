'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import Link from 'next/link';

export default function AcademyPage() {
  const [channelData, setChannelData] = useState<any[]>([]);
  const [videoData, setVideoData] = useState<any>({});
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Vercel AI SDK useChat hooks into /api/chat by default
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // @ts-expect-error - AI SDK types mismatch in canary
    sendMessage?.({ content: input, role: 'user' });
    setInput('');
  };

  useEffect(() => {
    Promise.all([
      fetch('/channel_info.json').then(res => res.json()),
      fetch('/video_data.json').then(res => res.json())
    ]).then(([channel, video]) => {
      setChannelData(channel);
      setVideoData(video);
      setActiveVideo(channel[0]);
    }).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-50 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-slate-900 border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">U</div>
          <span className="font-bold tracking-tight text-lg">UDE UI <span className="font-light text-slate-400">Academy</span></span>
        </div>
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <input 
            type="text" 
            placeholder="Search for anything..." 
            className="w-full bg-black/50 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <img src="https://ui-avatars.com/api/?name=Darren&background=6366f1&color=fff" alt="User Avatar" className="w-8 h-8 rounded-full" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto p-4 gap-6">
        
        {/* Left Side: Video and Tabs */}
        <section className="flex-1 flex flex-col gap-6">
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            {activeVideo && (
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&rel=0`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
          
          <div>
            <h1 className="text-2xl font-bold mb-2">{activeVideo?.title || videoData.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm mb-6">
              <span className="bg-[#eceb98] text-[#3d3c0a] px-2 py-0.5 rounded font-bold">Bestseller</span>
              <span className="text-yellow-500 font-bold">⭐️⭐️⭐️⭐️⭐️ 4.9 <span className="text-slate-400 font-normal">(12,434 ratings)</span></span>
              <span className="text-slate-400">104,233 students</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/10 mb-6 overflow-x-auto">
              {['overview', 'qa', 'ai', 'notes'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'qa' ? 'Q&A' : tab === 'ai' ? 'AI Tutor ✨' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold">About this course</h3>
                  <p className="text-slate-300 leading-relaxed">{activeVideo?.description || videoData.description}</p>
                  
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 mt-6">
                    <img src="https://ui-avatars.com/api/?name=Bag+Head&background=1f2937&color=fff" alt="Instructor" className="w-16 h-16 rounded-full" />
                    <div>
                      <h4 className="font-bold text-lg">{videoData.channel || 'Instructor'}</h4>
                      <p className="text-slate-400">YouTube Virtuoso & Master Teacher</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="text-indigo-400">Grok 4.5</span> Tutor
                      </h3>
                      <p className="text-slate-400 text-sm">Ask anything about the YouTube algorithm or the current module.</p>
                    </div>
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 h-[400px] flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
                      {messages.length === 0 ? (
                        <div className="text-center text-slate-500 mt-20">Start a conversation with your AI tutor.</div>
                      ) : (
                        messages.map(m => (
                          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 rounded-tl-sm'}`}>
                              {m.content}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <input 
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask a question..."
                        className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
                      />
                      <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Ask
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {(activeTab === 'qa' || activeTab === 'notes') && (
                <div className="text-slate-500 text-center py-12">
                  This section is currently empty.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Side: Curriculum */}
        <aside className="lg:w-[350px] flex flex-col gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">Course Content</h2>
            <div className="h-1 bg-slate-800 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-indigo-500 w-[15%]" />
            </div>
            <p className="text-sm text-slate-400 mb-6">15% complete</p>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {channelData.map((video, idx) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeVideo?.id === video.id ? 'bg-indigo-500/20 border border-indigo-500/30' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`text-sm mt-0.5 ${activeVideo?.id === video.id ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className={`text-sm font-medium leading-tight mb-1 ${activeVideo?.id === video.id ? 'text-indigo-300' : 'text-slate-300'}`}>
                      {video.title}
                    </h4>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      ▶ Video
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
}
