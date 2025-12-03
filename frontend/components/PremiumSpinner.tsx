import React from "react";

interface PremiumSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "inline";
}

const sizeClasses = {
  sm: { container: "w-6 h-6", thickness: "2" },
  md: { container: "w-10 h-10", thickness: "2.5" },
  lg: { container: "w-14 h-14", thickness: "3" },
  xl: { container: "w-20 h-20", thickness: "3.5" },
};

const PremiumSpinner: React.FC<PremiumSpinnerProps> = ({
  size = "lg",
  variant = "default",
}) => {
  const { container, thickness } = sizeClasses[size];

  if (variant === "inline") {
    return (
      <div className="inline-flex items-center justify-center">
        <svg
          className={`${container} animate-spin`}
          viewBox="0 0 50 50"
          style={{
            animationDuration: "1.2s",
            shapeRendering: "geometricPrecision",
          }}
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="url(#gradient-inline)"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray="80, 200"
            strokeDashoffset="0"
          />
          <defs>
            <linearGradient
              id="gradient-inline"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Main spinner - crystal clear */}
      <svg
        className={`${container}`}
        viewBox="0 0 50 50"
        style={{
          animation: "spin 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
          shapeRendering: "geometricPrecision",
          willChange: "transform",
        }}
      >
        {/* Gradient circle with dash */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray="80, 200"
          strokeDashoffset="0"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default PremiumSpinner;
