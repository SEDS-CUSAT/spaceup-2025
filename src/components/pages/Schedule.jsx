const Schedule = () => {
    return (
        <div id="schedule" className="relative w-full min-h-screen z-10 py-24 px-4 md:px-8 flex flex-col items-center overflow-hidden bg-black/40">

            {/* Title */}
            <h2 className="font-nico text-white text-4xl sm:text-5xl md:text-7xl mb-16 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fade-in-up">
                Schedule
            </h2>

            <div className="w-full max-w-5xl relative z-20 flex flex-col items-center space-y-6">

                {/* 8:15 - 8:50 Registrations */}
                <TimelineItem time="8:15 AM - 8:50 AM" title="Registrations" />

                {/* 9:15 - 9:40 Inauguration */}
                <TimelineItem time="9:15 AM - 9:40 AM" title="Inauguration" variant="purple" />

                {/* 9:40 - 10:00 Refreshments */}
                <TimelineBreak time="9:40 AM - 10:00 AM" title="Refreshments" />

                {/* 10:00 - 11:00 Speaker 1 */}
                <TimelineItem 
                    time="10:00 AM - 11:00 AM" 
                    title="Microwave Remote Sensing" 
                    subtitle="Dr. Shiv Mohan (From RISAT to Chandrayaan)"
                    variant="glow"
                />

                {/* 11:00 - 12:00 Speaker 2 */}
                <TimelineItem 
                    time="11:00 AM - 12:00 PM" 
                    title="Satellite applications in atmospheric & oceanic sciences" 
                    subtitle="Prof A Chandrasekhar (IIST Professor)"
                    variant="glow"
                />

                {/* 12:00 - 1:15 Lunch */}
                <TimelineBreak time="12:00 PM - 01:15 PM" title="Lunch Break" />

                {/* 1:30 - 2:00 Concurrent: Interactive + Fun Zone */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
                    <Card time="01:30 PM - 02:00 PM" title="Interactive Quiz" subtitle="Space Quiz with Mascot" />
                    <Card time="Concurrent" title="Fun Zone Open" subtitle="Project Exhibition" />
                </div>

                {/* 2:30 - 4:00 Workshops & Startup Talks (Concurrent Grid) */}
                <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md animate-fade-in-up">
                    <h3 className="font-nico text-purple-300 text-xl md:text-2xl mb-6 text-center">Workshops & Startup Sessions (2:30 PM - 4:00 PM)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Card time="Exclusive Talk" title="G Levin (CEO KSPACE)" subtitle="" variant="purple" />
                        <Card time="Exclusive Talk" title="Edwin K Jayesh" subtitle="Advancing Space Tech in different domains" variant="purple" />
                        <Card time="Speaker Session" title="Sarath Lal" subtitle="Understanding Fundamental Physics" variant="purple" />
                        <Card time="Hands-on" title="Telescope Workshop" subtitle="Breakthrough Science Society (Mr. Harikumar)" variant="purple" />
                    </div>
                </div>

                {/* 4:15 - 5:30 MUP */}
                <TimelineItem time="04:15 PM - 05:30 PM" title="Model United Planets" variant="glow" />

                {/* 5:30 - 6:00 Conclusion */}
                <TimelineItem time="05:30 PM - 06:00 PM" title="Conclusion Ceremony" />

            </div>

            {/* Decorative Balloons */}
            <img src="/hotairbaloon.png" alt="Balloon" className="absolute top-[10%] right-0 w-[150px] md:w-[300px] z-10 opacity-80 animate-float" />
        </div>
    );
};

// Helper Components
const TimelineItem = ({ time, title, subtitle, variant }) => {
    const isGlow = variant === 'glow';
    const isPurple = variant === 'purple';
    
    return (
        <div className={`w-full flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] animate-fade-in-up
            ${isGlow ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 
              isPurple ? 'bg-[#2E1C3B]/80 border-purple-500/30' : 
              'bg-white/5 border-white/10'}`}>
            <div className="mb-2 md:mb-0 text-center md:text-left">
                <span className="block font-tilt text-purple-400 text-sm font-bold tracking-wider mb-1">{time}</span>
                <h3 className="font-nico text-white text-xl md:text-2xl">{title}</h3>
                {subtitle && <p className="font-tilt text-white/80 text-sm md:text-base mt-1">{subtitle}</p>}
            </div>
        </div>
    );
};

const TimelineBreak = ({ time, title, icon }) => (
    <div className="w-full max-w-2xl py-3 px-4 lg:px-6 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-wrap items-center justify-center align-center gap-x-4 gap-y-2 animate-fade-in-up opacity-80 text-center">
        {/* <span className="text-xl">{icon}</span> */}
        <span className="font-tilt text-white/60 text-xs">{time}</span>
        <span className="font-nico text-purple-200 text-lg mx-2">-</span>
        <h4 className="font-nico text-white/80 text-lg uppercase tracking-widest">{title}</h4>
        <span className="text-xl">{icon}</span>
    </div>
);

const Card = ({ time, title, subtitle, variant }) => (
    <div className={`flex flex-col p-5 rounded-2xl border backdrop-blur-sm hover:translate-y-[-5px] transition-transform duration-300
        ${variant === 'purple' ? 'bg-[#2E1C3B]/60 border-purple-500/20' : 'bg-white/5 border-white/10'}`}>
        <span className="font-tilt text-purple-400 text-xs font-bold uppercase mb-2">{time}</span>
        <h4 className="font-nico text-white text-lg mb-1">{title}</h4>
        {subtitle && <p className="font-tilt text-white/70 text-sm">{subtitle}</p>}
    </div>
);

export default Schedule;
