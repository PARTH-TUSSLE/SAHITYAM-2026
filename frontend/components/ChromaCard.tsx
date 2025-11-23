"use client";

import Image from "next/image";
import { useState } from "react";
import EventModal from "./EventModal";

interface ChromaCardProps {
  eventId: string;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  rules?: string[];
  isRegistered?: boolean;
  onRegister?: (eventId: string) => void;
  onUnregister?: (eventId: string) => void;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}

export default function ChromaCard({
  eventId,
  image,
  title,
  subtitle,
  description = "This is an amazing event that brings together art and literature enthusiasts. Join us for an unforgettable experience filled with creativity and inspiration.",
  rules = [
    "Participants must register before the event deadline",
    "Entry fee is non-refundable",
    "Participants must bring valid ID proof",
    "Follow the event schedule and guidelines",
    "Respect all participants and organizers",
  ],
  isRegistered = false,
  onRegister,
  onUnregister,
  isAuthenticated = false,
  isLoading = false,
}: ChromaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    if (isRegistered && onUnregister) {
      onUnregister(eventId);
    } else if (!isRegistered && onRegister) {
      onRegister(eventId);
    }
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsModalOpen(true)}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border border-gray-200/50">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-3xl z-10"></div>

        {/* Inner Card */}
        <div className="relative overflow-hidden">
          {/* Image Container with overlaid content */}
          <div className="relative h-96 w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? "scale-110 rotate-1" : "scale-100"
              }`}
            />
            {/* Gradient Overlay - seamless transition */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* Content at bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
              {/* Decorative line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 transform transition-all duration-300 group-hover:w-24"></div>

              <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg transform transition-transform duration-300 group-hover:translate-x-1">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-white/90 font-medium drop-shadow-md mb-6">
                  {subtitle}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="relative px-6 py-3 bg-white/95 backdrop-blur-sm border-2 border-white/50 hover:border-orange-400 text-gray-700 hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 overflow-hidden group/btn text-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    See More
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>

                {isAuthenticated ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegisterClick();
                    }}
                    disabled={isLoading}
                    className={`relative px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 overflow-hidden group/btn text-sm ${
                      isRegistered
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          {isRegistered ? "Unregister" : "Register"}
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:rotate-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {isRegistered ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            )}
                          </svg>
                        </>
                      )}
                    </span>
                    <div
                      className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ${
                        isRegistered
                          ? "bg-gradient-to-r from-red-600 to-red-700"
                          : "bg-gradient-to-r from-red-600 to-orange-600"
                      }`}
                    ></div>
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "/login";
                    }}
                    className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 overflow-hidden group/btn text-sm"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      Login to Register
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        image={image}
        description={description}
        rules={rules}
        eventId={eventId}
        isRegistered={isRegistered}
        onRegister={onRegister}
        onUnregister={onUnregister}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      />
    </div>
  );
}
