
const Footer = () => {
    return (
        <footer className="relative w-full z-10 py-12 px-8 overflow-hidden">
            {/* Background enhancement - Subtle glow at the bottom */}
            <div className="absolute inset-0 bg-[#2E1C3B]/40 backdrop-blur-md border-t border-white/10 z-0"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">

                {/* Logo & Tagline */}
                <div className="flex flex-col items-center mb-8">
                    <h2 className="font-nico text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-3xl md:text-5xl tracking-widest drop-shadow-sm mb-2">
                        SPACEUP
                    </h2>
                    <p className="font-tilt text-purple-200 text-sm md:text-base tracking-widest uppercase opacity-80">
                        Beyond the Horizon
                    </p>
                </div>

                {/* Navigation Links - Creative "Orbit" Layout concept (visualized as a clean row for usability) */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10">
                    {[
                        { label: 'Home', href: '#' },
                        { label: 'About', href: '#about' },
                        { label: 'Speakers', href: '#speakers' },
                        { label: 'Schedule', href: '#schedule' },
                        { label: 'Tickets', href: '#tickets' },
                        { label: 'Ambassador', href: 'https://spaceup-ambassador.sedscusat.com/', external: true }
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : "_self"}
                            rel={item.external ? "noopener noreferrer" : ""}
                            className="font-nico text-white/80 text-sm md:text-lg hover:text-white transition-all duration-300 relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
                        </a>
                    ))}
                </div>

                {/* Social Icons with Glow Effect */}
                <div className="flex gap-6 mb-12">
                    {[
                        { name: 'Twitter', path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                        { name: 'Instagram', path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10z" },
                        { name: 'LinkedIn', path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" }
                    ].map((icon) => (
                        <a
                            key={icon.name}
                            href="#"
                            className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 group"
                            aria-label={icon.name}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 md:w-6 md:h-6 text-white/80 group-hover:text-purple-300 transition-colors"
                            >
                                <path d={icon.path} />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-center border-t border-white/5 pt-6 w-full max-w-xl">
                    <p className="font-tilt text-white/40 text-xs md:text-sm">
                        &copy; 2025 SpaceUp. Made for the Stars.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
