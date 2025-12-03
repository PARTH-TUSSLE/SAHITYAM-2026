"use client";

// Premium Background with elegant elements
export default function PremiumBackground() {
  return (
    <>
      {/* Main background container */}
      <div className="fixed inset-0 -z-30 overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
        {/* Top decorative elements - elegant arcs */}
        <div className="absolute top-0 left-0 right-0 h-[300px] overflow-hidden">
          <svg viewBox="0 0 1440 300" className="w-full h-full">
            {/* Top left arc */}
            <path
              d="M-100,150 Q100,50 200,150 L200,300 L-100,300 Z"
              fill="url(#topLeftGradient)"
              className="animate-float-slow"
            />
            {/* Top right arc */}
            <path
              d="M1640,150 Q1440,50 1340,150 L1340,300 L1640,300 Z"
              fill="url(#topRightGradient)"
              className="animate-float-reverse"
            />
            <defs>
              <linearGradient
                id="topLeftGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFF5F7" />
                <stop offset="50%" stopColor="#FDE8F0" />
                <stop offset="100%" stopColor="#F3E8FF" />
              </linearGradient>
              <linearGradient
                id="topRightGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#EDE9FE" />
                <stop offset="50%" stopColor="#FDE8F0" />
                <stop offset="100%" stopColor="#FFF5F7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Elegant floating elements - top half */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`top-${i}`}
            className="absolute top-1/4"
            style={{
              left: `${10 + i * 10}%`,
              width: `${Math.random() * 20 + 15}px`,
              height: `${Math.random() * 20 + 15}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <svg
              viewBox="0 0 40 40"
              className="w-full h-full animate-float-random"
            >
              <circle
                cx="20"
                cy="20"
                r="15"
                fill="none"
                stroke={i % 2 === 0 ? "#F8B4D9" : "#C4B5FD"}
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M20,12 Q22,14 20,16 Q18,14 20,12 M24,16 Q26,18 24,20 Q22,18 24,16 M24,24 Q26,22 28,24 Q26,26 24,24 M20,28 Q22,26 24,28 Q22,30 20,28 M16,24 Q14,26 12,24 Q14,22 16,24 M12,16 Q14,18 12,20 Q10,18 12,16"
                fill={i % 2 === 0 ? "#EC4899" : "#A78BFA"}
                opacity="0.4"
              />
            </svg>
          </div>
        ))}

        {/* Elegant floating elements - middle */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`middle-${i}`}
            className="absolute top-1/2"
            style={{
              left: `${5 + i * 8}%`,
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 30 + 20}px`,
              animationDuration: `${Math.random() * 12 + 8}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            <svg
              viewBox="0 0 40 40"
              className="w-full h-full animate-float-slow"
            >
              <defs>
                <filter id={`softGlow-${i}`}>
                  <feGaussianBlur stdDeviation="0.5" />
                </filter>
              </defs>
              <path
                d="M20,5 C25,10 35,10 30,15 C35,20 35,25 30,30 C35,35 25,35 20,30 C15,35 5,35 10,30 C5,25 5,20 10,15 C5,10 15,10 20,5 Z"
                fill={
                  i % 3 === 0
                    ? "rgba(251,207,232,0.25)"
                    : i % 3 === 1
                    ? "rgba(196,181,253,0.25)"
                    : "rgba(224,242,254,0.25)"
                }
                stroke={
                  i % 3 === 0 ? "#F8B4D9" : i % 3 === 1 ? "#C4B5FD" : "#BAE6FD"
                }
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#softGlow-${i})`}
              />
              <circle
                cx="20"
                cy="20"
                r="3"
                fill={i % 2 === 0 ? "#EC4899" : "#8B5CF6"}
                opacity="0.3"
              />
            </svg>
          </div>
        ))}

        {/* Animated waves at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] overflow-hidden">
          <svg viewBox="0 0 1440 200" className="w-full h-full">
            <path
              d="M0,100 C360,50 720,150 1080,50 C1440,100 1440,100 1440,100 L1440,200 L0,200 Z"
              fill="url(#waveGradient1)"
              className="animate-wave"
            />
            <path
              d="M0,150 C240,100 720,200 960,100 C1200,150 1440,150 1440,150 L1440,200 L0,200 Z"
              fill="url(#waveGradient2)"
              className="animate-wave-slow"
            />
            <defs>
              <linearGradient
                id="waveGradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(251,207,232,0.4)" />
                <stop offset="50%" stopColor="rgba(236,72,153,0.3)" />
                <stop offset="100%" stopColor="rgba(192,132,252,0.3)" />
              </linearGradient>
              <linearGradient
                id="waveGradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(196,181,253,0.3)" />
                <stop offset="50%" stopColor="rgba(147,51,234,0.2)" />
                <stop offset="100%" stopColor="rgba(219,234,254,0.3)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Large decorative elements - premium design */}
        <div className="absolute left-[5%] top-[15%] w-[150px] h-[200px] opacity-60 animate-float-premium">
          <svg viewBox="0 0 150 200" className="w-full h-full">
            <defs>
              <filter id="premiumBlur1">
                <feGaussianBlur stdDeviation="1" />
              </filter>
              <linearGradient
                id="premiumGradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F8B4D9" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
            <path
              d="M75,20 C100,50 120,100 120,150 C120,180 100,190 75,180 C50,190 30,180 30,150 C30,100 50,50 75,20"
              fill="none"
              stroke="url(#premiumGradient1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#premiumBlur1)"
            />
            <circle cx="75" cy="80" r="20" fill="rgba(251,207,232,0.25)" />
            <circle cx="50" cy="120" r="10" fill="rgba(236,72,153,0.35)" />
            <circle cx="100" cy="140" r="12" fill="rgba(192,132,252,0.35)" />
          </svg>
        </div>

        <div className="absolute right-[5%] bottom-[20%] w-[150px] h-[200px] opacity-60 animate-float-premium-reverse">
          <svg viewBox="0 0 150 200" className="w-full h-full">
            <defs>
              <filter id="premiumBlur2">
                <feGaussianBlur stdDeviation="1" />
              </filter>
              <linearGradient
                id="premiumGradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            <path
              d="M75,20 C100,70 120,120 120,170 C120,190 100,180 75,170 C50,180 30,190 30,170 C30,120 50,70 75,20"
              fill="none"
              stroke="url(#premiumGradient2)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#premiumBlur2)"
            />
            <circle cx="75" cy="100" r="20" fill="rgba(196,181,253,0.25)" />
            <circle cx="50" cy="60" r="10" fill="rgba(139,92,246,0.35)" />
            <circle cx="100" cy="150" r="12" fill="rgba(224,242,254,0.35)" />
          </svg>
        </div>

        {/* Premium floating stars */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 70 + 15}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDuration: `${Math.random() * 8 + 6}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            <svg
              viewBox="0 0 20 20"
              className="w-full h-full animate-twinkle-premium"
            >
              <defs>
                <filter id={`starGlow-${i}`}>
                  <feGaussianBlur stdDeviation="0.8" />
                </filter>
              </defs>
              <circle
                cx="10"
                cy="10"
                r="3"
                fill={
                  i % 3 === 0
                    ? "rgba(251,191,36,0.8)"
                    : i % 3 === 1
                    ? "rgba(236,72,153,0.7)"
                    : "rgba(168,85,247,0.7)"
                }
                filter={`url(#starGlow-${i})`}
              />
              <ellipse
                cx="10"
                cy="10"
                rx="7"
                ry="2"
                fill={
                  i % 3 === 0
                    ? "rgba(251,191,36,0.5)"
                    : i % 3 === 1
                    ? "rgba(236,72,153,0.4)"
                    : "rgba(168,85,247,0.4)"
                }
              />
              <ellipse
                cx="10"
                cy="10"
                rx="2"
                ry="7"
                fill={
                  i % 3 === 0
                    ? "rgba(251,191,36,0.5)"
                    : i % 3 === 1
                    ? "rgba(236,72,153,0.4)"
                    : "rgba(168,85,247,0.4)"
                }
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(10px) rotate(-2deg);
          }
        }
        @keyframes float-random {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(1deg);
          }
          75% {
            transform: translateY(8px) rotate(-1deg);
          }
        }
        @keyframes float-premium {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(2deg);
          }
        }
        @keyframes float-premium-reverse {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(12px) rotate(-2deg);
          }
        }
        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes wave-slow {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes twinkle-premium {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 14s ease-in-out infinite;
        }
        .animate-float-random {
          animation: float-random 10s ease-in-out infinite;
        }
        .animate-float-premium {
          animation: float-premium 18s ease-in-out infinite;
        }
        .animate-float-premium-reverse {
          animation: float-premium-reverse 16s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 30s linear infinite;
        }
        .animate-wave-slow {
          animation: wave-slow 40s linear infinite;
        }
        .animate-twinkle-premium {
          animation: twinkle-premium 5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
