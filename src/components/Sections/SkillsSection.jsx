import { motion } from 'framer-motion';
import { Terminal, Layers } from 'lucide-react';
import CONTACT from '../data/resume';
import FadeIn from '../Layout/FadeIn';
import GlareHover from '../Animations/GlareHover';
import BlurText from '../Animations/BlurText';

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
                    <BlurText
                        text={CONTACT.skills.hook}
                        as="h3"
                        animateBy="words"
                        direction="top"
                        delay={80}
                        className="text-4xl md:text-6xl font-bold text-white mb-8"
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
                        {CONTACT.skills.categories.map((cat, i) => (
                            <motion.div 
                                key={i} 
                                className="border-l-2 border-white/10 pl-4 group cursor-pointer relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ x: 4 }}
                            >
                                <motion.div 
                                    className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                                    layoutId={`skill-${i}`}
                                />
                                <div className="text-white/40 font-mono text-sm mb-2 group-hover:text-accent transition-colors">0{i+1}</div>
                                <div className="text-white font-bold text-lg group-hover:text-accent transition-colors">{cat}</div>
                            </motion.div>
                        ))}
                    </div>

                    <GlareHover
                        width="fit-content"
                        height="fit-content"
                        background="rgba(255,255,255,0.02)"
                        borderRadius="0.6rem"
                        borderColor="rgba(255,255,255,0.20)"
                        glareColor="#7df9ff"
                        glareOpacity={0.16}
                        glareSize={220}
                    >
                        <motion.button
                            onClick={() => setShowDetails(true)}
                            className="group border border-white/20 bg-transparent hover:bg-white/10 text-white px-8 py-4 font-bold rounded-lg transition-all flex items-center gap-4 relative overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">VIEW TECHNICAL SKILLS</span>
                            <motion.div
                                className="bg-accent text-black rounded-full p-1 relative z-10"
                                whileHover={{ rotate: 45 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <Layers size={20} />
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 bg-linear-to-r from-accent/0 via-accent/10 to-accent/0"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                        </motion.button>
                    </GlareHover>
                </FadeIn>
            </div>
        </section>
    );
};

export default SkillsSection;
