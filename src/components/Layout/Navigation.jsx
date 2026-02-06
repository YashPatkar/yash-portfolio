import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = ({ currentSection }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const sections = ['HOME', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'];
    
    const handleNavClick = (index) => {
        const viewportHeight = window.innerHeight;
        window.scrollTo({ top: index * viewportHeight, behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    const getActiveIndex = () => {
        if(currentSection === 'home') return 0;
        if(currentSection === 'skills') return 1;
        if(currentSection === 'projects') return 2;
        if(currentSection === 'experience') return 3;
        if(currentSection === 'contact') return 4;
        return 0;
    };

    const activeIndex = getActiveIndex();

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 md:py-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5">
                <motion.a 
                    href="#home"
                    onClick={(e) => { e.preventDefault(); handleNavClick(0); }}
                    className="font-mono text-accent font-bold tracking-widest text-xs md:text-sm hover:text-accent/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {'<YASH PATKAR />'}
                </motion.a>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-6 items-center">
                    {sections.map((sec, i) => {
                        const isActive = i === activeIndex;
                        return (
                            <motion.button 
                                key={sec} 
                                onClick={() => handleNavClick(i)} 
                                className={`relative font-mono text-xs tracking-widest transition-all duration-300 px-3 py-1.5 rounded ${
                                    isActive 
                                        ? 'text-accent' 
                                        : 'text-white/40 hover:text-white'
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-accent/10 border border-accent/30 rounded"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">0{i+1} {sec}</span>
                            </motion.button>
                        )
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-white/80 hover:text-white transition-colors p-2"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 left-0 right-0 z-40 md:hidden bg-black/95 backdrop-blur-md border-b border-white/10"
                    >
                        <div className="flex flex-col py-4">
                            {sections.map((sec, i) => {
                                const isActive = i === activeIndex;
                                return (
                                    <motion.button
                                        key={sec}
                                        onClick={() => handleNavClick(i)}
                                        className={`text-left px-6 py-3 font-mono text-sm tracking-widest transition-colors ${
                                            isActive
                                                ? 'text-accent bg-accent/10 border-l-2 border-accent'
                                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }`}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        0{i+1} {sec}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;