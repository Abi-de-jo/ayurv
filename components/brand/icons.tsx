import React from "react";

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.105 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.234.373-.996 3.639 3.737-.981.368.235z" />
    </svg>
  );
}

export function ShikakaiPouchIcon({ className = "w-24 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Pouch Shadow & Foil Body */}
      <path
        d="M15 15C15 10 20 5 30 5H70C80 5 85 10 85 15L90 125C90 132 82 137 72 137H28C18 137 10 132 10 125L15 15Z"
        fill="url(#pouchGrad)"
        stroke="#D4AF37"
        strokeWidth="1.5"
      />
      {/* Top Seal Texture */}
      <path d="M12 18H88" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 1" />
      <path d="M11 23H89" stroke="#1F6E4A" strokeWidth="1" />

      {/* Gold Foil Logo Motif */}
      <circle cx="50" cy="55" r="16" stroke="url(#goldLineGrad)" strokeWidth="1.2" />
      <path d="M50 43L40 65H45L47 60H53L55 65H60L50 43Z" fill="url(#goldLineGrad)" />

      {/* Label Text lines */}
      <rect x="25" y="78" width="50" height="2" rx="1" fill="#F0D687" />
      <rect x="32" y="84" width="36" height="1.5" rx="0.75" fill="#8A8F8C" />
      <rect x="20" y="96" width="60" height="16" rx="4" fill="#0B3D2E" stroke="#2FA36B" strokeWidth="0.8" />
      <text x="50" y="107" fill="#F0D687" fontSize="7" fontFamily="serif" textAnchor="middle" fontWeight="bold">
        40+ HERBS
      </text>

      <defs>
        <linearGradient id="pouchGrad" x1="0" y1="0" x2="100" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#151C18" />
          <stop offset="0.5" stopColor="#0A0A0A" />
          <stop offset="1" stopColor="#0B120E" />
        </linearGradient>
        <linearGradient id="goldLineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F0D687" />
          <stop offset="1" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function HairOilBottleIcon({ className = "w-16 h-36" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Glass Body */}
      <rect x="20" y="50" width="40" height="90" rx="12" fill="url(#bottleGlass)" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Gold Label Collar */}
      <rect x="21" y="70" width="38" height="45" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="40" cy="85" r="7" stroke="#F0D687" strokeWidth="1" />
      <path d="M40 80L35 91H45L40 80Z" fill="#F0D687" />
      <text x="40" y="103" fill="#D4AF37" fontSize="5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
        ELIXIR
      </text>
      {/* Gold Cap */}
      <rect x="28" y="28" width="24" height="22" rx="3" fill="url(#goldCapGrad)" stroke="#F0D687" strokeWidth="1" />
      {/* Dropper Top */}
      <path d="M32 28C32 20 48 20 48 28H32Z" fill="#101512" stroke="#2FA36B" strokeWidth="1" />

      <defs>
        <linearGradient id="bottleGlass" x1="0" y1="0" x2="80" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B3D2E" />
          <stop offset="0.6" stopColor="#08231B" />
          <stop offset="1" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="goldCapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F0D687" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#AA820A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
