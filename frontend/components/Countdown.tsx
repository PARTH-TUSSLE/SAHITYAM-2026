"use client";

import { useEffect, useState } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-02-03T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 md:gap-6 items-center justify-center">
      <FlipCard value={timeLeft.days} label="days" />
      <FlipCard value={timeLeft.hours} label="hours" />
      <FlipCard value={timeLeft.minutes} label="min" />
      <FlipCard value={timeLeft.seconds} label="sec" />
    </div>
  );
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setPreviousValue(displayValue);
      setIsFlipping(true);

      // Update to new value at halfway point
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  const currentDisplay = String(displayValue).padStart(2, "0");
  const previousDisplay = String(previousValue).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-20 h-24 md:w-28 md:h-32"
        style={{ perspective: "1000px" }}
      >
        {/* Static top half - shows current value */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 bg-black rounded-t-2xl overflow-hidden shadow-2xl"
          style={{ zIndex: 1 }}
        >
          <div
            className="absolute w-full h-[200%] flex items-center justify-center text-5xl md:text-7xl font-bold text-white"
            style={{
              top: "0",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {currentDisplay}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Static bottom half - shows current value */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-black rounded-b-2xl overflow-hidden shadow-2xl"
          style={{ zIndex: 1 }}
        >
          <div
            className="absolute w-full h-[200%] flex items-center justify-center text-5xl md:text-7xl font-bold text-white"
            style={{
              top: "-100%",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {currentDisplay}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>

        {/* Flipping top half - shows previous value and flips down */}
        {isFlipping && (
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-black rounded-t-2xl overflow-hidden shadow-2xl"
            style={{
              transformOrigin: "bottom center",
              animation:
                "flipDown 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards",
              zIndex: 3,
            }}
          >
            <div
              className="absolute w-full h-[200%] flex items-center justify-center text-5xl md:text-7xl font-bold text-white"
              style={{
                top: "0",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {previousDisplay}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800"></div>
          </div>
        )}

        {/* Flipping bottom half - shows new value and flips up into position */}
        {isFlipping && (
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-black rounded-b-2xl overflow-hidden shadow-2xl"
            style={{
              transformOrigin: "top center",
              animation:
                "flipUp 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards",
              zIndex: 2,
            }}
          >
            <div
              className="absolute w-full h-[200%] flex items-center justify-center text-5xl md:text-7xl font-bold text-white"
              style={{
                top: "-100%",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {currentDisplay}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        )}
      </div>

      <span className="text-xs md:text-sm font-medium text-black uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
