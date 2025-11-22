import React from 'react';
import './CollagePages.css';

const CollagePage1 = () => {
    return (
        <section className="collage-page collage-page-1 layout-right">
            <div className="cp-number" style={{ top: '10%', left: '5%' }}>01</div>
            <div className="collage-content">
                <div className="collage-text-block hello-design">
                    <div className="hello-wrapper">
                        <h1 className="hello-title">hello!</h1>
                        <img
                            src="/assets/Generated Image November 19, 2025 - 10_56PM (2).png"
                            alt="Flower decoration"
                            className="hello-flower"
                        />
                        <div className="hello-fog"></div>
                    </div>
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
                <div className="collage-img-block">
                    <img src="/assets/A1.png" alt="Vintage Art 1" className="collage-main-img" />
                </div>
            </div>
        </section>
    );
};

export default CollagePage1;
