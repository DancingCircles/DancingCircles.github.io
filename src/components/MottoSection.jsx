import React from 'react';
import './MottoSection.css';

const MottoSection = () => {
    return (
        <section className="motto-section">
            <div className="motto-content">
                <p className="motto-label">OUR MOTTO:</p>
                <h2 className="motto-quote">
                    "THE ALLURING VAULTS OF PALACES<br />
                    WILL NEVER REPLACE FREEDOM FOR US"
                </h2>
            </div>

            {/* Decorative leaves */}
            <img src="/assets/leaf.png" alt="" className="motto-leaf-top-right" />
            <img src="/assets/leaf.png" alt="" className="motto-leaf-bottom-left" />
        </section>
    );
};

export default MottoSection;
