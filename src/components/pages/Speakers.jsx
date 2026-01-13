
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

            {/* Speakers Flip Cards */}
            <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 perspective-1000">
                {[
                    // {
                    //     name: "Dr. Shiv Mohan",
                    //     role: "Chief Guest & Speaker (Talk Session 1)",
                    //     designation: "Former Project Director RISAT/ISRO; Visiting Professor at CEPT and Gujarat University; IEEE GRSS India Liaison.",
                    //     image: "/mesac550sbi.jpeg",
                    //     topic: "Microwave Remote Sensing: From RISAT to Chandrayaan: Exploring Earth and the Moon with Radar",
                    //     bio: [
                    //         "He served at ISRO for over 33 years (1978–2011), contributing extensively to microwave and radar remote sensing technologies.",
                    //         "He was the Chief Architect and Project Director of India's first RISAT (Radar Imaging Satellite) utilization program.",
                    //         "He played a lead role in planetary science missions, contributing to the Chandrayaan-1 Mini-SAR lunar water-ice detection model and the Chandrayaan-2 dual-frequency SAR payload.",
                    //         "He has authored over 320 research publications and books like Chandrayaan-1 Mini SAR and Smart Buildings and Cities Using Remote Sensing and GIS."
                    //     ]
                    // },
                    {
                        name: "Dr. A. Chandrashekhar",
                        role: "Speaker (Talk Session 2)",
                        designation: "Outstanding Professor at the Indian Institute of Space Science and Technology (IIST) and Dean of Research and Development.",
                        image: "/A Chandrasekhar.jpeg",
                        topic: "Atmospheric & Space Sciences",
                        bio: [
                            "He holds a PhD from IISc Bangalore and achieved University First Rank during his Master's in Meteorology.",
                            "He spent over two decades at IIT Kharagpur, where he headed the Center for Ocean River Atmosphere and Land Sciences (CORAL).",
                            "With nearly 38 years of teaching experience, he has published seventy journal papers and authored the textbook Basics of Atmospheric Science.",
                            "He received the Astronautical Society of India Award for his contributions to Space Sciences."
                        ]
                    },
                    {
                        name: "Shrushti Patil",
                        role: "Workshop 1 Lead",
                        designation: "Founder of SHe In Space; Space Biologist; Astrobiology Researcher; R&D Astronaut Candidate at Titans Space Industries.",
                        image: "/Shrushti Patil pic.jpeg",
                        topic: "Opportunities in space biology, with a special focus on how science communication plays a critical role in shaping awareness, careers, and public engagement in emerging space sciences.",
                        bio: [
                            "She works at the intersection of life sciences, microgravity research, and space exploration.",
                            "She has been part of two space missions with ResearchSat (Australia), focusing on life-science experiments in microgravity.",
                            "Her academic background is in Environmental Sciences and Biodiversity.",
                            "She leads science communication initiatives such as 'Beyond Petri Dish' and 'Space Life Simplified'."
                        ]
                    }
                ].map((speaker, index) => (
                    <div
                        key={index}
                        className="group relative h-[600px] w-full [perspective:1000px] animate-fade-in-up"
                        style={{ animationDelay: `${index * 200}ms` }}
                    >
                        {/* Card Inner Container - Handles Rotation */}
                        <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-[2rem]">

                            {/* FRONT SIDE */}
                            <div className="absolute inset-0 h-full w-full rounded-[2rem] overflow-hidden bg-[#2E1C3B] border border-white/10 [backface-visibility:hidden]">
                                {/* Image Cover */}
                                <div className="h-full w-full">
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Overlay Gradient for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1025] via-transparent to-transparent opacity-90"></div>
                                </div>

                                {/* Front Content - Bottom Aligned */}
                                <div className="absolute bottom-0 left-0 w-full p-8 text-center bg-black/30 backdrop-blur-sm border-t border-white/10">
                                    <h3 className="font-nico text-white text-3xl mb-2 drop-shadow-lg">{speaker.name}</h3>
                                    <p className="font-tilt text-purple-300 text-sm font-bold uppercase tracking-wider mb-2">{speaker.role}</p>
                                    <p className="font-tilt text-white/80 text-xs md:text-sm line-clamp-2">{speaker.designation}</p>
                                </div>
                            </div>

                            {/* BACK SIDE */}
                            <div className="absolute inset-0 h-full w-full rounded-[2rem] bg-[#1E112A]/95 text-white p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] border border-purple-500/30 flex flex-col overflow-y-auto">
                                <h3 className="font-nico text-purple-300 text-2xl mb-4 text-center sticky top-0 bg-[#1E112A]/95 py-2 z-10 border-b border-white/10">
                                    {speaker.name}
                                </h3>

                                <div className="mb-6 flex-grow">
                                    <h4 className="font-tilt text-purple-400 text-sm italic mb-3 text-center">{speaker.designation}</h4>
                                    <ul className="space-y-3">
                                        {speaker.bio.map((point, i) => (
                                            <li key={i} className="font-tilt text-white/90 text-sm leading-relaxed flex items-start text-left">
                                                <span className="mr-2 text-purple-500 mt-1">➤</span>
                                                <span className="opacity-90">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto bg-purple-900/20 rounded-xl p-4 border border-purple-500/20 shrink-0">
                                    <h4 className="font-nico text-purple-300 text-sm mb-1 uppercase tracking-widest">Topic</h4>
                                    <p className="font-tilt text-white italic text-sm">
                                        "{speaker.topic}"
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Speakers;
