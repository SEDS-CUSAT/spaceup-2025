import Link from "next/link";

const Tickets = () => {
    // Generate random positions for lamps to create scattered effect
    // In a real app, might want fixed positions to match design exactly, 
    // but random/scattered works well for this "floating lanterns" vibe.
    // For now, I'll place them somewhat manually to match the screenshot vibe.

    return (
        <div id="tickets" className="relative w-full min-h-screen z-10 py-20 px-8 flex flex-col items-center justify-center overflow-hidden">

            {/* Scattered Lamps Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Top Area */}
                <img src="/lamp.png" className="absolute top-10 left-[5%] md:left-[10%] w-14 md:w-40 opacity-80 animate-float" style={{ animationDelay: '0s' }} />
                <img src="/lamp.png" className="hidden md:block absolute top-20 left-[30%] w-24 md:w-52 opacity-90 animate-float" style={{ animationDelay: '1s' }} />
                <img src="/lamp.png" className="absolute top-40 right-[10%] md:right-[40%] w-12 md:w-32 opacity-70 animate-float" style={{ animationDelay: '2s' }} />
                <img src="/lamp.png" className="absolute top-16 right-[5%] md:right-[20%] w-10 md:w-28 opacity-60 animate-float" style={{ animationDelay: '1.5s' }} />
                
                {/* Bottom Area */}
                <img src="/lamp.png" className="absolute bottom-20 left-[5%] md:left-[15%] w-14 md:w-44 opacity-80 animate-float" style={{ animationDelay: '1s' }} />
                <img src="/lamp.png" className="hidden md:block absolute bottom-10 left-[40%] w-28 md:w-60 opacity-90 animate-float" style={{ animationDelay: '2s' }} />
                <img src="/lamp.png" className="absolute bottom-32 right-[5%] md:right-[30%] w-12 md:w-32 opacity-70 animate-float" style={{ animationDelay: '0s' }} />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl">

                {/* Get Tickets Card */}
                <div className="bg-[#592E4D]/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center border border-white/10 shadow-[0_0_40px_rgba(139,95,128,0.4)] min-h-[300px] md:min-h-[400px] animate-fade-in-up">
                    <h2 className="font-nico text-white text-3xl sm:text-5xl md:text-6xl mb-2">Get</h2>
                    <h2 className="font-nico text-white text-3xl sm:text-5xl md:text-6xl mb-8 md:mb-12">Tickets</h2>

                    <Link className="bg-linear-to-r from-[#8B5F80] to-[#A37496] hover:from-[#A37496] hover:to-[#C08BA8] text-white font-nico text-lg md:text-2xl px-10 py-3 md:px-12 md:py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white/20 active:scale-95" href="/register">
                        HERE!
                    </Link>
                </div>

                {/* Contact Us Card */}
                <div className="bg-[#2E1C3B]/90 backdrop-blur-md rounded-[2.5rem] p-6 md:p-12 flex flex-col items-center justify-center text-center border border-white/10 shadow-[0_0_40px_rgba(75,0,130,0.4)] min-h-[300px] md:min-h-[400px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h2 className="font-nico text-white text-3xl sm:text-5xl md:text-6xl mb-8 md:mb-12">Contact us</h2>

                    <div className="w-full max-w-lg space-y-4">
                        {/* President */}
                        <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group gap-2 md:gap-0">
                            <div className="flex flex-col text-center md:text-left">
                                <span className="font-nico text-purple-200 text-base md:text-xl group-hover:text-purple-100 transition-colors">Kailas Sachdev</span>
                                <span className="font-tilt text-white/50 text-[10px] md:text-sm uppercase tracking-wider">President</span>
                            </div>
                            <div className="flex flex-col text-center md:text-right">
                                <a href="tel:+916282288093" className="font-tilt text-white text-sm md:text-lg hover:text-purple-300 transition-colors">+91 6282 288 093</a>
                                <a href="mailto:president@sedscusat.com" className="font-tilt text-white/60 text-xs md:text-sm hover:text-white transition-colors">president@sedscusat.com</a>
                            </div>
                        </div>

                        {/* Secretary */}
                        <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group gap-2 md:gap-0">
                            <div className="flex flex-col text-center md:text-left">
                                <span className="font-nico text-purple-200 text-base md:text-xl group-hover:text-purple-100 transition-colors">Asiya Fyroos</span>
                                <span className="font-tilt text-white/50 text-[10px] md:text-sm uppercase tracking-wider">Secretary</span>
                            </div>
                            <div className="flex flex-col text-center md:text-right">
                                <a href="tel:+917012495394" className="font-tilt text-white text-sm md:text-lg hover:text-purple-300 transition-colors">+91 7012 495 394</a>
                                <a href="mailto:secretary@sedscusat.com" className="font-tilt text-white/60 text-xs md:text-sm hover:text-white transition-colors">secretary@sedscusat.com</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Tickets;
