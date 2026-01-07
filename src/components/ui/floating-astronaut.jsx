import React from 'react';
import { cn } from "@/lib/utils";

export const FloatingAstronaut = ({ className, src = "/Astronaut1.png" }) => {
  return (
    <div className={cn("w-64 h-64 animate-float pointer-events-none", className)}>
      <img
        src={src}
        alt="Floating Astronaut"
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      />
    </div>
  );
};
