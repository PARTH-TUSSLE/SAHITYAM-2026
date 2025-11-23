"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const navItems = [
    { name: "Events", href: "events" },
    { name: "Schedule", href: "schedule" },
    { name: "Gallery", href: "gallery" },
    { name: "Contact", href: "contact" },
  ];

  // Add Admin Dashboard to nav items if user is admin
  const allNavItems =
    user?.role === "ADMIN"
      ? [...navItems, { name: "Admin Dashboard", href: "admin" }]
      : navItems;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-r from-amber-50/95 via-white/95 to-orange-50/95 backdrop-blur-xl border-b border-orange-200/50 shadow-lg shadow-orange-100/50"
          : "bg-gradient-to-r from-amber-50/60 via-white/60 to-orange-50/60 backdrop-blur-sm border-b border-orange-200/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500 scale-110"></div>

              {/* Main icon container */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-red-500/30">
                {/* Inner shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-xl opacity-60"></div>

                <svg
                  className="w-7 h-7 text-white relative z-10 drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:scale-105">
                SAHITYAM 2026
              </span>
              <span className="text-[10px] font-semibold text-orange-500/70 tracking-widest uppercase -mt-1">
                Literature Festival
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-2">
            {allNavItems.map((item) => {
              const isActive = pathname === `/${item.href}`;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-5 py-2.5 font-semibold text-sm transition-all duration-300 group rounded-lg ${
                    isActive
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Background glow on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isActive ? "opacity-50" : ""
                    }`}
                  ></div>

                  <span className="relative z-10">{item.name}</span>

                  {/* Active indicator - enhanced */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full shadow-lg shadow-orange-500/50"></div>
                  )}

                  {/* Hover underline - animated gradient */}
                  {!isActive && (
                    <div
                      className={`absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 rounded-full transition-all duration-300 shadow-lg shadow-orange-400/40 ${
                        hoveredItem === item.name
                          ? "w-4/5 -translate-x-1/2 opacity-100"
                          : "w-0 -translate-x-1/2 opacity-0"
                      }`}
                    ></div>
                  )}
                </Link>
              );
            })}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative ml-6" ref={profileMenuRef}>
                {/* Profile Avatar Button */}
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="relative w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white/50 group"
                >
                  <span className="relative z-10">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-red-500 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white backdrop-blur-xl rounded-2xl shadow-2xl shadow-orange-200/50 border border-orange-200/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[1000]">
                    {/* User Info Section */}
                    <div className="px-4 py-4 bg-gradient-to-br from-orange-50 to-red-50 border-b border-orange-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-base">
                          {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push("/profile");
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group"
                      >
                        <svg
                          className="w-5 h-5 text-gray-500 group-hover:text-orange-600 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-semibold text-sm">Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                      >
                        <svg
                          className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="font-semibold text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-6">
                {/* Login Button - Outlined Style */}
                <Link
                  href="/login"
                  className="relative px-6 py-2.5 text-sm font-bold text-orange-600 border-2 border-orange-500 rounded-full overflow-hidden group transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Login
                  </span>
                  {/* Slide-in background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>

                {/* Register Button - Filled Style */}
                <Link
                  href="/register"
                  className="relative px-7 py-2.5 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white text-sm font-bold rounded-full overflow-hidden group shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/60 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Register Now
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12"></div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-gradient-to-br from-white/98 to-orange-50/98 backdrop-blur-xl rounded-2xl shadow-2xl shadow-orange-200/50 animate-in slide-in-from-top duration-300 border border-orange-200/50">
            <div className="flex flex-col space-y-2 p-3">
              {allNavItems.map((item) => {
                const isActive = pathname === `/${item.href}`;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-5 py-3.5 font-semibold rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 shadow-md shadow-orange-200/50"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Auth Buttons in Mobile Menu */}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="px-5 py-3.5 font-semibold text-center rounded-xl bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 hover:from-orange-200 hover:to-red-200 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-5 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl text-center shadow-xl shadow-red-500/40 hover:shadow-2xl hover:shadow-red-500/60 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-3.5 font-semibold text-center rounded-xl border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-3.5 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white font-bold rounded-xl text-center shadow-xl shadow-red-500/40 hover:shadow-2xl hover:shadow-red-500/60 transition-all duration-300 hover:scale-[1.02] border-2 border-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
