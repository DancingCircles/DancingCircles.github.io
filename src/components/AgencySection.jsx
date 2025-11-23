import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AgencySection.css';

gsap.registerPlugin(ScrollTrigger);

const AgencySection = () => {
    const sectionRef = useRef(null);
    const introRef = useRef(null);
    const contactRef = useRef(null);
    const wrapperRef = useRef(null);
    const bgImageRef = useRef(null);
    const [showGithub, setShowGithub] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the section
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                pinSpacing: true,
            });

            // Content animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=100%",
                    scrub: 1,
                }
            });

            tl.to(introRef.current, { opacity: 0, y: -50, duration: 1 })
                .fromTo(contactRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.5"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="agency" className="agency-section" ref={sectionRef}>
            <div className="agency-bg-image" ref={bgImageRef}></div>
            
            <div className="github-corner" onClick={() => setShowGithub(true)}>
                {!showGithub ? (
                    <span className="github-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        github
                        <svg width="40" height="14" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 7H40M2 7L9 1M2 7L9 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                ) : (
                    <a
                        href="https://github.com/DancingCircles"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-icon-link"
                    >
                        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="github-icon">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                        </svg>
                    </a>
                )}
            </div>

            <div className="agency-content-wrapper" ref={wrapperRef}>
                {/* Phase 1: Intro */}
                <div className="agency-content intro-content" ref={introRef}>
                    <h2 className="agency-title">THE END.</h2>
                    <p className="agency-subtitle">
                        Exploring the boundaries of<br />
                        system architecture and visual design.
                    </p>
                </div>

                {/* Phase 2: Contact */}
                <div className="agency-content contact-content" ref={contactRef}>
                    <h2 className="agency-title">THE END.</h2>
                    <p className="agency-role">GOLANG DEVELOPER</p>

                    <div className="contact-block">
                        <p className="contact-info">
                            <a href="mailto:xoberon@foxmail.com">xoberon@foxmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgencySection;
