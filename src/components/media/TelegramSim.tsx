"use client";

import React, { useState, useEffect, useRef } from "react";
import { telegramScript, TelegramMessage } from "@/data/telegram-script";
import { PhoneFrame } from "./PhoneFrame";
import { ArrowLeft, CheckCheck, RotateCcw, Send, Sparkles, BellOff, AlertTriangle } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { gsap } from "@/lib/gsap";

interface TelegramSimProps {
  embeddedInPhone?: boolean;
}

export const TelegramSim = ({ embeddedInPhone = true }: TelegramSimProps) => {
  const [messages, setMessages] = useState<TelegramMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Reset or run script
  useEffect(() => {
    if (prefersReduced) {
      setMessages(telegramScript);
      setIsFinished(true);
      return;
    }

    let isMounted = true;
    setMessages([]);
    setIsFinished(false);

    const runScript = async () => {
      for (let i = 0; i < telegramScript.length; i++) {
        if (!isMounted) return;
        const msg = telegramScript[i];

        if (msg.sender === "bot") {
          setIsTyping(true);
          await new Promise((r) => setTimeout(r, Math.min(msg.delayMs, 1400)));
          if (!isMounted) return;
          setIsTyping(false);
        } else {
          await new Promise((r) => setTimeout(r, Math.min(msg.delayMs, 1000)));
          if (!isMounted) return;
        }

        setMessages((prev) => [...prev, msg]);

        // Scroll to bottom
        setTimeout(() => {
          if (chatRef.current) {
            gsap.to(chatRef.current, {
              scrollTop: chatRef.current.scrollHeight,
              duration: 0.35,
              ease: "power2.out",
            });
          }
        }, 50);

        if (i === 1) {
          // Pause between daily summary and breakout alert
          await new Promise((r) => setTimeout(r, 2200));
        }
      }

      if (isMounted) setIsFinished(true);
    };

    const timer = setTimeout(runScript, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [prefersReduced]);

  const handleReplay = () => {
    setMessages([]);
    setIsFinished(false);
    // Trigger rerun by resetting
    setTimeout(() => {
      const isMounted = true;
      const runScript = async () => {
        for (let i = 0; i < telegramScript.length; i++) {
          if (!isMounted) return;
          const msg = telegramScript[i];
          if (msg.sender === "bot") {
            setIsTyping(true);
            await new Promise((r) => setTimeout(r, 1200));
            if (!isMounted) return;
            setIsTyping(false);
          } else {
            await new Promise((r) => setTimeout(r, 800));
            if (!isMounted) return;
          }
          setMessages((prev) => [...prev, msg]);
          if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
          }
          if (i === 1) await new Promise((r) => setTimeout(r, 2000));
        }
        if (isMounted) setIsFinished(true);
      };
      runScript();
    }, 100);
  };

  const content = (
    <div className="relative h-full flex flex-col bg-[var(--surface)] text-[var(--foreground)] text-xs select-none">
      {/* Telegram Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[var(--surface-2)] border-b border-[var(--border)] shrink-0">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4 text-[var(--muted-foreground)]" />
          <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            📊
          </div>
          <div>
            <div className="font-semibold text-xs leading-none">CSE Market Bot</div>
            <div className="text-[10px] text-blue-500 font-medium">bot</div>
          </div>
        </div>

        {isFinished && (
          <button
            onClick={handleReplay}
            className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md bg-[var(--card)] hover:bg-[var(--border)] border border-[var(--border)] text-[var(--accent)] transition-all"
            aria-label="Replay simulation"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Replay</span>
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={chatRef}
        className="flex-1 p-3 overflow-y-auto no-scrollbar space-y-2.5 bg-[var(--surface)]/50"
      >
        <div className="text-center my-1">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--muted-foreground)]">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            } animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            {msg.kind === "command" && (
              <div
                className={`max-w-[80%] px-3 py-1.5 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-[var(--accent)] text-white rounded-tr-none"
                    : "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-tl-none"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-mono">{msg.text}</span>
                  <div className="flex items-center gap-0.5 text-[9px] opacity-80 pl-1">
                    <span>{msg.time}</span>
                    <CheckCheck className="h-3 w-3 text-white/90" />
                  </div>
                </div>
              </div>
            )}

            {msg.kind === "summary" && msg.summaryData && (
              <div className="max-w-[95%] p-3 rounded-2xl bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] shadow-sm space-y-2 rounded-tl-none">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-1.5">
                  <div className="flex items-center gap-1 font-semibold text-xs">
                    <span>📊 CSE Daily Summary</span>
                  </div>
                  <span className="text-[10px] text-[var(--muted-foreground)] font-mono">
                    {msg.summaryData.date}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <div className="text-[10px] text-[var(--muted-foreground)] font-medium">ASPI</div>
                    <div className="font-bold">{msg.summaryData.aspi}</div>
                    <div className="text-[10px] text-emerald-500 font-semibold">{msg.summaryData.aspiChange}</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <div className="text-[10px] text-[var(--muted-foreground)] font-medium">S&P SL20</div>
                    <div className="font-bold">{msg.summaryData.spSl20}</div>
                    <div className="text-[10px] text-emerald-500 font-semibold">{msg.summaryData.spSl20Change}</div>
                  </div>
                </div>

                <div className="text-[10px] text-[var(--muted-foreground)] flex items-center justify-between px-1">
                  <span>Turnover: <strong className="text-[var(--foreground)]">{msg.summaryData.turnover}</strong></span>
                  <span>Adv/Dec: <strong className="text-[var(--foreground)]">{msg.summaryData.advancersDecliners}</strong></span>
                </div>

                {/* AI Summary note */}
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] leading-relaxed">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-500 mb-0.5">
                    <Sparkles className="h-3 w-3" />
                    <span>Gemini 2.5 Flash-Lite Analysis</span>
                  </div>
                  <p className="text-[var(--foreground)]">{msg.summaryData.aiAnalysis}</p>
                </div>

                <div className="flex justify-end text-[9px] text-[var(--muted-foreground)]">
                  <span>{msg.time}</span>
                </div>
              </div>
            )}

            {msg.kind === "alert" && msg.alertData && (
              <div className="max-w-[92%] p-3 rounded-2xl bg-[var(--card)] text-[var(--foreground)] border border-rose-500/30 shadow-sm space-y-2 rounded-tl-none">
                <div className="flex items-center gap-1.5 text-rose-500 font-bold text-xs">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>🚨 Breakout Alert</span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-sm tracking-wide">{msg.alertData.ticker}</span>
                  <span className="text-emerald-500 font-bold text-xs">{msg.alertData.changePct}</span>
                </div>

                <div className="text-[11px] space-y-0.5 text-[var(--muted-foreground)]">
                  <div>Price: <span className="text-[var(--foreground)] font-medium">{msg.alertData.price}</span></div>
                  <div>Volume: <span className="text-[var(--foreground)] font-medium">{msg.alertData.volumeMultiplier}</span></div>
                  <div className="text-[10px] italic">{msg.alertData.triggerReason}</div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[var(--border)]">
                  <button className="flex-1 py-1 px-2 rounded-lg bg-[var(--surface-2)] text-[10px] font-medium text-center hover:bg-[var(--border)] transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 py-1 px-2 rounded-lg bg-rose-500/15 text-rose-500 border border-rose-500/20 text-[10px] font-medium text-center flex items-center justify-center gap-1">
                    <BellOff className="h-3 w-3" />
                    <span>Mute 1h</span>
                  </button>
                </div>

                <div className="flex justify-end text-[9px] text-[var(--muted-foreground)]">
                  <span>{msg.time}</span>
                </div>
              </div>
            )}

            {msg.kind === "confirmation" && (
              <div className="max-w-[85%] px-3 py-1.5 rounded-2xl bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-tl-none">
                <p className="text-[11px]">{msg.text}</p>
                <div className="flex justify-end text-[9px] text-[var(--muted-foreground)]">
                  <span>{msg.time}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1 p-2 rounded-xl bg-[var(--card)] border border-[var(--border)] w-14">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--muted-foreground)] animate-bounce" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--muted-foreground)] animate-bounce [animation-delay:0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--muted-foreground)] animate-bounce [animation-delay:0.3s]" />
          </div>
        )}
      </div>

      {/* Persistent honest sample data disclaimer */}
      <div className="px-3 py-1 bg-[var(--surface-2)] text-[9.5px] text-center text-[var(--muted-foreground)] border-t border-[var(--border)]">
        Simulated demo · sample data · non-commercial demonstration
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 p-2 bg-[var(--surface-2)] border-t border-[var(--border)] shrink-0">
        <div className="flex-1 px-3 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[11px] text-[var(--muted-foreground)]">
          Message
        </div>
        <div className="h-7 w-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center">
          <Send className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );

  if (embeddedInPhone) {
    return <PhoneFrame time="14:33">{content}</PhoneFrame>;
  }

  return (
    <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-[var(--border)]">
      {content}
    </div>
  );
};
