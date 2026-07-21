import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { lessonProgress } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getSetupStatus } from "@/lib/setup";
import { getServerViewer } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const setupStatus = await getSetupStatus();
    const viewer = await getServerViewer(setupStatus);
    
    // We will bypass strict auth checking if it's not setup for demo purposes,
    // but typically we'd require a viewer.
    let userId = viewer?.id;
    if (!userId) {
      // Fallback for dev purposes: just use a dummy ID or return error
      userId = "demo-user-id";
    }

    const { lessonId, completed } = await request.json();

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    // Check if progress already exists
    const existing = await db.query.lessonProgress.findFirst({
      where: and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.lessonId, lessonId)
      )
    });

    if (existing) {
      await db.update(lessonProgress)
        .set({ 
          completed, 
          completedAt: completed ? new Date() : null,
          updatedAt: new Date()
        })
        .where(eq(lessonProgress.id, existing.id));
    } else {
      await db.insert(lessonProgress).values({
        id: `prog_${Date.now()}`,
        userId,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null
      });
    }

    return NextResponse.json({ success: true, completed });
  } catch (error: any) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
