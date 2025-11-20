import React from 'react';
import './CollagePages.css';

const CollagePage2 = () => {
    return (
        <section className="collage-page collage-page-2 layout-right">
            <div className="cp-number" style={{ bottom: '10%', right: '5%' }}>02</div>
            <div className="collage-content">
                <div className="collage-text-block">
                    <p className="cp-subtitle">Modern Heritage</p>
                    <h2 className="cp-title">TIMELESS<br />JOURNEY</h2>
                    <p className="cp-description">
                        Every piece tells a story. A journey through time captured in
                        exquisite detail and artistic composition.
                    </p>
                </div>
                <div className="collage-img-block">
                    <img src="/assets/A2.png" alt="Vintage Art 2" className="collage-main-img" />
                </div>
            </div>
        </section>
    );
};

export default CollagePage2;
