import React from 'react';

const Navigation = ({ currentSection }) => {
    const sections = ['HOME', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'];
    
    const handleNavClick = (index) => {
        const viewportHeight = window.innerHeight;
        window.scrollTo({ top: index * viewportHeight, behavior: 'smooth' });
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center bg-linear-to-b from-black/80 to-transparent backdrop-blur-[2px]">
            <div className="font-mono text-accent font-bold tracking-widest text-sm">{'<YASH PATKAR />'}</div>
            <div className="hidden md:flex gap-8">
                {sections.map((sec, i) => {
                    let isActive = false;
                    if(currentSection === 'home' && i === 0) isActive = true;
                    if(currentSection === 'skills' && i === 1) isActive = true;
                    if(currentSection === 'projects' && i === 2) isActive = true;
                    if(currentSection === 'experience' && i === 3) isActive = true;
                    if(currentSection === 'contact' && i === 4) isActive = true;
                    
                    return (
                        <button 
                            key={sec} 
                            onClick={() => handleNavClick(i)} 
                            className={`font-mono text-xs tracking-widest transition-all duration-300 ${isActive ? 'text-accent scale-110' : 'text-white/40 hover:text-white'}`}
                        >
                            0{i+1} {sec}
                        </button>
                    )
                })}
            </div>
            <div className="w-20"></div> 
        </div>
    );
};

export default Navigation;