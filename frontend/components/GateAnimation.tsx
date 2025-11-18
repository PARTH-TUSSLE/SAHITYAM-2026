"use client";

import { useEffect, useState } from "react";

export default function GateAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Start opening animation after a brief delay
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 500);

    // Complete animation and notify parent
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Left Gate */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 transition-transform duration-[2000ms] ease-in-out ${
          isOpening ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          background:
            "linear-gradient(to right, #FF6B9D 0%, #E94DB5 40%, #C239B3 70%, #9D3BC5 100%)",
        }}
      >
        {/* Ornate Patterns */}
        <div className="relative h-full w-full overflow-hidden">
          {/* Decorative Border with enhanced design */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-b from-yellow-400 via-orange-500 to-pink-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Ornamental edge pattern */}
          <div className="absolute right-2 top-0 bottom-0 w-2 flex flex-col justify-around">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-300 rounded-full shadow-lg"
              ></div>
            ))}
          </div>

          {/* Enhanced Mandala Pattern */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2">
            <div className="relative w-40 h-40">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-yellow-300/40 rounded-full animate-spin-slow"></div>
              {/* Middle ring */}
              <div className="absolute inset-4 border-4 border-orange-400/50 rounded-full animate-spin-reverse"></div>
              {/* Inner spinning rays */}
              <div className="absolute inset-0 animate-spin-slow">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-32 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-transparent rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `rotate(${i * 30}deg)`,
                      transformOrigin: "left center",
                    }}
                  >
                    <div className="absolute right-0 w-5 h-5 bg-yellow-400 rounded-full shadow-lg shadow-yellow-500/70 border-2 border-white"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Floating Sparkles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle shadow-lg shadow-white/50"
              style={{
                left: `${Math.random() * 85 + 5}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
              }}
            ></div>
          ))}

          {/* Decorative corner patterns */}
          <div className="absolute right-8 top-8 w-32 h-32 border-4 border-yellow-300/60 rounded-full opacity-70 animate-pulse"></div>
          <div
            className="absolute right-12 top-16 w-20 h-20 border-4 border-orange-400/50 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>

          <div
            className="absolute right-8 bottom-8 w-32 h-32 border-4 border-pink-300/60 rounded-full opacity-70 animate-pulse"
            style={{ animationDelay: "0.7s" }}
          ></div>
          <div
            className="absolute right-12 bottom-16 w-20 h-20 border-4 border-purple-400/50 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Additional Mandala - Top Left */}
          <div className="absolute right-48 top-24">
            <div className="relative w-24 h-24 animate-spin-slow">
              <div className="absolute inset-0 border-3 border-orange-300/50 rounded-full"></div>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-1 bg-gradient-to-r from-yellow-300 to-transparent rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: "left center",
                  }}
                >
                  <div className="absolute right-0 w-3 h-3 bg-orange-400 rounded-full border border-white"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Mandala - Bottom Right */}
          <div className="absolute right-48 bottom-24">
            <div className="relative w-24 h-24 animate-spin-reverse">
              <div className="absolute inset-0 border-3 border-pink-300/50 rounded-full"></div>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-1 bg-gradient-to-r from-pink-300 to-transparent rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: "left center",
                  }}
                >
                  <div className="absolute right-0 w-3 h-3 bg-pink-400 rounded-full border border-white"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Lotus Pattern - Top */}
          <div className="absolute right-1/4 top-16 opacity-60">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              className="animate-pulse"
            >
              <circle cx="30" cy="30" r="8" fill="#FCD34D" opacity="0.8" />
              {[...Array(12)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="30"
                  cy="30"
                  rx="20"
                  ry="8"
                  fill="#FB923C"
                  opacity="0.6"
                  transform={`rotate(${i * 30} 30 30)`}
                />
              ))}
            </svg>
          </div>

          {/* Lotus Pattern - Bottom */}
          <div className="absolute right-1/4 bottom-16 opacity-60">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              <circle cx="30" cy="30" r="8" fill="#F472B6" opacity="0.8" />
              {[...Array(12)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="30"
                  cy="30"
                  rx="20"
                  ry="8"
                  fill="#A78BFA"
                  opacity="0.6"
                  transform={`rotate(${i * 30} 30 30)`}
                />
              ))}
            </svg>
          </div>

          {/* Geometric Patterns */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 border-2 border-yellow-300/40 rotate-45 animate-pulse"
              style={{
                right: `${20 + (i % 3) * 25}%`,
                top: `${25 + Math.floor(i / 3) * 50}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <div className="absolute inset-2 border-2 border-orange-300/30"></div>
            </div>
          ))}
        </div>

        {/* SAHITYAM text - Left half */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden">
          <div
            className="text-[120px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-200 drop-shadow-2xl"
            style={{
              textShadow:
                "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.6)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            SAHI
          </div>
        </div>
      </div>

      {/* Right Gate */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 transition-transform duration-[2000ms] ease-in-out ${
          isOpening ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          background:
            "linear-gradient(to left, #FF6B9D 0%, #E94DB5 40%, #C239B3 70%, #9D3BC5 100%)",
        }}
      >
        {/* Ornate Patterns */}
        <div className="relative h-full w-full overflow-hidden">
          {/* Decorative Border with enhanced design */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-yellow-400 via-orange-500 to-pink-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Ornamental edge pattern */}
          <div className="absolute left-2 top-0 bottom-0 w-2 flex flex-col justify-around">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-300 rounded-full shadow-lg"
              ></div>
            ))}
          </div>

          {/* Enhanced Mandala Pattern */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2">
            <div className="relative w-40 h-40">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-yellow-300/40 rounded-full animate-spin-slow"></div>
              {/* Middle ring */}
              <div className="absolute inset-4 border-4 border-orange-400/50 rounded-full animate-spin-reverse"></div>
              {/* Inner spinning rays */}
              <div className="absolute inset-0 animate-spin-slow">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-32 h-1.5 bg-gradient-to-l from-yellow-400 via-orange-400 to-transparent rounded-full"
                    style={{
                      right: "50%",
                      top: "50%",
                      transform: `rotate(${i * 30}deg)`,
                      transformOrigin: "right center",
                    }}
                  >
                    <div className="absolute left-0 w-5 h-5 bg-yellow-400 rounded-full shadow-lg shadow-yellow-500/70 border-2 border-white"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Floating Sparkles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle shadow-lg shadow-white/50"
              style={{
                left: `${Math.random() * 85 + 5}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
              }}
            ></div>
          ))}

          {/* Decorative corner patterns */}
          <div className="absolute left-8 top-8 w-32 h-32 border-4 border-yellow-300/60 rounded-full opacity-70 animate-pulse"></div>
          <div
            className="absolute left-12 top-16 w-20 h-20 border-4 border-orange-400/50 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>

          <div
            className="absolute left-8 bottom-8 w-32 h-32 border-4 border-pink-300/60 rounded-full opacity-70 animate-pulse"
            style={{ animationDelay: "0.7s" }}
          ></div>
          <div
            className="absolute left-12 bottom-16 w-20 h-20 border-4 border-purple-400/50 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Additional Mandala - Top Right */}
          <div className="absolute left-48 top-24">
            <div className="relative w-24 h-24 animate-spin-slow">
              <div className="absolute inset-0 border-3 border-orange-300/50 rounded-full"></div>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-1 bg-gradient-to-l from-yellow-300 to-transparent rounded-full"
                  style={{
                    right: "50%",
                    top: "50%",
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: "right center",
                  }}
                >
                  <div className="absolute left-0 w-3 h-3 bg-orange-400 rounded-full border border-white"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Mandala - Bottom Left */}
          <div className="absolute left-48 bottom-24">
            <div className="relative w-24 h-24 animate-spin-reverse">
              <div className="absolute inset-0 border-3 border-pink-300/50 rounded-full"></div>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-1 bg-gradient-to-l from-pink-300 to-transparent rounded-full"
                  style={{
                    right: "50%",
                    top: "50%",
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: "right center",
                  }}
                >
                  <div className="absolute left-0 w-3 h-3 bg-pink-400 rounded-full border border-white"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Lotus Pattern - Top */}
          <div className="absolute left-1/4 top-16 opacity-60">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              className="animate-pulse"
            >
              <circle cx="30" cy="30" r="8" fill="#FCD34D" opacity="0.8" />
              {[...Array(12)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="30"
                  cy="30"
                  rx="20"
                  ry="8"
                  fill="#FB923C"
                  opacity="0.6"
                  transform={`rotate(${i * 30} 30 30)`}
                />
              ))}
            </svg>
          </div>

          {/* Lotus Pattern - Bottom */}
          <div className="absolute left-1/4 bottom-16 opacity-60">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              <circle cx="30" cy="30" r="8" fill="#F472B6" opacity="0.8" />
              {[...Array(12)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="30"
                  cy="30"
                  rx="20"
                  ry="8"
                  fill="#A78BFA"
                  opacity="0.6"
                  transform={`rotate(${i * 30} 30 30)`}
                />
              ))}
            </svg>
          </div>

          {/* Geometric Patterns */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 border-2 border-yellow-300/40 rotate-45 animate-pulse"
              style={{
                left: `${20 + (i % 3) * 25}%`,
                top: `${25 + Math.floor(i / 3) * 50}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <div className="absolute inset-2 border-2 border-orange-300/30"></div>
            </div>
          ))}
        </div>

        {/* SAHITYAM text - Right half */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden">
          <div
            className="text-[120px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-l from-yellow-300 via-white to-yellow-200 drop-shadow-2xl"
            style={{
              textShadow:
                "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.6)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            TYAM
          </div>
        </div>
      </div>

      {/* Particle Burst Effect */}
      {isOpening && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-particle-burst shadow-lg"
              style={
                {
                  width: `${Math.random() * 10 + 3}px`,
                  height: `${Math.random() * 10 + 3}px`,
                  background: `hsl(${Math.random() * 360}, 100%, ${
                    60 + Math.random() * 20
                  }%)`,
                  animationDelay: `${Math.random() * 0.8}s`,
                  "--angle": `${(i * 360) / 100}deg`,
                } as React.CSSProperties
              }
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
