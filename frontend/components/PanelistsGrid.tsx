"use client";

import Image from "next/image";

interface Panelist {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Day 1 Panelists - February 3rd
const day1Panelists: Panelist[] = [
  {
    id: 1,
    name: "Pankhuri Gidwani",
    role: "Actress, Model, Influencer",
    image: "/PankhuriGidwani.jpeg",
  },
  {
    id: 2,
    name: "Navjyot Randhawa",
    role: "Editor, Presenter - GNT, Aaj Tak, India Today",
    image: "/NavjyotRandhawa.png",
  },
  {
    id: 3,
    name: "Umang Jindal",
    role: "CEO, Homeland Group",
    image: "/UmangJindal.jpg",
  },
  {
    id: 4,
    name: "Anish Kanjilal",
    role: "Author",
    image: "/AnishKanjilal.png",
  },
  {
    id: 5,
    name: "Yash Tiwari",
    role: "Author, TEDx Speaker, Communication Trainer",
    image: "/YashTiwari.png",
  },
  {
    id: 6,
    name: "Ashok Kumar IPS",
    role: "Ex-DGP (UK) and Vice Chancellor Sports University (Hr.)",
    image: "/AshokKumar.jpg",
  },
  {
    id: 7,
    name: "Ashish Kumar Chaudhary",
    role: "Athlete, Indian International Boxer, Olympian",
    image: "/AshishKumar.png",
  },
];

// Day 2 Panelists - February 4th
const day2Panelists: Panelist[] = [
  {
    id: 1,
    name: "BN Sharma",
    role: "Artist",
    image: "/BNSharma.png",
  },
  {
    id: 2,
    name: "Bunty Bains",
    role: "Eminent Lyricist, Composer, Actor, Producer",
    image: "/BuntyBains.jpeg",
  },
  {
    id: 3,
    name: "Jasbir Jassi",
    role: "Singer, Lyricist, Performer, Actor",
    image: "/JasbirJassi.png",
  },
  {
    id: 4,
    name: "Malkeet Rauni",
    role: "Theatre Artist",
    image: "/MalkeetRauni.png",
  },
  {
    id: 5,
    name: "Jagdeep Singh Warring",
    role: "Writer",
    image: "/JagdeepSinghWarring.png",
  },
];

// Panelist Card Component
function PanelistCard({ panelist, gradient }: { panelist: Panelist; gradient: string }) {
  return (
    <div className="group relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px]">
      {/* Glowing Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl opacity-40 group-hover:opacity-70 blur-md transition-all duration-500`}></div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            src={panelist.image}
            alt={panelist.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 260px"
          />
          {/* Overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`}></div>

          {/* Content overlayed on image */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <h3 className="text-white text-sm sm:text-base md:text-lg font-bold leading-tight drop-shadow-lg">
              {panelist.name}
            </h3>
            <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-medium mt-1 leading-snug drop-shadow-md line-clamp-2">
              {panelist.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Day Section Component
function DaySection({
  title,
  date,
  panelists,
  gradient,
}: {
  title: string;
  date: string;
  panelists: Panelist[];
  gradient: string;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      {/* Day Header */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className={`h-[2px] w-12 sm:w-20 bg-gradient-to-r ${gradient} rounded-full`}></div>
        <div className="text-center">
          <h3 className={`text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm font-semibold mt-1">{date}</p>
        </div>
        <div className={`h-[2px] w-12 sm:w-20 bg-gradient-to-r ${gradient} rounded-full`}></div>
      </div>

      {/* Scroll Hint */}
      <div className="flex items-center justify-center gap-2 mb-4 text-gray-400">
        <span className="text-xs sm:text-sm font-medium">Swipe to explore</span>
        <svg className="w-4 h-4 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Scrollable Carousel */}
      <div className="relative overflow-x-auto scrollbar-hide px-4">
        <div className="flex gap-4 sm:gap-5">
          {panelists.map((panelist) => (
            <PanelistCard
              key={panelist.id}
              panelist={panelist}
              gradient={gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PanelistsGrid() {
  return (
    <div className="w-full relative py-4 sm:py-6">
      {/* Day 1 Section */}
      <DaySection
        title="Day 1 Panelists"
        date="February 3rd, 2026"
        panelists={day1Panelists}
        gradient="from-pink-500 via-rose-500 to-red-500"
      />

      {/* Separator */}
      <div className="flex items-center justify-center gap-4 my-8 sm:my-10">
        <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
        <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
      </div>

      {/* Day 2 Section */}
      <DaySection
        title="Day 2 Panelists"
        date="February 4th, 2026"
        panelists={day2Panelists}
        gradient="from-indigo-500 via-purple-500 to-violet-500"
      />

      {/* CSS */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
