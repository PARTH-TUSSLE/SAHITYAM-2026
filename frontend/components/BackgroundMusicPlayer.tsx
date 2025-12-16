"use client";

import { useState, useRef, useEffect } from "react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Check if music was previously stopped by user
    const musicStopped = localStorage.getItem("musicStopped");
    const shouldPlay = musicStopped !== "true";

    if (shouldPlay) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }

    // Aggressive autoplay strategy
    const attemptAutoplay = () => {
      if (audioRef.current && shouldPlay) {
        // Set current time to saved position if exists
        const savedTime = localStorage.getItem("musicTime");
        if (savedTime) {
          audioRef.current.currentTime = parseFloat(savedTime);
        }

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Music started playing automatically");
              setIsPlaying(true);
              localStorage.setItem("musicStopped", "false");
            })
            .catch((error) => {
              console.log(
                "Autoplay prevented, will try on interaction:",
                error
              );
              setIsPlaying(false);

              // Set up one-time listeners for ANY user interaction
              const playOnInteraction = () => {
                if (audioRef.current && shouldPlay) {
                  audioRef.current
                    .play()
                    .then(() => {
                      setIsPlaying(true);
                      localStorage.setItem("musicStopped", "false");
                    })
                    .catch((err) => console.log("Play failed:", err));
                }
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
            });
        }
      }
    };

    // Try to play immediately
    const immediateTimer = setTimeout(attemptAutoplay, 100);

    // Try again after a short delay
    const retryTimer = setTimeout(attemptAutoplay, 500);

    // Try one more time after longer delay (for slow page loads)
    const finalRetryTimer = setTimeout(attemptAutoplay, 1500);

    // Save playback position periodically
    const saveInterval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        localStorage.setItem(
          "musicTime",
          audioRef.current.currentTime.toString()
        );
      }
    }, 2000);

    return () => {
      clearTimeout(immediateTimer);
      clearTimeout(retryTimer);
      clearTimeout(finalRetryTimer);
      clearInterval(saveInterval);
    };
  }, []);

  // Restore playing state when navigating between pages
  useEffect(() => {
    if (isMounted && audioRef.current) {
      const musicStopped = localStorage.getItem("musicStopped");
      if (musicStopped !== "true" && audioRef.current.paused) {
        audioRef.current
          .play()
          .catch((err) => console.log("Resume failed:", err));
      }
    }
  }, [isMounted]);

  // Sync state with actual audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      localStorage.setItem("musicStopped", "false");
    };

    const handlePause = () => {
      setIsPlaying(false);
      localStorage.setItem("musicStopped", "true");
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        localStorage.setItem("musicStopped", "true");
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            localStorage.setItem("musicStopped", "false");
          })
          .catch((err) => console.log("Play failed:", err));
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
