import { useEffect, useRef, useState } from 'react';

// --- MATRIX GLITCH BACKGROUND (With Delay & Blur) ---
const MatrixGlitch = () => {
    const canvasRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger fade-in after 2 seconds
        const timer = setTimeout(() => setIsVisible(true), 2000);
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\*&^%$#@!";
        const charSize = 14;
        const columns = width / charSize;
        const drops = new Array(Math.ceil(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#22c55e'; 
            ctx.font = `${charSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                if (Math.random() > 0.97) ctx.fillText(text, i * charSize, drops[i] * charSize);
                if (drops[i] * charSize > height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className={`fixed inset-0 z-0 pointer-events-none mix-blend-screen transition-opacity duration-200 ${isVisible ? 'opacity-15' : 'opacity-15'}`} 
        />
    );
};


export default MatrixGlitch;