import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { awards } from '../data/awards';
import './EmptyPage.css';

const POSITIONS = {
    BOTTOM: 0,
    MIDDLE: -80,
    TOP: -160,
};

const EmptyPage = () => {
    const [activeAward, setActiveAward] = useState(null);
    const lastMousePosition = useRef({ x: 0, y: 0 });
    const awardsListRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            lastMousePosition.current.x = e.clientX;
            lastMousePosition.current.y = e.clientY;
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleAwardEnter = (index, e) => {
        setActiveAward(index);
        const award = e.currentTarget;
        const wrapper = award.querySelector('.award-wrapper');
        const rect = award.getBoundingClientRect();
        const enterFromTop = e.clientY < rect.top + rect.height / 2;

        gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    const handleAwardLeave = (index, e) => {
        setActiveAward(null);
        const award = e.currentTarget;
        const wrapper = award.querySelector('.award-wrapper');
        const rect = award.getBoundingClientRect();
        const leavingFromTop = e.clientY < rect.top + rect.height / 2;

        gsap.to(wrapper, {
            y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    return (
        <section className="empty-page">
            <div className="awards-section">
                <p className="awards-title">Recognition and Awards</p>
                <div className="awards-list" ref={awardsListRef}>
                    {awards.map((award, index) => (
                        <div
                            key={index}
                            className="award"
                            onMouseEnter={(e) => handleAwardEnter(index, e)}
                            onMouseLeave={(e) => handleAwardLeave(index, e)}
                        >
                            <div className="award-wrapper">
                                <div className="award-name">
                                    <h1>{award.name}</h1>
                                    <h1>{award.type}</h1>
                                </div>
                                <div className="award-project">
                                    <h1>{award.project}</h1>
                                    <h1>{award.label}</h1>
                                </div>
                                <div className="award-name">
                                    <h1>{award.name}</h1>
                                    <h1>{award.type}</h1>
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
