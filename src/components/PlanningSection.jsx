import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PlanningSection.css';

gsap.registerPlugin(ScrollTrigger);

const PlanningSection = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
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

            // Calculate positions once
            // Note: This assumes the layout doesn't shift drastically. 
            // For production, we'd handle resize events to recalculate.
            placeholders.forEach((placeholder, index) => {
                if (icons[index]) {
                    const icon = icons[index];

                    // We calculate the delta based on initial positions
                    // Since both sections are in the document flow, their relative distance is constant
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

        return () => ctx.revert();
    }, []);

    return (
        <section className="planning-section" ref={sectionRef}>
            <div className="container">
                <h1 className="animated-text">
                    <div className="placeholder-icon"></div>
                    <span className="text-segment">Delve into coding</span>
                    <div className="placeholder-icon"></div>
                    <span className="text-segment">without clutter.</span>
                    <span className="text-segment">Unlock source code</span>
                    <div className="placeholder-icon"></div>
                    <span className="text-segment">for every tutorial</span>
                    <div className="placeholder-icon"></div>
                    <span className="text-segment">published on the Codegrid</span>
                    <div className="placeholder-icon"></div>
                    <span className="text-segment">YouTube channel.</span>
                </h1>
            </div>
        </section>
    );
};

export default PlanningSection;
