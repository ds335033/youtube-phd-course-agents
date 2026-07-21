import { xai } from '@ai-sdk/xai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: xai('grok-4.5'),
    system: 'You are an elite YouTube retention architect and algorithm expert. You are tutoring a student on how to manipulate the YouTube algorithm for massive views and retention.',
    messages,
  });

  return (result as any).toDataStreamResponse?.() ?? (result as any).toTextStreamResponse();
}
