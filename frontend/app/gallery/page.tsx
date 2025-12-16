"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";
import BackgroundElements from "@/components/ui/BackgroundElements";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  year: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/IMG_5632.JPG",
    title: "SAHITYAM Event",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 2,
    src: "/IMG_5639.JPG",
    title: "Event Highlights",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 3,
    src: "/IMG_5640.JPG",
    title: "Performance",
    category: "Performance",
    year: "2025",
  },
  {
    id: 4,
    src: "/IMG_5641.JPG",
    title: "Literary Session",
    category: "Literary",
    year: "2025",
  },
  {
    id: 5,
    src: "/IMG_5642.JPG",
    title: "Creative Expression",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 6,
    src: "/IMG_5643.JPG",
    title: "Event Moments",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 7,
    src: "/IMG_5644.JPG",
    title: "Participants",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 8,
    src: "/IMG_5648.JPG",
    title: "Stage Performance",
    category: "Performance",
    year: "2025",
  },
  {
    id: 9,
    src: "/IMG_5650.JPG",
    title: "Cultural Event",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 10,
    src: "/IMG_5653.JPG",
    title: "Event Ceremony",
    category: "Celebration",
    year: "2025",
  },
  {
    id: 11,
    src: "/IMG_5656.JPG",
    title: "SAHITYAM Moments",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 12,
    src: "/IMG_5659.JPG",
    title: "Creative Arts",
    category: "Visual Arts",
    year: "2025",
  },
  {
    id: 13,
    src: "/IMG_5660.JPG",
    title: "Literary Gathering",
    category: "Literary",
    year: "2025",
  },
  {
    id: 14,
    src: "/IMG_5661.JPG",
    title: "Event Highlights",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 15,
    src: "/IMG_5663.JPG",
    title: "Performance Art",
    category: "Performance",
    year: "2025",
  },
  {
    id: 16,
    src: "/IMG_5664.JPG",
    title: "Cultural Program",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 17,
    src: "/IMG_5665.JPG",
    title: "SAHITYAM Activities",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 18,
    src: "/IMG_5666.JPG",
    title: "Event Workshop",
    category: "Workshop",
    year: "2025",
  },
  {
    id: 19,
    src: "/IMG_5667.JPG",
    title: "Creative Session",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 20,
    src: "/IMG_5670.JPG",
    title: "Literary Event",
    category: "Literary",
    year: "2025",
  },
  {
    id: 21,
    src: "/IMG_5671.JPG",
    title: "Cultural Celebration",
    category: "Celebration",
    year: "2025",
  },
  {
    id: 22,
    src: "/IMG_5673.JPG",
    title: "SAHITYAM Grand Event",
    category: "Cultural",
    year: "2025",
  },
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Hide navbar and footer when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      const navbar = document.querySelector("nav");
      const footer = document.querySelector("footer");
      if (navbar) navbar.classList.add("hidden");
      if (footer) footer.classList.add("hidden");
    } else {
      document.body.style.overflow = "unset";
      const navbar = document.querySelector("nav");
      const footer = document.querySelector("footer");
      if (navbar) navbar.classList.remove("hidden");
      if (footer) footer.classList.remove("hidden");
    }
  }, [selectedImage]);

  return (
    <>
      <Navbar />
      <BackgroundElements />
      <div className="min-h-screen w-full relative overflow-hidden ">
        {/* Animated circles */}

        {/* Content */}
        <div className="relative z-10 py-24">
          {/* Header */}
          <div className="text-center mb-16 px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
              Event Gallery
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium">
              Memories from SAHITYAM through the years
            </p>
          </div>

          {/* Infinite Scroll Rows */}
          <div className="space-y-4 sm:space-y-8">
            {/* Row 1 - Left to Right */}
            <div className="relative overflow-x-auto overflow-y-hidden scrollbar-hide hover:scrollbar-default">
              <div className="flex gap-3 sm:gap-6 animate-scroll-left-mobile sm:animate-scroll-left">
                {[...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={`row1-${index}`}
                    className="group relative flex-shrink-0 w-52 h-64 sm:w-80 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:z-10"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full text-[10px] sm:text-xs font-bold">
                          {image.year}
                        </span>
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-bold">
                          {image.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-2xl font-black mb-1 sm:mb-2">
                        {image.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm opacity-80">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>SAHITYAM {image.year}</span>
                      </div>
                    </div>

                    {/* Border Glow */}
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-purple-400/50 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Right to Left */}
            <div className="relative overflow-x-auto overflow-y-hidden scrollbar-hide hover:scrollbar-default">
              <div className="flex gap-3 sm:gap-6 animate-scroll-right-mobile sm:animate-scroll-right">
                {[
                  ...galleryImages.slice().reverse(),
                  ...galleryImages.slice().reverse(),
                ].map((image, index) => (
                  <div
                    key={`row2-${index}`}
                    className="group relative flex-shrink-0 w-52 h-64 sm:w-80 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:z-10"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full text-[10px] sm:text-xs font-bold">
                          {image.year}
                        </span>
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-bold">
                          {image.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-2xl font-black mb-1 sm:mb-2">
                        {image.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm opacity-80">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>SAHITYAM {image.year}</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-purple-400/50 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 - Left to Right (Slower) */}
            <div className="relative overflow-x-auto overflow-y-hidden scrollbar-hide hover:scrollbar-default">
              <div className="flex gap-3 sm:gap-6 animate-scroll-left-mobile sm:animate-scroll-left-slow">
                {[...galleryImages.slice(3), ...galleryImages.slice(3)].map(
                  (image, index) => (
                    <div
                      key={`row3-${index}`}
                      className="group relative flex-shrink-0 w-52 h-64 sm:w-80 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:z-10"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                          <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full text-[10px] sm:text-xs font-bold">
                            {image.year}
                          </span>
                          <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-bold">
                            {image.category}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-2xl font-black mb-1 sm:mb-2">
                          {image.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm opacity-80">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>SAHITYAM {image.year}</span>
                        </div>
                      </div>

                      <div className="absolute inset-0 border-4 border-transparent group-hover:border-orange-400/50 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative pattern overlay removed */}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            style={{
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-purple-400 transition-colors duration-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation:
                  "modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <div className="relative h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-3xl font-black text-white mb-2">
                  {selectedImage.title}
                </h2>
                <div className="flex items-center justify-center gap-4 text-white/80">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold">
                    {selectedImage.category}
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full text-sm font-bold">
                    {selectedImage.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Gallery;
