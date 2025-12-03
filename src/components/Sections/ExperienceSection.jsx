import { useState } from 'react';
import { Server } from 'lucide-react';
import FadeIn from '../Layout/FadeIn'; // Import the helper we just made
import CONTACT from '../data/resume';

const ExperienceSection = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <section className="h-screen w-screen flex items-center justify-center px-10 md:px-32 shrink-0 border-r border-white/5">
            <div className="max-w-5xl">
                <FadeIn>
                    <h2 className="font-display text-6xl md:text-8xl text-white mb-16">Internships</h2>
                </FadeIn>
                <div className="space-y-12 border-l border-white/10 pl-8">
                    {CONTACT.experience.map((exp, i) => (
                        <FadeIn key={i} delay={i * 0.2}>
                            <div className="relative group cursor-pointer" onClick={() => setShowDetails(true)}>
                                <div className="absolute -left-[37px] top-2 w-4 h-4 bg-black border border-accent rounded-full group-hover:bg-accent transition-colors"></div>
                                <div className="font-mono text-accent mb-1">{exp.time}</div>
                                <h3 className="text-3xl font-bold text-white group-hover:text-accent transition-colors">{exp.company}</h3>
                                <div className="text-xl text-white/50 mb-2">{exp.role}</div>
                                <div className="flex items-center gap-2 text-white/80">
                                    <Server size={16} />
                                    <p>{exp.hook}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
