"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundElements from "@/components/ui/BackgroundElements";

interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  venue: string;
  category: "cultural" | "literary" | "workshop" | "competition";
  facultyJudges?: string;
  duration?: string;
}

const scheduleData: { [key: string]: TimelineEvent[] } = {
  "Day 1 - February 3rd": [
    // Block-7 Seminar Hall Events
    {
      id: 1,
      time: "10:15 AM - 11:15 AM",
      title: "Debate",
      description: "Engage in thought-provoking debates",
      venue: "Block-7 Seminar Hall",
      category: "competition",
      facultyJudges: "Dr. Mehak",
      duration: "1 hour",
    },
    // Budha Ground Events (starting at 11:00)
    {
      id: 2,
      time: "11:00 AM - 1:00 PM",
      title: "Poster Making",
      description: "Express creativity through poster art",
      venue: "Budha Ground",
      category: "competition",
      facultyJudges: "Ms. Sonam Nagpal, Mr. Sandeep Kumar",
      duration: "2 hours",
    },
    {
      id: 3,
      time: "11:00 AM - 1:00 PM",
      title: "Live Canvas",
      description: "Create art on live canvas",
      venue: "Budha Ground",
      category: "cultural",
      facultyJudges: "Ms. Sonam Nagpal, Mr. Sandeep Kumar",
      duration: "2 hours",
    },
    {
      id: 4,
      time: "11:00 AM - 2:00 PM",
      title: "Open Mic",
      description: "Express yourself on stage",
      venue: "Budha Ground",
      category: "cultural",
      facultyJudges: "Dr. Shivani Kaushal, Ms. Manbir Kaur Brar, Mr. Abrar",
      duration: "1 hour",
    },
    {
      id: 5,
      time: "11:30 AM - 12:10 PM",
      title: "Story Telling Session (English)",
      description: "Captivating stories in English",
      venue: "Block-7 Seminar Hall",
      category: "literary",
      facultyJudges: "Dr. Mehak, Ms. Pushpinder Kaur",
      duration: "40 min",
    },
    {
      id: 6,
      time: "12:30 PM - 1:00 PM",
      title: "Best Budding Author",
      description: "Recognizing emerging literary talent",
      venue: "Block-7 Seminar Hall",
      category: "literary",
      facultyJudges: "Ms. Pushpinder Kaur",
      duration: "30 min",
    },
    {
      id: 7,
      time: "1:00 PM - 2:00 PM",
      title: "Lunch Break",
      description: "Break for refreshments",
      venue: "Block-7 Seminar Hall",
      category: "cultural",
      duration: "1 hour",
    },
    {
      id: 8,
      time: "2:00 PM - 2:30 PM",
      title: "Author Talk Show",
      description: "Interactive session with renowned authors",
      venue: "Block-7 Seminar Hall",
      category: "literary",
      facultyJudges: "Ms. Pushpinder Kaur, Mr. Jatinder Kaur",
      duration: "30 min",
    },
    {
      id: 9,
      time: "2:00 PM - 2:50 PM",
      title: "Story Telling Session (Punjabi)",
      description: "Captivating stories in Punjabi",
      venue: "Block-7 Seminar Hall",
      category: "literary",
      facultyJudges: "Ms. Pushpinder Kaur",
      duration: "50 min",
    },
    {
      id: 10,
      time: "2:30 PM - 4:00 PM",
      title: "Photography/Videography",
      description: "Showcase your visual storytelling skills",
      venue: "Budha Ground",
      category: "competition",
      facultyJudges: "Ms. Sonam Nagpal, Mr. Sandeep Kumar",
      duration: "1 hour 30 min",
    },
    {
      id: 11,
      time: "4:00 PM - 5:00 PM",
      title: "Birha Da Sultan Shiv Kumar Batalvi",
      description: "Tribute to the legendary Punjabi poet",
      venue: "Block-7 Seminar Hall",
      category: "literary",
      facultyJudges: "Punjabi Panelists",
      duration: "1 hour",
    },
  ],
  "Day 2 - February 4th": [
    // Moot Court Block-4 (whole day event) - at the top
    {
      id: 13,
      time: "Whole Day",
      title: "Youth Parliament",
      description: "Parliamentary session and deliberations",
      venue: "Moot Court (Block-4)",
      category: "literary",
      facultyJudges: "Dr. Divya Deshmukh, Mr. Bineet Singh",
      duration: "Whole Day",
    },
    // Happiness Centre Block-3
    {
      id: 14,
      time: "10:30 AM - 12:00 PM",
      title: "Literature Based Quiz",
      description: "Test your literary knowledge",
      venue: "Happiness Centre Block-3",
      category: "competition",
      facultyJudges: "Dr. Preetinder Kaur",
      duration: "1 hour 30 min",
    },
    // Block 3 & 4 Stage Events
    {
      id: 15,
      time: "11:00 AM - 12:00 PM",
      title: "Group Traditional Dances",
      description: "Celebrate culture through group dance performances",
      venue: "Block 3 & 4 Stage",
      category: "cultural",
      facultyJudges: "Dr. Shivani Kaushal, Ms. Manbir Kaur Brar, Mr. Abrar",
      duration: "1 hour",
    },
    // Budha Ground Events
    {
      id: 16,
      time: "11:00 AM - 1:00 PM",
      title: "Face Painting",
      description: "Express creativity through face art",
      venue: "Budha Ground",
      category: "cultural",
      facultyJudges: "Ms. Sonam Nagpal, Mr. Sandeep Kumar",
      duration: "1 hour 30 min",
    },
    {
      id: 17,
      time: "11:00 AM - 12:00 PM",
      title: "Workshop on Live Canvas",
      description: "Learn live canvas painting techniques",
      venue: "Budha Ground",
      category: "workshop",
      facultyJudges: "Mr. Sandeep Kumar",
      duration: "1 hour",
    },
    // Block 3 & 4 Stage (continued)
    {
      id: 18,
      time: "12:15 PM - 1:30 PM",
      title: "Solo Traditional Dances",
      description: "Individual traditional dance performances",
      venue: "Block 3 & 4 Stage",
      category: "cultural",
      facultyJudges: "Dr. Shivani Kaushal, Ms. Manbir Kaur Brar, Mr. Abrar",
      duration: "1 hour",
    },
    // Budha Ground (afternoon)
    {
      id: 19,
      time: "2:30 PM - 3:30 PM",
      title: "Workshop on Clay Modelling/Pottery",
      description: "Hands-on clay modelling and pottery workshop",
      venue: "Budha Ground",
      category: "workshop",
      facultyJudges: "Mr. Sandeep Kumar",
      duration: "1 hour",
    },
  ],
};

