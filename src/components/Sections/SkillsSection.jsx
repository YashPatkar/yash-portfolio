import { Terminal, Layers } from 'lucide-react';
import CONTACT from '../data/resume';
import FadeIn from '../Layout/FadeIn';

const SkillsSection = ({ setShowDetails }) => {
    return (
        <section className="h-screen w-screen flex items-center justify-center px-10 md:px-32 shrink-0 border-r border-white/5">
            <div className="max-w-5xl">
                <FadeIn>
                    <h2 className="font-display text-[8vw] text-white/10 absolute top-20 left-10 -z-10">SKILLS</h2>
                    <div className="flex items-center gap-3 mb-6">
                        <Terminal className="text-accent" size={32} />
                        <span className="font-mono text-accent text-sm tracking-widest">TECHNICAL STACK</span>
                    </div>
                    <div className="text-4xl md:text-6xl font-bold text-white mb-8">
                        {CONTACT.skills.hook}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                        {CONTACT.skills.categories.map((cat, i) => (
                            <div key={i} className="border-l-2 border-white/10 pl-4">
                                <div className="text-white/40 font-mono text-sm mb-2">0{i+1}</div>
                                <div className="text-white font-bold text-lg">{cat}</div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => setShowDetails(true)} 
                        className="group border border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 font-bold rounded-lg transition-all flex items-center gap-4"
                    >
                        VIEW TECHNICAL SKILLS
                        <div className="bg-accent text-black rounded-full p-1 group-hover:rotate-45 transition-transform">
                            <Layers size={20} />
                        </div>
                    </button>
                </FadeIn>
            </div>
        </section>
    );
};

export default SkillsSection;
