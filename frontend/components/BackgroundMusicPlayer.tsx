"use client";

import { useState, useRef, useEffect } from "react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Check if user has already made a choice
    const musicConsent = localStorage.getItem("musicConsent");
    const savedTime = localStorage.getItem("musicTime");

    if (musicConsent === "accepted") {
      // User previously accepted, play music
      if (audioRef.current && savedTime) {
        audioRef.current.currentTime = parseFloat(savedTime);
      }
      attemptPlay();
    } else if (musicConsent === "declined") {
      // User previously declined, don't show modal or play
      setIsPlaying(false);
    } else {
      // First time visit, show consent modal after a short delay
      const timer = setTimeout(() => {
        setShowConsentModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Save playback position periodically
    const saveInterval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        localStorage.setItem(
          "musicTime",
          audioRef.current.currentTime.toString(),
        );
      }
    }, 2000);

    return () => {
      clearInterval(saveInterval);
    };
  }, []);

  const attemptPlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("✓ Music started playing");
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("⚠ Autoplay blocked:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleAcceptMusic = () => {
    localStorage.setItem("musicConsent", "accepted");
    setShowConsentModal(false);
    attemptPlay();
  };

  const handleDeclineMusic = () => {
    localStorage.setItem("musicConsent", "declined");
    setShowConsentModal(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Restore playing state when navigating between pages
  useEffect(() => {
    if (isMounted && audioRef.current) {
      const musicConsent = localStorage.getItem("musicConsent");

      if (musicConsent === "accepted" && audioRef.current.paused) {
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
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
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
        audioRef.current.pause();
        setIsPlaying(false);
        console.log("⏸ Music paused by user");
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            console.log("▶ Music resumed by user");
          })
          .catch((err) => console.log("✗ Play failed:", err));
      }
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop muted={false}>
        <source src="/SahityamBGM.mpeg" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            style={{
              animation: "fadeIn 300ms ease-out forwards",
            }}
          ></div>

          {/* Modal */}
          <div
            className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 z-10 border-2 border-purple-200 max-h-[90vh] overflow-y-auto"
            style={{
              animation:
                "modalSlideIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            {/* Musical Note Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
                <div
                  className="relative text-5xl sm:text-6xl animate-bounce"
                  style={{ animationDuration: "2s" }}
                >
                  🎵
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-black text-center text-gray-800 mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent px-2">
              Enhance Your Experience
            </h2>

            {/* Message */}
            <p className="text-center text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed px-2">
              Would you like to play background music while browsing?
              <br />
              <span className="text-xs sm:text-sm text-gray-600 mt-2 block">
                You can change this anytime using the music button.
              </span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-2">
              <button
                onClick={handleDeclineMusic}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                No, Thanks
              </button>
              <button
                onClick={handleAcceptMusic}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/40 text-sm sm:text-base"
              >
                Yes, Play Music ♪
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-xl sm:text-2xl opacity-30 animate-pulse">
              ✨
            </div>
            <div
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-xl sm:text-2xl opacity-30 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              ⭐
            </div>
            <div
              className="absolute bottom-3 sm:bottom-4 left-6 sm:left-8 text-lg sm:text-xl opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              🌟
            </div>
            <div
              className="absolute bottom-3 sm:bottom-4 right-6 sm:right-8 text-lg sm:text-xl opacity-30 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            >
              💫
            </div>
          </div>
        </div>
      )}

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
