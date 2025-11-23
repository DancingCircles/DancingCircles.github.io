import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // 跟踪鼠标位置
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out"
            });
        };

        // 鼠标悬停在可点击元素上时放大
        const handleMouseOver = (e) => {
            if (e.target.matches('a, button, [role="button"], .nav-link, .custom-scrollbar-thumb')) {
                cursor.classList.add('hover');
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.matches('a, button, [role="button"], .nav-link, .custom-scrollbar-thumb')) {
                cursor.classList.remove('hover');
            }
        };

        // 鼠标离开窗口时隐藏
        const handleMouseLeave = () => {
            gsap.to(cursor, { opacity: 0, duration: 0.2 });
        };

        const handleMouseEnter = () => {
            gsap.to(cursor, { opacity: 1, duration: 0.2 });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor"></div>;
};

export default CustomCursor;

