"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GateAnimation() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsComplete(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      animate={
        isComplete ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }
      }
      transition={{ duration: 0.6, delay: 0 }}
      className="fixed inset-0 z-[100] bg-black overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-slate-900"
      />

      {/* Radial Glow */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
      />

      {/* Left Gate - Ornate */}
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
        className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-black via-purple-950 to-transparent origin-right"
        style={{
          boxShadow: "inset -40px 0 80px rgba(0, 0, 0, 0.9)",
        }}
      >
        {/* Ornate Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient
                id="ornateLeft"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#1f1f1f" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#ornateLeft)" />
            <g stroke="#d97706" strokeWidth="2" opacity="0.5">
              <line x1="0" y1="0" x2="100%" y2="100%" />
              <line x1="100%" y1="0" x2="0" y2="100%" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Right Gate - Ornate */}
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: "100%", opacity: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
        className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black via-purple-950 to-transparent origin-left"
        style={{
          boxShadow: "inset 40px 0 80px rgba(0, 0, 0, 0.9)",
        }}
      >
        {/* Ornate Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient
                id="ornateRight"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#1f1f1f" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#ornateRight)" />
            <g stroke="#d97706" strokeWidth="2" opacity="0.5">
              <line x1="0" y1="0" x2="100%" y2="100%" />
              <line x1="100%" y1="0" x2="0" y2="100%" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 md:px-8">
        {/* Top Decorative Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-0.5 md:h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-8 md:mb-12"
        />

        {/* Sahityam Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-center mb-3 md:mb-4 px-4"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-200 via-pink-100 to-purple-300 drop-shadow-lg">
            Sahityam
          </h1>
          <p className="text-purple-400/70 text-sm sm:text-base md:text-lg tracking-[0.2em] md:tracking-[0.3em] mt-1.5 md:mt-2 font-light">
            LITERARY EXCELLENCE
          </p>
        </motion.div>

        {/* 2026 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-300/60 mb-6 md:mb-8"
        >
          2026
        </motion.div>

        {/* Animated Decorative Elements */}
        <motion.div className="flex gap-4 md:gap-8 mb-8 md:mb-12">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.15 }}
              className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-200"
            />
          ))}
        </motion.div>

        {/* Glowing Underline */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 150, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-4 md:mb-0"
        />

        {/* Orbiting Elements */}
        <div className="absolute w-48 h-48 md:w-80 md:h-80 mt-12 md:mt-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full" />
          </motion.div>
        </div>

        <div className="absolute w-56 h-56 md:w-96 md:h-96 mt-12 md:mt-20">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-300 rounded-full" />
          </motion.div>
        </div>

        {/* Decorative Circles */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border md:border-2 border-purple-400"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.8, delay: 0.7 }}
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-purple-300"
        />
      </div>

      {/* Particle Effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{
            x: Math.cos((i / 8) * Math.PI * 2) * 20,
            y: Math.sin((i / 8) * Math.PI * 2) * 20,
            opacity: 0,
          }}
          animate={{
            x: Math.cos((i / 8) * Math.PI * 2) * 200,
            y: Math.sin((i / 8) * Math.PI * 2) * 200,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            delay: 1.2,
            ease: "easeOut",
          }}
          className="absolute left-1/2 top-1/2 w-1 h-1 bg-purple-300 rounded-full"
        />
      ))}
    </motion.div>
  );
}
