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
                    
                    <div className="flex gap-6 justify-center mb-10">
                        <a href="/resume.pdf" 
                            download="Yash_Patkar_Resume.pdf" // This is the name the user sees when downloading
                            className="bg-white text-black px-8 py-4 font-bold rounded hover:bg-accent hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <Download size={20} /> Download Resume
                        </a>
                        <button onClick={() => setShowDetails(true)} className="border border-white/20 text-white px-8 py-4 font-bold rounded hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Cpu size={20} /> Contact Details
                        </button>
                    </div>

                    <div className="flex gap-8 justify-center items-center">
                        <a href="https://github.com/yashpatkar" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all">
                            <Github size={32} />
                        </a>
                        <a href="https://www.linkedin.com/in/yash-patkar" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-blue-500 hover:scale-110 transition-all">
                            <Linkedin size={32} />
                        </a>
                        <a href="mailto:yash.patkar2004@gmail.com" className="text-white/50 hover:text-accent hover:scale-110 transition-all">
                            <Mail size={32} />
                        </a>
                    </div>
                </div>
            </FadeIn>
            <div className="absolute bottom-10 font-mono text-white/20 text-xs">MUMBAI, INDIA // {new Date().getFullYear()}</div>
        </section>
    );
};

export default ContactSection;
