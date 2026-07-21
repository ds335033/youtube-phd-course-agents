"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type Lesson = {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: string;
  completed: boolean;
};

export type CourseModule = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export default function CourseClient({
  modules,
  courseTitle,
  courseDescription,
  courseId
}: {
  modules: CourseModule[];
  courseTitle: string;
  courseDescription: string;
  courseId: string;
}) {
  const router = useRouter();
  
  // Find first uncompleted lesson, or just the first lesson
  let initialLessonId = modules[0]?.lessons[0]?.id || "";
  outer: for (const mod of modules) {
    for (const les of mod.lessons) {
      if (!les.completed) {
        initialLessonId = les.id;
        break outer;
      }
    }
  }

  const [activeLesson, setActiveLesson] = useState<string>(initialLessonId);
  const [isMarking, setIsMarking] = useState(false);

  let currentLessonTitle = "";
  let currentVideoId = "WODnqHPLR38";
  let currentLessonDescription = "";
  let isCurrentCompleted = false;

  let totalLessons = 0;
  let completedLessons = 0;

  for (const mod of modules) {
    for (const les of mod.lessons) {
      totalLessons++;
      if (les.completed) completedLessons++;
      
      if (les.id === activeLesson) {
        currentLessonTitle = les.title;
        currentVideoId = les.videoId;
        currentLessonDescription = les.description;
        isCurrentCompleted = les.completed;
      }
    }
  }

  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  const toggleComplete = async () => {
    if (isMarking) return;
    setIsMarking(true);
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: activeLesson, completed: !isCurrentCompleted })
      });
      // refresh the server component to get new progress
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/student" className="text-muted-foreground hover:text-foreground">← Back to Dashboard</Link>
      </div>

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight">{courseTitle}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{courseDescription}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Video Player & Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl group">
            {/* Real YouTube Video Player */}
            <iframe 
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0&modestbranding=1`}
              title={currentLessonTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Lesson Overview: {currentLessonTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {currentLessonDescription || "In this lesson, we dive deep into the psychology of viewer retention. You'll learn exactly why the first 5 seconds dictate the trajectory of your video's algorithm performance."}
              </p>
            </div>
            <button 
              onClick={toggleComplete}
              disabled={isMarking}
              className={`shrink-0 px-6 py-2.5 rounded-full font-medium transition-all ${
                isCurrentCompleted 
                  ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isMarking ? "Saving..." : isCurrentCompleted ? "Completed ✓" : "Mark as Complete"}
            </button>
          </div>
        </div>

        {/* Right Column: Module Navigation */}
        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-xl sticky top-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Course Progress</h3>
              <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                <span>{progressPercent}% Complete</span>
                <span>{completedLessons} / {totalLessons} Lessons</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>

            <div className="space-y-6">
              {modules.map((module) => (
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
                              ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                              : 'bg-background hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                              lesson.completed 
                                ? 'bg-primary border-primary text-primary-foreground' 
                                : isActive 
                                  ? 'border-primary bg-background' 
                                  : 'bg-muted border-muted-foreground'
                            }`}>
                              {lesson.completed && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                              {isActive && !lesson.completed && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
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
