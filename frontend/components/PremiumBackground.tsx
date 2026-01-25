"use client";

// Premium Background - Simplified for stability
export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
      {/* Simple decorative top arcs */}
      <div className="absolute top-0 left-0 right-0 h-[200px] overflow-hidden opacity-40">
        <svg viewBox="0 0 1440 200" className="w-full h-full">
          <path
            d="M-100,100 Q100,50 200,100 L200,200 L-100,200 Z"
            fill="#FFF5F7"
          />
          <path
            d="M1640,100 Q1440,50 1340,100 L1340,200 L1640,200 Z"
            fill="#EDE9FE"
          />
        </svg>
      </div>
    </div>
  );
}
