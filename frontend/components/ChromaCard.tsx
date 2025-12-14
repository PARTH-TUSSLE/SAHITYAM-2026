"use client";

import Image from "next/image";
import { useState } from "react";
import EventModal from "./EventModal";
import PremiumSpinner from "./PremiumSpinner";
import { ShareButton } from "./ShareButtons";
import { getEventShareUrl, getShareDescription } from "@/lib/config";

interface ChromaCardProps {
  eventId: string;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  rules?: string[];
  registrationFee?: number;
  prizeAmount?: string;
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
  registrationFee = 999,
  prizeAmount,
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
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-pink-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border border-gray-200/50">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-transparent rounded-bl-3xl z-10"></div>

        {/* Fee Badge - top left */}
        <div className="absolute top-4 left-4 z-20 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white rounded-full shadow-lg shadow-purple-500/40 font-bold text-sm flex items-center gap-2 ring-1 ring-white/20">
          {title === "Literature Quiz" ? (
            <span className="text-xs sm:text-sm">
              ₹{registrationFee} per team
            </span>
          ) : title === "Inter-College Youth Parliament" ? (
            <span className="text-xs sm:text-sm">
              ₹{registrationFee} per delegate
            </span>
          ) : registrationFee === 0 ? (
            <span className="text-xs sm:text-sm">FREE</span>
          ) : (
            <span>₹{registrationFee}</span>
          )}
        </div>

        {/* Prize Badge - top right */}
        {prizeAmount && (
          <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-full shadow-lg shadow-orange-500/40 font-bold text-sm flex items-center gap-2 ring-1 ring-white/20">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 576 512">
              <path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z" />
            </svg>
            <span className="text-xs sm:text-sm">₹{prizeAmount}</span>
          </div>
        )}

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
              <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full mb-4 transform transition-all duration-300 group-hover:w-24"></div>

              <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg transform transition-transform duration-300 group-hover:translate-x-1">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-white/90 font-medium drop-shadow-md mb-6">
                  {subtitle}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 justify-center items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 bg-white/95 backdrop-blur-sm border-2 border-white/50 hover:border-orange-400 text-gray-700 hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 overflow-hidden group/btn text-sm sm:text-base whitespace-nowrap"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    See More
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-pink-50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>

                {isAuthenticated ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegisterClick();
                    }}
                    disabled={isLoading}
                    className={`relative px-4 py-2 sm:px-5 sm:py-2.5 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 overflow-hidden group/btn text-sm sm:text-base whitespace-nowrap ${
                      isRegistered
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        : "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/40 hover:shadow-lg hover:shadow-purple-600/50 ring-1 ring-white/20"
                    } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <PremiumSpinner size="sm" variant="inline" />
                          <span className="text-xs">Loading...</span>
                        </>
                      ) : (
                        <>
                          {isRegistered ? "Unregister" : "Register"}
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12"
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
                          : "bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-700"
                      }`}
                    ></div>
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "/login";
                    }}
                    className="relative px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-600/50 hover:-translate-y-1 active:scale-95 overflow-hidden group/btn text-sm sm:text-base ring-1 ring-white/20 whitespace-nowrap"
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Login to Register
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                )}

                {/* Share Button */}
                <div onClick={(e) => e.stopPropagation()}>
                  <ShareButton
                    url={getEventShareUrl(eventId)}
                    title={title}
                    description={getShareDescription(description)}
                  />
                </div>
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
