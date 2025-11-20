import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

const HeroSection = () => {
    const leftFlowersRef = useRef(null);
    const rightLeavesRef = useRef(null);
    const contentRef = useRef(null);
    const smallFlowerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Calculate movement based on mouse position
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            // Apply different movement speeds for depth effect
            if (leftFlowersRef.current) {
                leftFlowersRef.current.style.transform = `translate(${moveX * -30}px, ${moveY * -30}px)`;
            }

            if (rightLeavesRef.current) {
                rightLeavesRef.current.style.transform = `translate(${moveX * -25}px, ${moveY * -25}px)`;
            }

            if (contentRef.current) {
                contentRef.current.style.transform = `translate(${moveX * 15}px, ${moveY * 15}px)`;
            }

            if (smallFlowerRef.current) {
                smallFlowerRef.current.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px) rotate(${moveX * 5}deg)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="hero-section">
            {/* Decorative Images */}
            <img
                ref={leftFlowersRef}
                src="/assets/left flower.png"
                alt="Hibiscus Flowers"
                className="deco-left-flowers"
            />
            <img
                ref={rightLeavesRef}
                src="/assets/leaf.png"
                alt="Tropical Leaves"
                className="deco-right-leaves"
            />

            {/* Main Content */}
            <div ref={contentRef} className="hero-content">
                <h1 className="title-aloha">
                    <span className="aloha-text">ALOHA</span>
                    <img
                        ref={smallFlowerRef}
                        src="/assets/small flower.png"
                        alt=""
                        className="title-flower"
                    />
                </h1>
                <h2 className="subtitle">E KOMO MAI O HAWAII!</h2>
                <p className="quote">
                    "Hawaii...the most charming fleet of islands<br />
                    that anchored in the middle of the ocean..." Mark Twain
                </p>
                <button className="cta-button">CONTACT US</button>
            </div>
        </section>
    );
};

export default HeroSection;
