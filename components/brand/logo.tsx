import React from "react";
import Image from "next/image";

export function AyurvyaLogo({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-full aspect-square shrink-0">
        <Image
          src="/brand/emblem-nav.png"
          alt="Ayurvya Luxury Emblem"
          width={120}
          height={120}
          priority
          className="h-full w-auto aspect-square object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-serif text-xl tracking-[0.25em] font-bold text-gold-shine uppercase leading-none">
          Ayurvya
        </span>
        <span className="text-[9px] tracking-[0.35em] text-[#8A8F8C] uppercase font-mono mt-1 leading-none">
          Wellness • Luxury
        </span>
      </div>
    </div>
  );
}
