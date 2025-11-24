import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroSection.css';

const HeroSection = () => {
    const sectionRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const signatureRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Image Wrapper & Image Reveal
            tl.fromTo(imageWrapperRef.current,
                { y: 100, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1.5 }
            )
                .fromTo(imageRef.current,
                    { scale: 1.2 },
                    { scale: 1, duration: 1.5 },
                    "<" // Start at the same time as wrapper
                );

            // 2. Title Animation (Slide up + Fade)
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8" // Overlap with image animation
            );

            // 3. Subtitle Animation
            tl.fromTo(subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            );

            // 4. Signature Animation (Stroke Reveal)
            const text = signatureRef.current.querySelector('.signature-text');
            const length = 1000; // Approximate max length for stroke-dasharray

            tl.fromTo(text,
                {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fill: "transparent",
                    stroke: "#FF4500",
                    opacity: 1
                },
                {
                    strokeDashoffset: 0,
                    duration: 2.5,
                    ease: "power1.inOut"
                },
                "-=0.6"
            )
                .to(text, {
                    fill: "#FF4500",
                    duration: 1,
                    ease: "power2.out"
                }, "-=1.0");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" className="hero-section" ref={sectionRef}>
            <div className="hero-container">
                <div className="hero-image-wrapper" ref={imageWrapperRef}>
                    <img
                        ref={imageRef}
                        src="/xoberon.github.io/assets/index.png"
                        alt="The Late Checkout"
                        className="hero-bg-image"
                    />

                    <div className="hero-overlay-content">
                        <h1 className="hero-title">
                            <span className="word-the"></span>
                            <span className="word-late" ref={titleRef}>WELCOME</span>
                            <span className="word-checkout"></span>
                        </h1>
                        <h2 className="hero-subtitle" ref={subtitleRef}>蝴蝶有蝴蝶的时差，我需要叫醒它吗 --托比亚斯</h2>
                    </div>

                    <div className="hero-signature" ref={signatureRef}>
                        <svg viewBox="0 0 350 120" className="signature-svg">
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="signature-text"
                            >
                                X OBERON
                            </text>
                        </svg>
                    </div>
                </div>

                {/* Animated Icons for Planning Section Transition - Outside image wrapper */}
                <div className="animated-icons-origin">
                    <div className="animated-icon icon-1"><img src="/xoberon.github.io/assets/1.png" alt="" /></div>
                    <div className="animated-icon icon-2"><img src="/xoberon.github.io/assets/2.png" alt="" /></div>
                    <div className="animated-icon icon-3"><img src="/xoberon.github.io/assets/3.png" alt="" /></div>
                    <div className="animated-icon icon-4"><img src="/xoberon.github.io/assets/4.png" alt="" /></div>
                    <div className="animated-icon icon-5"><img src="/xoberon.github.io/assets/5.png" alt="" /></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
