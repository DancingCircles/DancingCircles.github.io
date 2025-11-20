import React from 'react';
import './InFullBloomSection.css';

const InFullBloomSection = () => {
    return (
        <section className="bloom-section">
            <div className="bloom-container">
                <div className="bloom-card">
                    <div className="bloom-left">
                        <img
                            src="/assets/Generated Image November 19, 2025 - 11_09PM.png"
                            alt="Wildflower scene with car on scenic road"
                            className="bloom-illustration"
                        />
                    </div>
                    <div className="bloom-right">
                        <div className="bloom-header">
                            <div className="bloom-credits-group">
                                <p className="bloom-byline">By Dina Gachman</p>
                                <p className="bloom-credits">Illustrations by<br />Jordan Kay</p>
                            </div>
                            <p className="bloom-intro-text">
                                Put the petal to<br />
                                the metal and<br />
                                take to the road<br />
                                for Texas' annual<br />
                                wildflower show
                            </p>
                        </div>
                        <div className="bloom-title-wrapper">
                            <h1 className="bloom-title">
                                <span className="bloom-title-in">In</span>
                                <span className="bloom-title-full">Full</span>
                                <span className="bloom-title-bloom">Bloom</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InFullBloomSection;
