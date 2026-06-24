"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Listen for custom event to open chat (e.g. from Dashboard)
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-assistant', handleOpenChat);
    return () => window.removeEventListener('open-ai-assistant', handleOpenChat);
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/20 transition-transform duration-300 hover:scale-110 hover:bg-slate-800"
          >
            <Bot className="h-8 w-8" />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[100] flex h-[600px] max-h-[80vh] w-[400px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                <Bot className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold">Vision Vee</h3>
                <p className="text-xs text-slate-300">AI Explorer Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
                <Sparkles className="h-12 w-12 text-slate-300 mb-4" />
                <p className="font-medium text-slate-900">Hi there!</p>
                <p className="text-sm">I'm Vision Vee. Ask me anything about AI!</p>
              </div>
            )}
            
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-700'}`}>
                    {m.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'}`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] gap-3 flex-row">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm rounded-tl-none flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
