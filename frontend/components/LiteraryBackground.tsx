"use client";

import React, { useEffect, useState } from "react";

const LiteraryBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Literary symbols and decorative elements
  const literarySymbols = ["❝", "❞", "✒", "📖", "✍", "🖋", "📜", "🎭", "🌿"];
  const floatingLetters = [
    "A", "S", "H", "I", "T", "Y", "M",
    "क", "ल", "ा", "स", "ह", "त", "य", "म", "न", "प", "र", "व", "ब", "ग", "द", "क", "ज", "ख", "च", "थ", "ध", "भ", "श",
  ];

  // Reduce elements on mobile for performance
  const bookPageCount = isMobile ? 5 : 8;
  const visibleSymbols = isMobile ? literarySymbols.slice(0, 6) : literarySymbols;
  const visibleLetters = isMobile ? floatingLetters.slice(0, 18) : floatingLetters;

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 via-purple-50/60 to-amber-50/80"></div>

      {/* Floating Book Pages */}
      {[...Array(bookPageCount)].map((_, i) => (
        <div
          key={`page-${i}`}
          className="absolute animate-page-float opacity-30"
          style={{
            left: `${(i * 14 + 3) % 95}%`,
            top: `-10%`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${20 + i * 2}s`,
          }}
        >
          <svg
            className="w-8 h-10 text-purple-400/40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 2H9c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H9V4h10v16zm-8-2h6v-2h-6v2zm0-4h6v-2h-6v2zm0-4h6V8h-6v2z" />
          </svg>
        </div>
      ))}

      {/* Floating Literary Symbols */}
      {visibleSymbols.map((symbol, i) => (
        <div
          key={`symbol-${i}`}
          className="absolute animate-floating-letters text-2xl font-serif"
          style={{
            left: `${(i * 12 + 5) % 95}%`,
            top: `${(i * 15) % 80}%`,
            animationDelay: `${i * 1.5}s`,
            color: `rgba(${139 + i * 10}, ${92 - i * 5}, ${246 - i * 15}, 0.2)`,
          }}
        >
          {symbol}
        </div>
      ))}

      {/* Floating Letters forming SAHITYAM */}
      {visibleLetters.map((letter, i) => (
        <div
          key={`letter-${i}`}
          className="absolute animate-floating-letters text-3xl font-bold opacity-10"
          style={{
            left: `${(i * 8 + 10) % 90}%`,
            top: `${(i * 11 + 5) % 85}%`,
            animationDelay: `${i * 0.8}s`,
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {letter}
        </div>
      ))}

      {/* Ornate Corner Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full text-purple-400">
          <path
            d="M0,0 Q50,0 50,50 L0,50 Z"
            fill="currentColor"
            className="animate-ornate-glow"
          />
          <circle cx="25" cy="25" r="3" fill="currentColor" />
          <circle cx="40" cy="10" r="2" fill="currentColor" />
          <circle cx="10" cy="40" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full text-pink-400">
          <path
            d="M0,0 Q50,0 50,50 L0,50 Z"
            fill="currentColor"
            className="animate-ornate-glow"
          />
          <circle cx="25" cy="25" r="3" fill="currentColor" />
          <circle cx="40" cy="10" r="2" fill="currentColor" />
          <circle cx="10" cy="40" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Quill Pen Animation */}
      <div className="absolute top-1/4 right-1/4 opacity-20 animate-quill-write">
        <svg
          className="w-16 h-16 text-indigo-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" />
        </svg>
      </div>

      {/* Ink Drops */}
      {[...Array(isMobile ? 3 : 5)].map((_, i) => (
        <div
          key={`ink-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-ink-drop"
          style={{
            width: `${20 + i * 8}px`,
            height: `${20 + i * 8}px`,
            left: `${(i * 22 + 10) % 90}%`,
            top: `${(i * 18 + 15) % 85}%`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Vintage Parchment Texture Overlay */}
      <div className="absolute inset-0 bg-parchment animate-parchment-wave opacity-30 mix-blend-multiply"></div>

      {/* Literary Quote Decorations */}
      <div className="absolute top-1/3 left-10 opacity-20 animate-feather-float">
        <div className="text-4xl font-serif text-purple-600 italic">❝</div>
      </div>

      <div
        className="absolute bottom-1/3 right-10 opacity-20 animate-feather-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="text-4xl font-serif text-pink-600 italic">❞</div>
      </div>

      {/* Book Stack Decoration */}
      <div className="absolute bottom-20 left-10 opacity-15 animate-book-stack">
        <svg
          className="w-20 h-20 text-amber-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
        </svg>
      </div>

      {/* Mandala Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-purple-500 animate-mandala-spin"
        >
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 80 * Math.cos((i * Math.PI) / 6)}
              y2={100 + 80 * Math.sin((i * Math.PI) / 6)}
              stroke="currentColor"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Shimmer Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-literary-shimmer"></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes page-float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floating-letters {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(2deg);
          }
          50% {
            transform: translateY(-18px) rotate(-1deg);
          }
          75% {
            transform: translateY(-8px) rotate(1deg);
          }
        }

        @keyframes ornate-glow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes quill-write {
          0%, 100% {
            transform: rotate(-5deg) translateY(0);
          }
          50% {
            transform: rotate(5deg) translateY(-10px);
          }
        }

        @keyframes ink-drop {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.35;
          }
        }

        @keyframes parchment-wave {
          0%, 100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.35;
          }
        }

        @keyframes feather-float {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        @keyframes book-stack {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes mandala-spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes literary-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-page-float {
          animation: page-float 20s linear infinite;
        }

        .animate-floating-letters {
          animation: floating-letters 6s ease-in-out infinite;
        }

        .animate-ornate-glow {
          animation: ornate-glow 3s ease-in-out infinite;
        }

        .animate-quill-write {
          animation: quill-write 4s ease-in-out infinite;
        }

        .animate-ink-drop {
          animation: ink-drop 5s ease-in-out infinite;
        }

        .animate-parchment-wave {
          animation: parchment-wave 6s ease-in-out infinite;
        }

        .animate-feather-float {
          animation: feather-float 5s ease-in-out infinite;
        }

        .animate-book-stack {
          animation: book-stack 4s ease-in-out infinite;
        }

        .animate-mandala-spin {
          animation: mandala-spin 60s linear infinite;
        }

        .animate-literary-shimmer {
          animation: literary-shimmer 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LiteraryBackground;
