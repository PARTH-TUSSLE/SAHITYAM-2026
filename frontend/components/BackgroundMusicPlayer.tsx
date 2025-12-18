"use client";

import { useState, useRef, useEffect } from "react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Always try to play music automatically
    // Only respect user pause if they clicked pause in THIS session
    const sessionPaused = sessionStorage.getItem("musicPaused");
    const shouldPlay = sessionPaused !== "true";

    // Set current time to saved position if exists
    const savedTime = localStorage.getItem("musicTime");
    if (audioRef.current && savedTime) {
      audioRef.current.currentTime = parseFloat(savedTime);
    }

    // Aggressive autoplay strategy
    const attemptAutoplay = () => {
      if (audioRef.current && shouldPlay) {
        // Set volume to ensure it's not muted
        audioRef.current.volume = 1.0;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("✓ Music started playing automatically");
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log(
                "⚠ Autoplay blocked by browser, will start on first interaction:",
                error
              );

              // Set up one-time listeners for ANY user interaction
              const playOnInteraction = () => {
                if (audioRef.current) {
                  audioRef.current
                    .play()
                    .then(() => {
                      setIsPlaying(true);
                      console.log("✓ Music started after user interaction");
                    })
                    .catch((err) => console.log("✗ Play failed:", err));
                }
                // Remove all listeners after first interaction attempt
                document.removeEventListener("click", playOnInteraction);
                document.removeEventListener("keydown", playOnInteraction);
                document.removeEventListener("touchstart", playOnInteraction);
                document.removeEventListener("scroll", playOnInteraction);
                document.removeEventListener("mousemove", playOnInteraction);
              };

              document.addEventListener("click", playOnInteraction, {
                once: true,
              });
              document.addEventListener("keydown", playOnInteraction, {
                once: true,
              });
              document.addEventListener("touchstart", playOnInteraction, {
                once: true,
              });
              document.addEventListener("scroll", playOnInteraction, {
                once: true,
                passive: true,
              });
              document.addEventListener("mousemove", playOnInteraction, {
                once: true,
                passive: true,
              });
            });
        }
      } else if (!shouldPlay) {
        setIsPlaying(false);
      }
    };

    // Try to play immediately
    const immediateTimer = setTimeout(attemptAutoplay, 50);

    // Try again with multiple retries
    const retryTimer1 = setTimeout(attemptAutoplay, 200);
    const retryTimer2 = setTimeout(attemptAutoplay, 500);
    const retryTimer3 = setTimeout(attemptAutoplay, 1000);

    // Save playback position periodically
    const saveInterval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        localStorage.setItem(
          "musicTime",
          audioRef.current.currentTime.toString()
        );
      }
    }, 2000);

    return () => {
      clearTimeout(immediateTimer);
      clearTimeout(retryTimer1);
      clearTimeout(retryTimer2);
      clearTimeout(retryTimer3);
      clearInterval(saveInterval);
    };
  }, []);

  // Restore playing state when navigating between pages
  useEffect(() => {
    if (isMounted && audioRef.current) {
      const sessionPaused = sessionStorage.getItem("musicPaused");

      // Always try to play unless user explicitly paused in this session
      if (sessionPaused !== "true" && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            console.log("✓ Music resumed on navigation");
          })
          .catch((err) => console.log("✗ Resume failed:", err));
      }
    }
  }, [isMounted]);

  // Sync state with actual audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      sessionStorage.removeItem("musicPaused");
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      // Loop is already set, but just in case
      audio.play().catch((err) => console.log("✗ Replay failed:", err));
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // User explicitly paused
        audioRef.current.pause();
        setIsPlaying(false);
        sessionStorage.setItem("musicPaused", "true");
        console.log("⏸ Music paused by user");
      } else {
        // User explicitly played
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            sessionStorage.removeItem("musicPaused");
            console.log("▶ Music resumed by user");
          })
          .catch((err) => console.log("✗ Play failed:", err));
      }
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
