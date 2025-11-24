import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { faqs } from '../data/faqs';
import './EmptyPage.css';

const POSITIONS = {
    BOTTOM: 0,
    MIDDLE: -120,
    TOP: -240,
};

const EmptyPage = () => {
    const handleMouseEnter = (e, index) => {
        const wrapper = e.currentTarget.querySelector('.award-wrapper');
        gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: true
        });
    };

    const handleMouseLeave = (e, index) => {
        const wrapper = e.currentTarget.querySelector('.award-wrapper');
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate exit direction: if leaving from top (clientY < top + half height), go to TOP, else BOTTOM
        const leavingFromTop = e.clientY < rect.top + rect.height / 2;
        const targetY = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;

        gsap.to(wrapper, {
            y: targetY,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: true
        });
    };

    return (
        <section id="faq" className="empty-page">
            <div className="awards-section">
                <p className="awards-title">Frequently Asked Questions</p>
                <div className="awards-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="award"
                            onMouseEnter={(e) => handleMouseEnter(e, index)}
                            onMouseLeave={(e) => handleMouseLeave(e, index)}
                        >
                            <div className="award-wrapper">
                                <div className="award-name">
                                    <h1>{faq.question}</h1>
                                    <h1>{faq.type}</h1>
                                </div>
                                <div className="award-project">
                                    <h1>{faq.answer}</h1>
                                    <h1>{faq.detail}</h1>
                                </div>
                                <div className="award-name">
                                    <h1>{faq.question}</h1>
                                    <h1>{faq.type}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EmptyPage;
