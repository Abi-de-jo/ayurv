import React from "react";

export function AyurvyaLogo({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto text-[#D4AF37] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
      >
        {/* Outer Ornate Gold Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <circle cx="50" cy="50" r="42" stroke="url(#goldGrad)" strokeWidth="1" />

        {/* Ornate "A" merged with Leaf Crown Profile & Mortar/Pestle */}
        <path
          d="M50 14L30 75H39L44 60H56L61 75H70L50 14Z"
          fill="url(#goldGrad)"
          opacity="0.95"
        />
        <path
          d="M46 54L50 40L54 54H46Z"
          fill="#0A0A0A"
        />

        {/* Leaf Crown / Botanical Sprigs on Top of A */}
        <path
          d="M50 10C50 10 44 18 36 18C36 18 43 24 50 24C57 24 64 18 64 18C56 18 50 10 50 10Z"
          fill="url(#goldGrad)"
        />
        <circle cx="50" cy="11" r="2" fill="#F0D687" />

        {/* Mortar & Pestle Icon at Base */}
        <path
          d="M40 76C40 76 43 85 50 85C57 85 60 76 60 76H40Z"
          fill="url(#goldGrad)"
        />
        <path
          d="M45 72L57 65"
          stroke="#F0D687"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient
            id="goldGrad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F0D687" />
            <stop offset="0.5" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#9A7B1C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col">
        <span className="font-serif text-xl tracking-[0.25em] font-bold text-gold-shine uppercase">
          Ayurvya
        </span>
        <span className="text-[9px] tracking-[0.35em] text-[#8A8F8C] uppercase font-mono">
          Wellness • Luxury
        </span>
      </div>
    </div>
  );
}
