// components/HomePage.tsx
"use client";
import { useState, useEffect } from "react";
import BackgroundElements from "../components/ui/BackgroundElements";
import GateAnimation from "@/components/GateAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorScroll from "@/components/SponsorScroll";
import PanelistsGrid from "@/components/PanelistsGrid";
import Countdown from "@/components/Countdown";

// Premium Background with elegant elements
const PremiumBackground = () => {
  return (
    <>
      {/* Main background container */}
      <div className="fixed inset-0 -z-30 overflow-hidden bg-white/90">
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
                <stop offset="0%" stopColor="#FFF0F5" />
                <stop offset="100%" stopColor="#FFE4E1" />
              </linearGradient>
              <linearGradient
                id="topRightGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#E6E6FA" />
                <stop offset="100%" stopColor="#FFF0F5" />
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
                stroke={i % 2 === 0 ? "#FFB6C1" : "#E6E6FA"}
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M20,10 L22,15 L25,12 L23,18 L20,22 L17,18 L15,12 L18,15 Z"
                fill={i % 2 === 0 ? "#FF69B4" : "#DDA0DD"}
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
              <path
                d="M20,5 C25,10 35,10 30,15 C35,20 35,25 30,30 C35,35 25,35 20,30 C15,35 5,35 10,30 C5,25 5,20 10,15 C5,10 15,10 20,5 Z"
                fill={
                  i % 3 === 0
                    ? "rgba(255,182,193,0.2)"
                    : i % 3 === 1
                    ? "rgba(221,160,221,0.2)"
                    : "rgba(230,230,250,0.2)"
                }
                stroke={
                  i % 3 === 0 ? "#FFB6C1" : i % 3 === 1 ? "#DDA0DD" : "#E6E6FA"
                }
                strokeWidth="1"
              />
              <circle
                cx="20"
                cy="20"
                r="3"
                fill={i % 2 === 0 ? "#FF69B4" : "#9370DB"}
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
                <stop offset="0%" stopColor="rgba(255,182,193,0.3)" />
                <stop offset="100%" stopColor="rgba(255,105,180,0.3)" />
              </linearGradient>
              <linearGradient
                id="waveGradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(230,230,250,0.2)" />
                <stop offset="100%" stopColor="rgba(221,160,221,0.2)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Large decorative elements - premium design */}
        <div className="absolute left-[5%] top-[15%] w-[150px] h-[200px] opacity-60 animate-float-premium">
          <svg viewBox="0 0 150 200" className="w-full h-full">
            <path
              d="M75,20 C100,50 120,100 120,150 C120,180 100,190 75,180 C50,190 30,180 30,150 C30,100 50,50 75,20"
              fill="none"
              stroke="url(#premiumGradient1)"
              strokeWidth="2"
            />
            <circle cx="75" cy="80" r="20" fill="rgba(255,182,193,0.2)" />
            <circle cx="50" cy="120" r="10" fill="rgba(255,105,180,0.3)" />
            <circle cx="100" cy="140" r="12" fill="rgba(221,160,221,0.3)" />
            <defs>
              <linearGradient
                id="premiumGradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFB6C1" />
                <stop offset="100%" stopColor="#FF69B4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute right-[5%] bottom-[20%] w-[150px] h-[200px] opacity-60 animate-float-premium-reverse">
          <svg viewBox="0 0 150 200" className="w-full h-full">
            <path
              d="M75,20 C100,70 120,120 120,170 C120,190 100,180 75,170 C50,180 30,190 30,170 C30,120 50,70 75,20"
              fill="none"
              stroke="url(#premiumGradient2)"
              strokeWidth="2"
            />
            <circle cx="75" cy="100" r="20" fill="rgba(221,160,221,0.2)" />
            <circle cx="50" cy="60" r="10" fill="rgba(230,230,250,0.3)" />
            <circle cx="100" cy="150" r="12" fill="rgba(255,182,193,0.3)" />
            <defs>
              <linearGradient
                id="premiumGradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#E6E6FA" />
                <stop offset="100%" stopColor="#DDA0DD" />
              </linearGradient>
            </defs>
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
              <path
                d="M10,2 L12,8 L18,9 L14,13 L15,18 L10,15 L5,18 L6,13 L2,9 L8,8 Z"
                fill={
                  i % 3 === 0
                    ? "rgba(255,215,0,0.7)"
                    : i % 3 === 1
                    ? "rgba(255,192,203,0.6)"
                    : "rgba(221,160,221,0.6)"
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
};

export default function HomePage() {
  const [showGate, setShowGate] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const gateTimer = setTimeout(() => setShowGate(false), 3400);
    const contentTimer = setTimeout(() => setShowContent(true), 3400);
    return () => {
      clearTimeout(gateTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <>
      {showGate && <GateAnimation />}
      {showContent && (
        <>
          {/* Premium background */}
          <PremiumBackground />

          <Navbar />
          <BackgroundElements />

          <div className="w-full relative min-h-screen text-gray-800">
            {/* Hero Section */}
            <div className="relative z-20 h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-6">
              <div className="max-w-6xl w-full space-y-8 text-center animate-fade-in">
                <h1 className="text-5xl pt-20 md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent leading-tight">
                  Kala aur Sahit ka Sangam
                </h1>
                <div className="h-2 w-28 bg-gradient-to-r from-pink-500 to-red-400 rounded-full mt-2 mx-auto"></div>
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-semibold max-w-3xl mx-auto">
                  Welcome to SAHITYAM 2026, where art and literature converge.
                  Join us from 3rd to 5th February 2026 for an unforgettable
                  celebration of creativity.
                </p>

                {/* Countdown Section */}
                <div className="flex justify-center mt-8">
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-2xl border border-pink-200">
                    <Countdown />
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                  <a
                    href="/events"
                    className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Explore Events</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </a>
                  <a
                    href="/schedule"
                    className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-pink-200 hover:border-pink-300"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>View Schedule</span>
                    </span>
                  </a>
                </div>

                {/* Status Indicators */}
                <div className="flex gap-8 mt-8 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    <span className="text-sm font-bold text-red-600">
                      Live Event
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-bold text-green-600">
                      Registration Open
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panelists Section */}
            <div className="relative z-20 py-20 px-6 md:px-12 lg:px-20">
              <div className="max-w-6xl mx-auto text-center space-y-12">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">
                  Meet Our Panelists
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Distinguished artists, scholars, and cultural icons who will
                  guide and inspire at SAHITYAM 2026.
                </p>
                <PanelistsGrid />
              </div>
            </div>

            {/* Sponsors Section */}
            <div className="relative z-20 py-10">
              <SponsorScroll />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
