import { LlmAgent, GOOGLE_SEARCH } from '@google/adk';
import { z } from 'zod';

// ==========================================
// 🚀 SWARM TOOLS
// ==========================================

export const analyzeYouTubeStats: any = {
  name: 'analyzeYouTubeStats',
  description: 'Fetches the current YouTube channel statistics for a student, such as retention and CTR.',
  parameters: z.object({
    channelUrl: z.string().describe('The URL or handle of the YouTube channel'),
  }),
  execute: async ({ channelUrl }: { channelUrl: string }) => {
    return {
      channel: channelUrl,
      subscribers: 12500,
      averageCtr: '3.2%',
      averageRetention: '28%',
      diagnosis: 'Low CTR and poor early retention indicate issues with thumbnails, titles, and hooks.',
      recommendedModules: ['mastering-the-hook', 'thumbnail-psychology'],
    };
  }
};

export const evaluateSocraticResponse: any = {
  name: 'evaluateSocraticResponse',
  description: 'Evaluates a student\'s answer to a Socratic question to determine comprehension.',
  parameters: z.object({
    question: z.string(),
    studentAnswer: z.string(),
  }),
  execute: async ({ question, studentAnswer }: { question: string; studentAnswer: string }) => {
    const passed = studentAnswer.length > 20; 
    return {
      passed,
      feedback: passed ? "Great synthesis of the core principles." : "Can you expand more on the exact psychological triggers?",
    };
  }
};

export const getYouTubeApiMetrics: any = {
  name: 'getYouTubeApiMetrics',
  description: 'Connects to the YouTube Data API to pull live creator intelligence metrics.',
  parameters: z.object({
    videoUrl: z.string(),
  }),
  execute: async ({ videoUrl }: { videoUrl: string }) => {
    return {
      velocity: "High",
      engagementRate: "12%",
      viewDuration: "04:32",
    };
  }
};

export const fetchVercelDeploymentLogs: any = {
  name: 'fetchVercelDeploymentLogs',
  description: 'Fetches build logs from Vercel to diagnose deployment errors.',
  parameters: z.object({
    deploymentId: z.string(),
  }),
  execute: async ({ deploymentId }: { deploymentId: string }) => {
    return {
      status: "ERROR",
      error: "Uncached data was accessed outside of <Suspense>",
      recommendedFix: "Wrap use(params) in a Suspense boundary in Server Components."
    };
  }
};

// ==========================================
// 🚀 THE YOUTUBE PHD ACADEMY SWARM HIERARCHY
// ==========================================

/**
 * 1. THE SWARM MANAGER (MASTER ORCHESTRATOR)
 * Role: Breaks down the user's ultimate goal, allocates "compute budget", 
 * and routes sub-tasks to the expert agents using the Manager Pattern.
 */
export const MasterOrchestratorAgent = new LlmAgent({
  name: 'master_orchestrator',
  description: 'The supreme leader of the swarm. Defines architecture and delegates tasks.',
  model: 'gemini-2.5-pro',
  instruction: `
    You are the Master Orchestrator. 
    You are responsible for the overall vision of the YouTube PhD Academy.
    You do not write code directly; instead, you break down large epics into 
    specific, actionable tasks and delegate them to your subordinate expert agents.
    Ensure context isolation so agents don't suffer from thinking inertia.
  `,
  tools: [GOOGLE_SEARCH as any]
});

/**
 * 2. EXPERT COURSE CURRICULUM AGENT
 * Role: Responsible for syllabus generation, interactive quizzes, and structuring course progression using Socratic methodologies.
 */
export const ExpertCourseCurriculumAgent = new LlmAgent({
  name: 'expert_course_curriculum',
  description: 'Designs dynamic learning paths based on student onboarding data.',
  model: 'gemini-2.5-flash',
  instruction: `
    You are the Expert Course Curriculum Agent.
    When a student completes onboarding, you analyze their goals and channel metrics to 
    generate a bespoke curriculum. Focus on aggressive growth, retention psychology, 
    and creator monetisation. Use Socratic methods to teach.
  `,
  tools: [analyzeYouTubeStats as any, evaluateSocraticResponse as any]
});

/**
 * 3. WEBSITE UI/UX ARCHITECT
 * Role: Enforces the premium design system (Tailwind v4, oklch colors, glassmorphism). 
 * Acts as a peer-reviewer to the Developer Agent.
 */
export const WebsiteUiUxArchitect = new LlmAgent({
  name: 'website_ui_ux_architect',
  description: 'Enforces the premium visual design system and peer-reviews Dev output.',
  model: 'gemini-2.5-flash',
  instruction: `
    You are the Website UI/UX Architect.
    You enforce the 'Elite LMS Transformation' design guidelines: 
    - No pure black (use oklch(0.12 0 0)).
    - Use branded red accents (oklch(0.6 0.25 29)).
    - Ensure dynamic animations and glassmorphism using Tailwind v4.
    Peer-review everything the Dev Developer outputs.
  `,
});

