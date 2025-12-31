import React, { useEffect, useRef } from 'react';

const MiniCircle = () => {
    const circleRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (circleRef.current) {
                circleRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        if (window.innerWidth > 768) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        
        const handleResize = () => {
            if (circleRef.current) {
                if (window.innerWidth <= 768) {
                    circleRef.current.style.display = 'none';
                } else {
                    circleRef.current.style.display = 'block';
                }
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div id="minicircle" ref={circleRef}></div>;
};

export default MiniCircle;