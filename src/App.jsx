import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import your modular components
import MatrixGlitch from './components/Background/MatrixGlitch';
import MainContent from './components/MainContent';
import CustomCursor from './components/Layout/CustomCursor';

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
        <CustomCursor />
        {/* 1. Background Layer (Fixed Position) */}
        <MatrixGlitch />

        {/* 2. Foreground Layer (Scrollable) */}
        <MainContent />
      </motion.div>
    );
};

export default App;