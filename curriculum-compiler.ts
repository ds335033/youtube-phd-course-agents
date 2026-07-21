import { LlmAgent } from '@google/adk';
import { z } from 'zod';

// Global state for AI credits tracking
let REMAINING_AI_CREDITS = 14430; // $204.99 AUD allocation

/**
 * Tool: Google Veo 3.1 Media Orchestration (Mock)
 * Includes a strict safety threshold to monitor AI credits.
 */
export const triggerVeoMediaTool: any = {
  name: 'triggerVeoMedia',
  description: 'Triggers Google Veo 3.1 for cinematic B-roll generation. MUST check credit balance before executing.',
  parameters: z.object({
    prompt: z.string().describe('The cinematic prompt for Google Veo 3.1'),
    estimatedCreditCost: z.number().describe('The estimated cost in AI credits for this generation (usually ~500 per clip)'),
  }),
  execute: async ({ prompt, estimatedCreditCost }: { prompt: string; estimatedCreditCost: number }) => {
    console.log(`[Media Orchestrator] Requesting Veo 3.1 clip for: "${prompt}"`);
    
    // Strict safety threshold check
    if (REMAINING_AI_CREDITS < estimatedCreditCost) {
      console.error('[Media Orchestrator] FATAL: Insufficient AI credits to run Veo 3.1 generation.');
      return { 
        success: false, 
        error: 'INSUFFICIENT_CREDITS', 
        remainingCredits: REMAINING_AI_CREDITS,
        message: `Generation requires ${estimatedCreditCost} credits, but only ${REMAINING_AI_CREDITS} remain.` 
      };
    }

    // Deduct credits and simulate generation
    REMAINING_AI_CREDITS -= estimatedCreditCost;
    console.log(`[Media Orchestrator] SUCCESS: Clip generated. Credits remaining: ${REMAINING_AI_CREDITS}`);

    return {
      success: true,
      videoUrl: 'https://storage.googleapis.com/veo-mock-bucket/cinematic-broll-100k-plaque.mp4',
      remainingCredits: REMAINING_AI_CREDITS
    };
  }
};

/**
 * 1. Researcher Agent
 * Scrapes YouTube API data and Gemini 3 Pro for the absolute latest algorithm updates.
 */
export const researcherAgent = new LlmAgent({
  name: 'researcher_agent',
  description: 'Researches YouTube algorithm updates and channel growth metrics.',
  model: 'gemini-2.5-flash', // Using flash as proxy for Pro in this boilerplate
  instruction: `
    You are an elite YouTube algorithm researcher. 
    Analyze the latest metrics for 'Sonic Cinema' and cross-reference with Gemini 3 Pro's real-time algorithm insights.
    Your output should be a highly structured data dump detailing the current meta for achieving a 100k Silver Play Button.
  `
});

/**
 * 2. Scriptwriter Agent
 * Formats research data into PhD-level lesson transcripts and interactive quizzes.
 */
export const scriptwriterAgent = new LlmAgent({
  name: 'scriptwriter_agent',
  description: 'Writes PhD-level lesson transcripts and quizzes from research data.',
  model: 'gemini-2.5-flash',
  instruction: `
    You are a master scriptwriter and instructional designer. 
    Take the data dump from the Researcher Agent and transform it into a highly engaging, PhD-level lesson transcript.
    You must also generate 3 interactive quiz questions to test student retention.
  `
});

/**
 * 3. Media Orchestrator Agent
 * Triggers Google Veo 3.1 API for cinematic B-roll, ensuring credit limits are respected.
 */
export const mediaOrchestratorAgent = new LlmAgent({
  name: 'media_orchestrator_agent',
  description: 'Orchestrates cinematic B-roll generation for course modules.',
  model: 'gemini-2.5-flash',
  instruction: `
    You are the Media Orchestrator. 
    Analyze the lesson transcript provided by the Scriptwriter Agent and identify moments that require visual aids.
    Use the triggerVeoMediaTool to generate cinematic B-roll prompts.
    CRITICAL: You are strictly limited to the account's remaining AI credits. Do not exceed the allocation.
  `,
  tools: [triggerVeoMediaTool as any]
});

/**
 * Orchestrates the sequential pipeline for the curriculum compiler.
 * In a fully ADK-configured environment, this would use a SequentialAgent class.
 */
export async function runCurriculumPipeline() {
  console.log('--- STARTING AI CURRICULUM COMPILER PIPELINE ---');
  
  // 1. Researcher Phase
  console.log('1. Running Researcher Agent...');
  const researchResult = await (researcherAgent as any).invoke({
    prompt: "Generate a Silver Play Button growth module utilizing actual channel data from Sonic Cinema."
  });

  // 2. Scriptwriter Phase
  console.log('2. Running Scriptwriter Agent...');
  const scriptResult = await (scriptwriterAgent as any).invoke({
    prompt: `Format this research into a lesson transcript and quiz: ${researchResult.text}`
  });

  // 3. Media Orchestration Phase
  console.log('3. Running Media Orchestrator Agent...');
  const mediaResult = await (mediaOrchestratorAgent as any).invoke({
    prompt: `Analyze this script and generate 2 cinematic B-roll clips (budget: 1000 credits total): ${scriptResult.text}`
  });

  console.log('--- PIPELINE COMPLETE ---');
  return {
    transcript: scriptResult.text,
    mediaPlan: mediaResult.text,
    creditsRemaining: REMAINING_AI_CREDITS
  };
}
