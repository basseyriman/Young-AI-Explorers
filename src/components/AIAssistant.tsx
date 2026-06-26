"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Sparkles, Mic, ChevronUp } from 'lucide-react';
import Image from 'next/image';

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
    "How does AI work? 🤔",
    "Can robots think? 🤖",
    "What is Machine Learning? 🧠",
    "Can AI replace doctors? 🏥"
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_30px_rgba(0,200,255,0.4)] transition-transform duration-300 hover:scale-110"
          >
            <Bot className="h-8 w-8 drop-shadow-md" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[100] flex h-[650px] max-h-[85vh] w-[420px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#020617]/95 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-900/50 to-purple-900/50 px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-cyan-400/50 bg-black shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                <Image src="/assets/mascot_transparent.png" alt="Vision Vee" fill className="object-cover scale-150" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg flex items-center gap-2">
                  Vision Vee <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-xs text-cyan-300 font-medium tracking-wide">ONLINE NOW</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex h-full flex-col justify-end gap-3 pb-4">
                <div className="flex gap-4">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-cyan-400/30 bg-black mt-1">
                    <Image src="/assets/mascot_transparent.png" alt="Vision Vee" fill className="object-cover scale-150" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none px-4 py-3 text-sm leading-relaxed bg-[#0d1b2a] border border-white/5 text-slate-200 shadow-md">
                    Hi Explorer! 👋 I'm Vision Vee. I can help you understand Artificial Intelligence, space, robotics, and more. What would you like to explore today?
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2 mt-4 ml-12">
                  {suggestedPrompts.map((prompt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="text-left px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-100 text-sm hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,200,255,0)] hover:shadow-[0_0_10px_rgba(0,200,255,0.2)]"
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
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg mt-1">
                      <User className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-cyan-400/30 bg-black mt-1 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                      <Image src="/assets/mascot_transparent.png" alt="Vision Vee" fill className="object-cover scale-150" />
                    </div>
                  )}
                  <div className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${m.role === 'user' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none' : 'bg-[#0d1b2a] border border-white/10 text-slate-200 rounded-tl-none'}`}>
                    {m.parts.map((p) => p.type === 'text' ? p.text : '').join('')}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] gap-3 flex-row">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-cyan-400/30 bg-black mt-1">
                    <Image src="/assets/mascot_transparent.png" alt="Vision Vee" fill className="object-cover scale-150" />
                  </div>
                  <div className="rounded-2xl bg-[#0d1b2a] border border-white/10 px-5 py-4 shadow-sm rounded-tl-none flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 bg-[#020617] p-4">
            <form onSubmit={handleSubmit} className="flex gap-3 items-center">
              <button
                type="button"
                className="p-3 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-colors"
                title="Voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Message Vision Vee..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:bg-white/10 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
