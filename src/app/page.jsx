import ComingSoon from "@/components/pages/ComingSoon";
import Navbar from "@/components/pages/Navbar";
import Hero from "@/components/pages/Hero";
import About from "@/components/pages/About";
import Speakers from "@/components/pages/Speakers";
import Schedule from "@/components/pages/Schedule";
import Tickets from "@/components/pages/Tickets";
import Footer from "@/components/pages/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-purple-500/30">
      {/* Global Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{ backgroundImage: `url('/BG.jpg')` }}
      />
  
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