// Main Attractions - Featured at the top of each day
interface MainAttraction {
  title: string;
  emoji: string;
  description: string;
  time: string;
  venue: string;
  artistName: string;
  artistImage: string;
  artistInstagram: string;
}

const mainAttractions: { [key: string]: MainAttraction } = {
  "Day 1 - February 3rd": {
    title: "Star Night",
    emoji: "⭐",
    description: "The main attraction of Day 1 - An electrifying performance by the renowned Punjabi singer",
    time: "7:00 PM",
    venue: "Main Stage",
    artistName: "Afsana Khan",
    artistImage: "/AfsanaKhan.jpeg",
    artistInstagram: "https://www.instagram.com/itsafsanakhan/",
  },
  "Day 2 - February 4th": {
    title: "Sufi Night",
    emoji: "🎵",
    description: "The main attraction of Day 2 - A soulful evening of Sufi music",
    time: "7:00 PM",
    venue: "Main Stage",
    artistName: "Aadi",
    artistImage: "/Aadi.png",
    artistInstagram: "https://www.instagram.com/i_aadiofficial/",
  },
};

const categoryColors = {
  cultural: "from-pink-500 via-purple-600 to-indigo-600",
  literary: "from-pink-500 via-purple-600 to-indigo-600",
  workshop: "from-yellow-500 to-amber-500",
  competition: "from-pink-500 via-purple-600 to-indigo-600",
};

