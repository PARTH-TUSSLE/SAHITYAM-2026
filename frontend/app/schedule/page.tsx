"use client";

import React, { useState } from "react";
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
}

const scheduleData: { [key: string]: TimelineEvent[] } = {
  "Day 1 - February 5th": [
    {
      id: 1,
      time: "10:00 AM",
      title: "Opening of Youth Parliament",
      description: "Inauguration of Youth Parliament session",
      venue: "Block-4 Convention Hall",
      category: "literary",
    },
    {
      id: 2,
      time: "11:00 AM",
      title: "Youth Parliament Session Start",
      description: "Parliamentary proceedings begin",
      venue: "Moot Court Block 4",
      category: "literary",
    },
    {
      id: 3,
      time: "11:30 AM",
      title: "Launching / Inauguration of Sahityam 2026",
      description: "Grand inauguration ceremony",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 4,
      time: "11:30 AM",
      title: "Book Signing",
      description: "Meet authors and get your books signed",
      venue: "Block-4, 2nd Gate Passage",
      category: "literary",
    },
    {
      id: 5,
      time: "11:30 AM",
      title: "Poster Making and Face Painting",
      description: "Creative activities for all",
      venue: "Buddha Ground",
      category: "cultural",
    },
    {
      id: 6,
      time: "11:30 AM",
      title: "Open Mic",
      description: "Express yourself on stage",
      venue: "Main Stage (Buddha Ground)",
      category: "cultural",
    },
    {
      id: 7,
      time: "11:45 AM",
      title: "Welcoming Guest 1 on Stage",
      description: "Guest 1 speech and address",
      venue: "Block 2 Auditorium",
      category: "literary",
    },
    {
      id: 8,
      time: "12:45 PM",
      title: "Honour to Guest 1",
      description: "Felicitation ceremony",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 9,
      time: "01:00 PM - 01:45 PM",
      title: "Lunch",
      description: "Break for lunch",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 10,
      time: "01:45 PM",
      title: "Arrival and Welcoming of Guest 2 (Anu Kapoor)",
      description: "Welcome ceremony for renowned artist Anu Kapoor",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 11,
      time: "02:00 PM",
      title: "Author Talk Show",
      description: "Interactive session with authors",
      venue: "Convention Hall Block-4",
      category: "literary",
    },
    {
      id: 12,
      time: "02:00 PM",
      title: "Poetry",
      description: "Poetic expressions and recitations",
      venue: "Main Stage (Buddha Ground)",
      category: "literary",
    },
    {
      id: 13,
      time: "03:00 PM",
      title: "Honouring of Guest 2 (Anu Kapoor)",
      description: "Felicitation of Guest 2",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 14,
      time: "03:00 PM",
      title: "Solo Dance",
      description: "Individual dance performances",
      venue: "Main Stage (Buddha Ground)",
      category: "cultural",
    },
    {
      id: 15,
      time: "03:30 PM",
      title: "Arrival and Welcoming of Guest 3 (Yashpal Sharma)",
      description: "Welcome ceremony for acclaimed actor Yashpal Sharma",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 16,
      time: "04:00 PM",
      title: "Crew Dance",
      description: "Group dance performances",
      venue: "Main Stage (Buddha Ground)",
      category: "cultural",
    },
    {
      id: 17,
      time: "04:45 PM",
      title: "Honouring of Guest 3 (Yashpal Sharma)",
      description: "Felicitation of Guest 3",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 18,
      time: "05:00 PM - 07:00 PM",
      title: "कवि सम्मेलन",
      description: "Poetic gathering and recitations",
      venue: "Block 2 Auditorium",
      category: "literary",
    },
  ],
  "Day 2 - February 6th": [
    {
      id: 19,
      time: "11:30 AM",
      title: "Arrival and Welcome of Guest 4 (Imtiaz Ali)",
      description: "Welcome ceremony for renowned director Imtiaz Ali",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 20,
      time: "11:30 AM",
      title: "Literature Quiz",
      description: "Test your literary knowledge",
      venue: "Convention Hall",
      category: "competition",
    },
    {
      id: 21,
      time: "12:00 PM",
      title: "Fashion Show",
      description: "Showcase of style and creativity",
      venue: "Main Stage Buddha Ground",
      category: "cultural",
    },
    {
      id: 22,
      time: "12:30 PM",
      title: "Honouring of Guest 4 (Imtiaz Ali)",
      description: "Felicitation ceremony",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 23,
      time: "12:30 PM - 01:30 PM",
      title: "Lunch",
      description: "Break for lunch",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 24,
      time: "01:30 PM - 03:00 PM",
      title: "Panel Discussion",
      description: "Insightful discussion with experts",
      venue: "Block 2 Auditorium",
      category: "literary",
    },
    {
      id: 25,
      time: "03:00 PM",
      title: "Chief Guest Speech + Valedictory",
      description: "Concluding speech by Chief Guest",
      venue: "Block 2 Auditorium",
      category: "literary",
    },
    {
      id: 26,
      time: "03:30 PM",
      title: "Prize Distribution",
      description: "Awards and recognition ceremony",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 27,
      time: "04:30 PM",
      title: "Honouring to Chief Guest",
      description: "Felicitation of Chief Guest",
      venue: "Block 2 Auditorium",
      category: "cultural",
    },
    {
      id: 28,
      time: "07:30 PM",
      title: "Sufi Night",
      description: "Evening of soulful Sufi music",
      venue: "Buddha Ground",
      category: "cultural",
    },
  ],
};

