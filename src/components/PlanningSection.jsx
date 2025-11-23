import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PlanningSection.css';

gsap.registerPlugin(ScrollTrigger);

const PlanningSection = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx;

        const initAnimation = () => {
            if (ctx) ctx.revert();

            ctx = gsap.context(() => {
                const icons = document.querySelectorAll('.animated-icon');
                const placeholders = document.querySelectorAll('.placeholder-icon');
                const textSegments = document.querySelectorAll('.text-segment');

                if (icons.length === 0 || placeholders.length === 0) return;

                // Initial setup
                gsap.set(textSegments, { opacity: 0, y: 20 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "center center",
                        scrub: 1,
                    }
                });

                // Calculate positions
                placeholders.forEach((placeholder, index) => {
                    if (icons[index]) {
                        const icon = icons[index];

                        const iconRect = icon.getBoundingClientRect();
                        const placeholderRect = placeholder.getBoundingClientRect();

                        const deltaX = placeholderRect.left - iconRect.left;
                        const deltaY = placeholderRect.top - iconRect.top;

                        tl.to(icon, {
                            x: deltaX,
                            y: deltaY,
                            width: placeholderRect.width,
                            height: placeholderRect.height,
                            rotation: index % 2 === 0 ? 5 : -5,
                            ease: "power1.inOut"
                        }, 0);
                    }
                });

                // Text Animation
                tl.to(textSegments, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    ease: "power2.out"
                }, 0.2);

            }, sectionRef);
        };

        initAnimation();

        const handleResize = () => {
            initAnimation();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section className="planning-section" ref={sectionRef}>
            <div className="container">
                <h1 className="animated-text">
                    <div className="line">
                        <div className="placeholder-icon"></div>
                        <span className="text-segment">Specializing in Golang & Frontend,</span>
                    </div>
                    <div className="line">
                        <span className="text-segment">bridging the</span>
                        <div className="placeholder-icon"></div>
                        <span className="text-segment">gap between robust</span>
                    </div>
                    <div className="line">
                        <span className="text-segment">systems and elegant</span>
                        <div className="placeholder-icon"></div>
                        <span className="text-segment">design to</span>
                    </div>
                    <div className="line">
                        <span className="text-segment">craft beautiful</span>
                        <div className="placeholder-icon"></div>
                        <span className="text-segment">user experiences.</span>
                        <div className="placeholder-icon"></div>
                    </div>
                </h1>
            </div>
        </section>
    );
};

export default PlanningSection;
