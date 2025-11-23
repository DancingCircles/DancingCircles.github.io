import React, { useEffect, useRef, useState } from 'react';

const CustomScrollbar = () => {
    const thumbRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startScrollTop, setStartScrollTop] = useState(0);

    useEffect(() => {
        const updateScrollbar = () => {
            if (!thumbRef.current) return;

            const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const thumbHeight = Math.max(50, (window.innerHeight / document.documentElement.scrollHeight) * window.innerHeight);
            const maxThumbTop = window.innerHeight - thumbHeight;
            
            thumbRef.current.style.height = `${thumbHeight}px`;
            thumbRef.current.style.top = `${scrollPercentage * maxThumbTop}px`;
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const deltaY = e.clientY - startY;
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const thumbHeight = parseFloat(thumbRef.current.style.height);
            const maxThumbTop = window.innerHeight - thumbHeight;
            const scrollDelta = (deltaY / maxThumbTop) * scrollableHeight;

            window.scrollTo(0, startScrollTop + scrollDelta);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = '';
        };

        window.addEventListener('scroll', updateScrollbar);
        window.addEventListener('resize', updateScrollbar);
        
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
        }

        updateScrollbar();

        return () => {
            window.removeEventListener('scroll', updateScrollbar);
            window.removeEventListener('resize', updateScrollbar);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startY, startScrollTop]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.clientY);
        setStartScrollTop(window.scrollY);
    };

    const handleTrackClick = (e) => {
        if (e.target === thumbRef.current) return;

        const trackRect = e.currentTarget.getBoundingClientRect();
        const clickY = e.clientY - trackRect.top;
        const thumbHeight = parseFloat(thumbRef.current.style.height);
        const scrollPercentage = (clickY - thumbHeight / 2) / (window.innerHeight - thumbHeight);
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

        window.scrollTo({
            top: scrollPercentage * scrollableHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="custom-scrollbar" onClick={handleTrackClick}>
            <div className="custom-scrollbar-track"></div>
            <div 
                ref={thumbRef}
                className="custom-scrollbar-thumb"
                onMouseDown={handleMouseDown}
            ></div>
        </div>
    );
};

export default CustomScrollbar;

