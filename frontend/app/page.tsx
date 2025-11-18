"use client";

import Image from "next/image";
import { useState } from "react";
import GateAnimation from "../components/GateAnimation";
import BlurText from "@/components/BlurText";
import Countdown from "./components/Countdown";

export default function Home() {
  const [showGate, setShowGate] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleGateComplete = () => {
    setShowGate(false);
    // Delay content appearance slightly for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <>
      {showGate && <GateAnimation onComplete={handleGateComplete} />}

      <div className="min-h-screen w-full bg-white relative overflow-hidden">
        {/* Amber Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)
      `,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="h-16 w-screen bg-amber-600 ">Navbar</div>
          <div className="h-full flex flex-col items-center justify-start px-8 pt-32 pb-20">
            {showContent && (
              <div className="max-w-5xl w-full text-left space-y-8">
                <div>
                  <BlurText
                    text="Kala aur Sahit ka Sangam"
                    delay={50}
                    animateBy="words"
                    direction="top"
                    className="text-6xl md:text-7xl lg:text-8xl font-bold text-black"
                  />
                </div>
                <div>
                  <BlurText
                    text="Welcome to SAHITYAM 2026, where art and literature converge. Join us from 3rd to 5th February 2026 for an unforgettable celebration of creativity."
                    delay={50}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-black"
                  />
                </div>

                {/* Countdown Timer */}
                <div className="mt-12 flex justify-center">
                  <Countdown />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
