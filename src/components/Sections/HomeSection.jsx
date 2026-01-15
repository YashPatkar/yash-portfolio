import { ChevronUp, Briefcase } from 'lucide-react';
import FadeIn from '../Layout/FadeIn'; // Import the helper we just made
import CONTACT from '../data/resume';


const HomeSection = ({ setShowDetails }) => {
    return (
        <section className="h-screen w-screen flex flex-col justify-center px-10 md:px-32 relative shrink-0 border-r border-white/5">
            <FadeIn>
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-bold tracking-widest w-fit">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        {CONTACT.home.status}
                    </div>
                    {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/10 border border-highlight/30 text-highlight font-mono text-xs font-bold tracking-widest w-fit">
                        <Briefcase size={12} />
                        {CONTACT.home.level}
                    </div> */}
                </div>

                <h1 className="font-display text-[15vw] leading-[0.8] text-white">
                    YASH<br/><span className="inline-block mt-5">PATKAR</span><span className="text-accent">.</span>
                </h1>
                
                <div className="mt-8 font-mono text-white/50 text-xl md:text-2xl flex items-center gap-2">
                    <div className="animate-pulse">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    SOFTWARE ENGINEER
                </div>
                
                <div className="mt-12 flex items-center gap-6">
                    <button onClick={() => setShowDetails(true)} className="flex items-center gap-2 text-white hover:text-accent transition-colors border-b border-white/20 pb-1">
                        Read Full Summary <ChevronUp size={16} />
                    </button>
                </div>
            </FadeIn>
        </section>
    );
};

export default HomeSection;
