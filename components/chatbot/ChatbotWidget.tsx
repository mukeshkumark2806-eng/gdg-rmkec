'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Compass,
  ArrowRight,
  Bot,
  ExternalLink,
} from 'lucide-react';
import { findChatbotAnswer, QUICK_PROMPTS, ChatbotTopic } from '@/data/chatbotData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  actionUrl?: string;
  actionLabel?: string;
  timestamp: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true);

  const initialGreeting: Message = {
    id: 'msg-welcome',
    sender: 'bot',
    text: "Hey there! 👋 I am your GDG on Campus RMKEC Guide. Ask me anything about HackNEXA'26, our technical wings, student projects, or how to join our community!",
    timestamp: 'Just now',
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadNotice(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Natural brief response delay
    setTimeout(() => {
      const match: ChatbotTopic | null = findChatbotAnswer(query);

      let botReply: Message;
      if (match) {
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: match.answer,
          actionUrl: match.actionUrl,
          actionLabel: match.actionLabel,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "I couldn't find exact details for that. You can ask me about HackNEXA'26, recruitment & membership, our 5 Technical Wings, or the Real-Time College Bus Tracker!",
          actionUrl: '/contact',
          actionLabel: 'Contact Chapter Organizers →',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botReply]);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] select-none">
      {/* ─── Expandable Chat Modal ─────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-4 flex flex-col w-[92vw] sm:w-[380px] h-[540px] max-h-[82vh] rounded-3xl border border-white/15 bg-[#121216]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* 1. Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/60">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] p-0.5 shadow-md">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-black">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-tight">GDG Campus Guide</h3>
                    <span className="h-2 w-2 rounded-full bg-[#34A853] animate-pulse" />
                  </div>
                  <p className="text-[11px] font-mono text-white/50">Ask about events, wings &amp; projects</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close guide"
                  aria-label="Close guide"
                  className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 2. Messages Viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#4285F4] text-white rounded-br-none'
                        : 'bg-black/75 border border-white/10 text-white/90 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Optional Action Button Link */}
                    {msg.actionUrl && (
                      <div className="mt-2.5 pt-2 border-t border-white/10">
                        <Link
                          href={msg.actionUrl}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#FBBC05] hover:text-white transition-colors"
                        >
                          <span>{msg.actionLabel || 'Learn More →'}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-[9px] text-white/30 px-1 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-black/60 border border-white/10 w-fit text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335] animate-bounce [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC05] animate-bounce [animation-delay:0.3s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 3. Quick Suggestion Prompt Chips */}
            <div className="px-3 py-2 border-t border-white/08 bg-black/40">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 mb-1.5">
                <Compass className="h-3 w-3 text-[#FBBC05]" />
                <span>Quick questions:</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-white/06 hover:bg-white/15 border border-white/10 text-[11px] text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Input Form */}
            <div className="p-3 border-t border-white/10 bg-black/80">
              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-[#181820] px-3.5 py-1.5 focus-within:border-[#4285F4] transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about events, wings, joining..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none py-1"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputQuery.trim()}
                  aria-label="Send message"
                  className={`p-1.5 rounded-xl transition-all ${
                    inputQuery.trim()
                      ? 'bg-[#4285F4] text-white cursor-pointer shadow-md'
                      : 'text-white/30 cursor-not-allowed'
                  }`}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Trigger Button ───────────────────────────── */}
      <div className="flex items-center justify-end">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close GDG Guide' : 'Open GDG Campus Guide'}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#121216] border border-white/20 text-white shadow-2xl backdrop-blur-xl group hover:border-white/40 cursor-pointer"
        >
          {/* Pulsing Gradient Accent Ring */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] opacity-40 blur-sm group-hover:opacity-75 transition-opacity pointer-events-none" />

          {/* Icon */}
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-black">
            {isOpen ? (
              <X className="h-4 w-4 text-white" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-[#FBBC05]" />
            )}
          </div>

          {/* Label */}
          <span className="relative text-xs font-bold tracking-tight text-white hidden sm:inline">
            {isOpen ? 'Close' : 'Ask Guide'}
          </span>

          {/* Unread Notice Dot */}
          {!isOpen && hasUnreadNotice && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285F4] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4285F4]" />
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
