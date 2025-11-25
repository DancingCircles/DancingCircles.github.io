import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MottoSection.css';

gsap.registerPlugin(ScrollTrigger);

const MottoSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const labelRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const bgLayerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Background Parallax & Pinning
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                pinSpacing: false,
                scrub: true,
                onUpdate: (self) => {
                    // Optional: Parallax effect for background
                    gsap.set(sectionRef.current, { backgroundPosition: `center ${40 + self.progress * 20}%` });
                }
            });

            // Text Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate label first
            tl.from(labelRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out"
            });

            // Then animate quote lines with stagger
            tl.from([line1Ref.current, line2Ref.current], {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.3
            }, "-=0.5");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="motto" className="motto-section" ref={sectionRef}>
            <div className="motto-bg-layer" ref={bgLayerRef}></div>
            <div className="motto-content" ref={contentRef}>
                <div className="motto-label" ref={labelRef}>DESIGN PHILOSOPHY:</div>
                <h2 className="motto-quote" style={{ margin: 0 }}>
                    <span className="motto-quote-line" ref={line1Ref}>"CLARITY OVER COMPLEXITY,</span>
                    <span className="motto-quote-line" ref={line2Ref}>FUNCTION OVER DECORATION"</span>
                </h2>
            </div>
        </section>
    );
};

export default MottoSection;
