"use client";

interface Panelist {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Dummy panelists
const panelists: Panelist[] = [
  {
    id: 1,
    name: "Dr. Anjali Sharma",
    role: "Literary Critic",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Poet & Author",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Priya Mehta",
    role: "Art Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Arjun Desai",
    role: "Cultural Historian",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Kavita Singh",
    role: "Theatre Artist",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Vikram Bhatia",
    role: "Music Composer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Neha Kapoor",
    role: "Dance Choreographer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Aditya Verma",
    role: "Film Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
];

export default function PanelistsGrid() {
  return (
    <div className="w-full py-12 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Panelists
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Distinguished artists, scholars, and cultural icons who will guide
            and inspire at SAHITYAM 2026
          </p>
        </div>

        {/* Clean Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {panelists.map((panelist) => (
            <div key={panelist.id} className="group relative">
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl aspect-square transition-all duration-300 group-hover:scale-105">
                {/* Image */}
                <img
                  src={panelist.image}
                  alt={panelist.name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay - always visible but intensifies on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-300"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center transform transition-all duration-300">
                  <h3 className="text-white font-bold text-base md:text-lg mb-1">
                    {panelist.name}
                  </h3>
                  <p className="text-orange-300 text-xs md:text-sm font-medium">
                    {panelist.role}
                  </p>
                </div>

                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-400/40 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
