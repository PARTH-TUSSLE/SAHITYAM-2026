"use client";

import { useState, useRef, useEffect } from "react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Auto-play on first user interaction due to browser policies
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
        setIsPlaying(true);
        setHasInteracted(true);
      }
    };

    // Try to autoplay immediately and aggressively
    const attemptAutoplay = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Music started playing automatically");
              setIsPlaying(true);
              setHasInteracted(true);
            })
            .catch((error) => {
              console.log(
                "Autoplay prevented, waiting for user interaction:",
                error
              );
              setIsPlaying(false);
              // If autoplay fails, set up listeners for first interaction
              document.addEventListener("click", handleFirstInteraction, {
                once: true,
              });
              document.addEventListener("keydown", handleFirstInteraction, {
                once: true,
              });
              document.addEventListener("touchstart", handleFirstInteraction, {
                once: true,
              });
              document.addEventListener("scroll", handleFirstInteraction, {
                once: true,
              });
            });
        }
      }
    };

    // Attempt to play immediately
    attemptAutoplay();

    // Also try again after a short delay (after gate animation starts)
    const retryTimer = setTimeout(() => {
      if (!hasInteracted && audioRef.current) {
        attemptAutoplay();
      }
    }, 100);

    return () => {
      clearTimeout(retryTimer);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop autoPlay muted={false}>
        <source src="/SahityamBGM.mpeg" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Music Control Button - Smaller and more in corner */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 rounded-full shadow-xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Pulsing Ring Animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 animate-ping opacity-30"></div>

        {/* Icon */}
        <div className="relative z-10">
          {isPlaying ? (
            // Pause Icon with animated bars
            <div className="flex gap-0.5 items-center justify-center">
              <div className="w-0.5 h-4 bg-white rounded-full animate-pulse"></div>
              <div
                className="w-0.5 h-4 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          ) : (
            // Play Icon
            <svg
              className="w-5 h-5 text-white ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 right-0 px-2.5 py-1 bg-gray-900 text-white text-[10px] font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {isPlaying ? "Pause Music" : "Play Music"}
          <div className="absolute top-full right-3 -mt-1 border-[3px] border-transparent border-t-gray-900"></div>
        </div>

        {/* Music Note Decorations */}
        {isPlaying && (
          <>
            <div className="absolute -top-6 -right-1 text-white/60 text-[10px] animate-bounce">
              ♪
            </div>
            <div
              className="absolute -top-5 -left-1 text-white/60 text-[10px] animate-bounce"
              style={{ animationDelay: "0.3s" }}
            >
              ♫
            </div>
          </>
        )}
      </button>
    </>
  );
}
