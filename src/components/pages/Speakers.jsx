
const Speakers = () => {
    return (
        <div id="speakers" className="relative w-full min-h-screen z-10 py-24 px-4 md:px-8 flex flex-col items-center overflow-hidden bg-black/40">

            {/* Deep Space Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Title */}
            <h2 className="relative z-10 font-nico text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-5xl md:text-7xl mb-20 text-center drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] animate-fade-in-up">
                Speakers
            </h2>

            {/* Grid Container */}
            <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                {[
                    {
                        name: "Dr. Shiv Mohan",
                        role: "Chief Guest & Speaker",
                        designation: "Former Project Director RISAT/ISRO",
                        image: "/Shiv Mohan pic.jpg",
                        topic: "Microwave Remote Sensing: RISAT to Chandrayaan",
                        bio: [
                            "33+ years at ISRO, leading microwave remote sensing.",
                            "Architect of India's RISAT program.",
                            "Key contributor to Chandrayaan-1 & 2 missions."
                        ]
                    },
                    {
                        name: "Dr. A. Chandrashekhar",
                        role: "Speaker",
                        designation: "Outstanding Professor at IIST",
                        image: "/A Chandrasekhar.jpeg",
                        topic: "Atmospheric & Space Sciences",
                        bio: [
                            "Dean of R&D at IIST with 38 years teaching exp.",
                            "Former Head of CORAL at IIT Kharagpur.",
                            "ASI Awardee for contributions to Space Sciences."
                        ]
                    },
                    {
                        name: "Shrushti Patil",
                        role: "Workshop Lead",
                        designation: "Founder, She In Space",
                        image: "/Shrushti Patil pic.jpeg",
                        topic: "Space Biology & Science Comm.",
                        bio: [
                            "R&D Astronaut Candidate at Titans Space Industries.",
                            "Microgravity researcher with ResearchSat.",
                            "Leading 'Beyond Petri Dish' initiative."
                        ]
                    }
                ].map((speaker, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col items-center p-6 md:p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-purple-500/50 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {/* Glowing Ring Avatar */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"></div>
                            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 p-1 bg-black/50">
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="w-full h-full rounded-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center w-full">
                            <h3 className="font-nico text-white text-2xl md:text-3xl mb-1 tracking-wide group-hover:text-purple-300 transition-colors">
                                {speaker.name}
                            </h3>
                            <p className="font-tilt text-purple-400 text-sm font-bold tracking-widest uppercase mb-4">
                                {speaker.role}
                            </p>
                            
                            {/* Topic Badge */}
                            <div className="inline-block bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
                                <p className="font-tilt text-purple-200 text-xs md:text-sm italic">
                                    "{speaker.topic}"
                                </p>
                            </div>

                            {/* Bio List */}
                            <div className="w-full bg-black/20 rounded-xl p-4 border border-white/5 text-left">
                                <p className="font-tilt text-white/70 text-xs mb-3 text-center border-b border-white/10 pb-2">
                                    {speaker.designation}
                                </p>
                                <ul className="space-y-2">
                                    {speaker.bio.map((point, i) => (
                                        <li key={i} className="flex items-start font-tilt text-gray-300 text-xs md:text-sm leading-relaxed">
                                            <span className="text-pink-500 mr-2 mt-0.5">❖</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Speakers;
