"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Error Icon */}
        <div className="mb-8 animate-pulse">
          <div className="text-8xl mb-4">⚠️</div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
          
          {/* Only show error details in development */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-red-800 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-600/50 transition-all duration-300 hover:scale-105"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-300 hover:border-purple-400 transition-all duration-300 hover:scale-105 inline-block"
          >
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            If this problem persists, please{" "}
            <Link href="/contact" className="text-purple-600 hover:text-purple-700 underline">
              contact us
            </Link>
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
