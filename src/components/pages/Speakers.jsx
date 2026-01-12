
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

            {/* Speakers List - Detailed Wide Cards */}
            <div className="relative z-10 w-full max-w-6xl flex flex-col gap-16 px-4">
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
                        name: "Dr. A. Chandrasekhar", // Updated name as per request, user reverted to short form or asked for full but then edited file manually. Using requested full name or best fit. User edited back to "A Chandrasekar" in previous turn but full name was "Dr. Anantharaman Chandrasekar". I will use the Title from prompt: "Dr. A. Chandrashekhar"
                        role: "Speaker (Talk Session 2)",
                        designation: "Outstanding Professor at the Indian Institute of Space Science and Technology (IIST) and Dean of Research and Development.",
                        image: "/A Chandrasekhar.jpeg",
                        topic: "Atmospheric & Space Sciences", // Inferred
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
                        className={`flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 bg-[#2E1C3B]/80 backdrop-blur-md rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl animate-fade-in-up hover:border-purple-500/30 transition-colors duration-500 group`}
                        style={{ animationDelay: `${index * 200}ms` }}
                    >
                        {/* Image Section */}
                        <div className="flex-shrink-0 w-full md:w-1/3 flex flex-col items-center">
                            <div className="relative w-64 h-64 md:w-72 md:h-72 mb-6 transition-transform duration-500 group-hover:scale-105">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-glow"></div>
                                <div className="relative w-full h-full rounded-full bg-[#1a1025] border-4 border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-nico text-white text-2xl md:text-3xl mb-2 drop-shadow-lg">{speaker.name}</h3>
                                <p className="font-tilt text-purple-300 text-sm md:text-base font-bold tracking-wider uppercase mb-2">{speaker.role}</p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-grow flex flex-col text-center md:text-left">
                           
                            {/* Designation */}
                            <div className="mb-6">
                                <h4 className="font-nico text-purple-200/80 text-lg mb-2">Designation</h4>
                                <p className="font-tilt text-white/90 text-sm md:text-base leading-relaxed">
                                    {speaker.designation}
                                </p>
                            </div>

                            {/* Bio */}
                            <div className="mb-6">
                                <h4 className="font-nico text-purple-200/80 text-lg mb-2">Background & Expertise</h4>
                                <ul className="space-y-2">
                                    {speaker.bio.map((point, i) => (
                                        <li key={i} className="font-tilt text-white/80 text-sm leading-relaxed flex items-start">
                                            <span className="mr-2 text-purple-400 mt-1">•</span>
                                            <span className="text-left">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                             {/* Topic */}
                             <div className="mt-auto bg-purple-900/30 rounded-2xl p-4 border border-purple-500/20">
                                <h4 className="font-nico text-purple-300 text-lg mb-1">Topic</h4>
                                <p className="font-tilt text-white text-sm md:text-base italic">
                                    "{speaker.topic}"
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Speakers;
