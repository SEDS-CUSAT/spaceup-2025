
const Speakers = () => {
    return (
        <div id="speakers" className="relative w-full min-h-screen z-10 py-20 px-4 md:px-8 flex flex-col items-center overflow-hidden">

            {/* Airplane Background - Spanning across */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <img
                    src="/airoplane.png"
                    alt="Airplane"
                    className="w-full max-w-6xl object-contain opacity-90 scale-100 md:scale-100 translate-y-10 md:translate-y-20"
                />
            </div>

            {/* Title */}
            <h2 className="relative z-10 font-nico text-white text-4xl sm:text-5xl md:text-7xl mb-12 md:mb-24 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fade-in-up">
                Speakers
            </h2>

            {/* Speakers Grid - Arched Layout */}
            <div className="relative z-10 w-full max-w-7xl flex flex-wrap justify-center gap-8 gap-y-16 px-6">
                {[
                    { name: "A Chandrasekar", role: "Dean of R&D, IIST", offset: "lg:mt-0", image: "/A Chandrasekhar.jpeg" },
                    { name: "Shrushti Patil", role: "Space Biologist", offset: "lg:mt-0", image: "/Shrushti Patil pic.jpeg" }
                ].map((speaker, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center ${speaker.offset} group animate-fade-in-up`}
                        style={{ animationDelay: `${index * 200}ms` }}
                    >
                        <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 transition-transform duration-300 group-hover:scale-105">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"></div>
                            <div className="relative w-full h-full rounded-full bg-[#2E1C3B] border-4 border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="w-full max-w-[200px] text-center bg-[#7B4B74]/80 backdrop-blur-sm rounded-2xl border border-white/20 p-4 shadow-lg transform transition-all duration-300 group-hover:-translate-y-2">
                            <h3 className="font-nico text-white text-xl mb-1 truncate">{speaker.name}</h3>
                            <p className="font-tilt text-purple-200 text-sm uppercase tracking-wider truncate">{speaker.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Speakers;
