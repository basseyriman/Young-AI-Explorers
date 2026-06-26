"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { X, Send, User, Mic, ChevronUp } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, status, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-assistant', handleOpenChat);
    return () => window.removeEventListener('open-ai-assistant', handleOpenChat);
  }, []);

  const suggestedPrompts = [
    "How does AI work?",
    "Can robots think?",
    "What is Machine Learning?",
    "Can AI help doctors?",
  ];

  function VeeAvatar({ size = "md" }: { size?: "sm" | "md" }) {
    const cls = size === "sm" ? "h-8 w-8 text-[10px]" : "h-12 w-12 text-xs";
    return (
      <div className={`${cls} shrink-0 rounded-full bg-brand-purple dark:bg-brand-gold flex items-center justify-center font-bold text-brand-cream dark:text-brand-purple-dark border border-brand-gold/20`}>
        VV
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark shadow-[0_8px_30px_rgba(74,45,110,0.25)] transition-transform duration-300 hover:scale-105 font-bold text-sm"
            aria-label="Open Vision Vee assistant"
          >
            VV
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[100] flex h-[650px] max-h-[85vh] w-[420px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark/95 backdrop-blur-3xl shadow-[0_20px_60px_rgba(74,45,110,0.15)]">
          <div className="flex items-center justify-between bg-brand-purple/5 dark:bg-brand-gold/5 px-6 py-4 border-b border-brand-purple/10 dark:border-brand-gold/10">
            <div className="flex items-center gap-4">
              <VeeAvatar />
              <div>
                <h3 className="font-heading font-bold text-brand-purple dark:text-brand-cream text-lg flex items-center gap-2">
                  Vision Vee <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-xs text-brand-gold font-medium tracking-wide uppercase">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-brand-purple/50 dark:text-brand-cream/50 transition-colors hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 hover:text-brand-purple dark:hover:text-brand-cream"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex h-full flex-col justify-end gap-3 pb-4">
                <div className="flex gap-4">
                  <VeeAvatar size="sm" />
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/10 text-brand-purple/80 dark:text-brand-cream/80">
                    Hi Explorer! I&apos;m Vision Vee. I can help you understand artificial intelligence, space, robotics, and more. What would you like to explore today?
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-4 ml-12">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="text-left px-4 py-2.5 rounded-xl border border-brand-purple/15 dark:border-brand-gold/15 bg-brand-purple/[0.03] dark:bg-brand-gold/[0.05] text-brand-purple/70 dark:text-brand-cream/70 text-sm hover:bg-brand-purple/8 dark:hover:bg-brand-gold/8 hover:border-brand-gold/30 transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {m.role === 'user' ? (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 dark:bg-brand-gold/10 text-brand-purple dark:text-brand-gold mt-1">
                      <User className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                  ) : (
                    <VeeAvatar size="sm" />
                  )}
                  <div className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-tr-sm' : 'bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/10 text-brand-purple/80 dark:text-brand-cream/80 rounded-tl-sm'}`}>
                    {m.parts.map((p) => p.type === 'text' ? p.text : '').join('')}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] gap-3 flex-row">
                  <VeeAvatar size="sm" />
                  <div className="rounded-2xl bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/10 px-5 py-4 rounded-tl-sm flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-brand-purple/10 dark:border-brand-gold/10 bg-brand-warm/50 dark:bg-brand-purple-dark p-4">
            <form onSubmit={handleSubmit} className="flex gap-3 items-center">
              <button
                type="button"
                className="p-3 text-brand-purple/40 dark:text-brand-cream/40 hover:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-colors"
                title="Voice input"
              >
                <Mic className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Message Vision Vee..."
                className="flex-1 rounded-full border border-brand-purple/15 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark/50 px-5 py-3 text-sm text-brand-purple dark:text-brand-cream placeholder-brand-purple/30 dark:placeholder-brand-cream/30 focus:border-brand-gold/40 focus:outline-none focus:ring-1 focus:ring-brand-gold/30 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5 ml-0.5" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
