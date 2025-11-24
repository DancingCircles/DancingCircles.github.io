import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { faqs } from '../data/faqs';
import './EmptyPage.css';

const POSITIONS = {
    BOTTOM: 0,
    MIDDLE: -80,
    TOP: -160,
};

const EmptyPage = () => {
    const awardsListRef = useRef(null);
    const mousePos = useRef({ x: -1, y: -1 });
    const activeAwardRef = useRef(null);
    const cachedRects = useRef([]);

    // Animation logic extracted for reuse
    const animateAward = (wrapper, isEnter, clientY, rect) => {
        gsap.killTweensOf(wrapper);

        let targetY;
        if (isEnter) {
            targetY = POSITIONS.MIDDLE;
        } else {
            // Calculate exit direction
            // Note: rect.top is relative to viewport here because we use it for direction calc
            // But for cached logic we might need to be careful.
            // Actually, for direction, we can use the cached absolute top - scrollY
            const leavingFromTop = clientY < (rect.top - window.scrollY) + rect.height / 2;
            targetY = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;
        }

        gsap.to(wrapper, {
            y: targetY,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: true
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => { }, awardsListRef);
        let rafId = null;

        const updateCache = () => {
            if (!awardsListRef.current) return;
            const items = Array.from(awardsListRef.current.querySelectorAll('.award'));

            cachedRects.current = items.map(item => {
                const rect = item.getBoundingClientRect();
                return {
                    top: rect.top + window.scrollY, // Absolute position
                    bottom: rect.bottom + window.scrollY,
                    height: rect.height,
                    element: item
                };
            });
        };

        // Initial cache
        updateCache();

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            scheduleCheck();
        };

        const handleScroll = () => {
            scheduleCheck();
        };

        const handleResize = () => {
            updateCache();
        };

        const scheduleCheck = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                checkHover();
                rafId = null;
            });
        };

        const checkHover = () => {
            if (mousePos.current.x === -1) return;

            const scrollY = window.scrollY;
            const mouseYAbsolute = mousePos.current.y + scrollY;

            // Find item purely by math (no DOM read)
            const hoveredItemData = cachedRects.current.find(rect =>
                mouseYAbsolute >= rect.top &&
                mouseYAbsolute <= rect.bottom
            );

            const awardItem = hoveredItemData ? hoveredItemData.element : null;

            // If hovering over a new award
            if (awardItem && awardItem !== activeAwardRef.current) {
                // Deactivate previous
                if (activeAwardRef.current) {
                    const prevWrapper = activeAwardRef.current.querySelector('.award-wrapper');
                    const prevData = cachedRects.current.find(r => r.element === activeAwardRef.current);
                    if (prevData) {
                        // Pass absolute rect data
                        animateAward(prevWrapper, false, mousePos.current.y, prevData);
                    }
                }

                // Activate new
                const wrapper = awardItem.querySelector('.award-wrapper');
                // Pass absolute rect data
                animateAward(wrapper, true, mousePos.current.y, hoveredItemData);

                activeAwardRef.current = awardItem;
            }
            // If moved off an award entirely
            else if (!awardItem && activeAwardRef.current) {
                const prevWrapper = activeAwardRef.current.querySelector('.award-wrapper');
                const prevData = cachedRects.current.find(r => r.element === activeAwardRef.current);
                if (prevData) {
                    animateAward(prevWrapper, false, mousePos.current.y, prevData);
                }
                activeAwardRef.current = null;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (rafId) cancelAnimationFrame(rafId);
            ctx.revert();
        };
    }, []);

    return (
        <section id="faq" className="empty-page">
            <div className="awards-section">
                <p className="awards-title">Frequently Asked Questions</p>
                <div className="awards-list" ref={awardsListRef}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="award"
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
