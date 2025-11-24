import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import './CollagePages.css';

gsap.registerPlugin(ScrollTrigger);

const CollagePage1 = () => {
    const ball1Ref = useRef(null);
    const shadow1Ref = useRef(null);
    const svg1Ref = useRef(null);
    const ball2Ref = useRef(null);
    const shadow2Ref = useRef(null);
    const svg2Ref = useRef(null);
    const helloTitleRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        // ScrollTrigger for page overlay effect (works in both directions)
        if (sectionRef.current) {
            gsap.fromTo(sectionRef.current,
                { y: 100 },
                {
                    y: 0,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "top top",
                        scrub: 1,
                    },
                    ease: "none"
                }
            );
        }
        // Animate first ball (top-left area)
        if (svg1Ref.current && ball1Ref.current && shadow1Ref.current) {
            gsap.set(svg1Ref.current, { opacity: 1 });

            gsap.to(ball1Ref.current, {
                keyframes: {
                    "0%": { yPercent: 0, scaleX: 1, scaleY: 1 },
                    "7%": { yPercent: 5, scaleY: 0.9, scaleX: 1.1, ease: "sine.in" },
                    "25%": { yPercent: 100, scaleY: 1.15, scaleX: 0.9, ease: "sine.in" },
                    "50%": { yPercent: 500, scaleX: 1, scaleY: 1, ease: "none" },
                    "60%": { scaleX: 1.6, scaleY: 0.4, ease: "none" },
                    "65%": { yPercent: 500, scaleX: 1, scaleY: 1 },
                    "100%": { yPercent: 0, scaleX: 1, scaleY: 1 },
                    easeEach: "sine.out"
                },
                duration: 1,
                repeat: -1,
                transformOrigin: "center bottom"
            });

            gsap.to(shadow1Ref.current, {
                scale: 0.7,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                transformOrigin: "center"
            });
        }

        // Animate second ball (bottom-right area)
        if (svg2Ref.current && ball2Ref.current && shadow2Ref.current) {
            gsap.set(svg2Ref.current, { opacity: 1 });

            gsap.to(ball2Ref.current, {
                keyframes: {
                    "0%": { yPercent: 0, scaleX: 1, scaleY: 1 },
                    "7%": { yPercent: 5, scaleY: 0.9, scaleX: 1.1, ease: "sine.in" },
                    "25%": { yPercent: 100, scaleY: 1.15, scaleX: 0.9, ease: "sine.in" },
                    "50%": { yPercent: 500, scaleX: 1, scaleY: 1, ease: "none" },
                    "60%": { scaleX: 1.6, scaleY: 0.4, ease: "none" },
                    "65%": { yPercent: 500, scaleX: 1, scaleY: 1 },
                    "100%": { yPercent: 0, scaleX: 1, scaleY: 1 },
                    easeEach: "sine.out"
                },
                duration: 1.2,
                repeat: -1,
                delay: 0.3,
                transformOrigin: "center bottom"
            });

            gsap.to(shadow2Ref.current, {
                scale: 0.7,
                duration: 0.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.3,
                transformOrigin: "center"
            });
        }

        // Animate "hello!" letters with ScrollTrigger
        if (helloTitleRef.current) {
            const letters = helloTitleRef.current.querySelectorAll('.hello-letter');

            gsap.fromTo(letters,
                {
                    x: 300,
                    opacity: 0,
                    scale: 0.5,
                    rotation: 45
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: "back.out(2)",
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: helloTitleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    return (
        <section id="collage1" ref={sectionRef} className="collage-page collage-page-1">
            <div className="collage-layout-grid">
                {/* Top Left: Bouncing Ball #1 Removed */}

                {/* Top: Title + Decoration */}
                <div className="hello-header-area">
                    <div className="hello-wrapper">
                        <h1 className="hello-title" ref={helloTitleRef}>
                            <span className="hello-letter">h</span>
                            <span className="hello-letter">e</span>
                            <span className="hello-letter">l</span>
                            <span className="hello-letter">l</span>
                            <span className="hello-letter">o</span>
                            <span className="hello-letter">!</span>
                        </h1>
                        <img
                            src="/xoberon.github.io/assets/Generated Image November 19, 2025 - 10_56PM (2).png"
                            alt="Flower decoration"
                            className="hello-flower"
                        />
                        <div className="hello-fog"></div>
                    </div>
                </div>

                {/* Bottom Left: Main Image */}
                <div className="main-image-area">
                    <img src="/xoberon.github.io/assets/A1.png" alt="Vintage Art 1" className="collage-main-img" />
                </div>

                {/* Bottom Right: Info Text */}
                <div className="info-text-area">
                    <div className="info-list">
                        <div className="info-item">
                            <span className="info-label">NAME:</span>
                            <ScrollReveal
                                containerClassName="info-value-reveal"
                                textClassName="info-value"
                            >
                                X OBERON
                            </ScrollReveal>
                        </div>
                        <div className="info-item">
                            <span className="info-label">AGE:</span>
                            <ScrollReveal
                                containerClassName="info-value-reveal"
                                textClassName="info-value"
                            >
                                SECRET
                            </ScrollReveal>
                        </div>
                        <div className="info-item">
                            <span className="info-label">STATUS:</span>
                            <ScrollReveal
                                containerClassName="info-value-reveal"
                                textClassName="info-value"
                            >
                                Fresh Graduate
                            </ScrollReveal>
                        </div>
                        <div className="info-item">
                            <span className="info-label">CURRENTLY:</span>
                            <span className="info-value">
                                <span className="highlight-red">Romanticizing</span><br />
                                student life, design
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">LIFE GOAL:</span>
                            <ScrollReveal
                                containerClassName="info-value-reveal"
                                textClassName="info-value"
                            >
                                DO BETTER
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* Bottom Right: Bouncing Ball #2 */}
                <div className="ball-decoration-area ball-area-2">
                    <svg ref={svg2Ref} viewBox="0 0 100 200" className="bouncing-ball-svg">
                        <defs>
                            <linearGradient id="grad-2" x1="30" y1="0" x2="70" y2="40" gradientUnits="userSpaceOnUse">
                                <stop offset="0.2" stopColor="#0ae448" />
                                <stop offset="0.5" stopColor="#abff84" />
                            </linearGradient>
                        </defs>
                        <ellipse ref={shadow2Ref} className="ball-shadow" cx="50" cy="188" rx="15" ry="5" />
                        <circle ref={ball2Ref} fill="url(#grad-2)" className="ball" cx="50" cy="22" r="15" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default CollagePage1;
