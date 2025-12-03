import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; 
import BottomDrawer from './Layout/BottomDrawer';
import CONTACT from './data/resume';
import ScrollProgress from './Layout/ScrollProgress'; 
import Navigation from './Layout/Navigation';

// Import Section Components
import ContactSection from './Sections/ContactSection';
import ExperienceSection from './Sections/ExperienceSection';
import ProjectsSection from './Sections/ProjectsSection';
import SkillsSection from './Sections/SkillsSection';
import HomeSection from './Sections/HomeSection';

const MainContent = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    
    // FIX 1: Exact calculation for 5 sections (-400vw moves 4 screens left)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-400vw"]);
    
    const [showDetails, setShowDetails] = useState(false);
    const [currentSection, setCurrentSection] = useState("home");

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            // Logic for 5 sections (0.2 per section) timeline
            if (latest < 0.2) setCurrentSection("home");
            else if (latest < 0.4) setCurrentSection("skills");
            else if (latest < 0.6) setCurrentSection("projects");
            else if (latest < 0.8) setCurrentSection("experience");
            else setCurrentSection("contact");
        });
    }, [scrollYProgress]);
    
    // --- SCROLL BUTTONS LOGIC ---
    const scrollToNext = () => {
        const viewportHeight = window.innerHeight;
        const currentIndex = Math.round(window.scrollY / viewportHeight);
        if (currentIndex < 4) {
            window.scrollTo({ top: (currentIndex + 1) * viewportHeight, behavior: 'smooth' });
        }
    };

    const scrollToPrevious = () => {
        const viewportHeight = window.innerHeight;
        const currentIndex = Math.round(window.scrollY / viewportHeight);
        if (currentIndex > 0) {
            window.scrollTo({ top: (currentIndex - 1) * viewportHeight, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <ScrollProgress />
            <Navigation currentSection={currentSection} />

            {/* FLOATING NAVIGATION BUTTONS */}
            {!showDetails && (
                <div className="fixed bottom-10 md:right-10 right-5 z-50 flex items-center gap-4">
                    
                    {/* BACK BUTTON: Hidden on Home */}
                    {currentSection !== 'home' && (
                        <button 
                            onClick={scrollToPrevious}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/20 hover:border-gray-500 transition-all shadow-lg"
                        >
                            <span className="text-sm pb-1">&larr;</span>
                        </button>
                    )}

                    {/* NEXT BUTTON: Hidden on Contact */}
                    {currentSection !== 'contact' && (
                        <button 
                            onClick={scrollToNext}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/20 hover:border-gray-500 transition-all shadow-lg"
                        >
                            <span className="text-md pb-1">&rarr;</span> 
                        </button>
                    )}
                </div>
            )}

            {/* SCROLL CONTAINER: 500vh for 5 sections */}
            <div ref={targetRef} className="h-[500vh] relative">
                {/* Ghost Snap Points for subtle stop */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <div 
                        key={i} 
                        className="absolute w-full h-screen snap-start pointer-events-none" 
                        style={{ top: `${i * 100}vh` }} 
                    />
                ))}

                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-0">
                        
                        {/* 1. HOME */}
                        <HomeSection setShowDetails={setShowDetails} />

                        {/* 2. SKILLS */}
                        <SkillsSection setShowDetails={setShowDetails} />

                        {/* 3. PROJECTS */}
                        <ProjectsSection setShowDetails={setShowDetails} />

                        {/* 4. EXPERIENCE */}
                        <ExperienceSection setShowDetails={setShowDetails} />

                        {/* 5. CONTACT */}
                        <ContactSection setShowDetails={setShowDetails} />
                    
                    </motion.div>
                </div>
            </div>

            <BottomDrawer 
                isOpen={showDetails} 
                setIsOpen={setShowDetails} 
                currentSection={currentSection} 
                data={CONTACT}
            />
        </div>
    );
};

export default MainContent;