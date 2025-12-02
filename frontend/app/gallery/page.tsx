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
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    title: "Opening Ceremony",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519167758481-83f29da8c14a?w=800",
    title: "Dance Performance",
    category: "Performance",
    year: "2025",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    title: "Poetry Recitation",
    category: "Literary",
    year: "2024",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
    title: "Art Exhibition",
    category: "Visual Arts",
    year: "2024",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    title: "Musical Evening",
    category: "Music",
    year: "2025",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    title: "Theatre Workshop",
    category: "Workshop",
    year: "2024",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
    title: "Grand Finale",
    category: "Cultural",
    year: "2025",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
    title: "Award Ceremony",
    category: "Celebration",
    year: "2024",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    title: "Traditional Dance",
    category: "Performance",
    year: "2025",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    title: "Classical Music",
    category: "Music",
    year: "2024",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800",
    title: "Drama Performance",
    category: "Performance",
    year: "2025",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=800",
    title: "Writing Workshop",
    category: "Workshop",
    year: "2024",
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
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Event Gallery
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Memories from SAHITYAM through the years
            </p>
          </div>

          {/* Infinite Scroll Rows */}
          <div className="space-y-8">
            {/* Row 1 - Left to Right */}
            <div className="relative overflow-hidden">
              <div className="flex gap-6 animate-scroll-left">
                {[...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={`row1-${index}`}
                    className="group relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:z-10"
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
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full text-xs font-bold">
                          {image.year}
                        </span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                          {image.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black mb-2">
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
            <div className="relative overflow-hidden">
              <div className="flex gap-6 animate-scroll-right">
                {[
                  ...galleryImages.slice().reverse(),
                  ...galleryImages.slice().reverse(),
                ].map((image, index) => (
                  <div
                    key={`row2-${index}`}
                    className="group relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:z-10"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full text-xs font-bold">
                          {image.year}
                        </span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                          {image.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black mb-2">
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
            <div className="relative overflow-hidden">
              <div className="flex gap-6 animate-scroll-left-slow">
                {[...galleryImages.slice(3), ...galleryImages.slice(3)].map(
                  (image, index) => (
                    <div
                      key={`row3-${index}`}
                      className="group relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:z-10"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full text-xs font-bold">
                            {image.year}
                          </span>
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                            {image.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black mb-2">
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
