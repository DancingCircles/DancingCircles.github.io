import React from 'react';
import './CollagePages.css';

const CollagePage1 = () => {
    return (
        <section className="collage-page collage-page-1 layout-left">
            <div className="cp-number" style={{ top: '10%', left: '5%' }}>01</div>
            <div className="collage-content">
                <div className="collage-text-block">
                    <p className="cp-subtitle">Vintage Collection</p>
                    <h2 className="cp-title">CLASSIC<br />ELEGANCE</h2>
                    <p className="cp-description">
                        Rediscover the charm of the past with our curated vintage collection.
                        Timeless designs that speak of an era of elegance and sophistication.
                    </p>
                </div>
                <div className="collage-img-block">
                    <img src="/assets/A1.png" alt="Vintage Art 1" className="collage-main-img" />
                </div>
            </div>
        </section>
    );
};

export default CollagePage1;