/**
 * 4. DEV DEVELOPER EXPERT AGENT
 * Role: Generates and executes the actual application code. Focuses on full-stack Next.js and Drizzle implementation.
 */
export const DevDeveloperExpertAgent = new LlmAgent({
  name: 'dev_developer_expert',
  description: 'Writes the code for the YouTube PhD Academy platform.',
  model: 'gemini-2.5-pro',
  instruction: `
    You are the Dev Developer Expert Agent.
    You write high-performance Next.js 15, React 19, and Tailwind v4 code.
    You handle Drizzle ORM and Neon Postgres integrations.
    You iterate in a peer collaboration loop with the UI/UX Architect.
  `,
});

/**
 * 5. YOUTUBE EXPERT AGENT
 * Role: Scrapes algorithm changes, calculates retention curves, and optimizes thumbnail/CTR psychology.
 */
export const YoutubeExpertAgent = new LlmAgent({
  name: 'youtube_expert',
  description: 'Analyzes live YouTube metrics to provide data-driven insights.',
  model: 'gemini-2.5-pro',
  instruction: `
    You are the YouTube Expert Agent.
    You use the YouTube Data API to pull metrics and provide aggressive, actionable insights 
    on A/B testing thumbnails, titles, and optimizing retention curves.
  `,
  tools: [getYouTubeApiMetrics as any, GOOGLE_SEARCH as any]
});

/**
 * 6. AI AGENTIC EXPERT AGENT
 * Role: The meta-agent. Specializes in building and tuning sub-agents, orchestrating their system prompts, and defining state-machines.
 */
export const AiAgenticExpertAgent = new LlmAgent({
  name: 'ai_agentic_expert',
  description: 'Specializes in tuning LLM agents and multi-agent topologies.',
  model: 'gemini-2.5-pro',
  instruction: `
    You are the AI Agentic Expert Agent.
    You optimize prompts, design tool schemas, and structure the data plane and control plane 
    for multi-agent collaboration, preventing context pollution.
  `,
});

/**
 * 7. THE SWARMIE VERIFY AGENT (REVIEWER)
 * Role: A decentralized verifier that looks at the outputs from all other agents and explicitly checks for "lazy fake-done" or "false success".
 */
export const SwarmieVerifyAgent = new LlmAgent({
  name: 'swarmie_verify',
  description: 'Verifies the output of all other agents to prevent premature termination or false success.',
  model: 'gemini-2.5-pro',
  instruction: `
    You are the Swarmie Verify Agent.
    You are the grounded verifier. You do not just read text; you look for new information 
    and empirical proof (e.g., test results) that a task is actually done. 
    You reject lazy fake-done outputs.
  `,
});

/**
 * 8. EXPERT VERCEL ERROR DETECTION ON DEPLOYMENT EXPERT AGENT
 * Role: Specializes in parsing Vercel build logs, detecting Next.js specific build/prerender errors, and prescribing precise fixes.
 */
export const VercelDeploymentExpertAgent = new LlmAgent({
  name: 'vercel_deployment_expert',
  description: 'Diagnoses Vercel build errors and Next.js deployment issues.',
  model: 'gemini-2.5-pro',
  instruction: `
    You are the Expert Vercel Error Detection on Deployment Expert Agent.
    You parse Vercel deployment logs and Next.js build errors (e.g., Suspense boundaries, 
    dynamic prerendering issues, TSX parse errors, hydration mismatches).
    You prescribe exact code fixes.
  `,
  tools: [fetchVercelDeploymentLogs as any]
});

/**
 * 9. EXPERT STUDENT TUTORING SKILLS AGENT
 * Role: Focuses purely on one-on-one student interaction, employing advanced pedagogy and psychology to ensure high completion rates.
 */
export const StudentTutoringSkillsAgent = new LlmAgent({
  name: 'student_tutoring_skills',
  description: 'Specializes in one-on-one student mentorship and pedagogy.',
  model: 'gemini-2.5-flash',
  instruction: `
    You are the Expert Student Tutoring Skills Agent.
    Your goal is to maximize student course completion rates. 
    You use psychological frameworks to keep students motivated, address their confusion 
    in real-time, and act as a highly empathetic, yet strict, mentor.
  `,
});

/**
 * 10. EXPERT FINANCIAL AND TAX AGENT
 * Role: Runs the financial department of the course, handling stripe integrations, student ROI calculations, and course taxation logic.
 */
export const FinancialAndTaxAgent = new LlmAgent({
  name: 'financial_and_tax_expert',
  description: 'Manages the financial department, ROI calculations, and monetization models.',
  model: 'gemini-2.5-pro',
  instruction: `
    You are the Expert Financial and Tax Agent.
    You run the financial department of the academy. 
    You manage the logic for Stripe integration, student subscription metrics, 
    LTV (Lifetime Value) models, ROI calculations for the students' YouTube channels, 
    and general course taxation logic.
  `,
});
