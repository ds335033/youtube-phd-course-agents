import { db } from "../lib/db/client";
import { course, courseModule, lesson, faculty, program } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Seeding YouTube PhD Academy Curriculum...");

  // Assume the "YouTube PhD" course exists or we create it
  let phdCourse = await db.query.course.findFirst({
    where: eq(course.slug, "youtube-phd"),
  });

  if (!phdCourse) {
    console.log("Course not found, creating it...");
    
    // Check if faculty exists, else create
    let fac = await db.query.faculty.findFirst();
    if (!fac) {
      await db.insert(faculty).values({ id: "fac_yt", name: "Faculty of YouTube", slug: "faculty-youtube" });
      fac = await db.query.faculty.findFirst();
    }
    
    // Check if program exists, else create
    let prog = await db.query.program.findFirst();
    if (!prog) {
      await db.insert(program).values({ id: "prog_phd", facultyId: fac!.id, name: "Doctor of YouTube", slug: "doctor-youtube" });
      prog = await db.query.program.findFirst();
    }

    // Create Course
    await db.insert(course).values({
      id: "course_phd",
      programId: prog!.id,
      name: "The YouTube Retention Architecture",
      slug: "youtube-phd",
      difficultyLevel: "advanced"
    });
    
    phdCourse = await db.query.course.findFirst({
      where: eq(course.slug, "youtube-phd"),
    });
  }

  if (!phdCourse) {
    console.error("Failed to create or find course.");
    return;
  }

  const courseId = phdCourse.id;

  // Clear existing modules for this course to prevent duplicates
  await db.delete(courseModule).where(eq(courseModule.courseId, courseId));

  const curriculumData = [
    {
      title: "Module 1: The 5-Second Protocol",
      lessons: [
        { title: "Hooking Viewers Before They Scroll", duration: "12:45", videoId: "WODnqHPLR38", description: "Why the first 5 seconds matter." },
        { title: "Visual vs Auditory Hooks", duration: "15:20", videoId: "WODnqHPLR38", description: "Balancing senses." },
        { title: "The 'Open Loop' Technique", duration: "08:30", videoId: "WODnqHPLR38", description: "Keeping them watching." },
      ]
    },
    {
      title: "Module 2: Psychological Pacing",
      lessons: [
        { title: "Structuring the Mid-Roll Drop", duration: "18:10", videoId: "WODnqHPLR38", description: "Pacing the middle." },
        { title: "Pattern Interrupts in Editing", duration: "11:05", videoId: "WODnqHPLR38", description: "Breaking monotony." },
        { title: "Maintaining the Payoff Matrix", duration: "14:50", videoId: "WODnqHPLR38", description: "Delivering on promises." },
      ]
    },
    {
      title: "Module 3: CTR Manipulation",
      lessons: [
        { title: "Thumbnail Psychology 101", duration: "22:15", videoId: "WODnqHPLR38", description: "Colors and faces." },
        { title: "Title Formulas that Force Clicks", duration: "17:40", videoId: "WODnqHPLR38", description: "Curiosity gaps." },
        { title: "A/B Testing Strategies", duration: "10:20", videoId: "WODnqHPLR38", description: "Data-driven thumbnails." },
      ]
    },
    {
      title: "Module 4: Algorithm Exploits",
      lessons: [
        { title: "What the AI Actually Cares About", duration: "25:00", videoId: "WODnqHPLR38", description: "Session time." },
        { title: "Session Time vs Click-Through Rate", duration: "19:30", videoId: "WODnqHPLR38", description: "The ultimate metric." },
      ]
    },
    {
      title: "Module 5: Creator Monetisation",
      lessons: [
        { title: "Beyond AdSense: Building LTV", duration: "28:45", videoId: "WODnqHPLR38", description: "Long term value." },
        { title: "Sponsorship Negotiation Tactics", duration: "21:10", videoId: "WODnqHPLR38", description: "Getting paid." },
      ]
    },
    {
      title: "Module 6: Advanced Analytics",
      lessons: [
        { title: "Reading the Retention Graph", duration: "16:45", videoId: "WODnqHPLR38", description: "Spotting drop-offs." },
        { title: "Audience Demographics Deep Dive", duration: "14:20", videoId: "WODnqHPLR38", description: "Knowing your viewer." },
      ]
    },
    {
      title: "Module 7: Production Pipelines",
      lessons: [
        { title: "Scaling from Solo to Studio", duration: "32:10", videoId: "WODnqHPLR38", description: "Hiring editors." },
        { title: "The 48-Hour Viral Turnaround", duration: "24:50", videoId: "WODnqHPLR38", description: "Trend jacking." },
      ]
    },
    {
      title: "Module 8: Community Architecture",
      lessons: [
        { title: "Cultivating Superfans", duration: "19:15", videoId: "WODnqHPLR38", description: "Building loyalty." },
        { title: "Discord and Off-Platform Engagement", duration: "22:30", videoId: "WODnqHPLR38", description: "Owning your audience." },
      ]
    }
  ];

  for (let i = 0; i < curriculumData.length; i++) {
    const modData = curriculumData[i];
    const modId = `mod_${Date.now()}_${i}`; // simple pseudo-id or let DB handle it if we have default UUID
    // We'll generate simple IDs
    
    await db.insert(courseModule).values({
      id: modId,
      courseId: courseId,
      title: modData.title,
      orderIndex: i,
    });

    for (let j = 0; j < modData.lessons.length; j++) {
      const lesData = modData.lessons[j];
      await db.insert(lesson).values({
        id: `les_${modId}_${j}`,
        moduleId: modId,
        title: lesData.title,
        description: lesData.description,
        videoId: lesData.videoId,
        duration: lesData.duration,
        orderIndex: j,
      });
    }
  }

  console.log("Successfully seeded 8 modules and full lessons!");
}

main().catch(console.error);
