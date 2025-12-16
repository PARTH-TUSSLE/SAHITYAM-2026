"use client";

import Image from "next/image";
import { useState } from "react";

interface Panelist {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Panelists for Sahityam 2026
const panelists: Panelist[] = [
  {
    id: 1,
    name: "Anurag Dixit",
    role: "Award-winning music educator and founder of Musicology School of Music",
    image: "/AnuragDixit.webp",
  },
  {
    id: 2,
    name: "Rana Ranbir",
    role: "Indian actor and screenplay writer",
    image: "/RanaRanbir.jpg",
  },
  {
    id: 3,
    name: "Bunty Bains",
    role: "Punjabi lyricist, composer, producer, and entrepreneur",
    image: "/BuntyBains.jpeg",
  },
  {
    id: 4,
    name: "Umang Jindal",
    role: "CEO, Homeland Group • Visionary Speaker at Build X Punjab 2025",
    image: "/UmangJindal.jpg",
  },
  {
    id: 5,
    name: "Gagan Ajit Singh",
    role: "Indian former field hockey player and captain of the India national under-21 team that won the 2001 Junior World Cup",
    image: "/GaganAjit2.jpeg",
  },
];

export default function PanelistsGrid() {
  // Triple panelists for seamless infinite scroll
  const duplicatedPanelists = [...panelists, ...panelists, ...panelists];

  return (
    <div className="w-full relative overflow-hidden">
      <div className="w-full py-4 sm:py-6">
        {/* Infinite Auto-Scrolling + Manual Scrollable Carousel */}
        <div className="relative flex overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 sm:gap-6 md:gap-8 animate-scroll-infinite">
            {duplicatedPanelists.map((panelist, index) => (
              <div
                key={`${panelist.id}-${index}`}
                className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
              >
                {/* Persistent Glowing Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl opacity-60 group-hover:opacity-90 blur-lg transition-all duration-500"></div>

                {/* Card */}
                <div className="relative bg-white rounded-3xl p-4 sm:p-5 md:p-6 transition-all duration-300 h-full flex flex-col">
                  {/* Image Container - Fixed Aspect Ratio */}
                  <div className="relative w-full aspect-square mb-4 sm:mb-5 overflow-hidden rounded-2xl">
                    <Image
                      src={panelist.image}
                      alt={panelist.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
                    />

                    {/* Corner Dot */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-br from-pink-500 to-purple-600"></div>
                  </div>

                  {/* Content - Fixed Height */}
                  <div className="space-y-1.5 sm:space-y-2 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                      {panelist.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
                      {panelist.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation + Scrollbar Hide */}
      <style jsx>{`
        @keyframes scroll-infinite {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 40s linear infinite;
          will-change: transform;
        }

        @media (max-width: 640px) {
          .animate-scroll-infinite {
            animation: scroll-infinite 30s linear infinite;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .animate-scroll-infinite {
            animation: scroll-infinite 35s linear infinite;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
