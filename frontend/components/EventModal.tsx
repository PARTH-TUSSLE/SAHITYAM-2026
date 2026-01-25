"use client";

import { useEffect } from "react";
import Image from "next/image";
import PremiumSpinner from "./PremiumSpinner";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  description: string;
  rules: string[];
  eventId: string;
  isRegistered?: boolean;
  onRegister?: (eventId: string) => void;
  onUnregister?: (eventId: string) => void;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}

export default function EventModal({
  isOpen,
  onClose,
  title,
  image,
  description,
  rules,
  eventId,
  isRegistered = false,
  onRegister,
  onUnregister,
  isAuthenticated = false,
  isLoading = false,
}: EventModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Hide navbar and footer when modal is open
      const navbar = document.querySelector("nav");
      const footer = document.querySelector("footer");
      if (navbar) {
        navbar.classList.add("hidden");
      }
      if (footer) {
        footer.classList.add("hidden");
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";

      // Show navbar and footer when modal closes
      const navbar = document.querySelector("nav");
      const footer = document.querySelector("footer");
      if (navbar) {
        navbar.classList.remove("hidden");
      }
      if (footer) {
        footer.classList.remove("hidden");
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop - separate layer */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        style={{
          animation: "fadeIn 350ms ease-out forwards",
        }}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden z-10"
        style={{
          animation:
            "modalSlideIn 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[85vh] sm:max-h-[90vh] hide-scrollbar">
          {/* Header Image */}
          <div className="relative h-48 sm:h-56 md:h-64 w-full">
            <Image src={image} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h2 className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-2xl sm:text-3xl md:text-4xl font-black text-white">
              {title}
            </h2>
          </div>

          {/* Content Sections */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Description Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-pink-500 to-pink-500 rounded-full"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Description
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                {description}
              </p>
            </div>

            {/* Rules Section */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-pink-500 to-pink-500 rounded-full"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Rules
                </h3>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-pink-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed flex-1 text-sm sm:text-base">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Register Button */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    if (isRegistered && onUnregister) {
                      onUnregister(eventId);
                    } else if (!isRegistered && onRegister) {
                      onRegister(eventId);
                    }
                    onClose();
                  }}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 sm:px-6 sm:py-4 font-bold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base ${
                    isRegistered
                      ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-600/50 ring-1 ring-white/20"
                      : "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-600/50 ring-1 ring-white/20"
                  } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <PremiumSpinner size="sm" variant="inline" />
                      <span>Loading...</span>
                    </>
                  ) : isRegistered ? (
                    "Unregister from this Event"
                  ) : (
                    "Register for this Event"
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-600/50 hover:-translate-y-0.5 active:scale-95 ring-1 ring-white/20 text-sm sm:text-base"
                >
                  Login to Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
