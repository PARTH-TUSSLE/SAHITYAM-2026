// components/ui/BackgroundElements.tsx
"use client";

const Flower = ({
  left,
  top,
  color,
  animation,
}: {
  left: string;
  top: string;
  color: string;
  animation: string;
}) => {
  return (
    <div
      className={`absolute w-[20px] h-[20px] ${animation}`}
      style={{ left, top }}
    >
      <svg viewBox="0 0 20 20" className="w-full h-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <path
            key={i}
            d="M10,2 Q12,5 11,8 Q10,10 9,8 Q8,5 10,2"
            fill={color}
            transform={`rotate(${i * 60} 10 10)`}
          />
        ))}
        <circle cx="10" cy="10" r="3" fill="white" />
      </svg>
    </div>
  );
};

const UltraSmoothRainbow = () => {
  // Pre-render all color steps for ultra-smooth transitions
  const rainbowBands = [
    { initialColor: "#FF0000", width: 40, delay: "0.1s" },
    { initialColor: "#FF7F00", width: 35, delay: "0.2s" },
    { initialColor: "#FFBF00", width: 30, delay: "0.3s" },
    { initialColor: "#BFFF00", width: 25, delay: "0.4s" },
    { initialColor: "#00FF40", width: 20, delay: "0.5s" },
    { initialColor: "#00FFFF", width: 15, delay: "0.6s" },
    { initialColor: "#FF0000", width: 10, delay: "0.7s" },
  ];

  return (
    <div className="absolute w-full h-[300px] top-[calc(50%-90px)] left-0 overflow-visible pointer-events-none">
      <svg
        viewBox="0 0 1400 180"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {rainbowBands.map((band, index) => (
          <path
            key={index}
            d={`M0,${90 + index * 10} C350,${180 - index * 10} 1050,${
              index * 10
            } 1400,${90 + index * 10}`}
            stroke={band.initialColor}
            strokeWidth={band.width}
            fill="none"
            strokeLinecap="round"
            className="animate-smooth-color"
            style={{ animationDelay: band.delay }}
          />
        ))}

        {/* Glow effect - static */}
        <path
          d="M0,90 C350,180 1050,0 1400,90"
          stroke="white"
          strokeWidth="45"
          strokeOpacity="0.2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-festive">
      {/* Ultra-smooth rainbow */}
      <UltraSmoothRainbow />

      {/* Small decorative flowers */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Flower
          key={i}
          left={`${Math.random() * 90 + 5}%`}
          top={`${Math.random() * 90 + 5}%`}
          color={i % 2 === 0 ? "#FF69B4" : "#FF1493"}
          animation="animate-float"
        />
      ))}
    </div>
  );
}
