

"use client";
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#about' },
        { label: 'Speakers', href: '#speakers' },
        { label: 'Schedule', href: '#schedule' },
        { label: 'Tickets', href: '#tickets' },
        { label: 'Ambassador', href: 'https://spaceup-ambassador.sedscusat.com/', external: true }
    ];

    return (
        <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300">
            <div className="relative bg-[#2E1C3B]/60 backdrop-blur-xl rounded-full px-6 md:px-8 py-3 md:py-4 flex justify-between items-center border border-white/10 shadow-[0_0_20px_rgba(107,33,168,0.3)]">
                {/* Logo */}
                <div className="shrink-0 mr-auto flex items-center gap-3">
                    <div className="w-auto h-10 md:h-12 -translate-y-1">
                        <img src="/spaceup-new-logo.png" alt="SpaceUp Logo" className="w-auto h-full object-contain" />
                    </div>
                </div>

                {/* Hamburger Menu (Mobile only) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white p-2 focus:outline-none z-50 relative"
                    aria-label="Toggle menu"
                >
                    <div className="space-y-1.5">
                        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-end w-full gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : "_self"}
                            rel={item.external ? "noopener noreferrer" : ""}
                            className="font-nico text-white text-sm lg:text-base tracking-widest hover:text-purple-300 transition-colors uppercase relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`absolute top-full left-0 w-full mt-2 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-[#2E1C3B]/95 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center gap-6 border border-white/10 shadow-2xl">
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : "_self"}
                            rel={item.external ? "noopener noreferrer" : ""}
                            onClick={() => setIsOpen(false)}
                            className="font-nico text-white text-lg tracking-widest hover:text-purple-300 transition-colors uppercase animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
