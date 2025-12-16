// Homepage - Server Component for SEO
import { Metadata } from "next";
import Image from "next/image";
import BackgroundElements from "../components/ui/BackgroundElements";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorScroll from "@/components/SponsorScroll";
import PanelistsGrid from "@/components/PanelistsGrid";
import HomeClient, { CountdownWrapper } from "@/components/HomeClient";
import PremiumBackground from "@/components/PremiumBackground";
import LiteraryBackground from "@/components/LiteraryBackground";

export const metadata: Metadata = {
  title: "SAHITYAM 2026 - Kala aur Sahit ka Sangam | Mind Benders",
  description:
    "Welcome to SAHITYAM 2026, where art and literature converge. Join us from 3rd and 4th Feb 2026 for an unforgettable celebration of creativity at Mind Benders.",
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
      {/* Literary background with floating elements */}
      <LiteraryBackground />
      {/* Premium background */}
      <PremiumBackground />

      <Navbar />
      <BackgroundElements />

      <div className="w-full relative min-h-screen text-gray-800">
        {/* Hero Section */}
        <div className="relative z-20 h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
          <div className="max-w-6xl w-full space-y-4 sm:space-y-6 lg:space-y-8 text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl pt-16 sm:pt-20 font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              कला aur साहित्य ka Sangam
            </h1>
            <div className="h-1.5 sm:h-2 w-20 sm:w-28 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mt-1 sm:mt-2 mx-auto shadow-lg shadow-purple-200"></div>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl leading-relaxed font-semibold max-w-3xl mx-auto px-2">
              Welcome to SAHITYAM 2026, where art and literature converge. Join
              us from 3rd and 4th Feb 2026 for an unforgettable celebration of
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
            <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10 justify-center">
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
        <div className="relative z-20 py-4 sm:py-6 lg:py-8">
          <div className="max-w-6xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 md:px-12 lg:px-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Meet Our Panelists
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Distinguished artists, scholars, and cultural icons who will guide
              and inspire at SAHITYAM 2026.
            </p>
          </div>
          <div className="mt-6 sm:mt-8">
            <PanelistsGrid />
          </div>
        </div>

        {/* SAHITYAM 2026 Attractions Section */}
        <div className="relative z-20 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute top-40 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/4 w-36 h-36 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-40 right-1/3 w-28 h-28 bg-pink-200/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                SAHITYAM 2026 Attractions
              </h2>
              <div className="h-1.5 sm:h-2 w-24 sm:w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mx-auto mb-4 sm:mb-6 shadow-lg shadow-purple-300/50"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2 font-medium">
                Immerse yourself in a diverse array of cultural experiences and
                creative expressions
              </p>
            </div>

            {/* Bento Grid */}
            <div className="relative">
              {/* Decorative Corner Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-4 border-t-4 border-purple-400/30 rounded-tl-2xl"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-4 border-t-4 border-pink-400/30 rounded-tr-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-4 border-b-4 border-indigo-400/30 rounded-bl-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-4 border-b-4 border-purple-400/30 rounded-br-2xl"></div>

              {/* Floating Sparkles */}
              <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              <div
                className="absolute top-1/4 right-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping opacity-75"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping opacity-75"
                style={{ animationDelay: "1.5s" }}
              ></div>

              {/* Flowing Decorative Elements in Grid Gaps */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 5 }}
              >
                {/* Flowing curved lines between cards */}
                <path
                  d="M 33% 25% Q 50% 30%, 66% 25%"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                  className="animate-pulse"
                />
                <path
                  d="M 33% 50% Q 50% 55%, 66% 50%"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                  className="animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <path
                  d="M 33% 75% Q 50% 80%, 66% 75%"
                  stroke="url(#gradient3)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                  className="animate-pulse"
                  style={{ animationDelay: "1s" }}
                />

                {/* Vertical flowing lines */}
                <path
                  d="M 33% 20% Q 35% 50%, 33% 80%"
                  stroke="url(#gradient4)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.25"
                  className="animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                />
                <path
                  d="M 66% 20% Q 64% 50%, 66% 80%"
                  stroke="url(#gradient5)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.25"
                  className="animate-pulse"
                  style={{ animationDelay: "0.8s" }}
                />

                {/* Gradient definitions */}
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient
                    id="gradient3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient
                    id="gradient4"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient
                    id="gradient5"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Decorative dots at intersections */}
                <circle
                  cx="33%"
                  cy="25%"
                  r="3"
                  fill="#a855f7"
                  opacity="0.5"
                  className="animate-pulse"
                />
                <circle
                  cx="66%"
                  cy="25%"
                  r="3"
                  fill="#ec4899"
                  opacity="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                />
                <circle
                  cx="33%"
                  cy="50%"
                  r="3"
                  fill="#6366f1"
                  opacity="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                />
                <circle
                  cx="66%"
                  cy="50%"
                  r="3"
                  fill="#a855f7"
                  opacity="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: "0.9s" }}
                />
                <circle
                  cx="33%"
                  cy="75%"
                  r="3"
                  fill="#ec4899"
                  opacity="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: "1.2s" }}
                />
                <circle
                  cx="66%"
                  cy="75%"
                  r="3"
                  fill="#6366f1"
                  opacity="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                />
              </svg>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {/* 1. Chai aur Kalam - Large Card */}
                <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-purple-200/50 hover:ring-purple-400/70">
                  <div className="relative h-64 sm:h-80 lg:h-full min-h-[400px] lg:min-h-[500px]">
                    <Image
                      src="/Chai aur Kalam.jpg"
                      alt="Chai aur Kalam - Live Library"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3">
                        चाय और कलम
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-medium">
                        A live library experience
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Digital Gyan Kosh */}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-indigo-200/50 hover:ring-indigo-400/70">
                  <div className="relative h-64 sm:h-80 lg:h-60">
                    <Image
                      src="/DigitalLibrary.avif"
                      alt="Digital Gyan Kosh - Digital Library"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                        डिजिटल ज्ञान कोष
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 font-medium">
                        Digital Library
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Mitti ki Kala */}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-pink-200/50 hover:ring-pink-400/70">
                  <div className="relative h-64 sm:h-80 lg:h-60">
                    <Image
                      src="/ClayModelling.jpg"
                      alt="Mitti ki Kala - Clay Modelling"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                        मिट्टी की कला
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 font-medium">
                        Clay Modelling
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Virasat Bazar */}
                <div className="sm:col-span-2 group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-purple-200/50 hover:ring-purple-400/70">
                  <div className="relative h-64 sm:h-72">
                    <Image
                      src="/VirasatBazar.jpg"
                      alt="Virasat Bazar"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 sm:mb-2">
                        Virasat Bazar
                      </h3>
                      <p className="text-sm sm:text-base text-gray-200 font-medium">
                        Heritage marketplace
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Author Talk Show */}
                <div className="lg:row-span-2 group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-indigo-200/50 hover:ring-indigo-400/70">
                  <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[420px]">
                    <Image
                      src="/AuthorTalkShow.jpg"
                      alt="Author Talk Show"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                        Author Talk Show
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-200 font-medium">
                        Conversations with literary minds
                      </p>
                    </div>
                  </div>
                </div>

                {/* 6. Riwayat-e-Bharat */}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-pink-200/50 hover:ring-pink-400/70">
                  <div className="relative h-64 sm:h-80 lg:h-52">
                    <Image
                      src="/Riwayat-e-Bharat.webp"
                      alt="Riwayat-e-Bharat - India's Heritage Stories"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                        Riwayat-e-Bharat
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 font-medium">
                        India's heritage stories
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7. Sufi Night */}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-purple-200/50 hover:ring-purple-400/70">
                  <div className="relative h-64 sm:h-80 lg:h-52">
                    <Image
                      src="/SufiNight.jpeg"
                      alt="Sufi Night"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                        Sufi Night
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 font-medium">
                        Mystical music evening
                      </p>
                    </div>
                  </div>
                </div>

                {/* 8. Kavi Sammelan */}
                <div className="sm:col-span-2 lg:col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-purple-200/50 hover:ring-purple-400/70 h-64 sm:h-72 lg:h-60">
                  <Image
                    src="/Kavi Sammelan.jpeg"
                    alt="Kavi Sammelan"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                      कवि सम्मेलन
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200 font-medium">
                      Poetry congregation
                    </p>
                  </div>
                </div>

                {/* 9. Swar Sangam */}
                <div className="sm:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ring-2 ring-indigo-200/50 hover:ring-indigo-400/70">
                  <div className="relative h-64 sm:h-72">
                    <Image
                      src="/SwarSangam.jpeg"
                      alt="Swar Sangam - Live Jamming"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 sm:mb-2">
                        स्वर संगम
                      </h3>
                      <p className="text-sm sm:text-base text-gray-200 font-medium">
                        Live Jamming Sessions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organised and Managed By Section */}
        <div className="relative z-20 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-6 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-2 sm:mb-3 p-1 sm:p-2">
                Organised and Managed by
              </h2>
              <div className="h-1 sm:h-1.5 md:h-2 w-20 sm:w-24 md:w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg shadow-purple-200"></div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto font-medium px-2">
                Bringing SAHITYAM 2026 to life with dedication and passion
              </p>
            </div>

            {/* Mind Benders Card */}
            <div className="relative group">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 sm:-inset-2 md:-inset-4 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl md:rounded-3xl blur-lg sm:blur-xl md:blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

              <div className="relative bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-purple-100 ring-1 ring-purple-200/50 hover:shadow-purple-200 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-6">
                  {/* Club Logo */}
                  <div className="w-48 h-32 sm:w-56 sm:h-36 md:w-64 md:h-40 lg:w-72 lg:h-44 relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-purple-300/50 group-hover:shadow-xl group-hover:shadow-purple-400/60 transition-all duration-300 ring-2 ring-purple-200/50 bg-white">
                    <Image
                      src="/mindbenders.jpg"
                      alt="Mind Benders Club Logo"
                      fill
                      className="object-contain p-3 sm:p-4"
                      priority
                    />
                  </div>

                  {/* Club Name */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-1.5 md:mb-2">
                      Mind Benders
                    </h3>
                    <div className="h-0.5 sm:h-0.5 md:h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mx-auto mb-2 sm:mb-3 md:mb-4 shadow-md shadow-purple-200"></div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-medium px-2">
                    Mind Benders Club, the Literary & Creative Society of CGC
                    University, Mohali, is dedicated to fostering intellectual
                    excellence, creative expression, and confident communication
                    among students. The club actively promotes debate, creative
                    writing, poetry, public speaking, theatre, and quizzes,
                    offering a refined platform for young minds to explore ideas
                    and sharpen perspectives. With a strong focus on leadership
                    and innovation, Mind Benders continues to nurture future
                    thinkers and performers—as proudly showcased through its
                    contributions to SAHITYAM.
                  </p>

                  {/* Stats/Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full max-w-3xl mt-4 sm:mt-6 md:mt-8">
                    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-200 shadow-md shadow-purple-100/50">
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-0.5 sm:mb-1 md:mb-2">
                        5+
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-700 font-semibold">
                        Years of Excellence
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-200 shadow-md shadow-purple-100/50">
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-0.5 sm:mb-1 md:mb-2">
                        100+
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-700 font-semibold">
                        Events Organized
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-200 shadow-md shadow-purple-100/50">
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-0.5 sm:mb-1 md:mb-2">
                        3000+
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-700 font-semibold">
                        Participants Reached
                      </div>
                    </div>
                  </div>

                  {/* Contact Officials */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mt-6 sm:mt-8">
                    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-5 border border-purple-200 shadow-md">
                      <h4 className="text-sm sm:text-base font-bold text-purple-900 mb-2">
                        Manager, DSA
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">
                        Ms. Manbir Kaur Brar
                      </p>
                      <p className="text-xs text-gray-600 mb-0.5">
                        📞 +91-98550 81229
                      </p>
                      <p className="text-xs text-gray-600">
                        ✉️ Manbir.j1082@cgcuniversity.in
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-5 border border-purple-200 shadow-md">
                      <h4 className="text-sm sm:text-base font-bold text-purple-900 mb-2">
                        President, Mind Benders Club
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">
                        Diwansh
                      </p>
                      <p className="text-xs text-gray-600 mb-0.5">
                        📞 +91-7681951539
                      </p>
                      <p className="text-xs text-gray-600">
                        ✉️ Sohaldiwansh01@gmail.com
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-5 border border-purple-200 shadow-md">
                      <h4 className="text-sm sm:text-base font-bold text-purple-900 mb-2">
                        Librarian
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">
                        Dr. Shivani Kaushal
                      </p>
                      <p className="text-xs text-gray-600 mb-0.5">
                        📞 +91-99143 21507
                      </p>
                      <p className="text-xs text-gray-600">
                        ✉️ Librarian@cgcuniversity.in
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex gap-1 sm:gap-1.5 md:gap-2 mt-3 sm:mt-4 md:mt-6">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-6 sm:mt-8 md:mt-12">
              <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm italic px-2">
                "Creativity knows no bounds when minds come together"
              </p>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="relative z-20 py-6 sm:py-8 lg:py-10">
          <SponsorScroll />
        </div>
      </div>
      <Footer />
    </HomeClient>
  );
}
