import React from 'react';
import { cn } from "@/lib/utils";

export const FloatingAstronaut = ({ className }) => {
  return (
    <div className={cn("w-64 h-64 animate-float", className)}>
      <svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      >
        <g className="astronaut-group">
          {/* Backpack */}
          <rect x="140" y="180" width="232" height="200" rx="30" fill="#94a3b8" />

          {/* Body Background */}
          <path
            d="M180 200 h152 v160 a 40 40 0 0 1 -40 40 h-72 a 40 40 0 0 1 -40 -40 v-160"
            fill="#e2e8f0"
          />

          {/* Helmet */}
          <circle
            cx="256"
            cy="180"
            r="100"
            fill="#f8fafc"
            stroke="#334155"
            strokeWidth="12"
          />

          {/* Visor */}
          <rect x="196" y="150" width="120" height="80" rx="40" fill="#3b82f6" />

          {/* Visor Reflection */}
          <path
            d="M220 165 h40"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Body Outline */}
          <path
            d="M180 200 v160 a 40 40 0 0 0 40 40 h72 a 40 40 0 0 0 40 -40 v-160"
            fill="none"
            stroke="#334155"
            strokeWidth="12"
          />

          {/* Arms */}
          <path
            d="M180 240 c-40 0 -60 40 -60 80"
            fill="none"
            stroke="#334155"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M332 240 c40 0 60 40 60 80"
            fill="none"
            stroke="#334155"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Legs */}
          <path
            d="M210 400 v60"
            fill="none"
            stroke="#334155"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M302 400 v60"
            fill="none"
            stroke="#334155"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Chest Badge */}
          <circle cx="256" cy="300" r="15" fill="#ef4444" />
        </g>
      </svg>
    </div>
  );
};
