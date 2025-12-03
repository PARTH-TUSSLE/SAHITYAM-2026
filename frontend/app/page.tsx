// Homepage - Server Component for SEO
import { Metadata } from "next";
import BackgroundElements from "../components/ui/BackgroundElements";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorScroll from "@/components/SponsorScroll";
import PanelistsGrid from "@/components/PanelistsGrid";
import HomeClient, { CountdownWrapper } from "@/components/HomeClient";
import PremiumBackground from "@/components/PremiumBackground";

export const metadata: Metadata = {
  title: "SAHITYAM 2026 - Kala aur Sahit ka Sangam | Mind Benders",
  description:
    "Welcome to SAHITYAM 2026, where art and literature converge. Join us from 5th - 6th Feb 2026 for an unforgettable celebration of creativity at Mind Benders.",
  keywords: [
    "SAHITYAM",
    "2026",
    "art",
    "literature",
    "cultural event",
    "Mind Benders",
    "college fest",
    "creative arts",
  ],
  openGraph: {
    title: "SAHITYAM 2026 - Kala aur Sahit ka Sangam",
    description:
      "Join us from 5th - 6th Feb 2026 for an unforgettable celebration of creativity.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <HomeClient>
      {/* Premium background */}
      <PremiumBackground />

      <Navbar />
      <BackgroundElements />

      <div className="w-full relative min-h-screen text-gray-800">
        {/* Hero Section */}
        <div className="relative z-20 h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
          <div className="max-w-6xl w-full space-y-4 sm:space-y-6 lg:space-y-8 text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl pt-16 sm:pt-20 font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Kala aur Sahit ka Sangam
            </h1>
            <div className="h-1.5 sm:h-2 w-20 sm:w-28 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mt-1 sm:mt-2 mx-auto shadow-lg shadow-purple-200"></div>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl leading-relaxed font-semibold max-w-3xl mx-auto px-2">
              Welcome to SAHITYAM 2026, where art and literature converge. Join
              us from 5th - 6th Feb 2026 for an unforgettable celebration of
              creativity.
            </p>

            {/* Countdown Section */}
            <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8">
              <div className="relative bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 shadow-2xl border border-purple-100 ring-1 ring-purple-200/50">
                <CountdownWrapper />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-4 sm:mt-6 lg:mt-8">
              <a
                href="/events"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-base sm:text-base font-bold rounded-full shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-600/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Explore Events</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="/schedule"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/90 backdrop-blur-md text-gray-800 text-base sm:text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-purple-200 hover:border-purple-300 ring-1 ring-purple-100/50"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>View Schedule</span>
                </span>
              </a>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 lg:mt-8 justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-ping"></div>
                <span className="text-sm sm:text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Live Event
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                <span className="text-sm sm:text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Registration Open
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Panelists Section */}
        <div className="relative z-20 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 lg:space-y-12">
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Meet Our Panelists
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Distinguished artists, scholars, and cultural icons who will guide
              and inspire at SAHITYAM 2026.
            </p>
            <PanelistsGrid />
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="relative z-20 py-6 sm:py-8 lg:py-10">
          <SponsorScroll />
        </div>

        {/* Organised and Managed By Section */}
        <div className="relative z-20 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-3 sm:mb-4 p-2 sm:p-4">
                Organised and Managed by
              </h2>
              <div className="h-1.5 sm:h-2 w-24 sm:w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mx-auto mb-4 sm:mb-6 shadow-lg shadow-purple-200"></div>
              <p className="text-lg sm:text-xl md:text-xl text-gray-700 max-w-2xl mx-auto font-medium px-2">
                Bringing SAHITYAM 2026 to life with dedication and passion
              </p>
            </div>

            {/* Mind Benders Card */}
            <div className="relative group">
              {/* Decorative Glow */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-purple-100 ring-1 ring-purple-200/50 hover:shadow-purple-200 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                  {/* Club Logo/Icon */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg shadow-purple-300/50 group-hover:shadow-xl group-hover:shadow-purple-400/60 transition-all duration-300 ring-2 ring-purple-200/50">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>

                  {/* Club Name */}
                  <div>
                    <h3 className="text-4xl sm:text-5xl md:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1.5 sm:mb-2">
                      Mind Benders
                    </h3>
                    <div className="h-0.5 sm:h-1 w-20 sm:w-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mx-auto mb-3 sm:mb-4 shadow-md shadow-purple-200"></div>
                  </div>

                  {/* Description */}
                  <p className="text-lg sm:text-xl md:text-xl leading-relaxed max-w-3xl font-medium px-2">
                    A passionate community of creative minds dedicated to
                    fostering artistic expression and literary excellence. Mind
                    Benders brings together innovators, artists, and thinkers to
                    create memorable cultural experiences.
                  </p>

                  {/* Stats/Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mt-6 sm:mt-8">
                    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200 shadow-md shadow-purple-100/50">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                        5+
                      </div>
                      <div className="text-sm sm:text-base text-gray-700 font-semibold">
                        Years of Excellence
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200 shadow-md shadow-purple-100/50">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                        50+
                      </div>
                      <div className="text-sm sm:text-base text-gray-700 font-semibold">
                        Events Organized
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200 shadow-md shadow-purple-100/50">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                        1000+
                      </div>
                      <div className="text-sm sm:text-base text-gray-700 font-semibold">
                        Participants Reached
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-8 sm:mt-12">
              <p className="text-gray-600 text-xs sm:text-sm md:text-base italic px-2">
                "Creativity knows no bounds when minds come together"
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </HomeClient>
  );
}
