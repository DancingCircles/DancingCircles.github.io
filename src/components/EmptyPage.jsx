import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { faqs } from '../data/faqs';
import './EmptyPage.css';

const getPositions = () => {
    const width = window.innerWidth;
    if (width <= 480) {
        return { BOTTOM: 0, MIDDLE: -60, TOP: -120 };
    } else if (width <= 600) {
        return { BOTTOM: 0, MIDDLE: -70, TOP: -140 };
    } else if (width <= 768) {
        return { BOTTOM: 0, MIDDLE: -80, TOP: -160 };
    } else {
        return { BOTTOM: 0, MIDDLE: -120, TOP: -240 };
    }
};

const EmptyPage = () => {
    const [positions, setPositions] = useState(getPositions());
    const wrappersRef = useRef([]);

    useEffect(() => {
        // Set initial positions on mount and when positions change
        wrappersRef.current.forEach(wrapper => {
            if (wrapper) {
                gsap.set(wrapper, { y: positions.TOP });
            }
        });
    }, [positions]);

    useEffect(() => {
        const handleResize = () => {
            setPositions(getPositions());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = (e, index) => {
        const wrapper = e.currentTarget.querySelector('.award-wrapper');
        gsap.to(wrapper, {
            y: positions.MIDDLE,
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
        const targetY = leavingFromTop ? positions.TOP : positions.BOTTOM;

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
                            <div className="award-wrapper" ref={el => wrappersRef.current[index] = el}>
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
