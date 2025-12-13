"use client";

import Image from "next/image";

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
    image: "/GaganAjitSingh.jpeg",
  },
];

export default function PanelistsGrid() {
  return (
    <div className="w-full relative py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Panelists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {panelists.map((panelist) => (
            <div key={panelist.id} className="group relative">
              {/* Persistent Glowing Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl opacity-60 group-hover:opacity-90 blur-lg transition-all duration-500"></div>

              {/* Card */}
              <div className="relative bg-white rounded-3xl p-6 transition-all duration-300 h-full flex flex-col">
                {/* Image Container - Fixed Aspect Ratio */}
                <div className="relative w-full aspect-square mb-5 overflow-hidden rounded-2xl">
                  <Image
                    src={panelist.image}
                    alt={panelist.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Corner Dot */}
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-pink-500 to-purple-600"></div>
                </div>

                {/* Content - Fixed Height */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                    {panelist.name}
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-gray-700 font-medium leading-relaxed min-h-[80px]">
                    {panelist.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
