"use client";

import Image from "next/image";
import { useState } from "react";
import GateAnimation from "../components/GateAnimation";
import BlurText from "@/components/BlurText";
import Countdown from "../components/Countdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorScroll from "@/components/SponsorScroll";
import PanelistsGrid from "@/components/PanelistsGrid";

export default function Home() {
  const [showGate, setShowGate] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleGateComplete = () => {
    setShowGate(false);
    // Delay content appearance slightly for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 10);
  };

  return (
    <>
      {showGate && <GateAnimation onComplete={handleGateComplete} />}

      {showContent && <Navbar />}

      {/* Unified Background Container */}
      <div className="w-full relative">
        {/* Animated gradient background - Fixed to cover entire page */}
        <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 animate-gradient-shift -z-10">
          {/* Animated circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Decorative pattern overlay - Fixed */}
        <div
          className="fixed inset-0 opacity-5 pointer-events-none -z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* First Section */}
        <div className="min-h-screen w-full relative">
          {/* Content */}
          <div className="relative z-10 h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-6">
            {showContent && (
              <div className="max-w-6xl w-full space-y-6 animate-fade-in">
                {/* Main heading with enhanced styling */}
                <div className="text-center space-y-3">
                  <div className="inline-block">
                    <BlurText
                      text="Kala aur Sahit ka Sangam"
                      delay={50}
                      animateBy="words"
                      direction="top"
                      className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight"
                    />
                    {/* Decorative underline */}
                    <div className="h-2 w-28 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2 animate-slide-in mx-auto"></div>
                  </div>
                </div>

                {/* Description with better styling */}
                <div className="max-w-3xl text-center mx-auto">
                  <BlurText
                    text="Welcome to SAHITYAM 2026, where art and literature converge. Join us from 3rd to 5th February 2026 for an unforgettable celebration of creativity."
                    delay={50}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed font-medium"
                  />
                </div>

                {/* Countdown Timer with enhanced container */}
                <div className="flex justify-center mt-8">
                  <div className="relative">
                    {/* Glow effect behind countdown */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-2xl rounded-3xl"></div>
                    <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-5 shadow-2xl border border-white/50">
                      <Countdown />
                    </div>
                  </div>
                </div>

                {/* Call to action buttons */}
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                  <a
                    href="#events"
                    className="group relative px-7 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden text-sm md:text-base"
                  >
                    <span className="relative z-10">Explore Events</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                  <a
                    href="#schedule"
                    className="group px-7 py-3.5 bg-white/80 backdrop-blur-sm text-gray-900 font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-900/10 hover:border-gray-900/30 text-sm md:text-base"
                  >
                    View Schedule
                  </a>
                </div>

                {/* Decorative elements */}
                <div className="flex gap-8 mt-8 justify-center opacity-60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Live Event
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Registration Open
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Second Section - Panelists */}
        {showContent && <PanelistsGrid />}

        {/* Sponsors Section */}
        {showContent && <SponsorScroll />}
      </div>
      <Footer />
    </>
  );
}
