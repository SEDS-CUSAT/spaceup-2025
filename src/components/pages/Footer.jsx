
const Footer = () => {
    return (
        <footer className="relative w-full z-10 py-12 px-8 overflow-hidden">
            {/* Background enhancement - Subtle glow at the bottom */}
            <div className="absolute inset-0 bg-[#2E1C3B]/40 backdrop-blur-md border-t border-white/10 z-0"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">

                {/* Logo & Tagline */}
                <div className="flex flex-col items-center mb-8">
                    <h2 className="font-nico text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 text-3xl md:text-5xl tracking-widest drop-shadow-sm mb-2">
                        SPACEUP
                    </h2>
                    <p className="font-tilt text-purple-200 text-sm md:text-base tracking-widest uppercase opacity-80">
                        Beyond the Horizon
                    </p>
                </div>

                {/* Navigation Links - Creative "Orbit" Layout concept (visualized as a clean row for usability) */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-8 md:mb-10">
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
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
                        </a>
                    ))}
                </div>

                <div className="flex gap-6 mb-12">
                    {[
                        { name: 'Facebook', href: 'https://www.facebook.com/SedsCusatIrescusat/', path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                        { name: 'Instagram', href: 'https://www.instagram.com/ires_cusat', path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                        { name: 'LinkedIn', href: 'https://www.linkedin.com/company/sedscusat/', path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" }
                    ].map((icon) => (
                        <a
                            key={icon.name}
                            href={icon.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 group"
                            aria-label={icon.name}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill={icon.name === 'Instagram' ? "currentColor" : "none"}
                                stroke={icon.name === 'Instagram' ? "none" : "currentColor"}
                                strokeWidth={icon.name === 'Instagram' ? "0" : "2"}
                                strokeLinecap={icon.name === 'Instagram' ? "round" : "round"}
                                strokeLinejoin={icon.name === 'Instagram' ? "round" : "round"}
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
                        &copy; 2026 SedsCusat. Made for the Stars.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
