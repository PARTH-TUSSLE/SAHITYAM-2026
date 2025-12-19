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
    "Welcome to SAHITYAM 2026, where art and literature converge. Join us on 3rd Feb 2026 for an unforgettable celebration of creativity at Mind Benders.",
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
      "Join us on 3rd Feb 2026 for an unforgettable celebration of creativity.",
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
              us on 3rd Feb 2026 for an unforgettable celebration of creativity.
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

            {/* Grid Layout */}
            <div className="grid grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {/* Top Row: 3 Cards */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ring-2 ring-purple-200/50 hover:ring-purple-400/70 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/Chai aur Kalam.jpg"
                    alt="Chai aur Kalam - Live Library"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                      चाय और कलम
                    </h3>
                    <p className="text-sm text-gray-200 font-medium">
                      Live Library
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ring-2 ring-indigo-200/50 hover:ring-indigo-400/70 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/DigitalLibrary.avif"
                    alt="Digital Gyan Kosh - Digital Library"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                      डिजिटल ज्ञान कोष
                    </h3>
                    <p className="text-sm text-gray-200 font-medium">
                      Digital Library
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ring-2 ring-pink-200/50 hover:ring-pink-400/70 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/ClayModelling.jpg"
                    alt="Mitti ki Kala - Clay Modelling"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                      मिट्टी की कला
                    </h3>
                    <p className="text-sm text-gray-200 font-medium">
                      Clay Modelling
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle Row: Left Card, Sufi Night (Centered), Right Card */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ring-2 ring-indigo-200/50 hover:ring-indigo-400/70 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/AuthorTalkShow.jpg"
                    alt="Author Talk Show"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                      Author Talk Show
                    </h3>
                    <p className="text-sm text-gray-200 font-medium">
                      Literary Conversations
                    </p>
                  </div>
                </div>
              </div>

              {/* Sufi Night: Centered, Big Square */}
              <div className="col-span-3 row-span-3 group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] ring-4 ring-purple-400/60 hover:ring-purple-500 aspect-square">
                <div className="relative w-full h-full bg-gradient-to-br from-purple-950 via-indigo-950 to-black">
                  <Image
                    src="/ArmaanMalik.jpeg"
                    alt="Sufi Night - Mystical Music Evening"
                    fill
                    className="object-cover blur-[8px] opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16">
                    <h3 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 lg:mb-8 text-center drop-shadow-2xl tracking-tight">
                      Sufi Night
                    </h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-100 font-bold text-center drop-shadow-xl mb-6 sm:mb-8 lg:mb-10">
                      Mystical Music Evening
                    </p>
                    <div className="text-7xl sm:text-8xl lg:text-9xl animate-pulse mb-6 sm:mb-8 lg:mb-10">
                      🎵
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-yellow-300 font-semibold text-center drop-shadow-lg animate-pulse">
                      ⭐ Star to be revealed on 3rd Feb ⭐
                    </p>
                  </div>
                </div>
              </div>

              {/* Riwayat-e-Bharat: Right Card */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ring-2 ring-pink-200/50 hover:ring-pink-400/70 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/Riwayat-e-Bharat.webp"
                    alt="Riwayat-e-Bharat - India's Heritage Stories"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                      Riwayat-e-Bharat
                    </h3>
                    <p className="text-sm text-gray-200 font-medium">
                      Heritage Stories
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Row: 3 Cards */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ring-2 ring-purple-200/50 hover:ring-purple-400/70 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/Kavi Sammelan.jpeg"
                    alt="Kavi Sammelan"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                      कवि सम्मेलन
                    </h3>
                    <p className="text-sm text-gray-200 font-medium">
                      Poetry Congregation
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ring-2 ring-indigo-200/50 hover:ring-indigo-400/70 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/SwarSangam.jpeg"
                    alt="Swar Sangam - Live Jamming"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                      स्वर संगम
                    </h3>
                    <p className="text-sm text-gray-200 font-medium">
                      Live Jamming Sessions
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ring-2 ring-purple-200/50 hover:ring-purple-400/70 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/VirasatBazar.jpg"
                    alt="Virasat Bazar"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                      Virasat Bazar
                    </h3>
                    <p className="text-sm text-gray-200 font-medium">
                      Heritage Marketplace
                    </p>
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