function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Day 1 - February 3rd");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <BackgroundElements />
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Animated gradient background */}

        {/* Content */}
        <div className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12 mt-8 sm:mt-10 md:mt-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 sm:mb-3 md:mb-4">
                Event Schedule
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
                3rd and 4th Feb, 2026
              </p>
            </div>

            {/* Day Selector */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
              {Object.keys(scheduleData).map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 will-change-transform ${selectedDay === day
                    ? "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/40"
                    : "bg-white/90 text-gray-900 hover:bg-white border-2 border-purple-200"
                    }`}
                  style={{
                    animation: `fade-in 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Main Attraction Section */}
            {mainAttractions[selectedDay] && (
              <div className="mb-8 sm:mb-12 md:mb-16">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    ✨ Main Attraction ✨
                  </h2>
                </div>
                {/* Constrained width on mobile */}
                <div className="max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
                  <div className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-[2px] rounded-2xl shadow-lg shadow-purple-500/20">
                    <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl p-5 sm:p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        {/* Artist Image */}
                        <div className="relative flex-shrink-0">
                          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-[3px] border-white shadow-lg shadow-purple-500/30">
                            <img
                              src={mainAttractions[selectedDay].artistImage}
                              alt={mainAttractions[selectedDay].artistName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-lg sm:text-xl">{mainAttractions[selectedDay].emoji}</span>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-2xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2">
                            {mainAttractions[selectedDay].emoji} {mainAttractions[selectedDay].title}
                          </h3>

                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-bold">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {mainAttractions[selectedDay].time}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500 text-sm">
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {mainAttractions[selectedDay].venue}
                            </span>
                          </div>

                          {/* Artist info */}
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm text-gray-500">Featuring:</span>
                              <span className="text-lg font-black bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                {mainAttractions[selectedDay].artistName}
                              </span>
                            </div>
                            <a
                              href={mainAttractions[selectedDay].artistInstagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                              Instagram
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Timeline Header */}
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                📅 Event Schedule
              </h2>
            </div>

            {/* Timeline */}
            <div className="max-w-6xl mx-auto px-2 sm:px-4">
              <div className="relative pb-12 sm:pb-16 md:pb-20">
                {/* Vertical line - centered on desktop, left on mobile */}
                <div className="absolute left-6 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-pink-500 via-purple-600 to-indigo-600"></div>

                {/* Timeline events */}
                <div className="relative">
                  {scheduleData[selectedDay].map((event, index) => (
                    <div
                      key={event.id}
                      className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16"
                      style={{
                        opacity: 0,
                        animation: `fade-in 0.8s ease-out ${index * 0.2
                          }s forwards`,
                      }}
                    >
                      {/* Timeline dot - left on mobile, centered on desktop */}
                      <div className="absolute left-6 sm:left-8 md:left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 top-4 sm:top-6 md:top-12 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-lg z-10 border-2 sm:border-3 md:border-4 border-purple-50">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 animate-ping opacity-75"></div>
                      </div>

                      {/* Event card - single column on mobile, alternating on desktop */}
                      <div
                        className={`ml-14 sm:ml-16 md:ml-0 ${index % 2 === 0
                          ? "md:mr-auto md:pr-[calc(50%+2rem)] md:text-right"
                          : "md:ml-auto md:pl-[calc(50%+2rem)] md:text-left"
                          }`}
                      >
                        <div
                          className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative will-change-transform ${index % 2 === 0
                            ? "bg-gradient-to-br from-white/98 to-purple-50/95 border-2 border-purple-300/60 md:border-purple-200/50"
                            : "bg-gradient-to-br from-white/98 to-pink-50/95 border-2 border-pink-300/60 md:border-purple-200/50"
                            } ${index % 2 === 0 ? "slide-in-left" : "slide-in-right"
                            }`}
                          style={{
                            animation:
                              index % 2 === 0
                                ? `slideInLeft 0.8s ease-out ${index * 0.2
                                }s forwards`
                                : `slideInRight 0.8s ease-out ${index * 0.2
                                }s forwards`,
                          }}
                        >
                          {/* Color bar indicator */}
                          <div
                            className={`absolute ${index % 2 === 0
                              ? "md:right-0 left-0 md:rounded-l-full rounded-r-full"
                              : "left-0 rounded-r-full"
                              } top-1/2 -translate-y-1/2 h-8 sm:h-10 md:h-12 lg:h-16 w-1 sm:w-1.5 md:w-2 ${index % 2 === 0
                                ? "bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-600"
                                : "bg-gradient-to-b from-pink-500 via-pink-600 to-rose-600"
                              }`}
                          ></div>

                          {/* Time badge */}
                          <div
                            className={`flex ${index % 2 === 0
                              ? "justify-start md:justify-end"
                              : "justify-start"
                              } mb-2 sm:mb-3 md:mb-4`}
                          >
                            <div
                              className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-white shadow-lg ${index % 2 === 0
                                ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                                : "bg-gradient-to-r from-pink-500 to-rose-600"
                                }`}
                            >
                              <svg
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
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
                              <span className="text-sm sm:text-base md:text-lg font-black">
                                {event.time}
                              </span>
                            </div>
                          </div>

                          {/* Category badge */}
                          <div
                            className={`flex ${index % 2 === 0
                              ? "justify-start md:justify-end"
                              : "justify-start"
                              } mb-2 sm:mb-2.5 md:mb-3`}
                          >
                            <span
                              className={`px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 text-[10px] sm:text-xs font-bold uppercase rounded-full text-white shadow-md ${index % 2 === 0
                                ? "bg-gradient-to-r from-purple-600 to-indigo-700"
                                : "bg-gradient-to-r from-pink-600 to-rose-700"
                                }`}
                            >
                              {event.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className={`text-lg sm:text-xl md:text-2xl font-black mb-1.5 sm:mb-2 md:mb-3 ${index % 2 === 0
                              ? "text-left md:text-right text-gray-900"
                              : "text-left text-gray-900"
                              }`}
                          >
                            {event.title}
                          </h3>

                          {/* Description */}
                          <p
                            className={`text-xs sm:text-sm md:text-base text-gray-700 mb-2 sm:mb-3 md:mb-4 leading-relaxed ${index % 2 === 0
                              ? "text-left md:text-right"
                              : "text-left"
                              }`}
                          >
                            {event.description}
                          </p>

                          {/* Venue */}
                          <div
                            className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-gray-600 font-medium ${index % 2 === 0
                              ? "justify-start md:justify-end"
                              : "justify-start"
                              }`}
                          >
                            <svg
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${index % 2 === 0
                                ? "text-purple-600"
                                : "text-pink-600"
                                }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span className="font-bold">{event.venue}</span>
                          </div>

                          {/* Faculty & Judges */}
                          {event.facultyJudges && (
                            <div
                              className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-gray-600 font-medium mt-2 ${index % 2 === 0
                                ? "justify-start md:justify-end"
                                : "justify-start"
                                }`}
                            >
                              <svg
                                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${index % 2 === 0
                                  ? "text-purple-600"
                                  : "text-pink-600"
                                  }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              <span className="font-medium">Faculty/Judge: {event.facultyJudges}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative pattern overlay */}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-40 w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 rounded-full shadow-xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 text-white transform group-hover:-translate-y-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <Footer />
    </>
  );
}

export default Schedule;
