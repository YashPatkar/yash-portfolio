import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
                    <div className="border-l-2 border-accent pl-6 mb-10 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-accent rounded-full blur-sm opacity-50"></div>
                        <p className="text-xl text-white/80 leading-relaxed font-light max-w-2xl">
                            Real-world backend work focused on building REST APIs, designing clean database schemas,
                            fixing <span className="text-white font-bold relative group">
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                                slow queries
                            </span>, preventing
                            <span className="text-white font-bold relative group">
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                                {' '}double bookings
                            </span>, and keeping
                            <span className="text-white font-bold relative group">
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                                {' '}data reliable
                            </span> under real usage.
                        </p>
                    </div>

                    <motion.button
                        onClick={() => setShowDetails(true)}
                        className="group border border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 font-bold rounded-lg transition-all flex items-center gap-4 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="relative z-10">VIEW PROJECT CASE STUDIES</span>
                        <motion.div 
                            className="bg-accent text-black rounded-full p-1 relative z-10"
                            whileHover={{ rotate: 45 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <ChevronUp size={20} />
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.button>
                </FadeIn>
            </div>
        </section>
    );
};

export default ProjectsSection;
