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
    <div className="w-full relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Announcement Section */}
        <div className="relative">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-3xl blur-3xl opacity-50"></div>

          {/* Content Card */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 border-2 border-purple-200/50 ring-1 ring-purple-100/30 shadow-2xl shadow-purple-500/10">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-300/50 ring-2 ring-purple-200/30">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 text-center p-2">
              Coming Soon
            </h3>

            {/* Message */}
            <p className="text-lg md:text-xl text-gray-700 font-semibold text-center max-w-2xl mx-auto leading-relaxed">
              The names of the panelists will be announced on{" "}
              <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent pb-1 inline-block">
                15th January
              </span>
            </p>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
