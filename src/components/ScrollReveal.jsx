import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
    children,
    containerClassName = '',
    textClassName = '',
    duration = 0.6,
    stagger = 0.1,
}) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;
        if (!container || !textElement) return;

        // Split text into words
        const text = typeof children === 'string' ? children : '';
        const words = text.split(/\s+/).filter(word => word.length > 0);

        // Clear and recreate word elements
        textElement.innerHTML = '';
        const wordElements = words.map((word, index) => {
            const wordWrapper = document.createElement('span');
            wordWrapper.className = 'word-wrapper';

            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.textContent = word;

            wordWrapper.appendChild(wordSpan);
            textElement.appendChild(wordWrapper);

            // Add space after each word except the last
            if (index < words.length - 1) {
                textElement.appendChild(document.createTextNode(' '));
            }

            return wordSpan;
        });

        // Animate words
        gsap.set(wordElements, { yPercent: 100, opacity: 0 });

        const animation = gsap.to(wordElements, {
            yPercent: 0,
            opacity: 1,
            duration: duration,
            stagger: stagger,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
            }
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [children, duration, stagger]);

    return (
        <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
            <span ref={textRef} className={`scroll-reveal-text ${textClassName}`}></span>
        </div>
    );
};

export default ScrollReveal;
