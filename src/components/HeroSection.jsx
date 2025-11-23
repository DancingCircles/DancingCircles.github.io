import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-image-wrapper">
                    <img src="/assets/index.png" alt="The Late Checkout" className="hero-bg-image" />

                    <div className="hero-overlay-content">
                        <h1 className="hero-title">
                            <span className="word-the">the</span>
                            <span className="word-late">late</span>
                            <span className="word-checkout">checkout</span>
                        </h1>
                        <h2 className="hero-subtitle">STORY-LED TRAVEL PLANNING FOR PEOPLE WHO WANT TO FEEL</h2>
                    </div>

                    <div className="hero-signature">
                        X OBERON
                    </div>
                </div>

                {/* Animated Icons for Planning Section Transition - Outside image wrapper */}
                <div className="animated-icons-origin">
                    <div className="animated-icon icon-1"><img src="/assets/1.png" alt="" /></div>
                    <div className="animated-icon icon-2"><img src="/assets/2.png" alt="" /></div>
                    <div className="animated-icon icon-3"><img src="/assets/3.png" alt="" /></div>
                    <div className="animated-icon icon-4"><img src="/assets/4.png" alt="" /></div>
                    <div className="animated-icon icon-5"><img src="/assets/5.png" alt="" /></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
