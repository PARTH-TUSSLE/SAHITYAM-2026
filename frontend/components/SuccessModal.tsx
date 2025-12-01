"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
}: SuccessModalProps) {
  const colors = {
    success: {
      bg: "from-green-50 to-emerald-50",
      border: "border-green-200",
      icon: "text-green-600",
      iconBg: "bg-green-100",
      button: "from-green-500 to-green-600",
    },
    error: {
      bg: "from-red-50 to-rose-50",
      border: "border-red-200",
      icon: "text-red-600",
      iconBg: "bg-red-100",
      button: "from-red-500 to-red-600",
    },
    info: {
      bg: "from-blue-50 to-cyan-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      iconBg: "bg-blue-100",
      button: "from-blue-500 to-blue-600",
    },
  };

  const color = colors[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`bg-gradient-to-br ${color.bg} rounded-2xl shadow-2xl max-w-md w-full p-8 border-2 ${color.border}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div
                className={`w-20 h-20 ${color.iconBg} rounded-full flex items-center justify-center`}
              >
                {type === "success" && (
                  <svg
                    className={`w-10 h-10 ${color.icon}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                {type === "error" && (
                  <svg
                    className={`w-10 h-10 ${color.icon}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                {type === "info" && (
                  <svg
                    className={`w-10 h-10 ${color.icon}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-gray-900">{title}</h3>

              {/* Message */}
              <p className="text-gray-700 text-base leading-relaxed">
                {message}
              </p>

              {/* Button */}
              <button
                onClick={onClose}
                className={`w-full mt-4 bg-gradient-to-r ${color.button} text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02]`}
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
