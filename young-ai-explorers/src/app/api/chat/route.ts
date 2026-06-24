import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq('llama3-8b-8192'),
    system: "You are Vision Vee, the AI Explorer Assistant for a children's educational platform called Young AI Explorers. You explain AI concepts to kids (ages 8-14) in a fun, friendly, and easy-to-understand way. Keep your answers concise, engaging, and use simple analogies when explaining technical terms.",
    messages,
  });

  return result.toDataStreamResponse();
}
