
const Hero = () => {
    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Sunrays Overlay - Positioned to radiate from top left */}
            <img
                src="/Sunrays.png"
                alt=""
                className="hidden md:block absolute top-0 left-0 z-10 w-[120vw] h-[120vh] -translate-x-[30%] -translate-y-[10%] opacity-75 mix-blend-screen pointer-events-none object-cover -rotate-90"
            />

            {/* Satellite Image - Positioned on the right */}
            <img
                src="/Satlite.png"
                alt="Satellite"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-[40vh] md:w-[100vh] h-auto object-contain drop-shadow-2xl rotate-90 translate-x-[30%] md:translate-x-[20%] animate-float"
            />

            {/* Main Content */}
            <div className="relative z-30 flex flex-col items-center justify-center text-center mt-32 md:mt-40 animate-fade-in px-4">
                {/* Main Title */}
                <h1 className="font-nico text-white text-4xl sm:text-6xl md:text-8xl tracking-wider drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                    SPACEUP
                </h1>
                <h2 className="font-nico text-white text-3xl sm:text-5xl md:text-7xl tracking-widest mt-4 md:mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    2025
                </h2>

                {/* Info Card - Dark Purple Pill */}
                <div className="mt-12 md:mt-16 bg-[#2E1C3B]/70 backdrop-blur-md px-8 py-6 md:px-12 md:py-8 rounded-3xl border border-white/10 flex flex-col md:flex-row gap-6 md:gap-16 items-center justify-center shadow-[0_0_30px_rgba(75,0,130,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.3)] transition-shadow duration-300">
                    <div className="text-center group cursor-default">
                        <p className="font-tilt text-purple-200 text-xs sm:text-sm tracking-widest uppercase mb-1">Date</p>
                        <p className="font-nico text-white text-lg md:text-2xl leading-relaxed group-hover:text-purple-300 transition-colors">
                            6th December
                        </p>
                        <p className="font-nico text-white text-base md:text-xl leading-relaxed">
                            2025
                        </p>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                    <div className="md:hidden w-16 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                    <div className="text-center group cursor-default">
                        <p className="font-tilt text-purple-200 text-xs sm:text-sm tracking-widest uppercase mb-1">Venue</p>
                        <p className="font-nico text-white text-lg md:text-2xl leading-relaxed group-hover:text-purple-300 transition-colors">
                            Seminar Complex,
                        </p>
                        <p className="font-nico text-white text-base md:text-xl leading-relaxed">
                            CUSAT
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
