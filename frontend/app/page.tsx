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
          <Navbar />
          <BackgroundElements />
          <div className="w-full relative min-h-screen text-gray-800">
            {/* Hero Section */}
            <div className="relative z-10 h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-6">
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
            <div className="relative z-10 py-20 px-6 md:px-12 lg:px-20">
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
            <div className="relative z-10 py-10">
              <SponsorScroll />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
