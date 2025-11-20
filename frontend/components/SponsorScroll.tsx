"use client";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

// Dummy sponsor logos using Unsplash
const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Tech Corp",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Innovation Labs",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Digital Solutions",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Creative Studio",
    logo: "https://images.unsplash.com/photo-1611926653670-6c18ff0d8497?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Media Group",
    logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Enterprise Co",
    logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=200&fit=crop",
  },
  {
    id: 7,
    name: "Global Partners",
    logo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=200&fit=crop",
  },
  {
    id: 8,
    name: "Future Tech",
    logo: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=200&h=200&fit=crop",
  },
];

export default function SponsorScroll() {
  return (
    <div className="w-full py-12 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Sponsors
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto"></div>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative overflow-hidden py-4 pb-12">
          {/* Gradient overlays for fade effect - more subtle */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-amber-50 via-amber-50/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-amber-50 via-amber-50/50 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling content with animation */}
          <div className="flex animate-scroll-left hover:pause">
            {/* Duplicate the sponsors array for seamless infinite scroll */}
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                className="flex-shrink-0 group mx-4 md:mx-6"
              >
                <div className="relative w-36 h-36 md:w-44 md:h-44 bg-white/60 backdrop-blur-sm rounded-2xl transition-all duration-300 flex items-center justify-center p-6 group-hover:scale-110 group-hover:bg-white/80 border border-gray-200/50 group-hover:border-orange-300/50">
                  {/* Sponsor logo */}
                  <div className="w-full h-full relative flex items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="object-contain w-full h-full rounded-lg"
                    />
                  </div>
                  {/* Sponsor name on hover - positioned outside the card */}
                  <div className="absolute -bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <p className="text-xs md:text-sm font-semibold text-gray-800 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block shadow-sm">
                      {sponsor.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Add sponsor tier labels */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>Thank you to all our sponsors for making SAHITYAM 2026 possible</p>
        </div>
      </div>
    </div>
  );
}
