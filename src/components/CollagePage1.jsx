import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CollagePages.css';

const CollagePage1 = () => {
    const ball1Ref = useRef(null);
    const shadow1Ref = useRef(null);
    const svg1Ref = useRef(null);
    const ball2Ref = useRef(null);
    const shadow2Ref = useRef(null);
    const svg2Ref = useRef(null);

    useEffect(() => {
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
    }, []);

    return (
        <section className="collage-page collage-page-1">
            <div className="cp-number" style={{ top: '10%', left: '5%' }}>01</div>

            <div className="collage-layout-grid">
                {/* Top Left: Bouncing Ball #1 */}
                <div className="ball-decoration-area ball-area-1">
                    <svg ref={svg1Ref} viewBox="0 0 100 200" className="bouncing-ball-svg">
                        <defs>
                            <linearGradient id="grad-1" x1="30" y1="0" x2="70" y2="40" gradientUnits="userSpaceOnUse">
                                <stop offset="0.2" stopColor="#0ae448" />
                                <stop offset="0.5" stopColor="#abff84" />
                            </linearGradient>
                        </defs>
                        <ellipse ref={shadow1Ref} className="ball-shadow" cx="50" cy="188" rx="15" ry="5" />
                        <circle ref={ball1Ref} fill="url(#grad-1)" className="ball" cx="50" cy="22" r="15" />
                    </svg>
                </div>

                {/* Top: Title + Decoration */}
                <div className="hello-header-area">
                    <div className="hello-wrapper">
                        <h1 className="hello-title">hello!</h1>
                        <img
                            src="/assets/Generated Image November 19, 2025 - 10_56PM (2).png"
                            alt="Flower decoration"
                            className="hello-flower"
                        />
                        <div className="hello-fog"></div>
                    </div>
                </div>

                {/* Bottom Left: Main Image */}
                <div className="main-image-area">
                    <img src="/assets/A1.png" alt="Vintage Art 1" className="collage-main-img" />
                </div>

                {/* Bottom Right: Info Text */}
                <div className="info-text-area">
                    <div className="info-list">
                        <div className="info-item">
                            <span className="info-label">NAME:</span>
                            <span className="info-value">Jane Doe</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">AGE:</span>
                            <span className="info-value">15</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">CURRENTLY:</span>
                            <span className="info-value">
                                Romanticizing<br />
                                student life <span className="highlight-red">(and<br />mildly spiraling)</span>
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">LIFE GOAL:</span>
                            <span className="info-value">Be iconic...</span>
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
