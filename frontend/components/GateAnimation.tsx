"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function GateAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const leftDoorControls = useAnimation();
  const rightDoorControls = useAnimation();
  const centerLightControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Wait a moment
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Open doors and trigger center light simultaneously
      await Promise.all([
        leftDoorControls.start("open"),
        rightDoorControls.start("open"),
        centerLightControls.start("burst"),
      ]);

      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 400));
      onComplete();
    };

    sequence();
  }, [onComplete, leftDoorControls, rightDoorControls, centerLightControls]);

  const doorVariants = {
    closed: {
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    open: {
      rotateY: 90,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 1.2,
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(8px)",
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };

  const centerLightVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
    },
    burst: {
      scaleY: 1,
      opacity: [0, 1, 0.8, 0],
      transition: {
        duration: 1.2,
        ease: "easeOut",
        times: [0, 0.3, 0.7, 1],
      },
    },
  };

  const decorativeVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-900 via-orange-950/40 to-slate-900">
      
      {/* Subtle floating books */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            📖
          </motion.div>
        ))}
      </div>

      {/* Left Door */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 origin-left"
        style={{
          background: "linear-gradient(135deg, #2d1810 0%, #1a0f08 100%)",
          boxShadow: "inset -40px 0 80px rgba(0,0,0,0.5)",
        }}
        variants={doorVariants}
        initial="closed"
        animate={leftDoorControls}
      >
        <div className="relative h-full w-full flex flex-col items-end justify-center pr-32 gap-6">
          {/* Simple vertical bars */}
          <div className="absolute right-12 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500/40 to-transparent" />
          <div className="absolute right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />

          {/* Simple handle */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 shadow-2xl" />

          {/* SAHI Text */}
          <motion.div
            variants={textVariants}
            initial="initial"
            animate={leftDoorControls}
          >
            <div
              className="text-8xl font-black tracking-widest"
              style={{
                background: "linear-gradient(135deg, #fb923c 0%, #fdba74 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SAHI
            </div>
          </motion.div>

          {/* Year */}
          <motion.div
            variants={decorativeVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl font-bold text-orange-400/80 tracking-wider"
          >
            2026
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-32 h-px bg-gradient-to-r from-orange-500 to-transparent"
          />

          {/* Literary quote icon */}
          <motion.div
            variants={decorativeVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-4xl text-orange-400/60"
          >
            ✒️
          </motion.div>
        </div>
      </motion.div>

      {/* Right Door */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 origin-right"
        style={{
          background: "linear-gradient(225deg, #2d1810 0%, #1a0f08 100%)",
          boxShadow: "inset 40px 0 80px rgba(0,0,0,0.5)",
        }}
        variants={doorVariants}
        initial="closed"
        animate={rightDoorControls}
      >
        <div className="relative h-full w-full flex flex-col items-start justify-center pl-32 gap-6">
          {/* Simple vertical bars */}
          <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500/40 to-transparent" />
          <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />

          {/* Simple handle */}
          <div className="absolute left-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 shadow-2xl" />

          {/* TYAM Text */}
          <motion.div
            variants={textVariants}
            initial="initial"
            animate={rightDoorControls}
          >
            <div
              className="text-8xl font-black tracking-widest"
              style={{
                background: "linear-gradient(135deg, #fb923c 0%, #fdba74 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TYAM
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            variants={decorativeVariants}
            initial="hidden"
            animate="visible"
            className="text-xl font-semibold text-orange-400/70 tracking-wide"
          >
            Literature Festival
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-32 h-px bg-gradient-to-l from-orange-500 to-transparent"
          />

          {/* Book icon */}
          <motion.div
            variants={decorativeVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-4xl text-orange-400/60"
          >
            📚
          </motion.div>
        </div>
      </motion.div>

      {/* Center Light Burst */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        variants={centerLightVariants}
        initial="hidden"
        animate={centerLightControls}
      >
        <div
          className="w-1 h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #fb923c 50%, transparent 100%)",
            boxShadow: "0 0 80px rgba(251,146,60,0.8)",
          }}
        />
      </motion.div>
    </div>
  );
}
