import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import './BlankPage.css';

const BlankPage = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const ballLeftRef = useRef(null);
    const shadowLeftRef = useRef(null);
    const svgLeftRef = useRef(null);
    const ballRightRef = useRef(null);
    const shadowRightRef = useRef(null);
    const svgRightRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // Animate left ball (horizontal, bouncing right after rotation)
        if (svgLeftRef.current && ballLeftRef.current && shadowLeftRef.current) {
            gsap.set(svgLeftRef.current, { opacity: 1 });

            gsap.to(ballLeftRef.current, {
                keyframes: {
                    "0%": { yPercent: 0, scaleX: 1, scaleY: 1 },
                    "7%": { yPercent: 5, scaleY: 0.9, scaleX: 1.1, ease: "sine.in" },
                    "25%": { yPercent: 100, scaleY: 1.15, scaleX: 0.9, ease: "sine.in" },
                    "50%": { yPercent: 500, scaleX: 1, scaleY: 1, ease: "none" },
                    "60%": { scaleX: 1.6, scaleY: 0.4, ease: "none" },
                    "65%": { yPercent: 500, scaleX: 1, scaleY: 1 },
                    "100%": { yPercent: 0, scaleX: 1, scaleY: 1 },
                    easeEach: "sine.out"
                },
                duration: 1.1,
                repeat: -1,
                transformOrigin: "center bottom"
            });

            gsap.to(shadowLeftRef.current, {
                scale: 0.7,
                duration: 0.55,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                transformOrigin: "center"
            });
        }

        // Animate right ball (horizontal, bouncing left after rotation)
        if (svgRightRef.current && ballRightRef.current && shadowRightRef.current) {
            gsap.set(svgRightRef.current, { opacity: 1 });

            gsap.to(ballRightRef.current, {
                keyframes: {
                    "0%": { yPercent: 0, scaleX: 1, scaleY: 1 },
                    "7%": { yPercent: 5, scaleY: 0.9, scaleX: 1.1, ease: "sine.in" },
                    "25%": { yPercent: 100, scaleY: 1.15, scaleX: 0.9, ease: "sine.in" },
                    "50%": { yPercent: 500, scaleX: 1, scaleY: 1, ease: "none" },
                    "60%": { scaleX: 1.6, scaleY: 0.4, ease: "none" },
                    "65%": { yPercent: 500, scaleX: 1, scaleY: 1 },
                    "100%": { yPercent: 0, scaleX: 1, scaleY: 1 },
                    easeEach: "sine.out"
                },
                duration: 1.3,
                repeat: -1,
                delay: 0.4,
                transformOrigin: "center bottom"
            });

            gsap.to(shadowRightRef.current, {
                scale: 0.7,
                duration: 0.65,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.4,
                transformOrigin: "center"
            });
        }
    }, []);

    return (
        <section className="blank-page">
            {/* Left Inverted Bouncing Ball */}
            <div className="ball-decoration-video ball-video-left">
                <svg ref={svgLeftRef} viewBox="0 0 100 200" className="bouncing-ball-svg-inverted">
                    <defs>
                        <linearGradient id="grad-video-left" x1="30" y1="0" x2="70" y2="40" gradientUnits="userSpaceOnUse">
                            <stop offset="0.2" stopColor="#ff6b6b" />
                            <stop offset="0.5" stopColor="#ffd166" />
                        </linearGradient>
                    </defs>
                    <ellipse ref={shadowLeftRef} className="ball-shadow" cx="50" cy="188" rx="15" ry="5" />
                    <circle ref={ballLeftRef} fill="url(#grad-video-left)" className="ball" cx="50" cy="22" r="15" />
                </svg>
            </div>

            {/* Right Inverted Bouncing Ball */}
            <div className="ball-decoration-video ball-video-right">
                <svg ref={svgRightRef} viewBox="0 0 100 200" className="bouncing-ball-svg-inverted">
                    <defs>
                        <linearGradient id="grad-video-right" x1="30" y1="0" x2="70" y2="40" gradientUnits="userSpaceOnUse">
                            <stop offset="0.2" stopColor="#4ecdc4" />
                            <stop offset="0.5" stopColor="#95e1d3" />
                        </linearGradient>
                    </defs>
                    <ellipse ref={shadowRightRef} className="ball-shadow" cx="50" cy="188" rx="15" ry="5" />
                    <circle ref={ballRightRef} fill="url(#grad-video-right)" className="ball" cx="50" cy="22" r="15" />
                </svg>
            </div>

            {/* 标题区域 */}
            <div className="main-card">
                <div className="card-header">
                    <div className="title-container">
                        {/* 移除 Transforma: 标题，只保留艺术字 */}
                        <div className="typography-art">
                            <div className="line-1">
                                <span className="letter-w">W</span>
                                <span className="letter-h">h</span>
                                <span className="letter-e">e</span>
                                <span className="letter-r">r</span><span></span>
                                <span className="letter-e2">e</span>
                                <span className="space-span"> </span>
                                <span className="letter-t">t</span>
                                <span className="letter-y">y</span>
                                <span className="letter-p">p</span>
                                <span className="letter-e3">e</span>
                            </div>
                            <div className="line-2">
                                <span className="letter-m">m</span>
                                <span className="letter-e4">e</span>
                                <span className="letter-e5">e</span>
                                <span className="letter-t2">t</span>
                                <span className="letter-s">s</span>
                                <span className="space-span"> </span>
                                <span className="letter-m2">m</span>
                                <span className="letter-a">a</span>
                                <span className="letter-g">g</span>
                                <span className="letter-i">i</span>
                                <span className="letter-c">c</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 视频区域 */}
                <div className="video-display-area" onClick={togglePlay}>
                    <video
                        ref={videoRef}
                        className="content-video"
                        src="/assets/whiteFerrari.mp4"
                        loop
                        muted={false}
                        playsInline
                    />
                    <div className={`play-overlay ${isPlaying ? 'hidden' : ''}`}>
                        <div className="play-icon">▶</div>
                    </div>

                    {/* 车 - 右上角装饰 */}
                    <img src="/assets/whiteferrari.png" alt="White Ferrari" className="car-badge" />
                </div>

                {/* 底部说明文字 */}
                <p className="video-caption">
                    "This is a devio I really like, hope you like it too."
                </p>

                {/* 底部 Logo 或 标语 */}
                <div className="card-footer">
                    <span className="brand-text">Hawaii Travel</span>
                </div>
            </div>
        </section>
    );
};

export default BlankPage;
