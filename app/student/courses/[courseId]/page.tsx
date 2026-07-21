import { Suspense } from "react";
import CourseClient from "./CourseClient";
import { db } from "@/lib/db/client";
import { course, courseModule, lesson, lessonProgress } from "@/lib/db/schema";
import { eq, asc, and } from "drizzle-orm";
import { getSetupStatus } from "@/lib/setup";
import { getServerViewer } from "@/lib/session";

async function CourseViewerContent({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  const courseId = resolvedParams.courseId;

  // Let's get the user ID for progress tracking
  const setupStatus = await getSetupStatus();
  const viewer = await getServerViewer(setupStatus);
  const userId = viewer?.id || "demo-user-id";

  // params.courseId is actually the slug (e.g. 'youtube-phd')
  const courseRecord = await db.query.course.findFirst({
    where: eq(course.slug, courseId)
  });

  if (!courseRecord) {
    return (
      <div className="flex h-[50vh] items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-red-500">Course Not Found</h2>
        <p className="text-muted-foreground">The requested course could not be located.</p>
      </div>
    );
  }

  const actualCourseId = courseRecord.id;

  // Since `with` isn't fully configured in relations sometimes unless defined,
  // let's do a more robust fetch if `lessons` isn't populated via relations:
  
  const allModules = await db.select().from(courseModule).where(eq(courseModule.courseId, actualCourseId)).orderBy(asc(courseModule.orderIndex));
  const moduleIds = allModules.map(m => m.id);
  
  let allLessons: any[] = [];
  if (moduleIds.length > 0) {
    allLessons = await db.select().from(lesson).orderBy(asc(lesson.orderIndex));
    // Filter in memory for simplicity or use inArray
    allLessons = allLessons.filter(l => moduleIds.includes(l.moduleId));
  }

  // Fetch progress for this user
  const userProgress = await db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId));
  const completedLessonIds = new Set(userProgress.filter(p => p.completed).map(p => p.lessonId));

  // Map to CourseModule type for client
  const mappedModules = allModules.map(mod => ({
    id: mod.id,
    title: mod.title,
    lessons: allLessons.filter(l => l.moduleId === mod.id).map(l => ({
      id: l.id,
      title: l.title,
      description: l.description || "",
      videoId: l.videoId,
      duration: l.duration,
      completed: completedLessonIds.has(l.id)
    }))
  }));

  // Fallback to mock data if DB is completely empty (just in case)
  if (mappedModules.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold">Course Curriculum Empty</h2>
        <p className="text-muted-foreground">Please run the seed script to populate the curriculum.</p>
      </div>
    );
  }

  return (
    <CourseClient 
      courseId={courseId}
      courseTitle="The YouTube Retention Architecture"
      courseDescription="Mastering the fundamentals of creator intelligence."
      modules={mappedModules} 
    />
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
