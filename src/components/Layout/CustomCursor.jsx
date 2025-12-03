import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    // We only need the reference for the Liquid Drop now
    const cursorRef = useRef(null); // The Liquid Drop

    // State for physics (Liquid Drop)
    const pos = useRef({ x: 0, y: 0 }); // Current smoothed position
    const set = useRef({ x: 0, y: 0 }); // Target (mouse) position

    // Timer reference for inactivity
    const timerRef = useRef(null);

    useEffect(() => {
        // --- 1. SETUP ---
        // Hide the default system cursor
        
        
        const cursor = cursorRef.current;
        
        // GSAP quickSetters for Liquid Drop (Instant updates for RequestAnimationFrame loop)
        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");
        const rotSet = gsap.quickSetter(cursor, "rotation", "deg");
        const sxSet = gsap.quickSetter(cursor, "scaleX");
        const sySet = gsap.quickSetter(cursor, "scaleY");
        
        // **REMOVED:** FollowerRef and quickTo setup for the outer ring.

        // --- 2. LIQUID PHYSICS LOOP ---
        const loop = () => {
            // Damping/Smoothing (controls how quickly the cursor chases the mouse)
            const dt = 0.2; 
            pos.current.x += (set.current.x - pos.current.x) * dt;
            pos.current.y += (set.current.y - pos.current.y) * dt;

            // Calculate velocity (difference between target and actual position)
            const vx = set.current.x - pos.current.x;
            const vy = set.current.y - pos.current.y;
            const speed = Math.sqrt(vx * vx + vy * vy);
            const angle = Math.atan2(vy, vx) * (180 / Math.PI); // Angle of movement

            // Stretch calculation (more stretch with higher speed)
            const stretch = Math.min(speed * 0.04, 0.6); // Cap the maximum stretch
            const scaleX = 1 + stretch;
            const scaleY = 1 - stretch * 0.55; // Compress vertically when stretching horizontally

            // Apply transformations to the Liquid Drop
            xSet(pos.current.x);
            ySet(pos.current.y);
            rotSet(angle);        
            sxSet(scaleX);        
            sySet(scaleY);        

            requestAnimationFrame(loop);
        };
        loop();

        // --- 3. EVENT LISTENERS & INACTIVITY LOGIC ---
        const onMouseMove = (e) => {
            // Update target coordinates (this is the only position update now)
            set.current.x = e.clientX;
            set.current.y = e.clientY;
            
            // **REMOVED:** Moving the Follower Ring logic (xToFollower, yToFollower).

            // --- VISIBILITY LOGIC ---
            // 1. Show cursor immediately
            if (cursor.style.opacity === '0') {
                // Only targeting the 'cursor' (Liquid Drop) now
                gsap.to(cursor, { opacity: 1, duration: 0.2 });
            }

            // 2. Clear previous timer
            if (timerRef.current) clearTimeout(timerRef.current);

            // 3. Set new timer to hide after 2 seconds
            timerRef.current = setTimeout(() => {
                gsap.to(cursor, { opacity: 0, duration: 0.5 });
            }, 2000);
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            if (timerRef.current) clearTimeout(timerRef.current);
            document.body.style.cursor = 'auto'; // Restore the default cursor
        };
    }, []);

    return (
        <div 
            ref={cursorRef}
            className="fixed top-0 left-0 w-10 h-10 bg-yellow-500 rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block will-change-transform transition-opacity"
        />
    );
};

export default CustomCursor;