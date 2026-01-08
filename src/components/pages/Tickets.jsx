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
                <img src="/lamp.png" className="absolute top-10 left-[10%] w-20 md:w-40 opacity-80 animate-float" style={{ animationDelay: '0s' }} />
                <img src="/lamp.png" className="absolute top-20 left-[30%] w-24 md:w-52 opacity-90 animate-float" style={{ animationDelay: '1s' }} />
                <img src="/lamp.png" className="absolute top-40 right-[40%] w-16 md:w-32 opacity-70 animate-float" style={{ animationDelay: '2s' }} />
                <img src="/lamp.png" className="absolute top-16 right-[20%] w-14 md:w-28 opacity-60 animate-float" style={{ animationDelay: '1.5s' }} />
                <img src="/lamp.png" className="absolute top-32 right-[5%] w-24 md:w-48 opacity-85 animate-float" style={{ animationDelay: '0.5s' }} />

                {/* Bottom Area */}
                <img src="/lamp.png" className="absolute bottom-20 left-[15%] w-20 md:w-44 opacity-80 animate-float" style={{ animationDelay: '1s' }} />
                <img src="/lamp.png" className="absolute bottom-10 left-[40%] w-28 md:w-60 opacity-90 animate-float" style={{ animationDelay: '2s' }} />
                <img src="/lamp.png" className="absolute bottom-32 right-[30%] w-16 md:w-32 opacity-70 animate-float" style={{ animationDelay: '0s' }} />
                <img src="/lamp.png" className="absolute bottom-16 right-[10%] w-24 md:w-52 opacity-85 animate-float" style={{ animationDelay: '1.5s' }} />
                <img src="/lamp.png" className="absolute bottom-5 left-[5%] w-16 md:w-32 opacity-60 animate-float" style={{ animationDelay: '2.5s' }} />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl">

                {/* Get Tickets Card */}
                <div className="bg-[#592E4D]/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center border border-white/10 shadow-[0_0_40px_rgba(139,95,128,0.4)] min-h-[350px] md:min-h-[400px] animate-fade-in-up">
                    <h2 className="font-nico text-white text-4xl sm:text-5xl md:text-6xl mb-2">Get</h2>
                    <h2 className="font-nico text-white text-4xl sm:text-5xl md:text-6xl mb-10 md:mb-12">Tickets</h2>

                    <Link className="bg-linear-to-r from-[#8B5F80] to-[#A37496] hover:from-[#A37496] hover:to-[#C08BA8] text-white font-nico text-xl md:text-2xl px-12 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white/20 active:scale-95" href="/register">
                        HERE!
                    </Link>
                </div>

                {/* Contact Us Card */}
                <div className="bg-[#2E1C3B]/90 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center border border-white/10 shadow-[0_0_40px_rgba(75,0,130,0.4)] min-h-[350px] md:min-h-[400px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h2 className="font-nico text-white text-4xl sm:text-5xl md:text-6xl mb-10 md:mb-12">Contact us</h2>

                    <div className="w-full max-w-md space-y-6">
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="font-nico text-purple-200 text-lg md:text-2xl">Sarah J.</span>
                            <span className="font-tilt text-white text-lg md:text-2xl">+91 98765 43210</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="font-nico text-purple-200 text-lg md:text-2xl">Mike R.</span>
                            <span className="font-tilt text-white text-lg md:text-2xl">+91 98123 45678</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Tickets;
