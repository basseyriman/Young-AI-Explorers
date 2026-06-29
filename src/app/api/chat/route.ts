import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { createClient } from '@/utils/supabase/server';
import { getUserRole, type DashboardRole } from '@/lib/auth/dashboard-access';
import { buildVisionVeeSystemPrompt } from '@/lib/vision-vee/system-prompt';

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

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let role: DashboardRole | 'guest' = 'guest';
  if (user) {
    role = await getUserRole(user.id, user.user_metadata);
  }

  const coreMessages = messages.map((m) => ({
    role: m.role as 'user' | 'assistant' | 'system',
    content: m.content || (m.parts ? m.parts.map((p) => p.text || '').join('') : "")
  }));

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: buildVisionVeeSystemPrompt(role),
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
