const Schedule = () => {
    return (
        <div id="schedule" className="relative w-full min-h-screen z-10 py-20 px-8 flex flex-col items-center overflow-hidden">

            {/* Title */}
            <h2 className="font-nico text-white text-4xl sm:text-5xl md:text-7xl mb-12 md:mb-20 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fade-in-up">
                Schedule
            </h2>

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative z-20 px-4">

                {/* Left Column - Venue 2 */}
                <div className="flex flex-col items-center lg:mt-32 order-2 lg:order-1 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="font-nico text-purple-300 text-2xl md:text-3xl mb-8 tracking-widest drop-shadow-lg">Venue 2</h3>
                    {[
                        { time: "10:30 AM", title: "Opportunities in Space Biology", speaker: "Shrushti Patil" },
                        { time: "02:00 PM", title: "Workshop 3", speaker: "TBA" }
                    ].map((item, i) => (
                        <div key={i} className="w-full bg-[#2E1C3B]/80 backdrop-blur-sm rounded-3xl border border-purple-500/20 mb-6 shadow-xl p-6 hover:scale-105 transition-transform duration-300 group">
                            <span className="block font-tilt text-purple-400 text-sm mb-1">{item.time}</span>
                            <h4 className="font-nico text-white text-lg md:text-xl group-hover:text-purple-200 transition-colors">{item.title}</h4>
                            {item.speaker && <p className="font-tilt text-purple-300/80 text-sm mt-2">{item.speaker}</p>}
                        </div>
                    ))}
                </div>

                {/* Center Column - Venue 1 (Longer list) */}
                <div className="flex flex-col items-center order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                    <h3 className="font-nico text-white text-3xl md:text-4xl mb-8 tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Venue 1</h3>
                    {[
                        { time: "09:00 AM", title: "Opening Ceremony", color: "bg-[#7B4B74]" },
                        { time: "10:00 AM", title: "Microwave Remote Sensing: From RISAT to Chandrayaan", speaker: "Dr. Shiv Mohan", color: "bg-[#7B4B74]" },
                        { time: "11:30 AM", title: "Atmospheric & Space Sciences", speaker: "Dr. A. Chandrasekhar", color: "bg-[#2E1C3B]" },
                        { time: "01:00 PM", title: "Lunch Break", color: "bg-[#2E1C3B]" },
                        { time: "02:30 PM", title: "Starship Engineering", color: "bg-[#7B4B74]" },
                        { time: "04:00 PM", title: "Closing Remarks", color: "bg-[#7B4B74]" }
                    ].map((item, i) => (
                        <div key={i} className={`w-full ${item.color}/90 backdrop-blur-sm rounded-3xl border border-white/10 mb-6 shadow-xl p-6 hover:scale-105 transition-transform duration-300 group`}>
                            <span className="block font-tilt text-white/70 text-sm mb-1">{item.time}</span>
                            <h4 className="font-nico text-white text-xl md:text-2xl group-hover:text-white transition-colors">{item.title}</h4>
                            {item.speaker && <p className="font-tilt text-white/80 text-sm mt-2">{item.speaker}</p>}
                        </div>
                    ))}
                </div>

                {/* Right Column - Venue 3 */}
                <div className="flex flex-col items-center lg:mt-32 order-3 lg:order-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <h3 className="font-nico text-purple-300 text-2xl md:text-3xl mb-8 tracking-widest drop-shadow-lg">Venue 3</h3>
                    {[
                        { time: "11:00 AM", title: "Vyomastra", speaker: "Workshop 2" },
                        { time: "03:00 PM", title: "Space Law Basics" }
                    ].map((item, i) => (
                        <div key={i} className="w-full bg-[#2E1C3B]/80 backdrop-blur-sm rounded-3xl border border-purple-500/20 mb-6 shadow-xl p-6 hover:scale-105 transition-transform duration-300 group">
                            <span className="block font-tilt text-purple-400 text-sm mb-1">{item.time}</span>
                            <h4 className="font-nico text-white text-lg md:text-xl group-hover:text-purple-200 transition-colors">{item.title}</h4>
                        </div>
                    ))}
                </div>

            </div>

            {/* Balloon Top Right */}
            <img
                src="/hotairbaloon.png"
                alt="Balloon"
                className="absolute top-[10%] md:top-[15%] right-0 w-[120px] md:w-[350px] translate-x-1/4 z-10 object-contain drop-shadow-[0_0_30px_rgba(255,100,0,0.5)] animate-float"
            />

            {/* Balloon Bottom Left */}
            <img
                src="/hotairbaloon.png"
                alt="Balloon"
                className="absolute bottom-[5%] md:bottom-[10%] left-0 w-[120px] md:w-[350px] -translate-x-1/4 z-10 object-contain drop-shadow-[0_0_30px_rgba(255,100,0,0.5)] bg-blend-overlay rotate-[15deg]"
            />

        </div>
    );
};

export default Schedule;
