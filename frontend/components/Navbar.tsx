"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
          ? "bg-gradient-to-r from-rose-50/98 via-white/98 to-purple-50/98 border-b border-purple-200/50 shadow-lg shadow-purple-100/50"
          : "bg-gradient-to-r from-rose-50/80 via-white/80 to-purple-50/80 border-b border-purple-200/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group block">
            <Image
              src="/sahityamlogo.png"
              alt="SAHITYAM Logo"
              width={180}
              height={80}
              className="object-contain transition-transform duration-300 group-hover:scale-105 h-16 w-auto"
              priority
              unoptimized
            />
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
                      ? "text-purple-600"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Background glow on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isActive ? "opacity-50" : ""
                    }`}
                  ></div>

                  <span className="relative z-10">{item.name}</span>

                  {/* Active indicator - enhanced */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                  )}

                  {/* Hover underline - animated gradient */}
                  {!isActive && (
                    <div
                      className={`absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full transition-all duration-300 shadow-lg shadow-purple-400/40 ${
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
                  className="relative w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group ring-2 ring-purple-200/50"
                >
                  <span className="relative z-10">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-200 to-indigo-400 blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/98 rounded-2xl shadow-2xl shadow-purple-200/50 border border-purple-200/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[1000]">
                    {/* User Info Section */}
                    <div className="px-4 py-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-b border-purple-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base ring-2 ring-purple-200/50">
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
                        className="w-full px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 group"
                      >
                        <svg
                          className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors"
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
                        className="w-full px-4 py-3 flex items-center gap-3 text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group"
                      >
                        <svg
                          className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors"
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
                  className="relative px-6 py-2.5 text-sm font-bold text-purple-600 border-2 border-purple-500 rounded-full overflow-hidden group transition-all duration-300 hover:scale-105 ring-1 ring-purple-200/30"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Login
                  </span>
                  {/* Slide-in background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>

                {/* Register Button - Filled Style */}
                <Link
                  href="/register"
                  className="relative px-7 py-2.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-sm font-bold rounded-full overflow-hidden group shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105 ring-1 ring-purple-200/30"
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
            className="md:hidden relative p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 shadow-md hover:shadow-lg ring-1 ring-purple-200/30"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* Rippling glow effect */}
            <div className="absolute inset-0 rounded-xl">
              <div className="absolute inset-0 rounded-xl bg-purple-400 animate-ping opacity-20"></div>
              <div className="absolute inset-0 rounded-xl bg-pink-400 animate-pulse opacity-30"></div>
            </div>

            <svg
              className="w-6 h-6 text-purple-600 relative z-10"
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
          <div className="md:hidden mt-4 pb-4 bg-gradient-to-br from-white/98 via-purple-50/95 to-pink-50/98 rounded-2xl shadow-2xl shadow-purple-200/50 animate-in slide-in-from-top duration-300 border border-purple-200/50">
            <div className="flex flex-col space-y-2 p-3">
              {allNavItems.map((item) => {
                const isActive = pathname === `/${item.href}`;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-5 py-3.5 font-semibold rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 text-purple-600 shadow-md shadow-purple-200/50 ring-1 ring-purple-200/30"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:via-pink-50 hover:to-purple-50 hover:text-purple-600"
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
                    className="px-5 py-3.5 font-semibold text-center rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 text-purple-600 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 ring-1 ring-purple-200/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-5 py-3.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold rounded-xl text-center shadow-xl shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 ring-1 ring-white/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-3.5 font-semibold text-center rounded-xl border-2 border-purple-500 text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 ring-1 ring-purple-200/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-3.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold rounded-xl text-center shadow-xl shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-[1.02] border-2 border-white/20 ring-1 ring-white/30"
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
