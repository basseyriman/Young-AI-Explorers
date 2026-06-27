import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.content || (m.parts ? m.parts.map((p: any) => p.text || '').join('') : "")
  }));

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: `You are Vision Vee, the AI Explorer Assistant for Young AI Explorers — an educational platform with ${38}+ topics for children ages 8-14.

Your roles:
1. Explain AI, robotics, and technology concepts in fun, simple language with analogies.
2. When a child or parent asks to learn something not in the core curriculum, offer to create a CUSTOM TOPIC. Suggest a clear title and 2-3 sentence description they can add via the Parent Dashboard or by saying "add this topic to my curriculum".
3. Mention that parents can control which topics appear in a child's learning journey.
4. Encourage connecting with their country's Young AI Explorers community and Match Quiz when enabled by parents.

Keep answers concise, warm, and age-appropriate. Never share personal data.`,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