const categoryColors = {
  cultural: "from-pink-500 via-purple-600 to-indigo-600",
  literary: "from-pink-500 via-purple-600 to-indigo-600",
  workshop: "from-yellow-500 to-amber-500",
  competition: "from-pink-500 via-purple-600 to-indigo-600",
};

function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Day 1 - February 5th");

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
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 sm:mb-3 md:mb-4">
                Event Schedule
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
                5th - 6th Feb, 2026
              </p>
            </div>

            {/* Day Selector */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
              {Object.keys(scheduleData).map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedDay === day
                      ? "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/40"
                      : "bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white border-2 border-purple-200"
                  }`}
                  style={{
                    animation: `fade-in 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {day}
                </button>
              ))}
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
                        animation: `fade-in 0.8s ease-out ${
                          index * 0.2
                        }s forwards`,
                      }}
                    >
                      {/* Timeline dot - left on mobile, centered on desktop */}
                      <div className="absolute left-6 sm:left-8 md:left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 top-4 sm:top-6 md:top-12 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-lg z-10 border-2 sm:border-3 md:border-4 border-purple-50">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 animate-ping opacity-75"></div>
                      </div>

                      {/* Event card - single column on mobile, alternating on desktop */}
                      <div
                        className={`ml-14 sm:ml-16 md:ml-0 ${
                          index % 2 === 0
                            ? "md:mr-auto md:pr-[calc(50%+2rem)] md:text-right"
                            : "md:ml-auto md:pl-[calc(50%+2rem)] md:text-left"
                        }`}
                      >
                        <div
                          className={`backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative ${
                            index % 2 === 0
                              ? "bg-gradient-to-br from-white/95 to-purple-50/90 border-2 border-purple-300/60 md:border-purple-200/50"
                              : "bg-gradient-to-br from-white/95 to-pink-50/90 border-2 border-pink-300/60 md:border-purple-200/50"
                          } ${
                            index % 2 === 0 ? "slide-in-left" : "slide-in-right"
                          }`}
                          style={{
                            animation:
                              index % 2 === 0
                                ? `slideInLeft 0.8s ease-out ${
                                    index * 0.2
                                  }s forwards`
                                : `slideInRight 0.8s ease-out ${
                                    index * 0.2
                                  }s forwards`,
                          }}
                        >
                          {/* Color bar indicator */}
                          <div
                            className={`absolute ${
                              index % 2 === 0
                                ? "md:right-0 left-0 md:rounded-l-full rounded-r-full"
                                : "left-0 rounded-r-full"
                            } top-1/2 -translate-y-1/2 h-8 sm:h-10 md:h-12 lg:h-16 w-1 sm:w-1.5 md:w-2 ${
                              index % 2 === 0
                                ? "bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-600"
                                : "bg-gradient-to-b from-pink-500 via-pink-600 to-rose-600"
                            }`}
                          ></div>

                          {/* Time badge */}
                          <div
                            className={`flex ${
                              index % 2 === 0
                                ? "justify-start md:justify-end"
                                : "justify-start"
                            } mb-2 sm:mb-3 md:mb-4`}
                          >
                            <div
                              className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-white shadow-lg ${
                                index % 2 === 0
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
                            className={`flex ${
                              index % 2 === 0
                                ? "justify-start md:justify-end"
                                : "justify-start"
                            } mb-2 sm:mb-2.5 md:mb-3`}
                          >
                            <span
                              className={`px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 text-[10px] sm:text-xs font-bold uppercase rounded-full text-white shadow-md ${
                                index % 2 === 0
                                  ? "bg-gradient-to-r from-purple-600 to-indigo-700"
                                  : "bg-gradient-to-r from-pink-600 to-rose-700"
                              }`}
                            >
                              {event.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className={`text-lg sm:text-xl md:text-2xl font-black mb-1.5 sm:mb-2 md:mb-3 ${
                              index % 2 === 0
                                ? "text-left md:text-right text-gray-900"
                                : "text-left text-gray-900"
                            }`}
                          >
                            {event.title}
                          </h3>

                          {/* Description */}
                          <p
                            className={`text-xs sm:text-sm md:text-base text-gray-700 mb-2 sm:mb-3 md:mb-4 leading-relaxed ${
                              index % 2 === 0
                                ? "text-left md:text-right"
                                : "text-left"
                            }`}
                          >
                            {event.description}
                          </p>

                          {/* Venue */}
                          <div
                            className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-gray-600 font-medium ${
                              index % 2 === 0
                                ? "justify-start md:justify-end"
                                : "justify-start"
                            }`}
                          >
                            <svg
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                                index % 2 === 0
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
      <Footer />
    </>
  );
}

export default Schedule;
