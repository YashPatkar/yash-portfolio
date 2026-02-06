import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import FadeIn from '../Layout/FadeIn'; // Import the helper we just made
import CONTACT from '../data/resume';

const ExperienceSection = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <section className="h-screen w-screen flex items-center justify-center px-10 md:px-32 shrink-0 border-r border-white/5">
            <div className="max-w-5xl">
                <FadeIn>
                    <h2 className="font-display text-6xl md:text-8xl text-white mb-16">Work</h2>
                </FadeIn>
                <div className="space-y-12 border-l border-white/10 pl-8 relative">
                    <div className="absolute -left-[2px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent opacity-30"></div>
                    {CONTACT.experience.map((exp, i) => (
                        <FadeIn key={i} delay={i * 0.2}>
                            <motion.div 
                                className="relative group cursor-pointer" 
                                onClick={() => setShowDetails(true)}
                                whileHover={{ x: 8 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div 
                                    className="absolute -left-[37px] top-2 w-4 h-4 bg-black border-2 border-accent rounded-full group-hover:bg-accent transition-all shadow-lg shadow-accent/50"
                                    whileHover={{ scale: 1.3 }}
                                />
                                <div className="font-mono text-accent mb-1 text-sm tracking-wider">{exp.time}</div>
                                <h3 className="text-3xl font-bold text-white group-hover:text-accent transition-colors mb-1">{exp.company}</h3>
                                <div className="text-xl text-white/50 mb-3 group-hover:text-white/70 transition-colors">{exp.role}</div>
                                <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                    <Server size={16} className="text-accent/70 group-hover:text-accent transition-colors" />
                                    <p className="text-sm md:text-base">{exp.hook}</p>
                                </div>
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-r"
                                    initial={{ scaleY: 0 }}
                                    whileHover={{ scaleY: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
