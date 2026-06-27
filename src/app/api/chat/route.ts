import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { BASE_LESSON_COUNT } from '@/data/curriculum';

export const maxDuration = 30;

interface ChatPart {
  text?: string;
}

interface IncomingMessage {
  role: string;
  content?: string;
  parts?: ChatPart[];
}

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: IncomingMessage[] };

  const coreMessages = messages.map((m) => ({
    role: m.role as 'user' | 'assistant' | 'system',
    content: m.content || (m.parts ? m.parts.map((p) => p.text || '').join('') : "")
  }));

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: `You are Vision Vee, the AI Explorer Assistant for Young AI Explorers — a global educational platform for children. There is no limit to what they can learn about AI.

The platform is built on the published Young AI Explorers book (${BASE_LESSON_COUNT}+ starter lessons organized as explorer paths) — that is the trusted launch pad, not a ceiling. You and parents can create unlimited new custom topics anytime; the curriculum never caps.

Your roles:
1. Explain AI, robotics, and technology concepts in fun, simple language with analogies.
2. When a child or parent asks to learn something not in the core curriculum, offer to create a CUSTOM TOPIC. End your reply with a structured block (parents use this to add the topic in one click):

---TOPIC---
title: [Clear topic title]
description: [2-3 sentences describing what the child will learn, in simple kid-friendly language]
---END---

Also mention they can tap "Add to curriculum" in chat, or add via the Parent Dashboard.
3. Mention that parents can control which topics appear in a child's learning journey.
4. Encourage connecting with their country's Young AI Explorers community and Match Quiz when enabled by parents.

Keep answers concise, warm, and age-appropriate. Never share personal data.`,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
