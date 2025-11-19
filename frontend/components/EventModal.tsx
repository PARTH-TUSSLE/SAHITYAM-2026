"use client";

import { useEffect } from "react";
import Image from "next/image";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  description: string;
  rules: string[];
}

export default function EventModal({
  isOpen,
  onClose,
  title,
  image,
  description,
  rules,
}: EventModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{
          animation: "fadeIn 350ms ease-out forwards",
        }}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        style={{
          animation:
            "modalSlideIn 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Close modal"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] hide-scrollbar">
          {/* Header Image */}
          <div className="relative h-64 w-full">
            <Image src={image} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h2 className="absolute bottom-6 left-6 text-4xl font-black text-white">
              {title}
            </h2>
          </div>

          {/* Content Sections */}
          <div className="p-8">
            {/* Description Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Description
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Rules Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">Rules</h3>
              </div>
              <ul className="space-y-3">
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed flex-1">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Register Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
                Register for this Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
