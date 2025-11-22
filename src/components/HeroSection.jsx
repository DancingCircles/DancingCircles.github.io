import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* Leaf Decoration */}
            <img
                src="/assets/leaf.png"
                alt=""
                className="deco-leaf-top-right"
            />

            {/* Main Content */}
            <div className="hero-content">
                <h1 className="title-aloha">
                    <span className="aloha-text">ALOHA</span>
                </h1>
                <h2 className="subtitle">E KOMO MAI O HAWAII!</h2>
            </div>

            {/* Right Side Text */}
            <div className="hero-right-text">
                <p className="quote">
                    "Hawaii...the most charming fleet of islands<br />
                    that anchored in the middle of the ocean..." Mark Twain
                </p>
                {/* <button className="cta-button">CONTACT US</button> */}
            </div>
        </section>
    );
};

export default HeroSection;
