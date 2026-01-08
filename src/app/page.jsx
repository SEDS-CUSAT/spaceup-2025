"use client";

import { useRef } from "react";
import ComingSoon from "@/components/pages/ComingSoon";
import Navbar from "@/components/pages/Navbar";
import Hero from "@/components/pages/Hero";
import About from "@/components/pages/About";
import Speakers from "@/components/pages/Speakers";
import Schedule from "@/components/pages/Schedule";
import Tickets from "@/components/pages/Tickets";
import Footer from "@/components/pages/Footer";

import { Particles } from "@/components/ui/particles";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-y-auto no-scrollbar bg-black text-white selection:bg-purple-500/30">
      {/* Global Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('/BG.jpg')` }}
      />
      
      {/* Particles Layer */}
      {/* Particles Layer */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        <ShootingStars minDelay={3500} maxDelay={5000} starColor="#9E00FF" trailColor="#2EB9DF" />
        <ShootingStars minDelay={4500} maxDelay={6500} starColor="#FF0099" trailColor="#FFB800" />
        <ShootingStars minDelay={5500} maxDelay={7500} starColor="#00FF9E" trailColor="#00B8FF" />
        <ShootingStars minDelay={6500} maxDelay={8500} starColor="#FF4444" trailColor="#FF8888" />
        
        {/* White stars */}
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
        {/* Purple stars */}
        <Particles
          className="absolute inset-0"
          quantity={70}
          ease={80}
          color="#A97CF8"
          refresh
        />
        {/* Pink stars */}
        <Particles
          className="absolute inset-0"
          quantity={70}
          ease={80}
          color="#F38CB8"
          refresh
        />
        {/* Deep Pink stars */}
        <Particles
          className="absolute inset-0"
          quantity={50}
          ease={80}
          color="#EC4899"
          refresh
        />
         {/* Gold stars */}
         <Particles
          className="absolute inset-0"
          quantity={30}
          ease={80}
          color="#FDCC92"
          refresh
        />
      </div>

      <ScrollProgress className="z-50" containerRef={containerRef} />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Speakers />
        <Schedule />
        <Tickets />
        <Footer />
      </div>
    </div>
  
  )
}