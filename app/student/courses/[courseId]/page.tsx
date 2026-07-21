"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import { getCourseDetails } from "@/lib/db/queries";

function CourseViewerContent({ params }: { params: Promise<{ courseId: string }> }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState<any>(null);

  // In a real app, this would fetch from Firebase or Neon depending on the architecture
  // For the UI placeholder, we'll mock the module hierarchy
  
  const mockModules = [
    {
      id: "mod1",
      title: "Module 1: YouTube First Principles",
      lessons: [
        { id: "l1", title: "The Psychology of the Click", completed: true },
        { id: "l2", title: "Human Behavior and Retention", completed: false },
        { id: "l3", title: "Algorithmic Surfing", completed: false },
      ]
    },
    {
      id: "mod2",
      title: "Module 2: Advanced Hook Architecture",
      lessons: [
        { id: "l4", title: "Visual vs Auditory Hooks", completed: false },
        { id: "l5", title: "The First 5 Seconds", completed: false },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <Link href="/student" className="text-muted-foreground hover:text-foreground">← Back to Dashboard</Link>
      </div>

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight">Course: {unwrappedParams.courseId}</h1>
        <p className="text-muted-foreground mt-2 text-lg">Mastering the fundamentals of creator intelligence.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {mockModules.map((module) => (
            <div key={module.id} className="bg-card border rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">{module.title}</h2>
              <div className="space-y-3">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-xl bg-background hover:border-primary/50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${lesson.completed ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-muted-foreground'}`}>
                        {lesson.completed && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </div>
                      <span className="font-semibold">{lesson.title}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">15 mins</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
           <div className="bg-card border rounded-2xl p-6 shadow-xl sticky top-24">
            <h3 className="text-lg font-bold mb-4">Course Progress</h3>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary" style={{ width: "20%" }} />
            </div>
            <div className="flex justify-between text-sm font-medium text-muted-foreground mb-6">
              <span>20% Complete</span>
              <span>1 / 5 Lessons</span>
            </div>
            
            <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-transform hover:-translate-y-0.5">
              Continue Learning
            </button>
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
