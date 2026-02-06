import { motion } from 'framer-motion';
import { Download, Cpu, Github, Linkedin, Mail } from 'lucide-react';
import FadeIn from '../Layout/FadeIn'; // Import the helper we just made

const ContactSection = ({ setShowDetails }) => {
    return (
        <section className="h-screen w-screen flex flex-col items-center justify-center px-10 md:px-32 shrink-0 relative">
            <FadeIn>
                <div className="text-center z-10">
                    <div className="font-mono text-accent mb-4">READY TO DEPLOY?</div>
                    <h2 className="font-display text-[10vw] leading-none text-white mb-8 hover:text-white/80 transition-colors cursor-pointer">
                        <a href="mailto:yash.patkar2004@gmail.com">LET'S TALK</a>
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10">
                        <motion.a 
                            href="/resume.pdf" 
                            download="Yash_Patkar_Resume.pdf"
                            className="bg-white text-black px-6 md:px-8 py-3 md:py-4 font-bold rounded-lg hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/20 hover:shadow-accent/50 relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                animate={{ y: [0, -2, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Download size={20} />
                            </motion.span>
                            <span className="relative z-10">Download Resume</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.a>
                        <motion.button 
                            onClick={() => setShowDetails(true)} 
                            className="border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 font-bold rounded-lg hover:bg-white/10 hover:border-accent transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Cpu size={20} /> 
                            <span>Contact Details</span>
                        </motion.button>
                    </div>

                    <div className="flex gap-6 md:gap-8 justify-center items-center">
                        {[
                            { icon: Github, href: "https://github.com/yashpatkar", color: "hover:text-white" },
                            { icon: Linkedin, href: "https://www.linkedin.com/in/yash-patkar", color: "hover:text-blue-500" },
                            { icon: Mail, href: "mailto:yash.patkar2004@gmail.com", color: "hover:text-accent" }
                        ].map(({ icon: Icon, href, color }, i) => (
                            <motion.a
                                key={i}
                                href={href}
                                target={href.startsWith('http') ? "_blank" : undefined}
                                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className={`text-white/50 ${color} transition-all relative group`}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon size={32} className="relative z-10" />
                                <motion.div
                                    className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={false}
                                />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </FadeIn>
            <div className="absolute bottom-10 font-mono text-white/20 text-xs">MUMBAI, INDIA // {new Date().getFullYear()}</div>
        </section>
    );
};

export default ContactSection;
