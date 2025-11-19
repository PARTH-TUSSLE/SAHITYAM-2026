"use client";

import Image from "next/image";
import { useState } from "react";
import EventModal from "./EventModal";

interface ChromaCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  rules?: string[];
  onRegister?: () => void;
}

export default function ChromaCard({
  image,
  title,
  subtitle,
  description = "This is an amazing event that brings together art and literature enthusiasts. Join us for an unforgettable experience filled with creativity and inspiration.",
  rules = [
    "Participants must register before the event deadline",
    "Entry fee is non-refundable",
    "Participants must bring valid ID proof",
    "Follow the event schedule and guidelines",
    "Respect all participants and organizers",
  ],
  onRegister,
}: ChromaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        {/* Inner Card */}
        <div className="relative overflow-hidden">
          {/* Image Container */}
          <div className="relative h-72 w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover transition-transform duration-500 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* Title Section */}
          <div className="relative p-6 bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-600 mb-5">{subtitle}</p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 px-5 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-md active:scale-95"
              >
                See More
              </button>
              <button
                onClick={onRegister}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        image={image}
        description={description}
        rules={rules}
      />
    </div>
  );
}
