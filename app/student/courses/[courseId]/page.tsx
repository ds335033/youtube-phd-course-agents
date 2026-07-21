"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import { getCourseDetails } from "@/lib/db/queries";

function CourseViewerContent({ params }: { params: Promise<{ courseId: string }> }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<string>("l1");

  // In a real app, this would fetch from Firebase or Neon depending on the architecture
  const mockModules = [
    {
      id: "mod1",
      title: "Module 1: The 5-Second Protocol",
      lessons: [
        { id: "l1", title: "Hooking Viewers Before They Scroll", completed: true, duration: "12:45", videoId: "Wm_vHecjGMM" },
        { id: "l2", title: "Visual vs Auditory Hooks", completed: true, duration: "15:20", videoId: "L1zB_09rF9E" },
        { id: "l3", title: "The 'Open Loop' Technique", completed: false, duration: "08:30", videoId: "M7FIvfx5J10" },
      ]
    },
    {
      id: "mod2",
      title: "Module 2: Psychological Pacing",
      lessons: [
        { id: "l4", title: "Structuring the Mid-Roll Drop", completed: false, duration: "18:10", videoId: "jNQXAC9IVRw" },
        { id: "l5", title: "Pattern Interrupts in Editing", completed: false, duration: "11:05", videoId: "Wm_vHecjGMM" },
        { id: "l6", title: "Maintaining the Payoff Matrix", completed: false, duration: "14:50", videoId: "L1zB_09rF9E" },
      ]
    },
    {
      id: "mod3",
      title: "Module 3: CTR Manipulation",
      lessons: [
        { id: "l7", title: "Thumbnail Psychology 101", completed: false, duration: "22:15", videoId: "L1zB_09rF9E" },
        { id: "l8", title: "Title Formulas that Force Clicks", completed: false, duration: "17:40", videoId: "M7FIvfx5J10" },
        { id: "l9", title: "A/B Testing Strategies", completed: false, duration: "10:20", videoId: "Wm_vHecjGMM" },
      ]
    },
    {
      id: "mod4",
      title: "Module 4: Algorithm Exploits",
      lessons: [
        { id: "l10", title: "What the AI Actually Cares About", completed: false, duration: "25:00", videoId: "Wm_vHecjGMM" },
        { id: "l11", title: "Session Time vs Click-Through Rate", completed: false, duration: "19:30", videoId: "L1zB_09rF9E" },
      ]
    },
    {
      id: "mod5",
      title: "Module 5: Creator Monetisation",
      lessons: [
        { id: "l12", title: "Beyond AdSense: Building LTV", completed: false, duration: "28:45", videoId: "M7FIvfx5J10" },
        { id: "l13", title: "Sponsorship Negotiation Tactics", completed: false, duration: "21:10", videoId: "Wm_vHecjGMM" },
      ]
    }
  ];

  // Helper to find the active lesson details
  let currentLessonTitle = "";
  let currentVideoId = "Wm_vHecjGMM"; // fallback
  for (const mod of mockModules) {
    const lesson = mod.lessons.find((l) => l.id === activeLesson);
    if (lesson) {
      currentLessonTitle = lesson.title;
      currentVideoId = lesson.videoId;
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/student" className="text-muted-foreground hover:text-foreground">← Back to Dashboard</Link>
      </div>

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight">The YouTube Retention Architecture</h1>
        <p className="text-muted-foreground mt-2 text-lg">Mastering the fundamentals of creator intelligence.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Video Player & Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
            {/* Real YouTube Video Player */}
            <iframe 
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title={currentLessonTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Lesson Overview: {currentLessonTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">
              In this lesson, we dive deep into the psychology of viewer retention. You'll learn exactly why the first 5 seconds dictate the trajectory of your video's algorithm performance. The AI Agentic swarm has analyzed over 10,000 viral videos to bring you these core principles.
            </p>
          </div>
        </div>

        {/* Right Column: Module Navigation */}
        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl sticky top-8 max-h-[85vh] overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Course Progress</h3>
              <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                <span>15% Complete</span>
                <span>2 / 13 Lessons</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "15%" }} />
              </div>
            </div>

            <div className="space-y-6">
              {mockModules.map((module) => (
                <div key={module.id} className="space-y-3">
                  <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">{module.title}</h4>
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => {
                      const isActive = activeLesson === lesson.id;
                      return (
                        <div 
                          key={lesson.id} 
                          onClick={() => setActiveLesson(lesson.id)}
                          className={`flex items-center justify-between p-3 border rounded-xl transition cursor-pointer ${
                            isActive 
                              ? 'bg-primary/10 border-primary text-primary' 
                              : 'bg-background hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center border ${
                              lesson.completed 
                                ? 'bg-primary border-primary text-primary-foreground' 
                                : isActive 
                                  ? 'border-primary' 
                                  : 'bg-muted border-muted-foreground'
                            }`}>
                              {lesson.completed && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                              {isActive && !lesson.completed && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            <span className={`font-semibold text-sm truncate ${isActive ? 'text-foreground' : ''}`}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-muted-foreground shrink-0 ml-2">{lesson.duration}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseViewer({ params }: { params: Promise<{ courseId: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <CourseViewerContent params={params} />
    </Suspense>
  );
}
