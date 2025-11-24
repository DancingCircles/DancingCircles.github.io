import React from 'react';
import ScrollReveal from './ScrollReveal';
import './CollagePages.css';

const CollagePage2 = () => {
    return (
        <section id="collage2" className="collage-page collage-page-2 layout-left">
            {/* <img src="/assets/FootPrint.png" alt="Footprint" className="footprint-decoration" /> */}
            {/* <div className="cp-number" style={{ bottom: '10%', right: '5%' }}>02</div> */}
            <div className="collage-content">
                <div className="collage-text-block concept-design">
                    <div className="concept-header">
                        <h2 className="concept-title">
                            主视觉概念 <span className="concept-dot">●</span>
                        </h2>
                        <p className="concept-subtitle">Master visual concept</p>
                    </div>
                    <div className="concept-body">
                        <ScrollReveal
                            containerClassName="concept-text-reveal"
                            textClassName="concept-text-cn"
                            duration={0.3}
                            stagger={0.02}
                        >
                            融合多元文化，通过趣味和超现实的想象力构建奇思异想的画面，结合蜡笔质感使画面充满生命力，表现「逛出来的好心情」，仿佛行走在云端，轻盈、自由的快感，整体视觉采用年轻，个性化的设计理念，搭建人与人情感共鸣的桥梁，让日常生活因集市的创意而闪光。
                        </ScrollReveal>
                        <ScrollReveal
                            containerClassName="concept-text-reveal"
                            textClassName="concept-text-en"
                            duration={0.3}
                            stagger={0.02}
                        >
                            It integrates diverse cultures, builds a fantastic picture through fun and surreal imagination, and combines crayon texture to make the picture full of vitality, showing "a good mood", as if walking on a cloud, light and free pleasure. The overall vision adopts a young, personalized design concept, builds a bridge of emotional resonance between people, and makes daily life shine with the creativity of the market.
                        </ScrollReveal>
                    </div>
                </div>
                <div className="collage-img-block">
                    <img src="/xoberon.github.io/assets/A2.png" alt="Vintage Art 2" className="collage-main-img" />
                </div>
            </div>
        </section>
    );
};

export default CollagePage2;
