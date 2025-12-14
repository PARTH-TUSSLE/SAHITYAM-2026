"use client";

interface MysterySponsor {
  id: number;
  gradient: string;
  animation: string;
}

// Mystery sponsor placeholders with different gradients
const mysterySponsors: MysterySponsor[] = [
  {
    id: 1,
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    animation: "animate-pulse",
  },
  {
    id: 2,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    animation: "animate-bounce",
  },
  {
    id: 3,
    gradient: "from-pink-500 via-purple-600 to-indigo-500",
    animation: "animate-pulse",
  },
  {
    id: 4,
    gradient: "from-purple-600 via-indigo-500 to-pink-600",
    animation: "animate-bounce",
  },
  {
    id: 5,
    gradient: "from-pink-600 via-purple-500 to-indigo-600",
    animation: "animate-pulse",
  },
  {
    id: 6,
    gradient: "from-indigo-600 via-purple-600 to-pink-500",
    animation: "animate-bounce",
  },
  {
    id: 7,
    gradient: "from-purple-500 via-pink-600 to-indigo-500",
    animation: "animate-pulse",
  },
  {
    id: 8,
    gradient: "from-pink-500 via-indigo-500 to-purple-600",
    animation: "animate-bounce",
  },
];

export default function SponsorScroll() {
  return (
    <div className="w-full py-12 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Our Sponsors
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mx-auto shadow-lg shadow-purple-300/50"></div>
          <p className="text-gray-600 mt-4 text-sm md:text-base flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 text-purple-500 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">
              It's a surprise! Stay tuned...
            </span>
          </p>
        </div>

        {/* Mystery Sponsor Carousel */}
        <div className="relative overflow-hidden py-4 pb-12">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-pink-50 via-pink-50/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-pink-50 via-pink-50/50 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling mystery cards */}
          <div className="flex animate-scroll-left hover:pause">
            {/* Duplicate the mystery sponsors array for seamless infinite scroll */}
            {[...mysterySponsors, ...mysterySponsors, ...mysterySponsors].map(
              (mystery, index) => (
                <div
                  key={`${mystery.id}-${index}`}
                  className="flex-shrink-0 group mx-2 sm:mx-4 md:mx-6"
                >
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl transition-all duration-500 flex items-center justify-center group-hover:scale-110 border-2 border-dashed border-gray-300 group-hover:border-purple-400 group-hover:shadow-2xl group-hover:shadow-purple-300/50 overflow-hidden">
                    {/* Animated gradient background on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${mystery.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    {/* Mystery Question Mark */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div
                        className={`text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-br ${mystery.gradient} bg-clip-text text-transparent ${mystery.animation} group-hover:scale-125 transition-transform duration-300`}
                      >
                        ?
                      </div>
                      <div className="mt-1 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                        <p className="text-[10px] sm:text-xs font-bold text-gray-600">
                          Coming Soon
                        </p>
                      </div>
                    </div>

                    {/* Sparkle effects on hover */}
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-ping"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <svg
                        className="w-2 h-2 sm:w-3 sm:h-3 text-purple-400 animate-ping"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>

                    {/* Mystery message on hover */}
                    <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      <p className="text-[10px] sm:text-xs md:text-sm font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent bg-white/95 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-1.5 rounded-full inline-block shadow-md">
                        Mystery Sponsor #{mystery.id}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-3 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 px-8 py-4 rounded-2xl border border-purple-200/50 shadow-lg">
            <p className="text-sm md:text-base text-gray-700 font-semibold">
              🎉 Exciting partnerships coming soon!
            </p>
            <p className="text-xs text-gray-600">
              We're finalizing amazing collaborations to make SAHITYAM 2026
              unforgettable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
