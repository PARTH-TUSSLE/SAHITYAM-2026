"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <div
          className={`mb-8 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
        </div>

        {/* Decorative Books */}
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="flex justify-center gap-2 mb-8">
            {["📚", "📖", "📕", "📗", "📘"].map((emoji, index) => (
              <span
                key={index}
                className="text-4xl animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-600/50 transition-all duration-300 hover:scale-105"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-300 hover:border-purple-400 transition-all duration-300 hover:scale-105"
          >
            Go Back
          </button>
        </div>

        {/* Literary Quote */}
        <div
          className={`mt-12 transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-gray-500 italic text-sm">
            "Not all those who wander are lost... but this page definitely is."
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
