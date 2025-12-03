import React, { useState } from 'react';
import { Code2, ChevronUp } from 'lucide-react';
import FadeIn from '../Layout/FadeIn';

const ProjectsSection = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <section className="h-screen w-screen flex items-center justify-center px-10 md:px-32 shrink-0 border-r border-white/5 relative">
            {/* 3. PROJECTS */}
            <div className="max-w-5xl z-10">
                <FadeIn>
                    <h2 className="font-display text-[8vw] text-white/10 absolute top-20 left-10 -z-10">
                        PROJECTS
                    </h2>

                    <div className="flex items-center gap-3 mb-6">
                        <Code2 className="text-accent" size={32} />
                        <span className="font-mono text-accent text-sm tracking-widest">
                            SYSTEM ENGINEERING
                        </span>
                    </div>

                    {/* CONTEXT */}
                    <div className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        Backend systems built for <br />
                        <span className="text-white/50">correctness and performance.</span>
                    </div>

                    {/* CORE + CONNECT */}
                    <div className="border-l-2 border-accent pl-6 mb-10">
                        <p className="text-xl text-white/80 leading-relaxed font-light max-w-2xl">
                            Real-world backend work focused on building REST APIs, designing clean database schemas,
                            fixing <span className="text-white font-bold">slow queries</span>, preventing
                            <span className="text-white font-bold"> double bookings</span>, and keeping
                            <span className="text-white font-bold"> data reliable</span> under real usage.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowDetails(true)}
                        className="group border border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 font-bold rounded-lg transition-all flex items-center gap-4"
                    >
                        VIEW PROJECT CASE STUDIES
                        <div className="bg-accent text-black rounded-full p-1 group-hover:rotate-45 transition-transform">
                            <ChevronUp size={20} />
                        </div>
                    </button>
                </FadeIn>
            </div>
        </section>
    );
};

export default ProjectsSection;
