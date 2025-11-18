"use client";

import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { name: "Events", href: "#events" },
    { name: "Schedule", href: "#schedule" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-400/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-red-600">
              SAHITYAM 2026
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-6 py-2 text-gray-700 font-medium text-base transition-colors duration-300 hover:text-gray-900 group"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Hover underline */}
                <div
                  className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 ${
                    hoveredItem === item.name
                      ? "w-3/4 -translate-x-1/2"
                      : "w-0 -translate-x-1/2"
                  }`}
                ></div>
              </Link>
            ))}

            {/* Register Button */}
            <Link
              href="#register"
              className="relative ml-4 px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10">Register Now</span>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
