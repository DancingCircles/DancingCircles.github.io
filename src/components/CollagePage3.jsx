import React from 'react';
import './CollagePages.css';

const CollagePage3 = () => {
    return (
        <section className="collage-page collage-page-3 layout-center">
            <div className="cp-number" style={{ top: '5%', right: '50%', transform: 'translateX(50%)' }}>03</div>
            <div className="collage-content">
                <div className="collage-text-block">
                    <p className="cp-subtitle">Artistic Vision</p>
                    <h2 className="cp-title">CREATIVE<br />SOUL</h2>
                    <p className="cp-description">
                        Where imagination meets history. A fusion of artistic vision
                        and historical elements creating something truly unique.
                    </p>
                </div>
                <div className="collage-img-block">
                    <img src="/assets/A3.png" alt="Vintage Art 3" className="collage-main-img" />
                </div>
            </div>
        </section>
    );
};

export default CollagePage3;
