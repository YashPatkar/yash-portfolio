import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import your modular components
import Aurora from './components/Background/Aurora';
import ClickSpark from './components/Animations/ClickSpark';
import MainContent from './components/MainContent';
import BlobCursor from './components/Layout/BlobCursor';
import Ribbons from './components/Animations/Ribbons';


const App = () => {
    // Set to true to skip the opening terminal sequence as requested
    const [booted, setBooted] = useState(true);

    return (
      <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      // FIX: Removed 'overflow-hidden' here. This allows position: sticky to work in children.
      className="relative w-full min-h-screen bg-black text-white"
      >
        {/* <div style={{ height: '500px', position: 'relative'}}>
          <Ribbons
            baseThickness={10}
            colors={["#5227FF"]}
            speedMultiplier={0.5}
            maxAge={600}
            enableFade={false}
            enableShaderEffect={false}
          />
        </div> */}
        {/* 1. Background Layer (Fixed Position) */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
          <Aurora
            colorStops={['#2dd4bf', '#60a5fa', '#86efac']}
            amplitude={0.95}
            blend={0.6}
            speed={0.7}
          />
        </div>
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.85)_100%)]" />

        {/* 2. Foreground Layer (Scrollable) */}
        <ClickSpark sparkColor="#7df9ff" sparkSize={9} sparkRadius={20} sparkCount={10} duration={420}>
          <MainContent />
        </ClickSpark>
      </motion.div>
    );
};

export default App;