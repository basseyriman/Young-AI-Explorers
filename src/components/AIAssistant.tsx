"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect, useTransition } from 'react';
import { Send, User, Mic, ChevronUp, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { VISION_VEE_MASCOT } from '@/data/brand-assets';
import { parseTopicProposalFromText, stripTopicProposalBlock } from '@/lib/custom-topic-content';
import { createClient } from '@/utils/supabase/client';
import { visionVeeWelcomeLine } from '@/lib/vision-vee/system-prompt';
import type { DashboardRole } from '@/lib/auth/dashboard-access';

function VeeAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "h-8 w-8" : "h-12 w-12";
  return (
    <div className={`${cls} shrink-0 relative rounded-full overflow-hidden bg-brand-gold/10 border border-brand-gold/25`}>
      <Image src={VISION_VEE_MASCOT} alt="Vision Vee" fill unoptimized className="object-contain p-0.5" />
    </div>
  );
}

function messageText(m: { parts?: { type: string; text?: string }[] }): string {
  return m.parts?.map((p) => p.type === 'text' ? p.text : '').join('') ?? '';
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [viewerRole, setViewerRole] = useState<DashboardRole | 'guest'>('guest');
  const [topicAddState, setTopicAddState] = useState<Record<string, 'idle' | 'loading' | 'done' | 'error'>>({});
  const [topicAddMessage, setTopicAddMessage] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  const [, startTopicTransition] = useTransition();
  const { messages, status, sendMessage, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  const handleAddTopic = (messageId: string, title: string, description: string) => {
    setTopicAddState((s) => ({ ...s, [messageId]: 'loading' }));
    startTopicTransition(async () => {
      const { createCustomTopicViaVee } = await import('@/app/dashboard/parent/actions');
      const result = await createCustomTopicViaVee(title, description);
      if ('error' in result && result.error) {
        setTopicAddState((s) => ({ ...s, [messageId]: 'error' }));
        setTopicAddMessage((s) => ({ ...s, [messageId]: result.error ?? 'Could not add topic.' }));
        return;
      }
      setTopicAddState((s) => ({ ...s, [messageId]: 'done' }));
      setTopicAddMessage((s) => ({
        ...s,
        [messageId]: 'message' in result && result.message
          ? result.message
          : 'Topic added to curriculum!',
      }));
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-assistant', handleOpenChat);
    return () => window.removeEventListener('open-ai-assistant', handleOpenChat);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setViewerRole('guest');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      const role = profile?.role ?? (user.user_metadata?.role as string | undefined);
      if (role === 'parent' || role === 'teacher' || role === 'admin') {
        setViewerRole(role);
      } else {
        setViewerRole('student');
      }
    });
  }, [mounted]);

  if (!mounted) return null;

  const suggestedPrompts =
    viewerRole === 'parent'
      ? [
          "How does AI work?",
          "Create a custom topic about AI in farming for my child",
          "What are explorers in Nigeria learning?",
          "How do I approve a topic my child suggested?",
        ]
      : [
          "How does AI work?",
          "Create a custom topic about AI in Nigerian farming",
          "What are explorers in Nigeria learning?",
          "Can robots think?",
        ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple dark:bg-brand-gold shadow-[0_8px_30px_rgba(74,45,110,0.25)] transition-transform duration-300 hover:scale-105 overflow-hidden border-2 border-brand-gold/30"
            aria-label="Open Vision Vee assistant"
          >
            <Image src={VISION_VEE_MASCOT} alt="Vision Vee" fill unoptimized className="object-contain p-1.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[100] flex h-[650px] max-h-[85vh] w-[420px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark/95 shadow-[0_20px_60px_rgba(74,45,110,0.15)]">
          <div className="flex items-center justify-between bg-brand-purple/5 dark:bg-brand-gold/5 px-6 py-4 border-b border-brand-purple/10 dark:border-brand-gold/10">
            <div className="flex items-center gap-4">
              <VeeAvatar />
              <div>
                <h3 className="font-heading font-bold text-brand-purple dark:text-brand-cream text-lg flex items-center gap-2">
                  Vision Vee <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-xs text-brand-gold font-medium tracking-wide uppercase">Your AI learning companion</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-full p-2 text-brand-purple/50 hover:text-brand-purple dark:hover:text-brand-cream">
              <ChevronUp className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mx-4 mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 text-xs text-red-600">
              {error.message || 'Connection error. Please try again in a moment.'}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex h-full flex-col justify-end gap-3 pb-4">
                <div className="flex gap-4">
                  <VeeAvatar size="sm" />
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 text-brand-purple/80 dark:text-brand-cream/80">
                    {visionVeeWelcomeLine(viewerRole)}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 mt-4 ml-12">
                  {suggestedPrompts.map((prompt, i) => (
                    <button key={i} type="button" onClick={() => handleSuggestedPrompt(prompt)} className="text-left px-4 py-2.5 rounded-xl border border-brand-purple/15 bg-brand-purple/[0.03] text-brand-purple/70 dark:text-brand-cream/70 text-sm hover:border-brand-gold/30 transition-all">
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const rawText = messageText(m);
              const displayText = m.role === 'assistant' ? stripTopicProposalBlock(rawText) : rawText;
              const proposal = m.role === 'assistant' ? parseTopicProposalFromText(rawText) : null;
              const addState = topicAddState[m.id] ?? 'idle';

              return (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {m.role === 'user' ? (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple dark:text-brand-gold mt-1">
                        <User className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                    ) : (
                      <VeeAvatar size="sm" />
                    )}
                    <div className="space-y-2">
                      <div className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-tr-sm' : 'bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 text-brand-purple/80 dark:text-brand-cream/80 rounded-tl-sm'}`}>
                        {displayText}
                      </div>
                      {proposal && addState !== 'done' && (
                        <button
                          type="button"
                          disabled={addState === 'loading'}
                          onClick={() => handleAddTopic(m.id, proposal.title, proposal.description)}
                          className="flex items-center gap-2 ml-1 px-4 py-2 rounded-full text-xs font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 hover:bg-brand-gold/25 disabled:opacity-60 transition-colors"
                        >
                          {addState === 'loading' ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="h-3.5 w-3.5" />
                          )}
                          Add &ldquo;{proposal.title}&rdquo; to {viewerRole === 'parent' ? "child's curriculum" : 'curriculum'}
                        </button>
                      )}
                      {addState === 'done' && (
                        <div className="flex items-center gap-2 ml-1 px-3 py-2 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          {topicAddMessage[m.id] ?? 'Topic added!'}
                        </div>
                      )}
                      {addState === 'error' && (
                        <div className="ml-1 px-3 py-2 rounded-xl text-xs text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200">
                          {topicAddMessage[m.id] ?? 'Could not add topic.'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <VeeAvatar size="sm" />
                  <div className="rounded-2xl bg-brand-purple/5 border border-brand-purple/10 px-5 py-4 rounded-tl-sm flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/50 dark:bg-brand-purple-dark/90 p-4">
            <form onSubmit={handleSubmit} className="flex gap-3 items-center">
              <button type="button" className="p-3 text-brand-purple/40 dark:text-brand-cream/55 hover:text-brand-gold rounded-full" title="Voice input (coming soon)">
                <Mic className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Vision Vee…"
                className="flex-1 rounded-full border border-brand-purple/15 dark:border-brand-cream/25 bg-brand-surface dark:bg-brand-purple-dark px-5 py-3 text-sm text-brand-purple dark:text-brand-cream placeholder:text-brand-purple/40 dark:placeholder:text-brand-cream/50 focus:border-brand-gold/40 dark:focus:border-brand-gold/60 focus:outline-none"
              />
              <button type="submit" disabled={isLoading || !input?.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark disabled:opacity-50">
                <Send className="h-5 w-5 ml-0.5" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
