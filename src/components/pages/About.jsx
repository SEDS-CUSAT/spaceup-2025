
const About = () => {
    return (
        <div id="about" className="relative w-full min-h-screen z-10 py-20 px-6 md:px-12 flex flex-col items-center">

            {/* About Section */}
            <h2 className="font-nico text-white text-4xl sm:text-5xl md:text-7xl mb-8 md:mb-12 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fade-in-up">
                About SPACEUP
            </h2>

            <div className="w-full max-w-5xl bg-[#2E1C3B]/60 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 md:p-12 mb-20 shadow-[0_0_50px_rgba(75,0,130,0.3)] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <p className="font-tilt text-white/90 text-lg md:text-2xl leading-relaxed text-left md:text-center">
                    SpaceUp is a community-driven unconference (the largest in India) that brings together students, educators, professionals, and space enthusiasts to exchange ideas and explore the future of space science.
                    <br /><br />
                    Designed to move beyond traditional conference formats, it encourages open discussions, collaboration, and active participation.
                    From cutting-edge research to real-world careers, Space Up creates a platform where curiosity meets conversation.
                    <br /><br />
                    It is a space to learn, share perspectives, and build meaningful connections.
                </p>
            </div>

            {/* Past Events Section */}
            <h2 className="font-nico text-white text-4xl sm:text-5xl md:text-7xl mb-8 md:mb-12 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                Past events
            </h2>

            <div className="w-full max-w-5xl flex flex-col gap-12 relative z-20">
                {/* SSS 2024 Card */}
                <div className="w-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative shadow-[0_0_40px_rgba(75,0,130,0.4)] animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                    <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="border-b border-white/10 pb-4 mb-2">
                            <h3 className="font-nico text-white text-3xl md:text-5xl mb-2 drop-shadow-lg">Students Space Summit (SSS) 2024</h3>
                            <p className="font-tilt text-purple-200 text-xl tracking-widest uppercase">A Legacy of Inspiration</p>
                        </div>
                        
                        <div className="font-tilt text-white/90 text-lg md:text-xl leading-relaxed space-y-4">
                            <p>
                                The Students Space Summit (SSS) 2024 was a one-day conference that brought together over 250 school students, college students, educators, and space professionals.
                                The summit served as a platform for knowledge exchange, discussion, and inspiration in space science and astronomy.
                            </p>
                            <p>
                                Renowned speakers from ISRO, science communication, astronomy, and student space communities shared diverse perspectives.
                                Interactive experiences such as a VR show, mini planetarium, and competitive quizzes enhanced participant engagement.
                            </p>
                            <p className="text-purple-300 font-semibold">
                                SSS 2024 fostered curiosity, critical thinking, and a growing student-led space community.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SOLSTICE 2025 Card */}
                <div className="w-full bg-gradient-to-br from-indigo-900/50 to-blue-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative shadow-[0_0_40px_rgba(59,130,246,0.3)] animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                    <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="border-b border-white/10 pb-4 mb-2">
                            <h3 className="font-nico text-white text-3xl md:text-5xl mb-2 drop-shadow-lg">SOLSTICE 2025</h3>
                            <p className="font-tilt text-blue-200 text-xl tracking-widest uppercase">Virtual Horizons</p>
                        </div>
                        
                        <div className="font-tilt text-white/90 text-lg md:text-xl leading-relaxed space-y-4">
                            <p>
                                Solstice 2025 was a five-day online summer space camp organized by IRES-SEDS CUSAT from 15th to 19th May 2025.
                                The camp engaged school and college students across Kerala through expert talks and interactive sessions.
                            </p>
                            <p>
                                Speakers included former ISRO scientists, aerospace professionals, and astrophotographers.
                                Activities such as quizzes and discussions encouraged active learning in a virtual setting.
                            </p>
                            <p className="text-blue-300 font-semibold">
                                Solstice 2025 created an accessible and inspiring platform for exploring space science and technology.
                            </p>
                        </div>
                    </div>
                </div>

                {/* STELLARX Card */}
                <div className="w-full bg-gradient-to-br from-pink-900/50 to-rose-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative shadow-[0_0_40px_rgba(236,72,153,0.3)] animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                    <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="border-b border-white/10 pb-4 mb-2">
                            <h3 className="font-nico text-white text-3xl md:text-5xl mb-2 drop-shadow-lg">STELLARX</h3>
                            <p className="font-tilt text-rose-200 text-xl tracking-widest uppercase">Innovate to Orbit</p>
                        </div>
                        
                        <div className="font-tilt text-white/90 text-lg md:text-xl leading-relaxed space-y-4">
                            <p>
                                StellarX was organized by IRES-SEDS CUSAT in collaboration with UL Space Club as part of the Kerala Innovation Festival 2025.
                                The event brought together students, space enthusiasts, and technology innovators.
                            </p>
                            <p>
                                It featured workshops and talks exploring space technology and innovation.
                                A key highlight was a hands-on satellite-making workshop led by the CEO of TESSAT Space.
                            </p>
                            <p className="text-rose-300 font-semibold">
                                StellarX emphasized experiential learning and real-world exposure to the space sector.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rocket Image */}
            <img
                src="/roket.png"
                alt="Rocket"
                className="absolute bottom-0 right-0 w-[150px] md:w-[400px] translate-y-10 md:translate-y-20 translate-x-10 md:translate-x-10 z-30 object-contain drop-shadow-[0_0_30px_rgba(255,100,0,0.5)] animate-float"
            />
        </div>
    );
};

export default About;
