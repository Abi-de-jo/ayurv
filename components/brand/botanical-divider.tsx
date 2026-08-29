import React from "react";

export function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 opacity-80 ${className}`}>
      <div className="h-[1px] w-24 sm:w-36 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <svg
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-6 text-[#D4AF37]"
      >
        <path
          d="M50 12C45 6 35 6 25 12C35 18 45 18 50 12Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M50 12C55 6 65 6 75 12C65 18 55 18 50 12Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M50 2V22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="50" cy="12" r="3" fill="#F0D687" />
        <circle cx="25" cy="12" r="1.5" fill="#D4AF37" />
        <circle cx="75" cy="12" r="1.5" fill="#D4AF37" />
      </svg>
      <div className="h-[1px] w-24 sm:w-36 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </div>
  );
}
