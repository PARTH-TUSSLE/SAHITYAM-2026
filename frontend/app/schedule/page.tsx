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
      time: "09:00 AM",
      title: "Opening Ceremony",
      description:
        "Grand inauguration of SAHITYAM 2026 with cultural performances",
      venue: "Main Auditorium",
      category: "cultural",
    },
    {
      id: 2,
      time: "11:00 AM",
      title: "Poetry Recitation",
      description:
        "Express your thoughts through poetry in Hindi, English, and regional languages",
      venue: "Hall A",
      category: "literary",
    },
    {
      id: 3,
      time: "02:00 PM",
      title: "Creative Writing Workshop",
      description: "Learn the art of storytelling from renowned authors",
      venue: "Conference Room 1",
      category: "workshop",
    },
    {
      id: 4,
      time: "04:30 PM",
      title: "Classical Dance Performance",
      description:
        "Mesmerizing performances of Bharatanatyam, Kathak, and Odissi",
      venue: "Open Air Theatre",
      category: "cultural",
    },
  ],
  "Day 2 - February 6th": [
    {
      id: 5,
      time: "10:00 AM",
      title: "Debate Competition",
      description: "Engage in intellectual discussions on contemporary topics",
      venue: "Debate Hall",
      category: "competition",
    },
    {
      id: 6,
      time: "12:00 PM",
      title: "Art Exhibition",
      description: "Showcase of paintings, sculptures, and digital art",
      venue: "Gallery Wing",
      category: "cultural",
    },
    {
      id: 7,
      time: "02:30 PM",
      title: "Short Story Competition",
      description: "Craft compelling narratives within word limits",
      venue: "Hall B",
      category: "competition",
    },
    {
      id: 8,
      time: "05:00 PM",
      title: "Musical Evening",
      description: "Classical and fusion music performances",
      venue: "Main Stage",
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
        <div className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Event Schedule
              </h1>
              <p className="text-lg md:text-xl text-gray-700 font-medium">
                5th - 6th Feb, 2026
              </p>
            </div>

            {/* Day Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.keys(scheduleData).map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
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
            <div className="max-w-6xl mx-auto px-4">
              <div className="relative pb-20">
                {/* Vertical line - centered on desktop, left on mobile */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-600 to-indigo-600"></div>

                {/* Timeline events */}
                <div className="relative">
                  {scheduleData[selectedDay].map((event, index) => (
                    <div
                      key={event.id}
                      className="relative mb-12 md:mb-16"
                      style={{
                        opacity: 0,
                        animation: `fade-in 0.8s ease-out ${
                          index * 0.2
                        }s forwards`,
                      }}
                    >
                      {/* Timeline dot - left on mobile, centered on desktop */}
                      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 top-6 md:top-12 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-lg z-10 border-4 border-purple-50">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 animate-ping opacity-75"></div>
                      </div>

                      {/* Event card - single column on mobile, alternating on desktop */}
                      <div
                        className={`ml-20 md:ml-0 ${
                          index % 2 === 0
                            ? "md:mr-auto md:pr-[calc(50%+2rem)] md:text-right"
                            : "md:ml-auto md:pl-[calc(50%+2rem)] md:text-left"
                        }`}
                      >
                        <div
                          className={`bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-purple-200/50 relative ${
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
                            } top-1/2 -translate-y-1/2 h-12 md:h-16 w-2 bg-gradient-to-b ${
                              categoryColors[event.category]
                            }`}
                          ></div>

                          {/* Time badge */}
                          <div
                            className={`flex ${
                              index % 2 === 0
                                ? "justify-start md:justify-end"
                                : "justify-start"
                            } mb-3 md:mb-4`}
                          >
                            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-500 text-white shadow-lg">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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
                              <span className="text-base md:text-lg font-black">
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
                            } mb-2 md:mb-3`}
                          >
                            <span
                              className={`px-3 md:px-4 py-1 md:py-1.5 text-xs font-bold uppercase rounded-full bg-gradient-to-r ${
                                categoryColors[event.category]
                              } text-white shadow-md`}
                            >
                              {event.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className={`text-xl md:text-2xl font-black text-gray-900 mb-2 md:mb-3 ${
                              index % 2 === 0
                                ? "text-left md:text-right"
                                : "text-left"
                            }`}
                          >
                            {event.title}
                          </h3>

                          {/* Description */}
                          <p
                            className={`text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed ${
                              index % 2 === 0
                                ? "text-left md:text-right"
                                : "text-left"
                            }`}
                          >
                            {event.description}
                          </p>

                          {/* Venue */}
                          <div
                            className={`flex items-center gap-2 text-xs md:text-sm text-gray-600 font-medium ${
                              index % 2 === 0
                                ? "justify-start md:justify-end"
                                : "justify-start"
                            }`}
                          >
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5 text-purple-500"
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
