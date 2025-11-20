import React from 'react';
import './CollageSection.css';

const CollageSection = () => {
    return (
        <section className="collage-section">
            <div className="collage-container">
                <div className="collage-header">
                    <p className="collage-subtitle">Graphic Goods Proudly Presents</p>
                    <h2 className="collage-title">VINTAGE<br />Collage<br />Creator</h2>
                    <p className="collage-features">750+ ELEMENTS<br />10 PREMADE SCENES</p>
                    <div className="collage-circle"></div>
                    <p className="collage-description">
                        Drag & Drop - Create Stunning<br />
                        Collages Effortlessly<br />
                        <span className="collage-separator">Endless Combinations</span>
                    </p>
                </div>

                <div className="collage-art">
                    <img src="/assets/A1.png" alt="Vintage Element 1" className="collage-img img-a1" />
                    <img src="/assets/A2.png" alt="Vintage Element 2" className="collage-img img-a2" />
                    <img src="/assets/A3.png" alt="Vintage Element 3" className="collage-img img-a3" />

                    {/* Decorative elements simulated with CSS or additional assets if available */}
                    <div className="deco-line line-1"></div>
                    <div className="deco-circle circle-1"></div>
                </div>
            </div>
        </section>
    );
};

export default CollageSection;
